// Textos de los llamados a la acción de la landing según el estado de sesión.
export const LANDING_CTA_LABELS = {
  GUEST_PRIMARY: 'Unirme a la tertulia',
  GUEST_SECONDARY: 'Ya tengo cuenta',
  AUTHED_PRIMARY: 'Explorar comunidades',
  AUTHED_SECONDARY: 'Ir a mi perfil',
  GUEST_CLOSING: 'Crear cuenta gratis',
  AUTHED_CLOSING: 'Entrar a las comunidades',
} as const;

// Mensaje de bienvenida de vuelta cuando ya hay sesión.
export const LANDING_CTA_WELCOME_BACK = 'Tu sesión sigue abierta.' as const;

// Estilos (pills del hero y del cierre, mismos que usaba la landing).
export const LANDING_CTA_ROW_STYLES = 'flex flex-wrap items-center gap-4' as const;
export const LANDING_CTA_PRIMARY_STYLES =
  'rounded-full bg-accent px-8 py-3.5 text-sm font-semibold tracking-wide text-paper shadow-lg shadow-accent/25 transition-all hover:bg-accent-deep hover:shadow-accent/40 active:scale-95' as const;
export const LANDING_CTA_SECONDARY_STYLES =
  'rounded-full border border-line bg-surface px-8 py-3.5 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink' as const;
export const LANDING_CTA_CLOSING_STYLES =
  'inline-block rounded-full bg-ink px-10 py-4 text-sm font-semibold tracking-wide text-paper transition-all hover:bg-accent active:scale-95' as const;
export const LANDING_CTA_WELCOME_STYLES = 'w-full text-sm italic text-ochre' as const;
export const LANDING_CTA_SKELETON_ROW_STYLES = 'flex flex-wrap items-center gap-4' as const;
export const LANDING_CTA_SKELETON_PILL_STYLES =
  'h-12 w-48 animate-pulse rounded-full bg-surface-deep' as const;
