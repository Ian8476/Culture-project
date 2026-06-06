import type { InputProps } from './Input.types';
import {
  INPUT_DEFAULT_TYPE,
  INPUT_BASE_STYLES,
  INPUT_BORDER_DEFAULT,
  INPUT_BORDER_ERROR,
} from './Input.constants';

export function Input({
  value,
  onChange,
  type = INPUT_DEFAULT_TYPE,
  placeholder,
  id,
  name,
  disabled = false,
  hasError = false,
  autoComplete,
  ariaLabel,
}: InputProps) {
  const borderStyle = hasError ? INPUT_BORDER_ERROR : INPUT_BORDER_DEFAULT;

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete={autoComplete}
      aria-label={ariaLabel}
      aria-invalid={hasError}
      className={`${INPUT_BASE_STYLES} ${borderStyle}`}
    />
  );
}
