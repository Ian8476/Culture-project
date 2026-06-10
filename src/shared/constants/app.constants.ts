export const APP_NAME = 'Plataforma Cultural' as const;
export const APP_VERSION = '1.0.0' as const;
export const APP_DESCRIPTION =
  'Comunidad para conectar con personas que comparten tus intereses en cine, teatro y lectura.' as const;
export const DEFAULT_LOCALE = 'es-CR' as const;

export const AUTH_CONTEXT_ERROR = 'useAuthContext debe usarse dentro de un AuthProvider.' as const;
export const TOAST_CONTEXT_ERROR = 'useToast debe usarse dentro de un ToastProvider.' as const;
export const LOADING_MESSAGE = 'Cargando…' as const;

// Títulos del documento por página (se componen con TITLE_TEMPLATE en el root layout).
export const TITLE_TEMPLATE = `%s · ${APP_NAME}`;

export const PAGE_TITLES = {
  LOGIN: 'Iniciar sesión',
  REGISTER: 'Crear cuenta',
  FORGOT_PASSWORD: 'Recuperar contraseña',
  PROFILE: 'Mi perfil',
  PROFILE_SETUP: 'Completa tu perfil',
  PROFILE_EDIT: 'Editar perfil',
  COMMUNITIES: 'Comunidades',
  COMMUNITY: 'Comunidad',
  DISCUSSION: 'Discusión',
  NOT_FOUND: 'Página no encontrada',
} as const;
