import { Spinner } from '../Spinner';
import type { ButtonProps } from './Button.types';
import {
  BUTTON_BASE_STYLES,
  BUTTON_VARIANT_STYLES,
  BUTTON_SIZE_STYLES,
  BUTTON_DEFAULT_VARIANT,
  BUTTON_DEFAULT_SIZE,
  BUTTON_DEFAULT_TYPE,
} from './Button.constants';

export function Button({
  label,
  onClick,
  variant = BUTTON_DEFAULT_VARIANT,
  size = BUTTON_DEFAULT_SIZE,
  disabled = false,
  isLoading = false,
  type = BUTTON_DEFAULT_TYPE,
  fullWidth = false,
  ariaLabel,
}: ButtonProps) {
  const widthStyle = fullWidth ? 'w-full' : '';
  const className = `${BUTTON_BASE_STYLES} ${BUTTON_VARIANT_STYLES[variant]} ${BUTTON_SIZE_STYLES[size]} ${widthStyle}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel ?? label}
      aria-busy={isLoading}
      className={className}
    >
      {isLoading ? <Spinner size="sm" /> : label}
    </button>
  );
}
