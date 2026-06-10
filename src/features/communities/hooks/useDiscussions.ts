'use client';

import { useCallback, useEffect, useState } from 'react';
import { AppError } from '@/shared/types/errors.types';
import type { Discussion } from '@/shared/types/domain.types';
import { getDiscussionsBySubgenre } from '../services/discussion.service';
import { COMMUNITY_MESSAGES } from '../constants/communities.constants';

// Lista las discusiones de la comunidad. `refresh` recarga tras publicar.
export function useDiscussions(subgenreSlug: string) {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const loaded = await getDiscussionsBySubgenre(subgenreSlug);
      setDiscussions(loaded);
    } catch (caught) {
      setError(caught instanceof AppError ? caught.message : COMMUNITY_MESSAGES.DISCUSSIONS_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [subgenreSlug]);

  useEffect(() => {
    void load();
  }, [load]);

  return { discussions, isLoading, error, refresh: load };
}
