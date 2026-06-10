'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, EmptyState, Spinner } from '@/shared/components';
import { discussionRoute, ROUTES } from '@/shared/constants/routes.constants';
import { useCommunity } from '../../hooks/useCommunity';
import { useCommunityMembers } from '../../hooks/useCommunityMembers';
import { useDiscussions } from '../../hooks/useDiscussions';
import { MemberCard } from '../MemberCard';
import { DiscussionCard } from '../DiscussionCard';
import { DiscussionComposer } from '../DiscussionComposer';
import {
  COMMUNITY_BUTTONS,
  COMMUNITY_MESSAGES,
  COMMUNITY_TITLES,
} from '../../constants/communities.constants';
import {
  COMMUNITY_ERROR_ROW_STYLES,
  COMMUNITY_ERROR_TEXT_STYLES,
  COMMUNITY_ERROR_STYLES,
  COMMUNITY_EYEBROW_STYLES,
  COMMUNITY_HEADER_STYLES,
  COMMUNITY_NAV_LINK_STYLES,
  COMMUNITY_NAV_STYLES,
  COMMUNITY_PAGE_WRAPPER_STYLES,
  COMMUNITY_SECTION_HEADING_STYLES,
  COMMUNITY_SECTION_STYLES,
  COMMUNITY_TITLE_STYLES,
  DISCUSSION_LIST_STYLES,
  MEMBER_LIST_STYLES,
} from '../communityUi.constants';
import type { CommunityDetailProps } from './CommunityDetail.types';

// Componente raíz de la comunidad de un subgénero (/communities/[subgenreSlug]):
// encabezado, miembros afines y discusiones con composer.
export function CommunityDetail({ subgenreSlug }: CommunityDetailProps) {
  const { community, isLoading, error, notFound } = useCommunity(subgenreSlug);
  const members = useCommunityMembers(subgenreSlug);
  const discussions = useDiscussions(subgenreSlug);
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  if (isLoading) {
    return (
      <main className={COMMUNITY_PAGE_WRAPPER_STYLES}>
        <Spinner size="lg" ariaLabel={COMMUNITY_MESSAGES.LOADING} />
      </main>
    );
  }

  if (error !== null || notFound || community === null) {
    return (
      <main className={COMMUNITY_PAGE_WRAPPER_STYLES}>
        <p role="alert" className={COMMUNITY_ERROR_STYLES}>
          {error ?? COMMUNITY_MESSAGES.COMMUNITY_NOT_FOUND}
        </p>
      </main>
    );
  }

  function handleDiscussionCreated(): void {
    setIsComposerOpen(false);
    void discussions.refresh();
  }

  return (
    <main className={COMMUNITY_PAGE_WRAPPER_STYLES}>
      <nav className={COMMUNITY_NAV_STYLES}>
        <Link href={ROUTES.COMMUNITIES.ROOT} className={COMMUNITY_NAV_LINK_STYLES}>
          {COMMUNITY_BUTTONS.BACK_TO_EXPLORER}
        </Link>
      </nav>

      <header className={COMMUNITY_HEADER_STYLES}>
        {community.interest !== null && (
          <p className={COMMUNITY_EYEBROW_STYLES}>{community.interest.name}</p>
        )}
        <h1 className={COMMUNITY_TITLE_STYLES}>{community.subgenre.name}</h1>
      </header>

      <section className={COMMUNITY_SECTION_STYLES}>
        <h2 className={COMMUNITY_SECTION_HEADING_STYLES}>{COMMUNITY_TITLES.MEMBERS}</h2>
        {members.error !== null && (
          <div role="alert" className={COMMUNITY_ERROR_ROW_STYLES}>
            <p className={COMMUNITY_ERROR_TEXT_STYLES}>{members.error}</p>
            <Button
              label={COMMUNITY_BUTTONS.RETRY}
              variant="secondary"
              size="sm"
              onClick={() => void members.refresh()}
            />
          </div>
        )}
        {members.isLoading ? (
          <Spinner size="sm" ariaLabel={COMMUNITY_MESSAGES.LOADING} />
        ) : members.error === null && members.members.length === 0 ? (
          <EmptyState
            title={COMMUNITY_MESSAGES.EMPTY_MEMBERS}
            hint={COMMUNITY_MESSAGES.EMPTY_MEMBERS_HINT}
          />
        ) : (
          <div className={MEMBER_LIST_STYLES}>
            {members.members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </section>

      <section className={COMMUNITY_SECTION_STYLES}>
        <h2 className={COMMUNITY_SECTION_HEADING_STYLES}>{COMMUNITY_TITLES.DISCUSSIONS}</h2>

        {isComposerOpen ? (
          <DiscussionComposer
            subgenreSlug={community.subgenre.slug}
            interestSlug={community.subgenre.interestSlug}
            onCreated={handleDiscussionCreated}
            onCancel={() => setIsComposerOpen(false)}
          />
        ) : (
          <div>
            <Button
              label={COMMUNITY_BUTTONS.OPEN_COMPOSER}
              onClick={() => setIsComposerOpen(true)}
            />
          </div>
        )}

        {discussions.error !== null && (
          <div role="alert" className={COMMUNITY_ERROR_ROW_STYLES}>
            <p className={COMMUNITY_ERROR_TEXT_STYLES}>{discussions.error}</p>
            <Button
              label={COMMUNITY_BUTTONS.RETRY}
              variant="secondary"
              size="sm"
              onClick={() => void discussions.refresh()}
            />
          </div>
        )}
        {discussions.isLoading ? (
          <Spinner size="sm" ariaLabel={COMMUNITY_MESSAGES.LOADING} />
        ) : discussions.error === null && discussions.discussions.length === 0 ? (
          <EmptyState
            title={COMMUNITY_MESSAGES.EMPTY_DISCUSSIONS}
            hint={COMMUNITY_MESSAGES.EMPTY_DISCUSSIONS_HINT}
          />
        ) : (
          <div className={DISCUSSION_LIST_STYLES}>
            {discussions.discussions.map((discussion) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                href={discussionRoute(subgenreSlug, discussion.id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
