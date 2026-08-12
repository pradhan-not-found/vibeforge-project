"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db as firestoreDb } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

type DatabaseSchema = {
  policyProfiles: Record<string, any>;
  agents: Record<string, any>;
  userSettings: Record<string, any>;
  queue: any[];
  traces: any[];
};

type DatabaseContextType = {
  dbData: DatabaseSchema | null;
  loading: boolean;
  error: Error | null;
};

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [dbData, setDbData] = useState<DatabaseSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const docRef = doc(firestoreDb, 'database', 'global');
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as DatabaseSchema;
          setDbData({
            policyProfiles: data.policyProfiles || {},
            agents: data.agents || {},
            userSettings: data.userSettings || {},
            queue: data.queue || [],
            traces: data.traces || [],
          });
        } else {
          setDbData({
            policyProfiles: {},
            agents: {},
            userSettings: {},
            queue: [],
            traces: [],
          });
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore onSnapshot error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <DatabaseContext.Provider value={{ dbData, loading, error }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
