import { FormField, Input } from '@/shared/components';
import {
  PROFILE_FIELDS,
  PROFILE_LABELS,
  PROFILE_PLACEHOLDERS,
  PROFILE_HINTS,
} from '../../constants/profile.constants';
import { InterestPicker } from '../InterestPicker';
import { SubgenrePicker } from '../SubgenrePicker';
import { PerspectivePicker } from '../PerspectivePicker';
import type { ProfileFormBodyProps } from './ProfileFormBody.types';
import {
  PROFILE_SECTION_STYLES,
  PROFILE_SECTION_TITLE_STYLES,
  PROFILE_SECTION_HINT_STYLES,
} from '../profileForm.constants';

// Cuerpo compartido del formulario de perfil (onboarding y edición).
// Solo presentación: recibe el controlador del form y los catálogos.
export function ProfileFormBody({ form, catalog, errors, disabled = false }: ProfileFormBodyProps) {
  const { values } = form;
  const selectedInterestSlugs = Object.keys(values.interests);

  return (
    <>
      <FormField
        label={PROFILE_LABELS.DISPLAY_NAME}
        htmlFor={PROFILE_FIELDS.DISPLAY_NAME}
        error={errors[PROFILE_FIELDS.DISPLAY_NAME]}
        required
      >
        <Input
          id={PROFILE_FIELDS.DISPLAY_NAME}
          name={PROFILE_FIELDS.DISPLAY_NAME}
          value={values.displayName}
          onChange={form.setDisplayName}
          placeholder={PROFILE_PLACEHOLDERS.DISPLAY_NAME}
          hasError={errors[PROFILE_FIELDS.DISPLAY_NAME] !== undefined}
          disabled={disabled}
        />
      </FormField>

      <FormField
        label={PROFILE_LABELS.BIO}
        htmlFor={PROFILE_FIELDS.BIO}
        error={errors[PROFILE_FIELDS.BIO]}
      >
        <Input
          id={PROFILE_FIELDS.BIO}
          name={PROFILE_FIELDS.BIO}
          value={values.bio}
          onChange={form.setBio}
          placeholder={PROFILE_PLACEHOLDERS.BIO}
          hasError={errors[PROFILE_FIELDS.BIO] !== undefined}
          disabled={disabled}
        />
      </FormField>

      <section className={PROFILE_SECTION_STYLES}>
        <h2 className={PROFILE_SECTION_TITLE_STYLES}>{PROFILE_LABELS.INTERESTS}</h2>
        <p className={PROFILE_SECTION_HINT_STYLES}>{PROFILE_HINTS.INTERESTS}</p>
        <InterestPicker
          interests={catalog.interests}
          selected={values.interests}
          onToggle={form.toggleInterest}
          onLevelChange={form.setKnowledgeLevel}
          disabled={disabled}
        />
      </section>

      <section className={PROFILE_SECTION_STYLES}>
        <h2 className={PROFILE_SECTION_TITLE_STYLES}>{PROFILE_LABELS.SUBGENRES}</h2>
        <p className={PROFILE_SECTION_HINT_STYLES}>{PROFILE_HINTS.SUBGENRES}</p>
        <SubgenrePicker
          subgenres={catalog.subgenres}
          selectedInterestSlugs={selectedInterestSlugs}
          selected={values.subgenres}
          onToggle={form.toggleSubgenre}
          disabled={disabled}
        />
      </section>

      <section className={PROFILE_SECTION_STYLES}>
        <h2 className={PROFILE_SECTION_TITLE_STYLES}>{PROFILE_LABELS.PERSPECTIVES}</h2>
        <p className={PROFILE_SECTION_HINT_STYLES}>{PROFILE_HINTS.PERSPECTIVES}</p>
        <PerspectivePicker
          perspectives={catalog.perspectives}
          selected={values.perspectives}
          onToggle={form.togglePerspective}
          onWeightChange={form.setPerspectiveWeight}
          disabled={disabled}
        />
      </section>
    </>
  );
}
