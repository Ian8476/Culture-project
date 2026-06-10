'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES, NEXT_QUERY_PARAM, isInternalPath } from '@/shared/constants/routes.constants';
import { AppError } from '@/shared/types/errors.types';
import { login } from '../services/auth.service';
import { AUTH_DEFAULT_ERROR_MESSAGE } from '../constants/auth.constants';
import type { LoginPayload } from '../types/auth.types';

// Estado + side effect del login. En éxito vuelve a la ruta que pedía sesión
// (?next=, solo rutas internas) o a la vista de perfil.
export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resolveDestination(): string {
    const next = searchParams.get(NEXT_QUERY_PARAM);
    if (next !== null && isInternalPath(next)) return next;
    return ROUTES.PROFILE.ROOT;
  }

  async function submit(payload: LoginPayload): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      await login(payload);
      router.push(resolveDestination());
    } catch (caught) {
      setError(caught instanceof AppError ? caught.message : AUTH_DEFAULT_ERROR_MESSAGE);
      setIsLoading(false);
    }
  }

  return { submit, isLoading, error };
}
