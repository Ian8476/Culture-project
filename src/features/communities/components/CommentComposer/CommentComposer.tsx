'use client';

import type { FormEvent } from 'react';
import { Button, Checkbox, FormField, TextArea } from '@/shared/components';
import { useCommentComposer } from '../../hooks/useCommentComposer';
import {
  COMMENT_BODY_MAX_LENGTH,
  COMMENT_FIELDS,
  COMMUNITY_BUTTONS,
  COMMUNITY_LABELS,
  COMMUNITY_PLACEHOLDERS,
} from '../../constants/communities.constants';
import {
  COMMUNITY_ERROR_STYLES,
  COMPOSER_ACTIONS_STYLES,
  COMPOSER_STYLES,
} from '../communityUi.constants';
import type { CommentComposerProps } from './CommentComposer.types';

// Formulario para comentar una discusión.
export function CommentComposer({ discussionId, onCreated }: CommentComposerProps) {
  const composer = useCommentComposer({ discussionId, onCreated });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void composer.submit();
  }

  return (
    <form onSubmit={handleSubmit} className={COMPOSER_STYLES} noValidate>
      <FormField
        label={COMMUNITY_LABELS.COMMENT_BODY}
        htmlFor={COMMENT_FIELDS.BODY}
        error={composer.bodyError ?? undefined}
      >
        <TextArea
          id={COMMENT_FIELDS.BODY}
          value={composer.body}
          onChange={composer.setBody}
          placeholder={COMMUNITY_PLACEHOLDERS.COMMENT_BODY}
          maxLength={COMMENT_BODY_MAX_LENGTH}
          hasError={composer.bodyError !== null}
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
          id={COMMENT_FIELDS.HAS_SPOILERS}
          label={COMMUNITY_LABELS.HAS_SPOILERS}
          checked={composer.hasSpoilers}
          onChange={composer.setHasSpoilers}
          disabled={composer.isSaving}
        />
        <Button
          label={COMMUNITY_BUTTONS.PUBLISH_COMMENT}
          type="submit"
          isLoading={composer.isSaving}
        />
      </div>
    </form>
  );
}
