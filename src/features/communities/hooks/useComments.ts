'use client';

import { useCallback, useEffect, useState } from 'react';
import { AppError } from '@/shared/types/errors.types';
import type { DiscussionComment } from '@/shared/types/domain.types';
import { getComments } from '../services/discussion.service';
import { COMMUNITY_MESSAGES } from '../constants/communities.constants';

// Lista los comentarios de una discusión. `refresh` recarga tras comentar.
export function useComments(discussionId: string) {
  const [comments, setComments] = useState<DiscussionComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const loaded = await getComments(discussionId);
      setComments(loaded);
    } catch (caught) {
      setError(caught instanceof AppError ? caught.message : COMMUNITY_MESSAGES.DISCUSSIONS_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [discussionId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { comments, isLoading, error, refresh: load };
}
