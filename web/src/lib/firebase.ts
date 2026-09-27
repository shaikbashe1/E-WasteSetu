import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // @ts-ignore
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCgEsjH8luSnpJMX3VK9sTgeHUpLUFRumA",
  // @ts-ignore
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "e-wastesetu.firebaseapp.com",
  // @ts-ignore
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "e-wastesetu",
  // @ts-ignore
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "e-wastesetu.firebasestorage.app",
  // @ts-ignore
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "107687965429",
  // @ts-ignore
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:107687965429:web:38e0c93e909fd9dda7cbbc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
