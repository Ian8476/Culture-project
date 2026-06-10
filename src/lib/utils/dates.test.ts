import { describe, it, expect } from 'vitest';
import { formatDateTime, formatRelativeTime } from './dates';
import { JUST_NOW_LABEL } from './dates.constants';

const NOW = new Date('2026-06-10T12:00:00Z');

describe('formatRelativeTime', () => {
  it('devuelve "hace un momento" bajo un minuto', () => {
    const date = new Date('2026-06-10T11:59:30Z');
    expect(formatRelativeTime(date, NOW)).toBe(JUST_NOW_LABEL);
  });

  it('formatea minutos', () => {
    const date = new Date('2026-06-10T11:45:00Z');
    expect(formatRelativeTime(date, NOW)).toMatch(/15/);
  });

  it('formatea horas', () => {
    const date = new Date('2026-06-10T09:00:00Z');
    expect(formatRelativeTime(date, NOW)).toMatch(/3/);
  });

  it('formatea días ("ayer" con numeric auto)', () => {
    const date = new Date('2026-06-09T11:00:00Z');
    expect(formatRelativeTime(date, NOW)).toBe('ayer');
  });

  it('pasada una semana devuelve la fecha absoluta', () => {
    const date = new Date('2026-05-20T12:00:00Z');
    expect(formatRelativeTime(date, NOW)).toBe(formatDateTime(date));
  });
});
