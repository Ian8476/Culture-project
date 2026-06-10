import type { CheckboxProps } from './Checkbox.types';
import { CHECKBOX_INPUT_STYLES, CHECKBOX_WRAPPER_STYLES } from './Checkbox.constants';

export function Checkbox({ label, checked, onChange, id, name, disabled = false }: CheckboxProps) {
  return (
    <label className={CHECKBOX_WRAPPER_STYLES}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        disabled={disabled}
        className={CHECKBOX_INPUT_STYLES}
      />
      {label}
    </label>
  );
}
