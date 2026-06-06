import type { Subgenre } from '@/shared/types/domain.types';

export interface SubgenrePickerProps {
  subgenres: Subgenre[];
  selectedInterestSlugs: string[];
  selected: Record<string, true>;
  onToggle: (slug: string) => void;
  disabled?: boolean;
}
