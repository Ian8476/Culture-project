export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },
  PROFILE: {
    ROOT: '/profile',
    SETUP: '/profile/setup',
    EDIT: '/profile/edit',
  },
  COMMUNITIES: {
    ROOT: '/communities',
  },
} as const;

// Query param con la ruta a la que volver después de iniciar sesión.
export const NEXT_QUERY_PARAM = 'next' as const;

// Prefijo que debe tener un `next` válido (solo rutas internas, evita open redirects).
export const INTERNAL_PATH_PREFIX = '/' as const;

// Un path interno empieza con '/' pero no con '//' (URL relativa a protocolo externa).
export function isInternalPath(path: string): boolean {
  const protocolRelativePrefix = `${INTERNAL_PATH_PREFIX}${INTERNAL_PATH_PREFIX}`;
  return path.startsWith(INTERNAL_PATH_PREFIX) && !path.startsWith(protocolRelativePrefix);
}

// Builders de rutas dinámicas (segmentos [subgenreSlug] y [discussionId]).
export function communityRoute(subgenreSlug: string): string {
  return `${ROUTES.COMMUNITIES.ROOT}/${subgenreSlug}`;
}

export function discussionRoute(subgenreSlug: string, discussionId: string): string {
  return `${communityRoute(subgenreSlug)}/${discussionId}`;
}

// Ruta de login que recuerda a dónde quería ir la persona (la usa AuthGuard).
export function loginRouteWithNext(nextPath: string): string {
  return `${ROUTES.AUTH.LOGIN}?${NEXT_QUERY_PARAM}=${encodeURIComponent(nextPath)}`;
}
