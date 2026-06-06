// Contratos de la feature auth. Payloads de los formularios y forma de los
// errores por campo que consumen los componentes.

export interface RegisterPayload {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PasswordResetPayload {
  email: string;
}

// Mapa de errores por nombre de campo (clave = name del input).
export type AuthFieldErrors = Record<string, string>;
