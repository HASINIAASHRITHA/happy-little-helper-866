import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const apiKey = import.meta.env["GOOGLE_API_KEY"] || "";

const firebaseConfig = {
  apiKey,
  authDomain: "portfolio-5abf3.firebaseapp.com",
  projectId: "portfolio-5abf3",
  storageBucket: "portfolio-5abf3.firebasestorage.app",
  messagingSenderId: "258690032609",
  appId: "1:258690032609:web:76d42d3c3b3f7eb4d868a0",
  measurementId: "G-CHDXSGPPSY"
};

// Firebase must never initialize during SSR — the client API key is not
// available on the server and auth throws auth/invalid-api-key, causing a 500.
let app: FirebaseApp | undefined;
let dbInstance: Firestore | undefined;
let authInstance: Auth | undefined;

function ensureApp(): FirebaseApp {
  if (!app) {
    const existing = getApps();
    app = existing.length > 0 ? existing[0]! : initializeApp(firebaseConfig);
  }
  return app;
}

// Firestore is safe to create anywhere (no API-key validation), so export the
// real instance — a Proxy breaks Firestore's internal instanceof checks.
export const db: Firestore = (() => {
  if (!dbInstance) dbInstance = getFirestore(ensureApp());
  return dbInstance;
})();

// Auth validates its key immediately. Keep that work out of SSR and return a
// controlled unavailable state instead of crashing the entire application.
export function getFirebaseAuth(): Auth | null {
  if (typeof window === "undefined" || !apiKey) return null;
  if (authInstance) return authInstance;

  try {
    authInstance = getAuth(ensureApp());
    return authInstance;
  } catch (error) {
    console.error("Firebase Authentication is unavailable.", error);
    return null;
  }
}

