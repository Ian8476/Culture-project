// Nombres de colecciones de Firestore. Ningún string literal de colección
// debe vivir en los services: todos importan desde aquí.
export const COLLECTIONS = {
  USERS: 'users',
  PROFILES: 'profiles',
  INTERESTS: 'interests',
  SUBGENRES: 'subgenres',
  PERSPECTIVES: 'perspectives',
} as const;
