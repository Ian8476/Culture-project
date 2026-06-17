import { createContext } from 'react';
import type { ThemeContextValue } from '@/shared/types/theme.types';

// El objeto Context vive separado del Provider para que `useThemeContext` no
// dependa de un archivo de componente (respeta el flujo unidireccional, igual
// que `authContext`).
export const ThemeContext = createContext<ThemeContextValue | null>(null);
