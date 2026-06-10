'use client';

import { useCallback, useEffect, useState } from 'react';
import { AppError } from '@/shared/types/errors.types';
import type { Profile } from '@/shared/types/domain.types';
import { getMembersBySubgenre } from '../services/members.service';
import { COMMUNITY_MESSAGES } from '../constants/communities.constants';

// Carga los perfiles que comparten el subgénero. `refresh` permite reintentar.
export function useCommunityMembers(subgenreSlug: string) {
  const [members, setMembers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const loaded = await getMembersBySubgenre(subgenreSlug);
      setMembers(loaded);
    } catch (caught) {
      setError(caught instanceof AppError ? caught.message : COMMUNITY_MESSAGES.MEMBERS_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [subgenreSlug]);

  useEffect(() => {
    void load();
  }, [load]);

  return { members, isLoading, error, refresh: load };
}
