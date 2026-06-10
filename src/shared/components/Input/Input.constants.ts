import type { InputType } from './Input.types';

export const INPUT_DEFAULT_TYPE: InputType = 'text';

export const INPUT_BASE_STYLES =
  'w-full rounded-sm border bg-surface px-3.5 py-2.5 text-base text-ink transition-colors placeholder:text-ink-soft/60 focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60';

export const INPUT_BORDER_DEFAULT =
  'border-line focus-visible:border-accent focus-visible:ring-accent/40';
export const INPUT_BORDER_ERROR = 'border-alert focus-visible:ring-alert/40';
