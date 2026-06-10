'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ToastContext } from './toastContext';
import type { Toast, ToastTone, ToastProviderProps } from './ToastProvider.types';
import {
  TOAST_DURATION_MS,
  TOAST_DEFAULT_TONE,
  TOAST_REGION_STYLES,
  TOAST_BASE_STYLES,
  TOAST_TONE_STYLES,
  TOAST_TONE_MARKS,
  TOAST_MARK_STYLES,
  TOAST_MESSAGE_STYLES,
  TOAST_DISMISS_LABEL,
  TOAST_DISMISS_STYLES,
} from './ToastProvider.constants';

// Notificaciones efímeras globales. Confirma acciones (guardar, publicar,
// cerrar sesión) sin interrumpir: aparecen abajo y se descartan solas.
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextIdRef = useRef(0);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismissToast = useCallback((id: number): void => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timersRef.current.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message: string, tone: ToastTone = TOAST_DEFAULT_TONE): void => {
      nextIdRef.current += 1;
      const id = nextIdRef.current;
      setToasts((current) => [...current, { id, message, tone }]);
      timersRef.current.set(
        id,
        setTimeout(() => dismissToast(id), TOAST_DURATION_MS),
      );
    },
    [dismissToast],
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" className={TOAST_REGION_STYLES}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`${TOAST_BASE_STYLES} ${TOAST_TONE_STYLES[toast.tone]}`}
          >
            <span aria-hidden="true" className={TOAST_MARK_STYLES}>
              {TOAST_TONE_MARKS[toast.tone]}
            </span>
            <span className={TOAST_MESSAGE_STYLES}>{toast.message}</span>
            <button
              type="button"
              aria-label={TOAST_DISMISS_LABEL}
              className={TOAST_DISMISS_STYLES}
              onClick={() => dismissToast(toast.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
