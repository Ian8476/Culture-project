// Descubrimiento de miembros de una comunidad: perfiles cuyo map `subgenres`
// contiene el slug del subgénero (query con dot notation sobre el map).

import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { profileConverter } from '@/lib/firebase/converters';
import { AppError } from '@/shared/types/errors.types';
import type { Profile } from '@/shared/types/domain.types';
import {
  COMMUNITY_MESSAGES,
  MAX_MEMBERS_FETCHED,
  PROFILE_SUBGENRES_FIELD,
} from '../constants/communities.constants';

// Lista perfiles que marcaron el subgénero, ordenados por nombre en el cliente
// (orderBy en servidor exigiría un índice por cada subgénero).
export async function getMembersBySubgenre(subgenreSlug: string): Promise<Profile[]> {
  try {
    const membersQuery = query(
      collection(db, COLLECTIONS.PROFILES).withConverter(profileConverter),
      where(`${PROFILE_SUBGENRES_FIELD}.${subgenreSlug}`, '==', true),
      limit(MAX_MEMBERS_FETCHED),
    );
    const snapshot = await getDocs(membersQuery);
    return snapshot.docs
      .map((document) => document.data())
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  } catch {
    throw new AppError(COMMUNITY_MESSAGES.MEMBERS_ERROR);
  }
}

// Lee el perfil del usuario actual para firmar publicaciones con su displayName.
// Devuelve null si aún no completó el onboarding.
export async function getMemberProfile(uid: string): Promise<Profile | null> {
  try {
    const reference = doc(db, COLLECTIONS.PROFILES, uid).withConverter(profileConverter);
    const snapshot = await getDoc(reference);
    return snapshot.exists() ? snapshot.data() : null;
  } catch {
    throw new AppError(COMMUNITY_MESSAGES.MEMBERS_ERROR);
  }
}
