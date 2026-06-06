import type { Interest, KnowledgeLevel, ProfileInterest } from '@/shared/types/domain.types';

export interface InterestPickerProps {
  interests: Interest[];
  selected: Record<string, ProfileInterest>;
  onToggle: (slug: string) => void;
  onLevelChange: (slug: string, level: KnowledgeLevel) => void;
  disabled?: boolean;
}
