import {
  MEMBER_BIO_STYLES,
  MEMBER_CARD_STYLES,
  MEMBER_NAME_STYLES,
} from '../communityUi.constants';
import type { MemberCardProps } from './MemberCard.types';

// Card compacta de un miembro de la comunidad.
export function MemberCard({ member }: MemberCardProps) {
  return (
    <span className={MEMBER_CARD_STYLES}>
      <span className={MEMBER_NAME_STYLES}>{member.displayName}</span>
      {member.bio !== null && <span className={MEMBER_BIO_STYLES}>{member.bio}</span>}
    </span>
  );
}
