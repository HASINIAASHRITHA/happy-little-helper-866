import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
  authDomain: "portfolio-5abf3.firebaseapp.com",
  projectId: "portfolio-5abf3",
  storageBucket: "portfolio-5abf3.firebasestorage.app",
  messagingSenderId: "258690032609",
  appId: "1:258690032609:web:76d42d3c3b3f7eb4d868a0",
  measurementId: "G-CHDXSGPPSY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
