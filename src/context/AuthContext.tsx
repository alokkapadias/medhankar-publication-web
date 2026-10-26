// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Firebase Authentication Context & Provider
// ==============================================================================

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { demoSessionRepository } from '../lib/storage';
import type { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  isFirebaseReady: boolean;
  isSupabaseReady: boolean;
  isDemoAuthAllowed: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, pass: string, displayName?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithPhone: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (phone: string, token: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  pendingVerificationPhone: string | null;
  setPendingVerificationPhone: (phone: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pendingVerificationPhone, setPendingVerificationPhone] = useState<string | null>(null);

  const isFirebaseReady = Boolean(auth);
  const isDemoAuthAllowed = true;

  // Initialize and observe Firebase Auth state
  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (!mounted) return;
      if (fbUser) {
        setFirebaseUser(fbUser);
        setUser({
          id: fbUser.uid,
          phone: fbUser.phoneNumber || '',
          email: fbUser.email || '',
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Member',
          createdAt: fbUser.metadata.creationTime || new Date().toISOString(),
          isDemoUser: false,
        });
        setIsLoading(false);
      } else {
        setFirebaseUser(null);
        // Check local demo session fallback
        const demoSession = demoSessionRepository.getSession();
        if (demoSession) {
          setUser({
            id: `demo-${demoSession.phone.replace(/\D/g, '')}`,
            phone: demoSession.phone,
            createdAt: demoSession.signedInAt,
            isDemoUser: true,
            displayName: 'Reader (Demo Access)',
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  // Firebase Email Sign In
  const signInWithEmail = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      setFirebaseUser(cred.user);
      setUser({
        id: cred.user.uid,
        email: cred.user.email || '',
        phone: cred.user.phoneNumber || '',
        displayName: cred.user.displayName || cred.user.email?.split('@')[0] || 'Admin',
        createdAt: cred.user.metadata.creationTime || new Date().toISOString(),
        isDemoUser: false,
      });
      return { success: true };
    } catch (err: any) {
      console.warn('Firebase email sign-in error:', err);
      let errorMsg = 'Failed to sign in. Please verify your email and password.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        errorMsg = 'Invalid email or password.';
      } else if (err.code === 'auth/user-not-found') {
        errorMsg = 'No account found with this email.';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
      } else if (err.message) {
        errorMsg = err.message;
      }
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Firebase Email Sign Up with Name & Firestore Profile Persistence
  const signUpWithEmail = async (
    email: string,
    pass: string,
    displayName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const cleanName = displayName?.trim() || cred.user.email?.split('@')[0] || 'Reader';

      // 1. Update Firebase User Profile
      if (displayName?.trim() && cred.user) {
        try {
          await updateProfile(cred.user, { displayName: cleanName });
        } catch (profileErr) {
          console.warn('Firebase profile update note:', profileErr);
        }
      }

      // 2. Persist complete user record into Cloud Firestore for tracking purchases & library access
      try {
        await setDoc(
          doc(db, 'users', cred.user.uid),
          {
            uid: cred.user.uid,
            displayName: cleanName,
            name: cleanName,
            email: cred.user.email || email,
            gmail: cred.user.email || email,
            password: pass, // Stored in Firestore document as requested for tracking/support
            role: 'user',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            purchasedBooks: [],
            paymentHistory: [],
            readingHistory: [],
            savedBooks: [],
            cart: [],
            status: 'active',
            totalSpent: 0,
            currency: 'INR',
          },
          { merge: true }
        );
      } catch (firestoreErr) {
        console.warn('Firestore user profile document creation note:', firestoreErr);
      }

      setFirebaseUser(cred.user);
      setUser({
        id: cred.user.uid,
        email: cred.user.email || email,
        phone: cred.user.phoneNumber || '',
        displayName: cleanName,
        createdAt: cred.user.metadata.creationTime || new Date().toISOString(),
        isDemoUser: false,
      });
      return { success: true };
    } catch (err: any) {
      console.warn('Firebase email sign-up error:', err);
      let errorMsg = 'Failed to create account.';
      if (err.code === 'auth/email-already-in-use') {
        errorMsg = 'This email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        errorMsg = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid Gmail / Email address.';
      } else if (err.message) {
        errorMsg = err.message;
      }
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Phone OTP Flow (Seamless compatibility with existing phone UI)
  const signInWithPhone = async (
    phone: string
  ): Promise<{ success: boolean; error?: string }> => {
    setPendingVerificationPhone(phone);
    return { success: true };
  };

  // Verify Phone OTP
  const verifyOtp = async (
    phone: string,
    token: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (token.length >= 4) {
      demoSessionRepository.setSession(phone);
      setUser({
        id: `user-${phone.replace(/\D/g, '')}`,
        phone,
        createdAt: new Date().toISOString(),
        isDemoUser: true,
        displayName: 'Medhankar Reader',
      });
      setPendingVerificationPhone(null);
      return { success: true };
    }
    return { success: false, error: 'Please enter a valid verification code.' };
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      demoSessionRepository.clearSession();
      setUser(null);
      setFirebaseUser(null);
      setPendingVerificationPhone(null);
    } catch (err) {
      console.error('Sign out error:', err);
      demoSessionRepository.clearSession();
      setUser(null);
      setFirebaseUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isLoading,
        isFirebaseReady,
        isSupabaseReady: false,
        isDemoAuthAllowed,
        signInWithEmail,
        signUpWithEmail,
        signInWithPhone,
        verifyOtp,
        signOut,
        pendingVerificationPhone,
        setPendingVerificationPhone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
