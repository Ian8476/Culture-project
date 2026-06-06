import type { FormFieldProps } from './FormField.types';
import {
  FORM_FIELD_WRAPPER_STYLES,
  FORM_FIELD_LABEL_STYLES,
  FORM_FIELD_ERROR_STYLES,
  FORM_FIELD_REQUIRED_MARK,
} from './FormField.constants';

export function FormField({ label, htmlFor, error, required = false, children }: FormFieldProps) {
  return (
    <div className={FORM_FIELD_WRAPPER_STYLES}>
      <label htmlFor={htmlFor} className={FORM_FIELD_LABEL_STYLES}>
        {label}
        {required && <span aria-hidden="true"> {FORM_FIELD_REQUIRED_MARK}</span>}
      </label>
      {children}
      {error !== undefined && (
        <span role="alert" className={FORM_FIELD_ERROR_STYLES}>
          {error}
        </span>
      )}
    </div>
  );
}
