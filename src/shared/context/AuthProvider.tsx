'use client';

import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { AuthContext } from './authContext';
import type { AuthContextValue, AuthProviderProps } from './AuthProvider.types';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, signOut }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
