'use client';

import { useEffect, useState } from 'react';
import { AppError } from '@/shared/types/errors.types';
import type { Profile } from '@/shared/types/domain.types';
import { getMembersBySubgenre } from '../services/members.service';
import { COMMUNITY_MESSAGES } from '../constants/communities.constants';

// Carga los perfiles que comparten el subgénero de la comunidad.
export function useCommunityMembers(subgenreSlug: string) {
  const [members, setMembers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load(): Promise<void> {
      try {
        const loaded = await getMembersBySubgenre(subgenreSlug);
        if (active) setMembers(loaded);
      } catch (caught) {
        if (active) {
          setError(caught instanceof AppError ? caught.message : COMMUNITY_MESSAGES.MEMBERS_ERROR);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [subgenreSlug]);

  return { members, isLoading, error };
}
