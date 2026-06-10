// Umbrales para el formato relativo de fechas.
export const MS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MINUTES_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;
// A partir de una semana se muestra la fecha absoluta (más útil que "hace 12 días").
export const RELATIVE_LIMIT_DAYS = 7;

// Texto para diferencias menores a un minuto.
export const JUST_NOW_LABEL = 'hace un momento' as const;
