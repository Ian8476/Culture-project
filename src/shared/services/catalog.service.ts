// Lectura de catálogos (intereses, subgéneros, perspectivas) con caching en
// memoria: Firestore tarifica por lectura, así que el catálogo se lee una vez
// por sesión (sección 16 del Project-context). Vive en shared porque lo
// consumen varias features (profile, communities).

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { COLLECTIONS } from '@/lib/firebase/collections';
import {
  interestConverter,
  perspectiveConverter,
  subgenreConverter,
} from '@/lib/firebase/converters';
import { AppError } from '@/shared/types/errors.types';
import type { Interest, Perspective, Subgenre } from '@/shared/types/domain.types';
import { CATALOG_MESSAGES } from '../constants/catalog.constants';

let interestsCache: Interest[] | null = null;
let subgenresCache: Subgenre[] | null = null;
let perspectivesCache: Perspective[] | null = null;

function byName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

export async function getInterests(): Promise<Interest[]> {
  if (interestsCache !== null) return interestsCache;
  try {
    const snapshot = await getDocs(
      collection(db, COLLECTIONS.INTERESTS).withConverter(interestConverter),
    );
    interestsCache = snapshot.docs
      .map((document) => document.data())
      .filter((interest) => interest.active)
      .sort(byName);
    return interestsCache;
  } catch {
    throw new AppError(CATALOG_MESSAGES.LOAD_ERROR);
  }
}

export async function getSubgenres(): Promise<Subgenre[]> {
  if (subgenresCache !== null) return subgenresCache;
  try {
    const snapshot = await getDocs(
      collection(db, COLLECTIONS.SUBGENRES).withConverter(subgenreConverter),
    );
    subgenresCache = snapshot.docs
      .map((document) => document.data())
      .filter((subgenre) => subgenre.active)
      .sort(byName);
    return subgenresCache;
  } catch {
    throw new AppError(CATALOG_MESSAGES.LOAD_ERROR);
  }
}

export async function getPerspectives(): Promise<Perspective[]> {
  if (perspectivesCache !== null) return perspectivesCache;
  try {
    const snapshot = await getDocs(
      collection(db, COLLECTIONS.PERSPECTIVES).withConverter(perspectiveConverter),
    );
    perspectivesCache = snapshot.docs
      .map((document) => document.data())
      .filter((perspective) => perspective.active)
      .sort(byName);
    return perspectivesCache;
  } catch {
    throw new AppError(CATALOG_MESSAGES.LOAD_ERROR);
  }
}

// Limpia la cache (útil para tests y para forzar recarga tras un seed).
export function clearCatalogCache(): void {
  interestsCache = null;
  subgenresCache = null;
  perspectivesCache = null;
}
