import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCH0307mAkCUqK3NOIdDzi75Qa9PjPPZP8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'growfrederick-21ad9.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'growfrederick-21ad9',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'growfrederick-21ad9.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '874977905203',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:874977905203:web:9e7fa5c4f5ef303f0b7146',
};

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth
export const auth: Auth = getAuth(app);

// Initialize Storage
export const storage: FirebaseStorage = getStorage(app);

// Placeholder database export
export const db = {
  // Placeholder - add your actual Firebase config
};

// Auth functions
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Comprehensive sign out function that clears all user data
export const completeSignOut = async () => {
  try {
    // Sign out from Firebase
    await firebaseSignOut(auth);
    
    // Clear all localStorage items related to user data
    localStorage.removeItem('userDisplayName');
    localStorage.removeItem('userPhoto');
    localStorage.removeItem('temperatureUnit');
    localStorage.removeItem('distanceUnit');
    localStorage.removeItem('notificationSettings');
    localStorage.removeItem('myGardens');
    localStorage.removeItem('calendarEvents');
    localStorage.removeItem('plantData');
    localStorage.removeItem('gardenData');
    localStorage.removeItem('userPreferences');
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Dispatch event to clear user context
    window.dispatchEvent(new CustomEvent('userSignedOut', { bubbles: true }));
    
    return true;
  } catch (error: any) {
    console.error('Error during sign out:', error);
    // Even if Firebase sign out fails, clear local data
    localStorage.clear();
    sessionStorage.clear();
    window.dispatchEvent(new CustomEvent('userSignedOut', { bubbles: true }));
    throw new Error(error.message || 'Failed to sign out');
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export default app;

