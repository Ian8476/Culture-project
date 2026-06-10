'use client';

import { useState } from 'react';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import { useToast } from '@/shared/hooks/useToast';
import { AppError } from '@/shared/types/errors.types';
import { createDiscussion } from '../services/discussion.service';
import { getMemberProfile } from '../services/members.service';
import {
  COMMUNITY_MESSAGES,
  COMMUNITY_TOASTS,
  DISCUSSION_TITLE_MIN_LENGTH,
} from '../constants/communities.constants';
import type { DiscussionFieldErrors } from '../types/communities.types';

interface DiscussionComposerParams {
  subgenreSlug: string;
  interestSlug: string;
  onCreated: () => void;
}

// Estado y envío del formulario de nueva discusión. El displayName del autor
// se lee del perfil al publicar (se desnormaliza en el documento).
export function useDiscussionComposer({
  subgenreSlug,
  interestSlug,
  onCreated,
}: DiscussionComposerParams) {
  const { user } = useAuthContext();
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [hasSpoilers, setHasSpoilers] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<DiscussionFieldErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(): boolean {
    const errors: DiscussionFieldErrors = {};
    if (title.trim().length < DISCUSSION_TITLE_MIN_LENGTH) {
      errors.title = COMMUNITY_MESSAGES.TITLE_TOO_SHORT;
    }
    if (body.trim().length === 0) {
      errors.body = COMMUNITY_MESSAGES.BODY_REQUIRED;
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function submit(): Promise<void> {
    if (user === null || !validate()) return;
    setIsSaving(true);
    setError(null);
    try {
      const profile = await getMemberProfile(user.uid);
      if (profile === null) {
        setError(COMMUNITY_MESSAGES.PROFILE_REQUIRED);
        return;
      }
      await createDiscussion({
        subgenreSlug,
        interestSlug,
        title,
        body,
        hasSpoilers,
        authorId: user.uid,
        authorName: profile.displayName,
      });
      setTitle('');
      setBody('');
      setHasSpoilers(false);
      showToast(COMMUNITY_TOASTS.DISCUSSION_PUBLISHED);
      onCreated();
    } catch (caught) {
      setError(
        caught instanceof AppError ? caught.message : COMMUNITY_MESSAGES.SAVE_DISCUSSION_ERROR,
      );
    } finally {
      setIsSaving(false);
    }
  }

  return {
    title,
    setTitle,
    body,
    setBody,
    hasSpoilers,
    setHasSpoilers,
    fieldErrors,
    isSaving,
    error,
    submit,
  };
}
