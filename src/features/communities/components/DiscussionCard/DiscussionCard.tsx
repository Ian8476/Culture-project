import Link from 'next/link';
import { formatDateTime } from '@/lib/utils/dates';
import { COMMUNITY_LABELS } from '../../constants/communities.constants';
import {
  DISCUSSION_CARD_STYLES,
  DISCUSSION_CARD_TITLE_STYLES,
  DISCUSSION_META_STYLES,
  SPOILER_BADGE_STYLES,
} from '../communityUi.constants';
import type { DiscussionCardProps } from './DiscussionCard.types';

// Card de una discusión en la lista de la comunidad. El cuerpo no se muestra
// aquí: solo título y metadatos, así una card nunca filtra un spoiler.
export function DiscussionCard({ discussion, href }: DiscussionCardProps) {
  return (
    <Link href={href} className={DISCUSSION_CARD_STYLES}>
      <span className={DISCUSSION_CARD_TITLE_STYLES}>{discussion.title}</span>
      <span className={DISCUSSION_META_STYLES}>
        <span>{discussion.authorName}</span>
        <span>·</span>
        <span>{formatDateTime(discussion.createdAt)}</span>
        {discussion.hasSpoilers && (
          <span className={SPOILER_BADGE_STYLES}>{COMMUNITY_LABELS.SPOILER_BADGE}</span>
        )}
      </span>
    </Link>
  );
}
