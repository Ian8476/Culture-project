'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes.constants';
import { AppError } from '@/shared/types/errors.types';
import { register } from '../services/auth.service';
import { AUTH_DEFAULT_ERROR_MESSAGE } from '../constants/auth.constants';
import type { RegisterPayload } from '../types/auth.types';

// Estado + side effect del registro. En éxito redirige al onboarding del perfil.
export function useRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(payload: RegisterPayload): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      await register(payload);
      router.push(ROUTES.PROFILE.SETUP);
    } catch (caught) {
      setError(caught instanceof AppError ? caught.message : AUTH_DEFAULT_ERROR_MESSAGE);
      setIsLoading(false);
    }
  }

  return { submit, isLoading, error };
}
