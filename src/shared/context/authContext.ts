import { createContext } from 'react';
import type { AuthContextValue } from './AuthProvider.types';

// El objeto Context vive separado del componente Provider para que el hook
// `useAuthContext` no tenga que importar desde un archivo de componente
// (respeta el flujo de dependencias unidireccional).
export const AuthContext = createContext<AuthContextValue | null>(null);
