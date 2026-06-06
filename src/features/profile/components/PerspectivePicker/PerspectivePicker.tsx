import { MultiSelect, WeightSlider } from '@/shared/components';
import { MAX_PERSPECTIVES } from '@/shared/constants/validation.constants';
import type { SelectOption } from '@/shared/types/common.types';
import type { PerspectivePickerProps } from './PerspectivePicker.types';
import { PROFILE_LABELS } from '../../constants/profile.constants';
import {
  PROFILE_SECTION_STYLES,
  PROFILE_LEVEL_ROW_STYLES,
  PROFILE_LEVEL_NAME_STYLES,
} from '../profileForm.constants';

// Selección de perspectivas (hasta MAX_PERSPECTIVES) y su peso (1–5).
// El catálogo de perspectivas no tiene slug; se usa el id del documento como clave.
export function PerspectivePicker({
  perspectives,
  selected,
  onToggle,
  onWeightChange,
  disabled = false,
}: PerspectivePickerProps) {
  const options: SelectOption[] = perspectives.map((perspective) => ({
    value: perspective.id,
    label: perspective.name,
  }));

  return (
    <div className={PROFILE_SECTION_STYLES}>
      <MultiSelect
        options={options}
        selectedValues={Object.keys(selected)}
        onToggle={onToggle}
        maxSelected={MAX_PERSPECTIVES}
        disabled={disabled}
        ariaLabel={PROFILE_LABELS.PERSPECTIVES}
      />

      {perspectives
        .filter((perspective) => perspective.id in selected)
        .map((perspective) => (
          <div key={perspective.id} className={PROFILE_LEVEL_ROW_STYLES}>
            <span className={PROFILE_LEVEL_NAME_STYLES}>{perspective.name}</span>
            <WeightSlider
              value={selected[perspective.id].weight}
              onChange={(weight) => onWeightChange(perspective.id, weight)}
              disabled={disabled}
              ariaLabel={`${PROFILE_LABELS.PERSPECTIVE_WEIGHT}: ${perspective.name}`}
            />
          </div>
        ))}
    </div>
  );
}
