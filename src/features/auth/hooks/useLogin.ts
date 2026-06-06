'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes.constants';
import { AppError } from '@/shared/types/errors.types';
import { login } from '../services/auth.service';
import { AUTH_DEFAULT_ERROR_MESSAGE } from '../constants/auth.constants';
import type { LoginPayload } from '../types/auth.types';

// Estado + side effect del login. En éxito redirige a la vista de perfil.
export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(payload: LoginPayload): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      await login(payload);
      router.push(ROUTES.PROFILE.ROOT);
    } catch (caught) {
      setError(caught instanceof AppError ? caught.message : AUTH_DEFAULT_ERROR_MESSAGE);
      setIsLoading(false);
    }
  }

  return { submit, isLoading, error };
}
