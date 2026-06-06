import { useContext } from 'react';
import { AuthContext } from '@/shared/context/authContext';
import { AUTH_CONTEXT_ERROR } from '@/shared/constants/app.constants';
import type { AuthContextValue } from '@/shared/context/AuthProvider.types';

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(AUTH_CONTEXT_ERROR);
  }

  return context;
}
