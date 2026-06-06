// CRUD del documento `profiles`. Lecturas vía converter (exponen `Profile` de
// dominio); escrituras usan serverTimestamp() directo para createdAt/updatedAt.

import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { profileConverter } from '@/lib/firebase/converters';
import { AppError } from '@/shared/types/errors.types';
import type { Profile } from '@/shared/types/domain.types';
import { PROFILE_DOC_FIELDS, PROFILE_MESSAGES } from '../constants/profile.constants';
import type { ProfileFormValues } from '../types/profile.types';

// Lee el perfil del usuario. Devuelve null si aún no existe (no es un error).
export async function getProfile(uid: string): Promise<Profile | null> {
  try {
    const reference = doc(db, COLLECTIONS.PROFILES, uid).withConverter(profileConverter);
    const snapshot = await getDoc(reference);
    return snapshot.exists() ? snapshot.data() : null;
  } catch {
    throw new AppError(PROFILE_MESSAGES.SAVE_ERROR);
  }
}

// Traduce la bio del formulario (string) al dominio (string | null).
function normalizeBio(bio: string): string | null {
  const trimmed = bio.trim();
  return trimmed.length > 0 ? trimmed : null;
}

// Campos comunes de escritura compartidos por create y update.
function toWriteFields(values: ProfileFormValues): Record<string, unknown> {
  return {
    [PROFILE_DOC_FIELDS.DISPLAY_NAME]: values.displayName.trim(),
    [PROFILE_DOC_FIELDS.BIO]: normalizeBio(values.bio),
    [PROFILE_DOC_FIELDS.INTERESTS]: values.interests,
    [PROFILE_DOC_FIELDS.SUBGENRES]: values.subgenres,
    [PROFILE_DOC_FIELDS.PERSPECTIVES]: values.perspectives,
    [PROFILE_DOC_FIELDS.UPDATED_AT]: serverTimestamp(),
  };
}

// Crea el perfil en el onboarding: marca completedAt y createdAt.
export async function createProfile(uid: string, values: ProfileFormValues): Promise<void> {
  try {
    const reference = doc(db, COLLECTIONS.PROFILES, uid);
    await setDoc(reference, {
      ...toWriteFields(values),
      [PROFILE_DOC_FIELDS.AVATAR_URL]: null,
      [PROFILE_DOC_FIELDS.COMPLETED_AT]: serverTimestamp(),
      [PROFILE_DOC_FIELDS.CREATED_AT]: serverTimestamp(),
    });
  } catch {
    throw new AppError(PROFILE_MESSAGES.SAVE_ERROR);
  }
}

// Actualiza un perfil existente sin tocar createdAt/completedAt.
export async function updateProfile(uid: string, values: ProfileFormValues): Promise<void> {
  try {
    const reference = doc(db, COLLECTIONS.PROFILES, uid);
    await updateDoc(reference, toWriteFields(values));
  } catch {
    throw new AppError(PROFILE_MESSAGES.SAVE_ERROR);
  }
}
