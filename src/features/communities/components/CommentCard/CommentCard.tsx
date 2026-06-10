import { formatDateTime, formatRelativeTime } from '@/lib/utils/dates';
import { COMMUNITY_LABELS } from '../../constants/communities.constants';
import { SpoilerContent } from '../SpoilerContent';
import {
  COMMENT_CARD_STYLES,
  DISCUSSION_BODY_STYLES,
  DISCUSSION_META_STYLES,
  SPOILER_BADGE_STYLES,
} from '../communityUi.constants';
import type { CommentCardProps } from './CommentCard.types';

// Comentario individual: el cuerpo queda cubierto si está marcado con spoilers.
export function CommentCard({ comment }: CommentCardProps) {
  return (
    <article className={COMMENT_CARD_STYLES}>
      <header className={DISCUSSION_META_STYLES}>
        <span>{comment.authorName}</span>
        <span>·</span>
        <time dateTime={comment.createdAt.toISOString()} title={formatDateTime(comment.createdAt)}>
          {formatRelativeTime(comment.createdAt)}
        </time>
        {comment.hasSpoilers && (
          <span className={SPOILER_BADGE_STYLES}>{COMMUNITY_LABELS.SPOILER_BADGE}</span>
        )}
      </header>
      <SpoilerContent hasSpoilers={comment.hasSpoilers}>
        <p className={DISCUSSION_BODY_STYLES}>{comment.body}</p>
      </SpoilerContent>
    </article>
  );
}
