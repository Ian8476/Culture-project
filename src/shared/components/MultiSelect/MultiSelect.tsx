import type { MultiSelectProps } from './MultiSelect.types';
import {
  MULTI_SELECT_WRAPPER_STYLES,
  MULTI_SELECT_CHIP_BASE,
  MULTI_SELECT_CHIP_SELECTED,
  MULTI_SELECT_CHIP_UNSELECTED,
} from './MultiSelect.constants';

export function MultiSelect({
  options,
  selectedValues,
  onToggle,
  maxSelected,
  disabled = false,
  ariaLabel,
}: MultiSelectProps) {
  const isLimitReached = maxSelected !== undefined && selectedValues.length >= maxSelected;

  return (
    <div className={MULTI_SELECT_WRAPPER_STYLES} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        const isDisabled =
          disabled || option.disabled === true || (isLimitReached && !isSelected);
        const chipStyle = isSelected ? MULTI_SELECT_CHIP_SELECTED : MULTI_SELECT_CHIP_UNSELECTED;

        return (
          <button
            key={option.value}
            type="button"
            role="checkbox"
            aria-checked={isSelected}
            disabled={isDisabled}
            onClick={() => onToggle(option.value)}
            className={`${MULTI_SELECT_CHIP_BASE} ${chipStyle}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
