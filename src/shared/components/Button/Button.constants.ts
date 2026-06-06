import type { ButtonVariant, ButtonSize, ButtonType } from './Button.types';

export const BUTTON_BASE_STYLES =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

export const BUTTON_VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500',
  secondary:
    'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  ghost:
    'bg-transparent text-zinc-700 hover:bg-zinc-100 focus-visible:ring-zinc-400 dark:text-zinc-300 dark:hover:bg-zinc-800',
};

export const BUTTON_SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-12 px-6 text-lg',
};

export const BUTTON_DEFAULT_VARIANT: ButtonVariant = 'primary';
export const BUTTON_DEFAULT_SIZE: ButtonSize = 'md';
export const BUTTON_DEFAULT_TYPE: ButtonType = 'button';
