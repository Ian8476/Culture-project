import { useContext } from 'react';
import { ThemeContext } from '@/shared/context/themeContext';
import { THEME_CONTEXT_ERROR } from '@/shared/constants/app.constants';
import type { ThemeContextValue } from '@/shared/types/theme.types';

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error(THEME_CONTEXT_ERROR);
  }

  return context;
}
