import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCgEsjH8luSnpJMX3VK9sTgeHUpLUFRumA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "e-wastesetu.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "e-wastesetu",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "e-wastesetu.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "107687965429",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:107687965429:web:38e0c93e909fd9dda7cbbc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
