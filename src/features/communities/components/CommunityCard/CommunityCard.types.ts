import type { Subgenre } from '@/shared/types/domain.types';

export interface CommunityCardProps {
  subgenre: Subgenre;
  interestName: string;
  href: string;
}
