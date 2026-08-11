"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

type User = {
  id: string;
  email: string;
  name?: string;
  workspaceName?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password?: string, company?: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          email: currentUser.email || '',
          name: currentUser.displayName || '',
          workspaceName: '', // Placeholder since we don't have this in basic Firebase Auth profile
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password?: string) => {
    await signInWithEmailAndPassword(auth, email, password || 'default_hackathon_password');
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signUp = async (email: string, password?: string, company?: string, name?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password || 'default_hackathon_password');
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
      setUser((prev) => prev ? { ...prev, name } : null);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
