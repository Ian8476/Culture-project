import { MultiSelect, Select } from '@/shared/components';
import { MAX_INTERESTS } from '@/shared/constants/validation.constants';
import type { KnowledgeLevel } from '@/shared/types/domain.types';
import type { SelectOption } from '@/shared/types/common.types';
import type { InterestPickerProps } from './InterestPicker.types';
import { KNOWLEDGE_LEVEL_OPTIONS, PROFILE_LABELS } from '../../constants/profile.constants';
import {
  PROFILE_SECTION_STYLES,
  PROFILE_LEVEL_ROW_STYLES,
  PROFILE_LEVEL_NAME_STYLES,
} from '../profileForm.constants';

// Selección de intereses (hasta MAX_INTERESTS) y su nivel de conocimiento.
export function InterestPicker({
  interests,
  selected,
  onToggle,
  onLevelChange,
  disabled = false,
}: InterestPickerProps) {
  const options: SelectOption[] = interests.map((interest) => ({
    value: interest.slug,
    label: interest.name,
  }));
  const selectedSlugs = Object.keys(selected);

  return (
    <div className={PROFILE_SECTION_STYLES}>
      <MultiSelect
        options={options}
        selectedValues={selectedSlugs}
        onToggle={onToggle}
        maxSelected={MAX_INTERESTS}
        disabled={disabled}
        ariaLabel={PROFILE_LABELS.INTERESTS}
      />

      {interests
        .filter((interest) => interest.slug in selected)
        .map((interest) => (
          <div key={interest.slug} className={PROFILE_LEVEL_ROW_STYLES}>
            <span className={PROFILE_LEVEL_NAME_STYLES}>{interest.name}</span>
            <Select
              options={KNOWLEDGE_LEVEL_OPTIONS}
              value={selected[interest.slug].knowledgeLevel}
              onChange={(level) => onLevelChange(interest.slug, level as KnowledgeLevel)}
              disabled={disabled}
              ariaLabel={`${PROFILE_LABELS.KNOWLEDGE_LEVEL}: ${interest.name}`}
            />
          </div>
        ))}
    </div>
  );
}
