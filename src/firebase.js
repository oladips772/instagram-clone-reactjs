/** @format */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY6Vcc5fTBUVAzx48qH0uE6TNNDnRZjak",
  authDomain: "instagram-clone-reactjs-2e256.firebaseapp.com",
  projectId: "instagram-clone-reactjs-2e256",
  storageBucket: "instagram-clone-reactjs-2e256.appspot.com",
  messagingSenderId: "237787587841",
  appId: "1:237787587841:web:e8e9a884d8c2a76f3e6700",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider()

export { app, db, auth, storage,provider };
