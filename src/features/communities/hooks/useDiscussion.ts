'use client';

import { useEffect, useState } from 'react';
import { AppError, NotFoundError } from '@/shared/types/errors.types';
import type { Discussion } from '@/shared/types/domain.types';
import { getDiscussion } from '../services/discussion.service';
import { COMMUNITY_MESSAGES } from '../constants/communities.constants';

// Carga una discusión puntual. `notFound` distingue el 404 de otros errores.
export function useDiscussion(discussionId: string) {
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    async function load(): Promise<void> {
      try {
        const loaded = await getDiscussion(discussionId);
        if (active) setDiscussion(loaded);
      } catch (caught) {
        if (!active) return;
        if (caught instanceof NotFoundError) {
          setNotFound(true);
        } else {
          setError(
            caught instanceof AppError ? caught.message : COMMUNITY_MESSAGES.DISCUSSIONS_ERROR,
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [discussionId]);

  return { discussion, isLoading, error, notFound };
}
