'use client';

import { useEffect, useState } from 'react';
import { useThemeContext } from '@/shared/hooks/useThemeContext';
import { THEME_DARK } from '@/shared/constants/theme.constants';
import {
  THEME_TOGGLE_LABELS,
  THEME_TOGGLE_BUTTON_STYLES,
  THEME_TOGGLE_ICON_STYLES,
} from './ThemeToggle.constants';

// Botón de modo oscuro/claro. El tema real solo se conoce en el cliente (depende
// de localStorage y de la preferencia del sistema), así que el ícono y la etiqueta
// se difieren hasta el montaje para no provocar mismatch de hidratación: hasta
// entonces se muestra el estado por defecto (claro → ofrecer modo oscuro).
export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showDarkActive = mounted && theme === THEME_DARK;
  const label = showDarkActive ? THEME_TOGGLE_LABELS.TO_LIGHT : THEME_TOGGLE_LABELS.TO_DARK;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={THEME_TOGGLE_BUTTON_STYLES}
    >
      {showDarkActive ? (
        <svg
          className={THEME_TOGGLE_ICON_STYLES}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg
          className={THEME_TOGGLE_ICON_STYLES}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
