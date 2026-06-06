'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/shared/components';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { Profile } from '@/shared/types/domain.types';
import { useProfile } from '../../hooks/useProfile';
import { useCatalog } from '../../hooks/useCatalog';
import { useProfileForm } from '../../hooks/useProfileForm';
import { useProfileEdit } from '../../hooks/useProfileEdit';
import { ProfileForm } from '../ProfileForm';
import {
  PROFILE_TITLES,
  PROFILE_SUBTITLES,
  PROFILE_BUTTONS,
  PROFILE_MESSAGES,
} from '../../constants/profile.constants';
import type { ProfileFormValues } from '../../types/profile.types';
import {
  PROFILE_PAGE_WRAPPER_STYLES,
  PROFILE_FORM_ERROR_STYLES,
} from '../profileForm.constants';

// Traduce el perfil de dominio a los valores iniciales del formulario.
function toFormValues(profile: Profile): ProfileFormValues {
  return {
    displayName: profile.displayName,
    bio: profile.bio ?? '',
    interests: profile.interests,
    subgenres: profile.subgenres,
    perspectives: profile.perspectives,
  };
}

// Subcomponente que monta el formulario una vez que el perfil ya cargó,
// garantizando que useProfileForm reciba sus valores iniciales en el primer render.
function ProfileEditReady({ profile }: { profile: Profile }) {
  const form = useProfileForm(toFormValues(profile));
  const { interests, subgenres, perspectives, isLoading: catalogLoading, error: catalogError } =
    useCatalog();
  const { submit, isLoading, error } = useProfileEdit();

  return (
    <ProfileForm
      title={PROFILE_TITLES.EDIT}
      subtitle={PROFILE_SUBTITLES.EDIT}
      submitLabel={PROFILE_BUTTONS.SAVE_EDIT}
      form={form}
      catalog={{ interests, subgenres, perspectives }}
      catalogLoading={catalogLoading}
      catalogError={catalogError}
      isSaving={isLoading}
      saveError={error}
      onSubmit={submit}
    />
  );
}

// Componente raíz de la edición de perfil.
export function ProfileEditForm() {
  const router = useRouter();
  const { profile, isLoading, error } = useProfile();

  // Sin perfil aún: redirige al onboarding.
  useEffect(() => {
    if (!isLoading && error === null && profile === null) {
      router.replace(ROUTES.PROFILE.SETUP);
    }
  }, [isLoading, error, profile, router]);

  if (isLoading) {
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

  return <ProfileEditReady profile={profile} />;
}
