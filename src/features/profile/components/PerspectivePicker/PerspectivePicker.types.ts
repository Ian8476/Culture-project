import type { Perspective, ProfilePerspective } from '@/shared/types/domain.types';

export interface PerspectivePickerProps {
  perspectives: Perspective[];
  selected: Record<string, ProfilePerspective>;
  onToggle: (slug: string) => void;
  onWeightChange: (slug: string, weight: number) => void;
  disabled?: boolean;
}
