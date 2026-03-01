// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "bgs-imo-b1008.firebaseapp.com",
  projectId: "bgs-imo-b1008",
  storageBucket: "bgs-imo-b1008.firebasestorage.app",
  messagingSenderId: "229692291885",
  appId: "1:229692291885:web:4c854e9e32c12d508df1a4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Configure Facebook Provider
facebookProvider.setCustomParameters({
  display: 'popup'
});

export { app, auth, db, storage, googleProvider, facebookProvider };