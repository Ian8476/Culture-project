import type { InputType } from './Input.types';

export const INPUT_DEFAULT_TYPE: InputType = 'text';

export const INPUT_BASE_STYLES =
  'w-full rounded-sm border bg-surface px-3.5 py-2.5 text-base text-ink transition-colors placeholder:text-ink-soft/60 focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60';

export const INPUT_BORDER_DEFAULT =
  'border-line focus-visible:border-accent focus-visible:ring-accent/40';
export const INPUT_BORDER_ERROR = 'border-alert focus-visible:ring-alert/40';

// Toggle de visibilidad para inputs de contraseña.
export const INPUT_PASSWORD_TYPE: InputType = 'password';
export const INPUT_REVEALED_TYPE: InputType = 'text';
export const INPUT_PASSWORD_WRAPPER_STYLES = 'relative' as const;
export const INPUT_PASSWORD_FIELD_PADDING = 'pr-11' as const;
export const INPUT_TOGGLE_STYLES =
  'absolute inset-y-0 right-0 flex w-10 items-center justify-center text-ink-soft transition-colors hover:text-ink focus:outline-none focus-visible:text-accent disabled:cursor-not-allowed disabled:opacity-60' as const;
export const INPUT_SHOW_PASSWORD_LABEL = 'Mostrar contraseña' as const;
export const INPUT_HIDE_PASSWORD_LABEL = 'Ocultar contraseña' as const;
