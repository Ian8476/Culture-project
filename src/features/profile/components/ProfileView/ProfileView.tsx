'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Spinner } from '@/shared/components';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { KnowledgeLevel } from '@/shared/types/domain.types';
import { useProfile } from '../../hooks/useProfile';
import { useCatalog } from '../../hooks/useCatalog';
import {
  KNOWLEDGE_LEVEL_LABELS,
  PROFILE_BUTTONS,
  PROFILE_MESSAGES,
  PROFILE_VIEW_SECTIONS,
} from '../../constants/profile.constants';
import {
  PROFILE_PAGE_WRAPPER_STYLES,
  PROFILE_HEADER_STYLES,
  PROFILE_TITLE_STYLES,
  PROFILE_SUBTITLE_STYLES,
  PROFILE_FORM_ERROR_STYLES,
  PROFILE_VIEW_SECTION_STYLES,
  PROFILE_VIEW_HEADING_STYLES,
  PROFILE_BADGE_LIST_STYLES,
  PROFILE_BADGE_STYLES,
  PROFILE_ACTIONS_STYLES,
} from '../profileForm.constants';

function nameBySlug<T extends { slug: string; name: string }>(items: T[]): Record<string, string> {
  return Object.fromEntries(items.map((item) => [item.slug, item.name]));
}

// Componente raíz de la vista de perfil propio (solo lectura).
export function ProfileView() {
  const router = useRouter();
  const { signOut } = useAuthContext();
  const { profile, isLoading, error } = useProfile();
  const { interests, subgenres, perspectives, isLoading: catalogLoading } = useCatalog();

  useEffect(() => {
    if (!isLoading && error === null && profile === null) {
      router.replace(ROUTES.PROFILE.SETUP);
    }
  }, [isLoading, error, profile, router]);

  async function handleSignOut(): Promise<void> {
    await signOut();
    router.push(ROUTES.HOME);
  }

  if (isLoading || catalogLoading) {
    return (
      <main className={PROFILE_PAGE_WRAPPER_STYLES}>
        <Spinner size="lg" ariaLabel={PROFILE_MESSAGES.LOADING} />
      </main>
    );
  }

  if (error !== null) {
    return (
      <main className={PROFILE_PAGE_WRAPPER_STYLES}>
        <p role="alert" className={PROFILE_FORM_ERROR_STYLES}>
          {error}
        </p>
      </main>
    );
  }

  if (profile === null) return null;

  const interestNames = nameBySlug(interests);
  const subgenreNames = nameBySlug(subgenres);
  const perspectiveNames = Object.fromEntries(perspectives.map((p) => [p.id, p.name]));

  const interestEntries = Object.entries(profile.interests);
  const subgenreSlugs = Object.keys(profile.subgenres);
  const perspectiveEntries = Object.entries(profile.perspectives);

  return (
    <main className={PROFILE_PAGE_WRAPPER_STYLES}>
      <header className={PROFILE_HEADER_STYLES}>
        <h1 className={PROFILE_TITLE_STYLES}>{profile.displayName}</h1>
        <p className={PROFILE_SUBTITLE_STYLES}>{profile.bio ?? PROFILE_MESSAGES.NO_BIO}</p>
      </header>

      <section className={PROFILE_VIEW_SECTION_STYLES}>
        <h2 className={PROFILE_VIEW_HEADING_STYLES}>{PROFILE_VIEW_SECTIONS.INTERESTS}</h2>
        <div className={PROFILE_BADGE_LIST_STYLES}>
          {interestEntries.map(([slug, value]) => (
            <span key={slug} className={PROFILE_BADGE_STYLES}>
              {interestNames[slug] ?? slug} ·{' '}
              {KNOWLEDGE_LEVEL_LABELS[value.knowledgeLevel as KnowledgeLevel]}
            </span>
          ))}
        </div>
      </section>

      <section className={PROFILE_VIEW_SECTION_STYLES}>
        <h2 className={PROFILE_VIEW_HEADING_STYLES}>{PROFILE_VIEW_SECTIONS.SUBGENRES}</h2>
        <div className={PROFILE_BADGE_LIST_STYLES}>
          {subgenreSlugs.map((slug) => (
            <span key={slug} className={PROFILE_BADGE_STYLES}>
              {subgenreNames[slug] ?? slug}
            </span>
          ))}
        </div>
      </section>

      <section className={PROFILE_VIEW_SECTION_STYLES}>
        <h2 className={PROFILE_VIEW_HEADING_STYLES}>{PROFILE_VIEW_SECTIONS.PERSPECTIVES}</h2>
        <div className={PROFILE_BADGE_LIST_STYLES}>
          {perspectiveEntries.map(([id, value]) => (
            <span key={id} className={PROFILE_BADGE_STYLES}>
              {perspectiveNames[id] ?? id} · {value.weight}
            </span>
          ))}
        </div>
      </section>

      <div className={PROFILE_ACTIONS_STYLES}>
        <Button
          label={PROFILE_BUTTONS.GO_EDIT}
          onClick={() => router.push(ROUTES.PROFILE.EDIT)}
        />
        <Button label={PROFILE_BUTTONS.SIGN_OUT} variant="ghost" onClick={handleSignOut} />
      </div>
    </main>
  );
}
