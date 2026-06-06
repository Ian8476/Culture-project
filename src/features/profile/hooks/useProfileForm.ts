'use client';

import { useState } from 'react';
import type { KnowledgeLevel } from '@/shared/types/domain.types';
import {
  DEFAULT_KNOWLEDGE_LEVEL,
  DEFAULT_PERSPECTIVE_WEIGHT,
} from '../constants/profile.constants';
import type { ProfileFormController, ProfileFormValues } from '../types/profile.types';

const EMPTY_VALUES: ProfileFormValues = {
  displayName: '',
  bio: '',
  interests: {},
  subgenres: {},
  perspectives: {},
};

// Estado del formulario de perfil (compartido por onboarding y edición).
// Solo maneja estado local; no toca Firestore.
export function useProfileForm(initial?: ProfileFormValues): ProfileFormController {
  const [values, setValues] = useState<ProfileFormValues>(initial ?? EMPTY_VALUES);

  function setDisplayName(displayName: string): void {
    setValues((current) => ({ ...current, displayName }));
  }

  function setBio(bio: string): void {
    setValues((current) => ({ ...current, bio }));
  }

  // Activa/desactiva un interés. Al activarlo, fija el nivel por defecto.
  function toggleInterest(slug: string): void {
    setValues((current) => {
      const next = { ...current.interests };
      if (slug in next) {
        delete next[slug];
      } else {
        next[slug] = { knowledgeLevel: DEFAULT_KNOWLEDGE_LEVEL };
      }
      return { ...current, interests: next };
    });
  }

  function setKnowledgeLevel(slug: string, knowledgeLevel: KnowledgeLevel): void {
    setValues((current) => {
      if (!(slug in current.interests)) return current;
      return {
        ...current,
        interests: { ...current.interests, [slug]: { knowledgeLevel } },
      };
    });
  }

  function toggleSubgenre(slug: string): void {
    setValues((current) => {
      const next = { ...current.subgenres };
      if (slug in next) {
        delete next[slug];
      } else {
        next[slug] = true;
      }
      return { ...current, subgenres: next };
    });
  }

  // Activa/desactiva una perspectiva. Al activarla, fija el peso por defecto.
  function togglePerspective(slug: string): void {
    setValues((current) => {
      const next = { ...current.perspectives };
      if (slug in next) {
        delete next[slug];
      } else {
        next[slug] = { weight: DEFAULT_PERSPECTIVE_WEIGHT };
      }
      return { ...current, perspectives: next };
    });
  }

  function setPerspectiveWeight(slug: string, weight: number): void {
    setValues((current) => {
      if (!(slug in current.perspectives)) return current;
      return {
        ...current,
        perspectives: { ...current.perspectives, [slug]: { weight } },
      };
    });
  }

  return {
    values,
    setDisplayName,
    setBio,
    toggleInterest,
    setKnowledgeLevel,
    toggleSubgenre,
    togglePerspective,
    setPerspectiveWeight,
  };
}
