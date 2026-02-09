'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase with error handling
let app;
let auth;
let googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.error('Firebase initialization error (non-critical):', error.message);
  // Continue execution as the client-side SDK might still work
}

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.warn('Auth not initialized, but continuing...');
      setLoading(false);
      return;
    }

    checkUser();
    // Set up Firebase auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Update user state with Firebase user
        setUser({
          ...user,
          emailVerified: user.emailVerified
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Session check error:', error);
      setUser(null);
    }
    setLoading(false);
  };

  const signUp = async (formData) => {
    try {
      // Call backend API - backend handles all Firebase operations
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to sign up');
      }

      const data = await response.json();
      
      // After successful backend signup, sign in the user on frontend
      // This allows the user to be authenticated in the frontend Firebase SDK
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        await checkUser(); // Refresh user data
      } catch (signInError) {
        // If sign-in fails, it's okay - user can log in manually
        console.warn('Auto sign-in after signup failed:', signInError.message);
        // Don't throw - signup was successful, just sign-in failed
      }
      
      return {
        ...data,
        message: data.message || 'Account created successfully'
      };
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle specific error messages
      if (error.message?.includes('already') || error.message?.includes('exists')) {
        throw new Error('This email is already registered. Please log in or use a different email.');
      }
      
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      // First sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        // Optionally resend verification email
        await sendEmailVerification(userCredential.user);
        throw new Error('Please verify your email address. A new verification email has been sent.');
      }

      // Then login with your backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          firebaseUid: userCredential.user.uid 
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to login');
      }

      const data = await response.json();
      setUser({
        ...data.user,
        emailVerified: userCredential.user.emailVerified
      });
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Use Firebase's Google sign-in popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Get the ID token
      const idToken = await user.getIdToken();
      
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      // Send the token to your backend
      const response = await fetch(`${BACKEND_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to sign in with Google');
      }

      await checkUser(); // Refresh user data after successful sign-in
      return true;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      await auth.signOut(); // Sign out from Firebase
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const resendVerificationEmail = async () => {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in');
    }
    await sendEmailVerification(auth.currentUser);
  };

  const value = {
    user,
    loading,
    signUp,
    login,
    signInWithGoogle,
    logout,
    resendVerificationEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext };

export const useAuth = () => {
  return useContext(AuthContext);
}; 