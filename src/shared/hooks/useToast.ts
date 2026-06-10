'use client';

import { useContext } from 'react';
import { ToastContext } from '@/shared/context/toastContext';
import { TOAST_CONTEXT_ERROR } from '@/shared/constants/app.constants';
import type { ToastContextValue } from '@/shared/context/ToastProvider.types';

// Acceso a las notificaciones efímeras. Exige estar bajo ToastProvider.
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error(TOAST_CONTEXT_ERROR);
  }
  return context;
}
