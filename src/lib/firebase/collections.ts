// Nombres de colecciones de Firestore. Ningún string literal de colección
// debe vivir en los services: todos importan desde aquí.
export const COLLECTIONS = {
  USERS: 'users',
  PROFILES: 'profiles',
  INTERESTS: 'interests',
  SUBGENRES: 'subgenres',
  PERSPECTIVES: 'perspectives',
  DISCUSSIONS: 'discussions',
  // Subcolección de cada documento de `discussions`.
  DISCUSSION_COMMENTS: 'comments',
} as const;
