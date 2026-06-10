'use client';

import { useCatalog } from '@/shared/hooks/useCatalog';
import type { CommunityInfo } from '../types/communities.types';

// Resuelve el subgénero de la URL contra el catálogo y le adjunta su interés
// padre. `community` es null mientras carga o si el slug no existe.
export function useCommunity(subgenreSlug: string) {
  const { interests, subgenres, isLoading, error } = useCatalog();

  const subgenre = subgenres.find((candidate) => candidate.slug === subgenreSlug) ?? null;
  const community: CommunityInfo | null =
    subgenre === null
      ? null
      : {
          subgenre,
          interest: interests.find((candidate) => candidate.slug === subgenre.interestSlug) ?? null,
        };

  const notFound = !isLoading && error === null && community === null;

  return { community, isLoading, error, notFound };
}
