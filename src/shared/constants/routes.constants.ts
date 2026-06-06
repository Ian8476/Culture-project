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
} as const;
