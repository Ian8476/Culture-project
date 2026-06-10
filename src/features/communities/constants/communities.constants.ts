// Constantes de la feature communities: campos de documentos, límites,
// textos de presentación y mensajes de estado.

// Nombres de campos del documento `discussions` en Firestore.
export const DISCUSSION_DOC_FIELDS = {
  SUBGENRE_SLUG: 'subgenreSlug',
  INTEREST_SLUG: 'interestSlug',
  TITLE: 'title',
  BODY: 'body',
  HAS_SPOILERS: 'hasSpoilers',
  AUTHOR_ID: 'authorId',
  AUTHOR_NAME: 'authorName',
  CREATED_AT: 'createdAt',
} as const;

// Nombres de campos de la subcolección `comments`.
export const COMMENT_DOC_FIELDS = {
  BODY: 'body',
  HAS_SPOILERS: 'hasSpoilers',
  AUTHOR_ID: 'authorId',
  AUTHOR_NAME: 'authorName',
  CREATED_AT: 'createdAt',
} as const;

// Campo map del documento `profiles` usado para descubrir miembros por subgénero.
export const PROFILE_SUBGENRES_FIELD = 'subgenres' as const;

// Límites de contenido (alineados con firestore.rules).
export const DISCUSSION_TITLE_MIN_LENGTH = 3;
export const DISCUSSION_TITLE_MAX_LENGTH = 120;
export const DISCUSSION_BODY_MAX_LENGTH = 5000;
export const COMMENT_BODY_MAX_LENGTH = 2000;

// Límites de lectura (Firestore tarifica por documento leído).
export const MAX_DISCUSSIONS_FETCHED = 50;
export const MAX_COMMENTS_FETCHED = 100;
export const MAX_MEMBERS_FETCHED = 30;

// Identificadores de campos del formulario.
export const DISCUSSION_FIELDS = {
  TITLE: 'discussion-title',
  BODY: 'discussion-body',
  HAS_SPOILERS: 'discussion-has-spoilers',
} as const;

export const COMMENT_FIELDS = {
  BODY: 'comment-body',
  HAS_SPOILERS: 'comment-has-spoilers',
} as const;

// Textos de presentación.
export const COMMUNITY_TITLES = {
  EXPLORER: 'Comunidades',
  MEMBERS: 'Miembros',
  DISCUSSIONS: 'Discusiones',
  NEW_DISCUSSION: 'Nueva discusión',
  COMMENTS: 'Comentarios',
} as const;

export const COMMUNITY_SUBTITLES = {
  EXPLORER: 'Encuentra tu gente por interés y subgénero, sin ruido y sin spoilers.',
} as const;

export const COMMUNITY_LABELS = {
  DISCUSSION_TITLE: 'Título',
  DISCUSSION_BODY: 'Tu análisis o pregunta',
  COMMENT_BODY: 'Tu comentario',
  HAS_SPOILERS: 'Contiene spoilers',
  SPOILER_BADGE: 'Spoilers',
} as const;

export const COMMUNITY_PLACEHOLDERS = {
  DISCUSSION_TITLE: '¿Sobre qué obra quieres conversar?',
  DISCUSSION_BODY: 'Comparte tu análisis. Marca la casilla si revelas detalles de la trama.',
  COMMENT_BODY: 'Aporta a la conversación…',
} as const;

export const COMMUNITY_BUTTONS = {
  OPEN_COMPOSER: 'Abrir una discusión',
  CANCEL_COMPOSER: 'Cancelar',
  PUBLISH_DISCUSSION: 'Publicar discusión',
  PUBLISH_COMMENT: 'Comentar',
  REVEAL_SPOILER: 'Mostrar spoiler',
  BACK_TO_COMMUNITY: 'Volver a la comunidad',
  BACK_TO_EXPLORER: 'Todas las comunidades',
  GO_PROFILE: 'Mi perfil',
} as const;

// Mensajes de estado / error.
export const COMMUNITY_MESSAGES = {
  LOADING: 'Cargando…',
  MEMBERS_ERROR: 'No se pudieron cargar los miembros de la comunidad.',
  DISCUSSIONS_ERROR: 'No se pudieron cargar las discusiones.',
  DISCUSSION_NOT_FOUND: 'Esta discusión no existe o fue retirada.',
  COMMUNITY_NOT_FOUND: 'Esta comunidad no existe.',
  SAVE_DISCUSSION_ERROR: 'No se pudo publicar la discusión. Inténtalo de nuevo.',
  SAVE_COMMENT_ERROR: 'No se pudo publicar el comentario. Inténtalo de nuevo.',
  PROFILE_REQUIRED: 'Completa tu perfil antes de participar en la comunidad.',
  EMPTY_MEMBERS: 'Todavía no hay miembros con este subgénero. ¡Sé la primera persona!',
  EMPTY_DISCUSSIONS: 'Aún no hay discusiones. Abre la primera.',
  EMPTY_COMMENTS: 'Nadie ha comentado todavía.',
  SPOILER_HIDDEN: 'Este contenido se ocultó para proteger la experiencia de la obra.',
  TITLE_TOO_SHORT: 'El título debe tener al menos 3 caracteres.',
  BODY_REQUIRED: 'El contenido no puede estar vacío.',
} as const;
