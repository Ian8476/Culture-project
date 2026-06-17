import type { Theme } from '@/shared/types/theme.types';

// Clave de localStorage donde se persiste la preferencia explícita del usuario.
export const THEME_STORAGE_KEY = 'tertulia-theme' as const;

// Atributo que los selectores de `globals.css` observan para forzar la paleta.
export const THEME_ATTRIBUTE = 'data-theme' as const;

export const THEME_LIGHT: Theme = 'light';
export const THEME_DARK: Theme = 'dark';

// Tema por defecto cuando no hay preferencia persistida ni del sistema (SSR).
export const THEME_DEFAULT: Theme = THEME_LIGHT;

// Query usada para detectar la preferencia del sistema operativo.
export const THEME_SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)' as const;

// Script inline que corre antes del primer paint para aplicar el tema persistido
// y evitar el parpadeo (FOUC). Se compone desde las constantes para no hardcodear
// strings sueltos. No puede importar módulos porque se ejecuta fuera de React.
export const THEME_INIT_SCRIPT =
  `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');` +
  `if(t==='${THEME_LIGHT}'||t==='${THEME_DARK}'){` +
  `document.documentElement.setAttribute('${THEME_ATTRIBUTE}',t);}}catch(e){}})();`;
