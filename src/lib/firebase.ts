// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Firebase Initialization & Core Services Configuration
// ==============================================================================

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Official Firebase configuration provided by Medhankar Publication
export const firebaseConfig = {
  apiKey: "AIzaSyCEFJRP1k1j6KwFNDwMibfdZqdOFCzhQ5g",
  authDomain: "medhankar-publication-user.firebaseapp.com",
  projectId: "medhankar-publication-user",
  storageBucket: "medhankar-publication-user.firebasestorage.app",
  messagingSenderId: "226586350208",
  appId: "1:226586350208:web:3dbe7f63710dd671208c65",
  measurementId: "G-90Q99JHCFE"
};

// Initialize or reuse Firebase instance
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore Database
export const db = getFirestore(app);

// Initialize Analytics conditionally (only in browser environment when supported)
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics optional fallback
  });
}
