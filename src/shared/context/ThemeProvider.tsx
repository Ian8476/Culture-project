'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './themeContext';
import {
  THEME_STORAGE_KEY,
  THEME_ATTRIBUTE,
  THEME_LIGHT,
  THEME_DARK,
  THEME_DEFAULT,
  THEME_SYSTEM_DARK_QUERY,
} from '@/shared/constants/theme.constants';
import type { Theme, ThemeContextValue } from '@/shared/types/theme.types';
import type { ThemeProviderProps } from './ThemeProvider.types';

function readStoredTheme(): Theme | null {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === THEME_LIGHT || stored === THEME_DARK ? stored : null;
}

// En el servidor no hay preferencia disponible: se usa el tema por defecto y la
// resolución real ocurre en el cliente (el script inline ya pintó los colores).
function resolveInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return THEME_DEFAULT;
  }
  const stored = readStoredTheme();
  if (stored !== null) {
    return stored;
  }
  return window.matchMedia(THEME_SYSTEM_DARK_QUERY).matches ? THEME_DARK : THEME_LIGHT;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(resolveInitialTheme);

  // Refleja el tema en el documento y lo persiste como preferencia explícita.
  useEffect(() => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme): void => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback((): void => {
    setThemeState((current) => (current === THEME_DARK ? THEME_LIGHT : THEME_DARK));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
