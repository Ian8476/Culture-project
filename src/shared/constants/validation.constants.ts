// Límites de validación compartidos entre auth y profile.
// Deben mantenerse en sintonía con las Firestore Security Rules.
export const MIN_DISPLAY_NAME_LENGTH = 3 as const;
export const MAX_DISPLAY_NAME_LENGTH = 50 as const;
export const MAX_BIO_LENGTH = 280 as const;

// Firebase Authentication exige un mínimo de 6 caracteres en la contraseña.
export const MIN_PASSWORD_LENGTH = 6 as const;
export const MAX_PASSWORD_LENGTH = 128 as const;

// Rango de peso de las perspectivas culturales.
export const MIN_PERSPECTIVE_WEIGHT = 1 as const;
export const MAX_PERSPECTIVE_WEIGHT = 5 as const;

// Límites del onboarding cultural.
export const MAX_INTERESTS = 3 as const;
export const MAX_SUBGENRES = 15 as const;
export const MAX_PERSPECTIVES = 5 as const;

export const VALIDATION_MESSAGES = {
  EMAIL_INVALID: 'Ingresa un correo electrónico válido.',
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`,
  PASSWORD_TOO_LONG: `La contraseña no puede exceder ${MAX_PASSWORD_LENGTH} caracteres.`,
  DISPLAY_NAME_TOO_SHORT: `El nombre debe tener al menos ${MIN_DISPLAY_NAME_LENGTH} caracteres.`,
  DISPLAY_NAME_TOO_LONG: `El nombre no puede exceder ${MAX_DISPLAY_NAME_LENGTH} caracteres.`,
  BIO_TOO_LONG: `La biografía no puede exceder ${MAX_BIO_LENGTH} caracteres.`,
  REQUIRED: 'Este campo es obligatorio.',
} as const;
