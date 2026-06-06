import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FirebaseError } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { AuthError } from '@/shared/types/errors.types';
import {
  AUTH_ERROR_MESSAGES,
  AUTH_DEFAULT_ERROR_MESSAGE,
  FIREBASE_AUTH_ERROR_CODES,
} from '../constants/auth.constants';
import { login, logout, register, requestPasswordReset } from './auth.service';

vi.mock('@/lib/firebase/client', () => ({ auth: {}, db: {} }));

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  updateProfile: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({})),
  setDoc: vi.fn(),
  serverTimestamp: vi.fn(() => 'SERVER_TS'),
}));

const credential = { user: { uid: 'uid-123' } };

beforeEach(() => {
  vi.clearAllMocks();
});

describe('register', () => {
  it('crea el usuario, fija displayName, escribe el doc users y devuelve el uid', async () => {
    vi.mocked(firebaseAuth.createUserWithEmailAndPassword).mockResolvedValue(
      credential as never,
    );
    vi.mocked(firebaseAuth.updateProfile).mockResolvedValue(undefined);
    vi.mocked(firestore.setDoc).mockResolvedValue(undefined as never);

    const uid = await register({
      email: 'ana@example.com',
      password: 'segura123',
      displayName: 'Ana',
    });

    expect(uid).toBe('uid-123');
    expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      {},
      'ana@example.com',
      'segura123',
    );
    expect(firebaseAuth.updateProfile).toHaveBeenCalledWith(credential.user, {
      displayName: 'Ana',
    });
    expect(firestore.setDoc).toHaveBeenCalledTimes(1);
  });

  it('traduce un error de Firebase a AuthError con mensaje mapeado', async () => {
    vi.mocked(firebaseAuth.createUserWithEmailAndPassword).mockRejectedValue(
      new FirebaseError(FIREBASE_AUTH_ERROR_CODES.EMAIL_ALREADY_IN_USE, 'in use'),
    );

    await expect(
      register({ email: 'a@b.com', password: 'segura123', displayName: 'Ana' }),
    ).rejects.toThrowError(
      new AuthError(AUTH_ERROR_MESSAGES[FIREBASE_AUTH_ERROR_CODES.EMAIL_ALREADY_IN_USE]),
    );
  });

  it('usa el mensaje por defecto ante un error desconocido', async () => {
    vi.mocked(firebaseAuth.createUserWithEmailAndPassword).mockRejectedValue(new Error('boom'));

    await expect(
      register({ email: 'a@b.com', password: 'segura123', displayName: 'Ana' }),
    ).rejects.toThrowError(new AuthError(AUTH_DEFAULT_ERROR_MESSAGE));
  });
});

describe('login', () => {
  it('devuelve el uid autenticado', async () => {
    vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockResolvedValue(credential as never);

    const uid = await login({ email: 'ana@example.com', password: 'segura123' });

    expect(uid).toBe('uid-123');
    expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      {},
      'ana@example.com',
      'segura123',
    );
  });

  it('mapea credenciales inválidas', async () => {
    vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockRejectedValue(
      new FirebaseError(FIREBASE_AUTH_ERROR_CODES.INVALID_CREDENTIAL, 'invalid'),
    );

    await expect(login({ email: 'a@b.com', password: 'x' })).rejects.toThrowError(
      new AuthError(AUTH_ERROR_MESSAGES[FIREBASE_AUTH_ERROR_CODES.INVALID_CREDENTIAL]),
    );
  });
});

describe('logout', () => {
  it('llama a signOut', async () => {
    vi.mocked(firebaseAuth.signOut).mockResolvedValue(undefined);
    await logout();
    expect(firebaseAuth.signOut).toHaveBeenCalledTimes(1);
  });
});

describe('requestPasswordReset', () => {
  it('envía el correo de recuperación', async () => {
    vi.mocked(firebaseAuth.sendPasswordResetEmail).mockResolvedValue(undefined);
    await requestPasswordReset({ email: 'ana@example.com' });
    expect(firebaseAuth.sendPasswordResetEmail).toHaveBeenCalledWith({}, 'ana@example.com');
  });
});
