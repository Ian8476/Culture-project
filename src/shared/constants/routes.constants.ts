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

// Builders de rutas dinámicas (segmentos [subgenreSlug] y [discussionId]).
export function communityRoute(subgenreSlug: string): string {
  return `${ROUTES.COMMUNITIES.ROOT}/${subgenreSlug}`;
}

export function discussionRoute(subgenreSlug: string, discussionId: string): string {
  return `${communityRoute(subgenreSlug)}/${discussionId}`;
}
