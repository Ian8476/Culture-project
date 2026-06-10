'use client';

import { useState } from 'react';
import type { InputProps } from './Input.types';
import {
  INPUT_DEFAULT_TYPE,
  INPUT_BASE_STYLES,
  INPUT_BORDER_DEFAULT,
  INPUT_BORDER_ERROR,
  INPUT_PASSWORD_TYPE,
  INPUT_REVEALED_TYPE,
  INPUT_PASSWORD_WRAPPER_STYLES,
  INPUT_PASSWORD_FIELD_PADDING,
  INPUT_TOGGLE_STYLES,
  INPUT_SHOW_PASSWORD_LABEL,
  INPUT_HIDE_PASSWORD_LABEL,
} from './Input.constants';

// Ícono de ojo (mostrar contraseña). Presentacional, sin dependencia externa.
function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Ícono de ojo tachado (ocultar contraseña).
function EyeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3 3.9" />
      <path d="M6.1 6.1A17 17 0 0 0 2 12s3.5 7 10 7a10.7 10.7 0 0 0 4-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

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
  const [isRevealed, setIsRevealed] = useState(false);
  const isPassword = type === INPUT_PASSWORD_TYPE;
  const resolvedType = isPassword && isRevealed ? INPUT_REVEALED_TYPE : type;

  const borderStyle = hasError ? INPUT_BORDER_ERROR : INPUT_BORDER_DEFAULT;
  const paddingStyle = isPassword ? INPUT_PASSWORD_FIELD_PADDING : '';

  const field = (
    <input
      id={id}
      name={name}
      type={resolvedType}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete={autoComplete}
      aria-label={ariaLabel}
      aria-invalid={hasError}
      className={`${INPUT_BASE_STYLES} ${borderStyle} ${paddingStyle}`}
    />
  );

  if (!isPassword) return field;

  return (
    <div className={INPUT_PASSWORD_WRAPPER_STYLES}>
      {field}
      <button
        type="button"
        disabled={disabled}
        aria-label={isRevealed ? INPUT_HIDE_PASSWORD_LABEL : INPUT_SHOW_PASSWORD_LABEL}
        aria-pressed={isRevealed}
        className={INPUT_TOGGLE_STYLES}
        onClick={() => setIsRevealed((current) => !current)}
      >
        {isRevealed ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
