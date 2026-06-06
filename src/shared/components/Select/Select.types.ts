import type { SelectOption } from '@/shared/types/common.types';

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  hasError?: boolean;
  ariaLabel?: string;
}
