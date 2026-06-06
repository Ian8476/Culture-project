import type { User } from 'firebase/auth';
import type { ReactNode } from 'react';

// `User` es el tipo de firebase/auth. Es la única excepción documentada en la que
// un tipo de Firebase cruza fuera de la capa de service: vive en el estado global.
export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
