import type { SpinnerProps } from './Spinner.types';
import {
  SPINNER_BASE_STYLES,
  SPINNER_SIZE_STYLES,
  SPINNER_DEFAULT_SIZE,
  SPINNER_DEFAULT_ARIA_LABEL,
} from './Spinner.constants';

export function Spinner({ size = SPINNER_DEFAULT_SIZE, ariaLabel }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={ariaLabel ?? SPINNER_DEFAULT_ARIA_LABEL}
      className={`${SPINNER_BASE_STYLES} ${SPINNER_SIZE_STYLES[size]}`}
    />
  );
}
