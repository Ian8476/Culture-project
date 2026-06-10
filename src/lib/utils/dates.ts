import { DEFAULT_LOCALE } from '@/shared/constants/app.constants';

const dateTimeFormatter = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

// Formato legible de fecha y hora para publicaciones y comentarios.
export function formatDateTime(date: Date): string {
  return dateTimeFormatter.format(date);
}
