'use client';

import { createContext } from 'react';
import type { ToastContextValue } from './ToastProvider.types';

// Contexto de notificaciones efímeras. Se consume vía useToast.
export const ToastContext = createContext<ToastContextValue | undefined>(undefined);
