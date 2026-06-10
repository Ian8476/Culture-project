'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import { useToast } from '@/shared/hooks/useToast';
import { ROUTES } from '@/shared/constants/routes.constants';
import { AppError } from '@/shared/types/errors.types';
import { createProfile } from '../services/profile.service';
import { PROFILE_MESSAGES, PROFILE_TOASTS } from '../constants/profile.constants';
import type { ProfileFormValues } from '../types/profile.types';

// Side effect del onboarding: crea el perfil, confirma y redirige a la vista.
export function useProfileSetup() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(values: ProfileFormValues): Promise<void> {
    if (user === null) {
      setError(PROFILE_MESSAGES.AUTH_REQUIRED);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await createProfile(user.uid, values);
      showToast(PROFILE_TOASTS.CREATED);
      router.push(ROUTES.PROFILE.ROOT);
    } catch (caught) {
      setError(caught instanceof AppError ? caught.message : PROFILE_MESSAGES.SAVE_ERROR);
      setIsLoading(false);
    }
  }

  return { submit, isLoading, error };
}
