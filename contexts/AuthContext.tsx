"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { ref, set, update } from "firebase/database";
import { auth, rtdb } from "@/lib/firebase/client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Send token to our server to set a session cookie
        const token = await currentUser.getIdToken();
        await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      } else {
        // Fallback mock user for previewing pages without auth
        setUser({
          uid: "mock-user-123",
          displayName: "Rahul Kumar",
          email: "rahul@example.com",
          emailVerified: true,
          getIdToken: async () => "mock-token-123",
        } as any);
        // Clear session cookie
        await fetch("/api/auth/session", { method: "DELETE" });
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    // Mock successful sign in
    setUser({
      uid: "mock-user-123",
      displayName: "Rahul Kumar",
      email: email,
      emailVerified: true,
      getIdToken: async () => "mock-token-123",
    } as any);
  };

  const signUp = async (email: string, pass: string, name: string) => {
    // Mock successful sign up
    setUser({
      uid: "mock-user-123",
      displayName: name || "Rahul Kumar",
      email: email,
      emailVerified: true,
      getIdToken: async () => "mock-token-123",
    } as any);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    await fetch("/api/auth/session", { method: "DELETE" });
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const resendVerification = async () => {
    if (user) {
      await sendEmailVerification(user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resetPassword, resendVerification }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
