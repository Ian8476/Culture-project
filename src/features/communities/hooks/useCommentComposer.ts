'use client';

import { useState } from 'react';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import { useToast } from '@/shared/hooks/useToast';
import { AppError } from '@/shared/types/errors.types';
import { addComment } from '../services/discussion.service';
import { getMemberProfile } from '../services/members.service';
import { COMMUNITY_MESSAGES, COMMUNITY_TOASTS } from '../constants/communities.constants';

interface CommentComposerParams {
  discussionId: string;
  onCreated: () => void;
}

// Estado y envío del formulario de comentario.
export function useCommentComposer({ discussionId, onCreated }: CommentComposerParams) {
  const { user } = useAuthContext();
  const { showToast } = useToast();
  const [body, setBody] = useState('');
  const [hasSpoilers, setHasSpoilers] = useState(false);
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(): Promise<void> {
    if (user === null) return;
    if (body.trim().length === 0) {
      setBodyError(COMMUNITY_MESSAGES.BODY_REQUIRED);
      return;
    }
    setBodyError(null);
    setIsSaving(true);
    setError(null);
    try {
      const profile = await getMemberProfile(user.uid);
      if (profile === null) {
        setError(COMMUNITY_MESSAGES.PROFILE_REQUIRED);
        return;
      }
      await addComment(discussionId, {
        body,
        hasSpoilers,
        authorId: user.uid,
        authorName: profile.displayName,
      });
      setBody('');
      setHasSpoilers(false);
      showToast(COMMUNITY_TOASTS.COMMENT_PUBLISHED);
      onCreated();
    } catch (caught) {
      setError(caught instanceof AppError ? caught.message : COMMUNITY_MESSAGES.SAVE_COMMENT_ERROR);
    } finally {
      setIsSaving(false);
    }
  }

  return {
    body,
    setBody,
    hasSpoilers,
    setHasSpoilers,
    bodyError,
    isSaving,
    error,
    submit,
  };
}
