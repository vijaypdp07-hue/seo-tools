import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import config from "../../firebase-applet-config.json";

// Initialize Firebase
export const app = initializeApp(config);
export const db = getFirestore(app);
export const auth = getAuth(app);
