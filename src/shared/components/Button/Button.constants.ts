import type { ButtonVariant, ButtonSize, ButtonType } from './Button.types';

export const BUTTON_BASE_STYLES =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60';

export const BUTTON_VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-paper hover:bg-accent',
  secondary: 'border border-line bg-surface text-ink hover:border-ink',
  danger: 'bg-alert text-paper hover:opacity-90',
  ghost: 'bg-transparent text-ink-soft hover:bg-surface-deep hover:text-ink',
};

export const BUTTON_SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-12 px-8 text-lg',
};

export const BUTTON_DEFAULT_VARIANT: ButtonVariant = 'primary';
export const BUTTON_DEFAULT_SIZE: ButtonSize = 'md';
export const BUTTON_DEFAULT_TYPE: ButtonType = 'button';
