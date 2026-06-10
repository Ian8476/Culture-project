import { ROUTES } from '@/shared/constants/routes.constants';

// Textos de navegación y acciones del header global.
export const APP_HEADER_LABELS = {
  LOGIN: 'Iniciar sesión',
  REGISTER: 'Crear cuenta',
  COMMUNITIES: 'Comunidades',
  PROFILE: 'Mi perfil',
  SIGN_OUT: 'Cerrar sesión',
} as const;

// Enlaces visibles cuando hay sesión activa.
export const APP_HEADER_NAV_LINKS = [
  { href: ROUTES.COMMUNITIES.ROOT, label: APP_HEADER_LABELS.COMMUNITIES },
  { href: ROUTES.PROFILE.ROOT, label: APP_HEADER_LABELS.PROFILE },
] as const;

// Mensaje de despedida al cerrar sesión.
export const APP_HEADER_SIGN_OUT_TOAST = 'Cerraste sesión. ¡Te esperamos pronto!' as const;

// Estilos (masthead editorial, mismo lenguaje visual de la landing).
export const APP_HEADER_WRAPPER_STYLES =
  'sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md' as const;
export const APP_HEADER_NAV_STYLES =
  'mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4' as const;
export const APP_HEADER_BRAND_STYLES =
  'font-display text-xl font-semibold italic tracking-tight text-ink transition-colors hover:text-accent' as const;
export const APP_HEADER_ACTIONS_STYLES = 'flex items-center gap-2 sm:gap-5' as const;
export const APP_HEADER_LINK_STYLES =
  'text-sm font-medium text-ink-soft transition-colors hover:text-ink' as const;
export const APP_HEADER_LINK_ACTIVE_STYLES =
  'text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-8' as const;
export const APP_HEADER_CTA_STYLES =
  'rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-all hover:bg-accent active:scale-95' as const;
export const APP_HEADER_SKELETON_STYLES =
  'h-9 w-44 animate-pulse rounded-full bg-surface-deep' as const;
