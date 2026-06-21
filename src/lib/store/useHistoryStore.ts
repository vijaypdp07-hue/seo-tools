import { create } from "zustand";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { useAuthStore } from "./useAuthStore";

export type HistoryEntry = {
  id: string;
  toolSlug: string;
  category: string;
  toolPath?: string;
  usedAt: any;
};

interface HistoryState {
  history: HistoryEntry[];
  isLoading: boolean;
  fetchHistory: () => Promise<void>;
  recordUsage: (toolSlug: string, category: string, toolPath?: string) => Promise<void>;
  clearHistory: () => Promise<void>;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  history: [],
  isLoading: false,

  fetchHistory: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const historyRef = collection(db, "users", user.uid, "history");
      const q = query(historyRef, orderBy("usedAt", "desc"), limit(50));
      const snapshot = await getDocs(q);
      
      const history: HistoryEntry[] = [];
      snapshot.forEach((doc) => {
        history.push({ id: doc.id, ...doc.data() } as HistoryEntry);
      });
      
      set({ history });
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  recordUsage: async (toolSlug: string, category: string, toolPath?: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return; // Silent if guest

    try {
      const historyRef = collection(db, "users", user.uid, "history");
      const docRef = await addDoc(historyRef, {
        toolSlug,
        category,
        toolPath: toolPath || `/tools/${category.toLowerCase().replace(' ', '-')}/${toolSlug}`,
        usedAt: serverTimestamp()
      });
      
      // Optioanlly fetch or prepend
      set((state) => ({
        history: [{ id: docRef.id, toolSlug, category, toolPath, usedAt: new Date() }, ...state.history]
      }));
    } catch (error) {
      console.error("Failed to record usage:", error);
    }
  },

  clearHistory: async () => {
     const user = useAuthStore.getState().user;
     if (!user) return;
     
     const { history } = get();
     try {
       // Delete all individually
       await Promise.all(history.map(entry => deleteDoc(doc(db, "users", user.uid, "history", entry.id))));
       set({ history: [] });
     } catch (e) {
       console.error("Failed to clear history", e);
     }
  }
}));
