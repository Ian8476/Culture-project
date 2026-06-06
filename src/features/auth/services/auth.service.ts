// Capa de data access de auth. Envuelve el Firebase Auth SDK y crea el
// documento `users` post-registro. Expone tipos de dominio / errores propios;
// nunca filtra tipos de Firebase hacia los hooks (R9).

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { auth, db } from '@/lib/firebase/client';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { AuthError } from '@/shared/types/errors.types';
import type { LoginPayload, PasswordResetPayload, RegisterPayload } from '../types/auth.types';
import {
  AUTH_DEFAULT_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGES,
  USER_DOC_FIELDS,
} from '../constants/auth.constants';

// Traduce cualquier error de Firebase a un `AuthError` con mensaje en español.
function toAuthError(error: unknown): AuthError {
  if (error instanceof FirebaseError) {
    return new AuthError(AUTH_ERROR_MESSAGES[error.code] ?? AUTH_DEFAULT_ERROR_MESSAGE);
  }
  return new AuthError(AUTH_DEFAULT_ERROR_MESSAGE);
}

// Crea el documento espejo en `users`. Usa serverTimestamp() para createdAt/updatedAt.
async function createUserDocument(uid: string, email: string): Promise<void> {
  await setDoc(doc(db, COLLECTIONS.USERS, uid), {
    [USER_DOC_FIELDS.EMAIL]: email,
    [USER_DOC_FIELDS.CREATED_AT]: serverTimestamp(),
    [USER_DOC_FIELDS.UPDATED_AT]: serverTimestamp(),
  });
}

// Registra un usuario, fija su displayName y crea su documento `users`.
// Devuelve el UID del usuario creado.
export async function register({ email, password, displayName }: RegisterPayload): Promise<string> {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName });
    await createUserDocument(credential.user.uid, email);
    return credential.user.uid;
  } catch (error) {
    throw toAuthError(error);
  }
}

// Inicia sesión con email y contraseña. Devuelve el UID autenticado.
export async function login({ email, password }: LoginPayload): Promise<string> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user.uid;
  } catch (error) {
    throw toAuthError(error);
  }
}

// Cierra la sesión actual.
export async function logout(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw toAuthError(error);
  }
}

// Envía el correo de recuperación de contraseña.
export async function requestPasswordReset({ email }: PasswordResetPayload): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw toAuthError(error);
  }
}
