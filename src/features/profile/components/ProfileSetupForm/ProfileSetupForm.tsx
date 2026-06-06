'use client';

import { useCatalog } from '../../hooks/useCatalog';
import { useProfileForm } from '../../hooks/useProfileForm';
import { useProfileSetup } from '../../hooks/useProfileSetup';
import { ProfileForm } from '../ProfileForm';
import {
  PROFILE_TITLES,
  PROFILE_SUBTITLES,
  PROFILE_BUTTONS,
} from '../../constants/profile.constants';

// Componente raíz del onboarding cultural.
export function ProfileSetupForm() {
  const form = useProfileForm();
  const { interests, subgenres, perspectives, isLoading: catalogLoading, error: catalogError } =
    useCatalog();
  const { submit, isLoading, error } = useProfileSetup();

  return (
    <ProfileForm
      title={PROFILE_TITLES.SETUP}
      subtitle={PROFILE_SUBTITLES.SETUP}
      submitLabel={PROFILE_BUTTONS.SAVE_SETUP}
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
