import { DEFAULT_LOCALE } from '@/shared/constants/app.constants';
import {
  MS_PER_SECOND,
  SECONDS_PER_MINUTE,
  MINUTES_PER_HOUR,
  HOURS_PER_DAY,
  RELATIVE_LIMIT_DAYS,
  JUST_NOW_LABEL,
} from './dates.constants';

const dateTimeFormatter = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const relativeFormatter = new Intl.RelativeTimeFormat(DEFAULT_LOCALE, { numeric: 'auto' });

// Formato legible de fecha y hora para publicaciones y comentarios.
export function formatDateTime(date: Date): string {
  return dateTimeFormatter.format(date);
}

// Formato relativo amable ("hace 2 horas"). Pasada una semana, devuelve la
// fecha absoluta: leer "ayer" orienta; "hace 43 días" no.
export function formatRelativeTime(date: Date, now: Date = new Date()): string {
  const elapsedSeconds = Math.round((now.getTime() - date.getTime()) / MS_PER_SECOND);

  if (elapsedSeconds < SECONDS_PER_MINUTE) return JUST_NOW_LABEL;

  const elapsedMinutes = Math.floor(elapsedSeconds / SECONDS_PER_MINUTE);
  if (elapsedMinutes < MINUTES_PER_HOUR) return relativeFormatter.format(-elapsedMinutes, 'minute');

  const elapsedHours = Math.floor(elapsedMinutes / MINUTES_PER_HOUR);
  if (elapsedHours < HOURS_PER_DAY) return relativeFormatter.format(-elapsedHours, 'hour');

  const elapsedDays = Math.floor(elapsedHours / HOURS_PER_DAY);
  if (elapsedDays < RELATIVE_LIMIT_DAYS) return relativeFormatter.format(-elapsedDays, 'day');

  return formatDateTime(date);
}
