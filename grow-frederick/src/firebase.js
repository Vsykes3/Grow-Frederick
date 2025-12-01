
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH0307mAkCUqK3NOIdDzi75Qa9PjPPZP8",
  authDomain: "growfrederick-21ad9.firebaseapp.com",
  projectId: "growfrederick-21ad9",
  storageBucket: "growfrederick-21ad9.firebasestorage.app",
  messagingSenderId: "874977905203",
  appId: "1:874977905203:web:9e7fa5c4f5ef303f0b7146",
  measurementId: "G-LGSFVCJ8DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export auth
export const auth = getAuth(app);
export default app;
export const storage = getStorage(app);

