'use client';

import Link from 'next/link';
import { Spinner } from '@/shared/components';
import { communityRoute } from '@/shared/constants/routes.constants';
import { formatDateTime } from '@/lib/utils/dates';
import { useDiscussion } from '../../hooks/useDiscussion';
import { useComments } from '../../hooks/useComments';
import { SpoilerContent } from '../SpoilerContent';
import { CommentCard } from '../CommentCard';
import { CommentComposer } from '../CommentComposer';
import {
  COMMUNITY_BUTTONS,
  COMMUNITY_LABELS,
  COMMUNITY_MESSAGES,
  COMMUNITY_TITLES,
} from '../../constants/communities.constants';
import {
  COMMENT_LIST_STYLES,
  COMMUNITY_EMPTY_STYLES,
  COMMUNITY_ERROR_STYLES,
  COMMUNITY_HEADER_STYLES,
  COMMUNITY_NAV_LINK_STYLES,
  COMMUNITY_NAV_STYLES,
  COMMUNITY_PAGE_WRAPPER_STYLES,
  COMMUNITY_SECTION_HEADING_STYLES,
  COMMUNITY_SECTION_STYLES,
  COMMUNITY_TITLE_STYLES,
  DISCUSSION_BODY_STYLES,
  DISCUSSION_META_STYLES,
  SPOILER_BADGE_STYLES,
} from '../communityUi.constants';
import type { DiscussionDetailProps } from './DiscussionDetail.types';

// Componente raíz del detalle de una discusión
// (/communities/[subgenreSlug]/[discussionId]): cuerpo protegido contra
// spoilers, comentarios y composer.
export function DiscussionDetail({ subgenreSlug, discussionId }: DiscussionDetailProps) {
  const { discussion, isLoading, error, notFound } = useDiscussion(discussionId);
  const comments = useComments(discussionId);

  if (isLoading) {
    return (
      <main className={COMMUNITY_PAGE_WRAPPER_STYLES}>
        <Spinner size="lg" ariaLabel={COMMUNITY_MESSAGES.LOADING} />
      </main>
    );
  }

  if (error !== null || notFound || discussion === null) {
    return (
      <main className={COMMUNITY_PAGE_WRAPPER_STYLES}>
        <p role="alert" className={COMMUNITY_ERROR_STYLES}>
          {error ?? COMMUNITY_MESSAGES.DISCUSSION_NOT_FOUND}
        </p>
      </main>
    );
  }

  return (
    <main className={COMMUNITY_PAGE_WRAPPER_STYLES}>
      <nav className={COMMUNITY_NAV_STYLES}>
        <Link href={communityRoute(subgenreSlug)} className={COMMUNITY_NAV_LINK_STYLES}>
          {COMMUNITY_BUTTONS.BACK_TO_COMMUNITY}
        </Link>
      </nav>

      <header className={COMMUNITY_HEADER_STYLES}>
        <h1 className={COMMUNITY_TITLE_STYLES}>{discussion.title}</h1>
        <p className={DISCUSSION_META_STYLES}>
          <span>{discussion.authorName}</span>
          <span>·</span>
          <span>{formatDateTime(discussion.createdAt)}</span>
          {discussion.hasSpoilers && (
            <span className={SPOILER_BADGE_STYLES}>{COMMUNITY_LABELS.SPOILER_BADGE}</span>
          )}
        </p>
      </header>

      <section className={COMMUNITY_SECTION_STYLES}>
        <SpoilerContent hasSpoilers={discussion.hasSpoilers}>
          <p className={DISCUSSION_BODY_STYLES}>{discussion.body}</p>
        </SpoilerContent>
      </section>

      <section className={COMMUNITY_SECTION_STYLES}>
        <h2 className={COMMUNITY_SECTION_HEADING_STYLES}>{COMMUNITY_TITLES.COMMENTS}</h2>

        {comments.error !== null && (
          <p role="alert" className={COMMUNITY_ERROR_STYLES}>
            {comments.error}
          </p>
        )}
        {comments.isLoading ? (
          <Spinner size="sm" ariaLabel={COMMUNITY_MESSAGES.LOADING} />
        ) : comments.comments.length === 0 ? (
          <p className={COMMUNITY_EMPTY_STYLES}>{COMMUNITY_MESSAGES.EMPTY_COMMENTS}</p>
        ) : (
          <div className={COMMENT_LIST_STYLES}>
            {comments.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}

        <CommentComposer discussionId={discussionId} onCreated={() => void comments.refresh()} />
      </section>
    </main>
  );
}
