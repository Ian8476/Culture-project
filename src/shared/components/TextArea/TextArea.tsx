import type { TextAreaProps } from './TextArea.types';
import {
  TEXT_AREA_DEFAULT_ROWS,
  TEXT_AREA_BASE_STYLES,
  TEXT_AREA_BORDER_DEFAULT,
  TEXT_AREA_BORDER_ERROR,
} from './TextArea.constants';

export function TextArea({
  value,
  onChange,
  placeholder,
  id,
  name,
  rows = TEXT_AREA_DEFAULT_ROWS,
  disabled = false,
  hasError = false,
  maxLength,
  ariaLabel,
}: TextAreaProps) {
  const borderStyle = hasError ? TEXT_AREA_BORDER_ERROR : TEXT_AREA_BORDER_DEFAULT;

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      maxLength={maxLength}
      aria-label={ariaLabel}
      aria-invalid={hasError}
      className={`${TEXT_AREA_BASE_STYLES} ${borderStyle}`}
    />
  );
}
