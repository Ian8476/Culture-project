import type { ToastTone } from './ToastProvider.types';

// Tiempo que un toast permanece visible antes de auto-descartarse.
export const TOAST_DURATION_MS = 4500;

export const TOAST_DEFAULT_TONE: ToastTone = 'success';

// El listado vive por encima del grano de papel global (z-90 en globals.css).
export const TOAST_REGION_STYLES =
  'pointer-events-none fixed bottom-6 left-1/2 z-[100] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col items-stretch gap-2' as const;

export const TOAST_BASE_STYLES =
  'reveal pointer-events-auto flex w-full items-start gap-3 rounded-sm border-l-4 bg-ink px-4 py-3 text-left text-sm leading-snug text-paper shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]' as const;

export const TOAST_TONE_STYLES: Record<ToastTone, string> = {
  success: 'border-l-okay',
  error: 'border-l-alert',
  info: 'border-l-accent',
};

// Marca de tono decorativa al inicio del mensaje.
export const TOAST_TONE_MARKS: Record<ToastTone, string> = {
  success: '✓',
  error: '✕',
  info: '✦',
};

export const TOAST_MARK_STYLES = 'mt-0.5 font-display text-base leading-none' as const;
export const TOAST_MESSAGE_STYLES = 'flex-1' as const;
export const TOAST_DISMISS_LABEL = 'Descartar notificación' as const;
export const TOAST_DISMISS_STYLES =
  'shrink-0 rounded-full px-1.5 text-paper/60 transition-colors hover:text-paper' as const;
