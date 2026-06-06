import type { SelectProps } from './Select.types';
import {
  SELECT_BASE_STYLES,
  SELECT_BORDER_DEFAULT,
  SELECT_BORDER_ERROR,
  SELECT_PLACEHOLDER_VALUE,
} from './Select.constants';

export function Select({
  value,
  onChange,
  options,
  placeholder,
  id,
  name,
  disabled = false,
  hasError = false,
  ariaLabel,
}: SelectProps) {
  const borderStyle = hasError ? SELECT_BORDER_ERROR : SELECT_BORDER_DEFAULT;

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-invalid={hasError}
      className={`${SELECT_BASE_STYLES} ${borderStyle}`}
    >
      {placeholder !== undefined && (
        <option value={SELECT_PLACEHOLDER_VALUE} disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
