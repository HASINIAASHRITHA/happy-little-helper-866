import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env["GOOGLE_API_KEY"] || "",
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

// Auth validates the API key at creation time, so only create it in the browser.
function createAuth(): Auth {
  if (!authInstance) authInstance = getAuth(ensureApp());
  return authInstance;
}

export const auth: Auth =
  typeof window === "undefined"
    ? (new Proxy({} as Auth, {
        get() {
          throw new Error("Firebase Auth is only available in the browser");
        },
      }) as Auth)
    : createAuth();

