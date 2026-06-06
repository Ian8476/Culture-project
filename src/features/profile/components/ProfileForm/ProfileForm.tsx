'use client';

import { useState } from 'react';
import { Button, Spinner } from '@/shared/components';
import { displayNameSchema, bioSchema, firstError } from '@/lib/utils/validation';
import { PROFILE_FIELDS, PROFILE_MESSAGES } from '../../constants/profile.constants';
import { ProfileFormBody } from '../ProfileFormBody';
import type { ProfileFieldErrors, ProfileFormValues } from '../../types/profile.types';
import type { ProfileFormProps } from './ProfileForm.types';
import {
  PROFILE_PAGE_WRAPPER_STYLES,
  PROFILE_HEADER_STYLES,
  PROFILE_TITLE_STYLES,
  PROFILE_SUBTITLE_STYLES,
  PROFILE_FORM_STYLES,
  PROFILE_FORM_ERROR_STYLES,
} from '../profileForm.constants';

// Validación de presentación del formulario de perfil.
function validateProfile(values: ProfileFormValues): ProfileFieldErrors {
  const errors: ProfileFieldErrors = {};
  const nameError = firstError(displayNameSchema, values.displayName);
  if (nameError !== undefined) errors[PROFILE_FIELDS.DISPLAY_NAME] = nameError;
  const bioError = firstError(bioSchema, values.bio);
  if (bioError !== undefined) errors[PROFILE_FIELDS.BIO] = bioError;
  return errors;
}

// Shell presentacional compartido por onboarding y edición de perfil.
export function ProfileForm({
  title,
  subtitle,
  submitLabel,
  form,
  catalog,
  catalogLoading,
  catalogError,
  isSaving,
  saveError,
  onSubmit,
}: ProfileFormProps) {
  const [errors, setErrors] = useState<ProfileFieldErrors>({});
  const [interestError, setInterestError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    const fieldErrors = validateProfile(form.values);
    const hasInterest = Object.keys(form.values.interests).length > 0;
    setErrors(fieldErrors);
    setInterestError(hasInterest ? null : PROFILE_MESSAGES.REQUIRED_INTEREST);
    if (Object.keys(fieldErrors).length > 0 || !hasInterest) return;
    await onSubmit(form.values);
  }

  return (
    <main className={PROFILE_PAGE_WRAPPER_STYLES}>
      <header className={PROFILE_HEADER_STYLES}>
        <h1 className={PROFILE_TITLE_STYLES}>{title}</h1>
        <p className={PROFILE_SUBTITLE_STYLES}>{subtitle}</p>
      </header>

      {catalogLoading ? (
        <Spinner size="lg" ariaLabel={PROFILE_MESSAGES.LOADING} />
      ) : catalogError !== null ? (
        <p role="alert" className={PROFILE_FORM_ERROR_STYLES}>
          {catalogError}
        </p>
      ) : (
        <form className={PROFILE_FORM_STYLES} onSubmit={handleSubmit} noValidate>
          <ProfileFormBody form={form} catalog={catalog} errors={errors} disabled={isSaving} />

          {interestError !== null && (
            <p role="alert" className={PROFILE_FORM_ERROR_STYLES}>
              {interestError}
            </p>
          )}
          {saveError !== null && (
            <p role="alert" className={PROFILE_FORM_ERROR_STYLES}>
              {saveError}
            </p>
          )}

          <Button label={submitLabel} type="submit" isLoading={isSaving} fullWidth />
        </form>
      )}
    </main>
  );
}
