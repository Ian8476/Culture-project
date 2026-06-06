import type { SelectOption } from '@/shared/types/common.types';

export interface MultiSelectProps {
  options: SelectOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  maxSelected?: number;
  disabled?: boolean;
  ariaLabel?: string;
}
