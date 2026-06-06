import type { SelectOption } from '@/shared/types/common.types';
import type { KnowledgeLevel } from '@/shared/types/domain.types';

// Niveles de conocimiento (valores = los del dominio KnowledgeLevel).
export const KNOWLEDGE_LEVELS = {
  NOVICE: 'NOVICE',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  EXPERT: 'EXPERT',
} as const;

export const KNOWLEDGE_LEVEL_LABELS: Record<KnowledgeLevel, string> = {
  NOVICE: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
  EXPERT: 'Experto',
};

export const KNOWLEDGE_LEVEL_OPTIONS: SelectOption[] = [
  { value: KNOWLEDGE_LEVELS.NOVICE, label: KNOWLEDGE_LEVEL_LABELS.NOVICE },
  { value: KNOWLEDGE_LEVELS.INTERMEDIATE, label: KNOWLEDGE_LEVEL_LABELS.INTERMEDIATE },
  { value: KNOWLEDGE_LEVELS.ADVANCED, label: KNOWLEDGE_LEVEL_LABELS.ADVANCED },
  { value: KNOWLEDGE_LEVELS.EXPERT, label: KNOWLEDGE_LEVEL_LABELS.EXPERT },
];

// Nivel y peso por defecto al seleccionar un interés / perspectiva.
export const DEFAULT_KNOWLEDGE_LEVEL: KnowledgeLevel = KNOWLEDGE_LEVELS.NOVICE;
export const DEFAULT_PERSPECTIVE_WEIGHT = 3 as const;

// Nombres de campos del documento `profiles` en Firestore.
export const PROFILE_DOC_FIELDS = {
  DISPLAY_NAME: 'displayName',
  BIO: 'bio',
  AVATAR_URL: 'avatarUrl',
  INTERESTS: 'interests',
  SUBGENRES: 'subgenres',
  PERSPECTIVES: 'perspectives',
  COMPLETED_AT: 'completedAt',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
} as const;

// Clave anidada del nivel de conocimiento dentro de cada interés.
export const KNOWLEDGE_LEVEL_KEY = 'knowledgeLevel' as const;
// Clave anidada del peso dentro de cada perspectiva.
export const PERSPECTIVE_WEIGHT_KEY = 'weight' as const;

// Identificadores de campos del formulario.
export const PROFILE_FIELDS = {
  DISPLAY_NAME: 'displayName',
  BIO: 'bio',
} as const;

// Textos de presentación.
export const PROFILE_LABELS = {
  DISPLAY_NAME: 'Nombre para mostrar',
  BIO: 'Biografía',
  INTERESTS: 'Tus intereses culturales',
  KNOWLEDGE_LEVEL: 'Nivel de conocimiento',
  SUBGENRES: 'Subgéneros favoritos',
  PERSPECTIVES: 'Cómo te gusta analizar las obras',
  PERSPECTIVE_WEIGHT: 'Importancia',
} as const;

export const PROFILE_PLACEHOLDERS = {
  DISPLAY_NAME: '¿Cómo quieres que te vean?',
  BIO: 'Cuéntale a la comunidad sobre ti (opcional).',
} as const;

export const PROFILE_HINTS = {
  INTERESTS: 'Elige hasta 3 intereses y tu nivel en cada uno.',
  SUBGENRES: 'Selecciona los subgéneros que más disfrutas.',
  PERSPECTIVES: 'Activa las perspectivas que te importan y ajusta su peso.',
} as const;

export const PROFILE_TITLES = {
  SETUP: 'Completa tu perfil cultural',
  VIEW: 'Tu perfil',
  EDIT: 'Editar perfil',
} as const;

export const PROFILE_SUBTITLES = {
  SETUP: 'Personaliza tu experiencia para conectar con gente afín.',
  EDIT: 'Actualiza tus intereses y preferencias.',
} as const;

export const PROFILE_BUTTONS = {
  SAVE_SETUP: 'Guardar y continuar',
  SAVE_EDIT: 'Guardar cambios',
  GO_EDIT: 'Editar perfil',
  SIGN_OUT: 'Cerrar sesión',
} as const;

// Mensajes de estado / error.
export const PROFILE_MESSAGES = {
  LOADING: 'Cargando…',
  CATALOG_ERROR: 'No se pudo cargar el catálogo. Inténtalo de nuevo.',
  SAVE_ERROR: 'No se pudo guardar tu perfil. Inténtalo de nuevo.',
  NO_PROFILE: 'Aún no has creado tu perfil.',
  NO_BIO: 'Sin biografía.',
  EMPTY_SUBGENRES: 'No hay subgéneros disponibles. Selecciona primero un interés.',
  AUTH_REQUIRED: 'Debes iniciar sesión.',
  REQUIRED_INTEREST: 'Selecciona al menos un interés.',
} as const;

// Encabezados de las secciones de la vista de perfil.
export const PROFILE_VIEW_SECTIONS = {
  INTERESTS: 'Intereses',
  SUBGENRES: 'Subgéneros',
  PERSPECTIVES: 'Perspectivas',
} as const;
