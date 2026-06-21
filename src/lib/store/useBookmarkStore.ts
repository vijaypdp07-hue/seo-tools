import { create } from "zustand";
import { db } from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc, query, where } from "firebase/firestore";
import { useAuthStore } from "./useAuthStore";

export type BookmarkEntry = {
  id: string;
  toolSlug: string;
  categoryName: string;
  toolPath?: string;
};

interface BookmarkState {
  bookmarks: BookmarkEntry[];
  isLoading: boolean;
  fetchBookmarks: () => Promise<void>;
  toggleBookmark: (toolSlug: string, categoryName: string, toolPath?: string) => Promise<void>;
  isBookmarked: (toolSlug: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  isLoading: false,

  fetchBookmarks: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const bRef = collection(db, "users", user.uid, "bookmarks");
      const snapshot = await getDocs(bRef);
      
      const bookmarks: BookmarkEntry[] = [];
      snapshot.forEach((doc) => {
        bookmarks.push({ id: doc.id, ...doc.data() } as BookmarkEntry);
      });
      
      set({ bookmarks });
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  toggleBookmark: async (toolSlug: string, categoryName: string, toolPath?: string) => {
    const user = useAuthStore.getState().user;
    if (!user) {
      // Could show toast: "Login to bookmark"
      return;
    }

    const { bookmarks } = get();
    const existing = bookmarks.find(b => b.toolSlug === toolSlug);

    try {
      if (existing) {
        // Remove
        await deleteDoc(doc(db, "users", user.uid, "bookmarks", existing.id));
        set({ bookmarks: bookmarks.filter(b => b.id !== existing.id) });
      } else {
        // Add
        const bRef = collection(db, "users", user.uid, "bookmarks");
        const docRef = await addDoc(bRef, {
          toolSlug,
          categoryName,
          toolPath: toolPath || `/tools/${categoryName.toLowerCase().replace(' ', '-')}/${toolSlug}`,
          addedAt: serverTimestamp()
        });
        set({ bookmarks: [...bookmarks, { id: docRef.id, toolSlug, categoryName, toolPath }] });
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  },

  isBookmarked: (toolSlug: string) => {
    return get().bookmarks.some(b => b.toolSlug === toolSlug);
  }
}));
