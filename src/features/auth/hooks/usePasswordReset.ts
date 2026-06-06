'use client';

import { useState } from 'react';
import { AppError } from '@/shared/types/errors.types';
import { requestPasswordReset } from '../services/auth.service';
import { AUTH_DEFAULT_ERROR_MESSAGE } from '../constants/auth.constants';
import type { PasswordResetPayload } from '../types/auth.types';

// Estado + side effect de la recuperación de contraseña. No redirige: expone
// `isSent` para que el componente muestre el mensaje de confirmación.
export function usePasswordReset() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  async function submit(payload: PasswordResetPayload): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      await requestPasswordReset(payload);
      setIsSent(true);
    } catch (caught) {
      setError(caught instanceof AppError ? caught.message : AUTH_DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }

  return { submit, isLoading, error, isSent };
}
