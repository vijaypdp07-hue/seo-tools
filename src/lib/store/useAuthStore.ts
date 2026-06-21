import { create } from "zustand";
import { auth, db } from "../firebase";
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthState {
  user: User | null;
  tier: "free" | "pro" | "team" | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize with loading state
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Check tier in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      let tier: "free" | "pro" | "team" = "free";
      
      if (!userSnap.exists()) {
        await setDoc(userRef, { tier: "free", createdAt: new Date() });
      } else {
        tier = userSnap.data().tier || "free";
      }
      
      set({ user, tier, isLoading: false });
    } else {
      set({ user: null, tier: null, isLoading: false });
    }
  });

  return {
    user: auth.currentUser,
    tier: null,
    isLoading: true,
    loginWithGoogle: async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    },
    signOut: async () => {
      await firebaseSignOut(auth);
    }
  };
});
