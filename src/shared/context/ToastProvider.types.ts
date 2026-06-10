import type { ReactNode } from 'react';

export type ToastTone = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

export interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
}
