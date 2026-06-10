'use client';

import type { FormEvent } from 'react';
import { Button, Checkbox, FormField, Input, TextArea } from '@/shared/components';
import { useDiscussionComposer } from '../../hooks/useDiscussionComposer';
import {
  COMMUNITY_BUTTONS,
  COMMUNITY_LABELS,
  COMMUNITY_PLACEHOLDERS,
  DISCUSSION_BODY_MAX_LENGTH,
  DISCUSSION_FIELDS,
} from '../../constants/communities.constants';
import {
  COMMUNITY_ERROR_STYLES,
  COMPOSER_ACTIONS_STYLES,
  COMPOSER_BUTTON_ROW_STYLES,
  COMPOSER_STYLES,
} from '../communityUi.constants';
import type { DiscussionComposerProps } from './DiscussionComposer.types';

// Formulario para abrir una discusión en la comunidad.
export function DiscussionComposer({
  subgenreSlug,
  interestSlug,
  onCreated,
  onCancel,
}: DiscussionComposerProps) {
  const composer = useDiscussionComposer({ subgenreSlug, interestSlug, onCreated });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void composer.submit();
  }

  return (
    <form onSubmit={handleSubmit} className={COMPOSER_STYLES} noValidate>
      <FormField
        label={COMMUNITY_LABELS.DISCUSSION_TITLE}
        htmlFor={DISCUSSION_FIELDS.TITLE}
        error={composer.fieldErrors.title}
        required
      >
        <Input
          id={DISCUSSION_FIELDS.TITLE}
          value={composer.title}
          onChange={composer.setTitle}
          placeholder={COMMUNITY_PLACEHOLDERS.DISCUSSION_TITLE}
          hasError={composer.fieldErrors.title !== undefined}
          disabled={composer.isSaving}
        />
      </FormField>

      <FormField
        label={COMMUNITY_LABELS.DISCUSSION_BODY}
        htmlFor={DISCUSSION_FIELDS.BODY}
        error={composer.fieldErrors.body}
        required
      >
        <TextArea
          id={DISCUSSION_FIELDS.BODY}
          value={composer.body}
          onChange={composer.setBody}
          placeholder={COMMUNITY_PLACEHOLDERS.DISCUSSION_BODY}
          maxLength={DISCUSSION_BODY_MAX_LENGTH}
          hasError={composer.fieldErrors.body !== undefined}
          disabled={composer.isSaving}
        />
      </FormField>

      {composer.error !== null && (
        <p role="alert" className={COMMUNITY_ERROR_STYLES}>
          {composer.error}
        </p>
      )}

      <div className={COMPOSER_ACTIONS_STYLES}>
        <Checkbox
          id={DISCUSSION_FIELDS.HAS_SPOILERS}
          label={COMMUNITY_LABELS.HAS_SPOILERS}
          checked={composer.hasSpoilers}
          onChange={composer.setHasSpoilers}
          disabled={composer.isSaving}
        />
        <div className={COMPOSER_BUTTON_ROW_STYLES}>
          <Button
            label={COMMUNITY_BUTTONS.CANCEL_COMPOSER}
            variant="ghost"
            onClick={onCancel}
            disabled={composer.isSaving}
          />
          <Button
            label={COMMUNITY_BUTTONS.PUBLISH_DISCUSSION}
            type="submit"
            isLoading={composer.isSaving}
          />
        </div>
      </div>
    </form>
  );
}
