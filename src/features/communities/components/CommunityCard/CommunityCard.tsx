import Link from 'next/link';
import {
  COMMUNITY_CARD_HINT_STYLES,
  COMMUNITY_CARD_NAME_STYLES,
  COMMUNITY_CARD_STYLES,
} from '../communityUi.constants';
import type { CommunityCardProps } from './CommunityCard.types';

// Card de un subgénero en el explorador de comunidades.
export function CommunityCard({ subgenre, interestName, href }: CommunityCardProps) {
  return (
    <Link href={href} className={COMMUNITY_CARD_STYLES}>
      <span className={COMMUNITY_CARD_NAME_STYLES}>{subgenre.name}</span>
      <span className={COMMUNITY_CARD_HINT_STYLES}>{interestName}</span>
    </Link>
  );
}
