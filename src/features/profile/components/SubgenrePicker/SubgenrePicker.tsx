import { MultiSelect } from '@/shared/components';
import { MAX_SUBGENRES } from '@/shared/constants/validation.constants';
import type { SelectOption } from '@/shared/types/common.types';
import type { SubgenrePickerProps } from './SubgenrePicker.types';
import { PROFILE_LABELS, PROFILE_MESSAGES } from '../../constants/profile.constants';
import { PROFILE_EMPTY_STYLES } from '../profileForm.constants';

// Subgéneros disponibles, filtrados por los intereses seleccionados.
export function SubgenrePicker({
  subgenres,
  selectedInterestSlugs,
  selected,
  onToggle,
  disabled = false,
}: SubgenrePickerProps) {
  const available = subgenres.filter((subgenre) =>
    selectedInterestSlugs.includes(subgenre.interestSlug),
  );

  if (available.length === 0) {
    return <p className={PROFILE_EMPTY_STYLES}>{PROFILE_MESSAGES.EMPTY_SUBGENRES}</p>;
  }

  const options: SelectOption[] = available.map((subgenre) => ({
    value: subgenre.slug,
    label: subgenre.name,
  }));

  return (
    <MultiSelect
      options={options}
      selectedValues={Object.keys(selected)}
      onToggle={onToggle}
      maxSelected={MAX_SUBGENRES}
      disabled={disabled}
      ariaLabel={PROFILE_LABELS.SUBGENRES}
    />
  );
}
