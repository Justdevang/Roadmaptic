import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyChpXthKbeY-9XXqmn3KDgvxB3xHZGW6SQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "learnpath-66361.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "learnpath-66361",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "learnpath-66361.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "659180735007",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:659180735007:web:92b171f50cf70154efe32a",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-8B25QSPBPN"
};

let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (e) {
  console.error("Firebase initialization failed:", e.message);
}

export { db };
