// Toda cadena de lógica/config de la feature auth vive aquí (R1).

// Identificadores de campos (id + name de los inputs).
export const AUTH_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  DISPLAY_NAME: 'displayName',
} as const;

// Valores de autoComplete recomendados por la especificación de formularios.
export const AUTH_AUTOCOMPLETE = {
  EMAIL: 'email',
  NEW_PASSWORD: 'new-password',
  CURRENT_PASSWORD: 'current-password',
  NAME: 'name',
} as const;

// Labels y placeholders de presentación.
export const AUTH_LABELS = {
  EMAIL: 'Correo electrónico',
  PASSWORD: 'Contraseña',
  DISPLAY_NAME: 'Nombre para mostrar',
} as const;

export const AUTH_PLACEHOLDERS = {
  EMAIL: 'tu@correo.com',
  PASSWORD: '••••••••',
  DISPLAY_NAME: '¿Cómo quieres que te vean?',
} as const;

// Textos de botones.
export const AUTH_BUTTONS = {
  REGISTER: 'Crear cuenta',
  LOGIN: 'Iniciar sesión',
  SEND_RESET: 'Enviar enlace de recuperación',
} as const;

// Títulos y subtítulos de cada pantalla.
export const AUTH_TITLES = {
  REGISTER: 'Crea tu cuenta',
  LOGIN: 'Bienvenido de vuelta',
  FORGOT_PASSWORD: 'Recupera tu contraseña',
} as const;

export const AUTH_SUBTITLES = {
  REGISTER: 'Únete a la comunidad cultural.',
  LOGIN: 'Inicia sesión para continuar.',
  FORGOT_PASSWORD: 'Te enviaremos un enlace para restablecerla.',
} as const;

// Textos de enlaces de navegación entre pantallas de auth.
export const AUTH_LINKS = {
  TO_LOGIN_PROMPT: '¿Ya tienes cuenta?',
  TO_LOGIN_ACTION: 'Inicia sesión',
  TO_REGISTER_PROMPT: '¿No tienes cuenta?',
  TO_REGISTER_ACTION: 'Regístrate',
  TO_FORGOT_ACTION: '¿Olvidaste tu contraseña?',
} as const;

// Mensaje de éxito al enviar el correo de recuperación.
export const AUTH_RESET_SENT_MESSAGE =
  'Si el correo existe, te enviamos un enlace para restablecer tu contraseña.' as const;

// Códigos de error que devuelve Firebase Auth (provienen de `FirebaseError.code`).
export const FIREBASE_AUTH_ERROR_CODES = {
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  WEAK_PASSWORD: 'auth/weak-password',
  USER_DISABLED: 'auth/user-disabled',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  INVALID_CREDENTIAL: 'auth/invalid-credential',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  CONFIGURATION_NOT_FOUND: 'auth/configuration-not-found',
} as const;

// Mensajes de error en español, mapeados desde los códigos de Firebase.
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  [FIREBASE_AUTH_ERROR_CODES.EMAIL_ALREADY_IN_USE]: 'Ya existe una cuenta con este correo.',
  [FIREBASE_AUTH_ERROR_CODES.INVALID_EMAIL]: 'El correo electrónico no es válido.',
  [FIREBASE_AUTH_ERROR_CODES.WEAK_PASSWORD]: 'La contraseña es demasiado débil.',
  [FIREBASE_AUTH_ERROR_CODES.USER_DISABLED]: 'Esta cuenta está deshabilitada.',
  [FIREBASE_AUTH_ERROR_CODES.USER_NOT_FOUND]: 'Correo o contraseña incorrectos.',
  [FIREBASE_AUTH_ERROR_CODES.WRONG_PASSWORD]: 'Correo o contraseña incorrectos.',
  [FIREBASE_AUTH_ERROR_CODES.INVALID_CREDENTIAL]: 'Correo o contraseña incorrectos.',
  [FIREBASE_AUTH_ERROR_CODES.TOO_MANY_REQUESTS]:
    'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.',
  [FIREBASE_AUTH_ERROR_CODES.NETWORK_REQUEST_FAILED]:
    'Error de red. Revisa tu conexión e inténtalo de nuevo.',
  [FIREBASE_AUTH_ERROR_CODES.OPERATION_NOT_ALLOWED]:
    'El registro por correo no está habilitado. Actívalo en Firebase Console > Authentication > Sign-in method.',
  [FIREBASE_AUTH_ERROR_CODES.CONFIGURATION_NOT_FOUND]:
    'Falta configurar Authentication en Firebase Console (habilita Email/Password).',
};

// Mensaje por defecto cuando el código de error no está mapeado.
export const AUTH_DEFAULT_ERROR_MESSAGE =
  'Ocurrió un error inesperado. Inténtalo de nuevo.' as const;

// Nombres de campos del documento `users` en Firestore.
export const USER_DOC_FIELDS = {
  EMAIL: 'email',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
} as const;
