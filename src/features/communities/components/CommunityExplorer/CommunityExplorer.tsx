'use client';

import Link from 'next/link';
import { Spinner } from '@/shared/components';
import { useCatalog } from '@/shared/hooks/useCatalog';
import { communityRoute, ROUTES } from '@/shared/constants/routes.constants';
import type { Interest, Subgenre } from '@/shared/types/domain.types';
import { CommunityCard } from '../CommunityCard';
import {
  COMMUNITY_BUTTONS,
  COMMUNITY_MESSAGES,
  COMMUNITY_SUBTITLES,
  COMMUNITY_TITLES,
} from '../../constants/communities.constants';
import {
  COMMUNITY_CARD_GRID_STYLES,
  COMMUNITY_ERROR_STYLES,
  COMMUNITY_HEADER_STYLES,
  COMMUNITY_NAV_LINK_STYLES,
  COMMUNITY_NAV_STYLES,
  COMMUNITY_PAGE_WRAPPER_STYLES,
  COMMUNITY_SECTION_HEADING_STYLES,
  COMMUNITY_SECTION_STYLES,
  COMMUNITY_SUBTITLE_STYLES,
  COMMUNITY_TITLE_STYLES,
} from '../communityUi.constants';

// Agrupa los subgéneros del catálogo bajo su interés padre.
function groupByInterest(
  interests: Interest[],
  subgenres: Subgenre[],
): { interest: Interest; subgenres: Subgenre[] }[] {
  return interests
    .map((interest) => ({
      interest,
      subgenres: subgenres.filter((subgenre) => subgenre.interestSlug === interest.slug),
    }))
    .filter((group) => group.subgenres.length > 0);
}

// Componente raíz del explorador de comunidades (/communities).
export function CommunityExplorer() {
  const { interests, subgenres, isLoading, error } = useCatalog();

  if (isLoading) {
    return (
      <main className={COMMUNITY_PAGE_WRAPPER_STYLES}>
        <Spinner size="lg" ariaLabel={COMMUNITY_MESSAGES.LOADING} />
      </main>
    );
  }

  if (error !== null) {
    return (
      <main className={COMMUNITY_PAGE_WRAPPER_STYLES}>
        <p role="alert" className={COMMUNITY_ERROR_STYLES}>
          {error}
        </p>
      </main>
    );
  }

  const groups = groupByInterest(interests, subgenres);

  return (
    <main className={COMMUNITY_PAGE_WRAPPER_STYLES}>
      <nav className={COMMUNITY_NAV_STYLES}>
        <Link href={ROUTES.PROFILE.ROOT} className={COMMUNITY_NAV_LINK_STYLES}>
          {COMMUNITY_BUTTONS.GO_PROFILE}
        </Link>
      </nav>

      <header className={COMMUNITY_HEADER_STYLES}>
        <h1 className={COMMUNITY_TITLE_STYLES}>{COMMUNITY_TITLES.EXPLORER}</h1>
        <p className={COMMUNITY_SUBTITLE_STYLES}>{COMMUNITY_SUBTITLES.EXPLORER}</p>
      </header>

      {groups.map(({ interest, subgenres: interestSubgenres }) => (
        <section key={interest.slug} className={COMMUNITY_SECTION_STYLES}>
          <h2 className={COMMUNITY_SECTION_HEADING_STYLES}>{interest.name}</h2>
          <div className={COMMUNITY_CARD_GRID_STYLES}>
            {interestSubgenres.map((subgenre) => (
              <CommunityCard
                key={subgenre.slug}
                subgenre={subgenre}
                interestName={interest.name}
                href={communityRoute(subgenre.slug)}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
