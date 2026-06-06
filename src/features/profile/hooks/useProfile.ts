'use client';

import { useEffect, useState } from 'react';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import { AppError } from '@/shared/types/errors.types';
import type { Profile } from '@/shared/types/domain.types';
import { getProfile } from '../services/profile.service';
import { PROFILE_MESSAGES } from '../constants/profile.constants';

// Carga el perfil del usuario autenticado. `profile` es null si aún no existe.
export function useProfile() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load(): Promise<void> {
      if (user === null) {
        setIsLoading(false);
        return;
      }
      try {
        const loaded = await getProfile(user.uid);
        if (active) setProfile(loaded);
      } catch (caught) {
        if (active) {
          setError(caught instanceof AppError ? caught.message : PROFILE_MESSAGES.SAVE_ERROR);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [user]);

  return { profile, isLoading, error };
}
