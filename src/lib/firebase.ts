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

function lazy<T extends object>(factory: () => T): T {
  return new Proxy({} as T, {
    get(_target, prop, receiver) {
      const instance = factory() as Record<PropertyKey, unknown>;
      const value = Reflect.get(instance, prop, receiver);
      return typeof value === "function" ? value.bind(instance) : value;
    },
  });
}

export const db: Firestore = lazy(() => {
  if (!dbInstance) dbInstance = getFirestore(ensureApp());
  return dbInstance;
});

export const auth: Auth = lazy(() => {
  if (!authInstance) authInstance = getAuth(ensureApp());
  return authInstance;
});
