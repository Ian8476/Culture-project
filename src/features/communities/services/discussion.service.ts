// Data access de discusiones y comentarios. Lecturas vía converter (exponen
// tipos de dominio); escrituras usan serverTimestamp() para createdAt.

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { discussionCommentConverter, discussionConverter } from '@/lib/firebase/converters';
import { AppError, NotFoundError } from '@/shared/types/errors.types';
import type { Discussion, DiscussionComment } from '@/shared/types/domain.types';
import {
  COMMENT_DOC_FIELDS,
  COMMUNITY_MESSAGES,
  DISCUSSION_DOC_FIELDS,
  MAX_COMMENTS_FETCHED,
  MAX_DISCUSSIONS_FETCHED,
} from '../constants/communities.constants';
import type { NewCommentInput, NewDiscussionInput } from '../types/communities.types';

const SORT_DESCENDING = 'desc' as const;
const SORT_ASCENDING = 'asc' as const;

// Lista las discusiones de un subgénero, de la más reciente a la más antigua.
export async function getDiscussionsBySubgenre(subgenreSlug: string): Promise<Discussion[]> {
  try {
    const discussionsQuery = query(
      collection(db, COLLECTIONS.DISCUSSIONS).withConverter(discussionConverter),
      where(DISCUSSION_DOC_FIELDS.SUBGENRE_SLUG, '==', subgenreSlug),
      orderBy(DISCUSSION_DOC_FIELDS.CREATED_AT, SORT_DESCENDING),
      limit(MAX_DISCUSSIONS_FETCHED),
    );
    const snapshot = await getDocs(discussionsQuery);
    return snapshot.docs.map((document) => document.data());
  } catch (error) {
    // Si falta el índice compuesto, Firestore incluye aquí el enlace para crearlo.
    console.error('[discussions] getDiscussionsBySubgenre falló:', error);
    throw new AppError(COMMUNITY_MESSAGES.DISCUSSIONS_ERROR);
  }
}

// Lee una discusión puntual. Lanza NotFoundError si no existe.
export async function getDiscussion(discussionId: string): Promise<Discussion> {
  let discussion: Discussion | null = null;
  try {
    const reference = doc(db, COLLECTIONS.DISCUSSIONS, discussionId).withConverter(
      discussionConverter,
    );
    const snapshot = await getDoc(reference);
    discussion = snapshot.exists() ? snapshot.data() : null;
  } catch {
    throw new AppError(COMMUNITY_MESSAGES.DISCUSSIONS_ERROR);
  }
  if (discussion === null) {
    throw new NotFoundError(COMMUNITY_MESSAGES.DISCUSSION_NOT_FOUND);
  }
  return discussion;
}

// Crea una discusión y devuelve su id.
export async function createDiscussion(input: NewDiscussionInput): Promise<string> {
  try {
    const reference = await addDoc(collection(db, COLLECTIONS.DISCUSSIONS), {
      [DISCUSSION_DOC_FIELDS.SUBGENRE_SLUG]: input.subgenreSlug,
      [DISCUSSION_DOC_FIELDS.INTEREST_SLUG]: input.interestSlug,
      [DISCUSSION_DOC_FIELDS.TITLE]: input.title.trim(),
      [DISCUSSION_DOC_FIELDS.BODY]: input.body.trim(),
      [DISCUSSION_DOC_FIELDS.HAS_SPOILERS]: input.hasSpoilers,
      [DISCUSSION_DOC_FIELDS.AUTHOR_ID]: input.authorId,
      [DISCUSSION_DOC_FIELDS.AUTHOR_NAME]: input.authorName,
      [DISCUSSION_DOC_FIELDS.CREATED_AT]: serverTimestamp(),
    });
    return reference.id;
  } catch (error) {
    console.error('[discussions] createDiscussion falló:', error);
    throw new AppError(COMMUNITY_MESSAGES.SAVE_DISCUSSION_ERROR);
  }
}

// Lista los comentarios de una discusión en orden cronológico.
export async function getComments(discussionId: string): Promise<DiscussionComment[]> {
  try {
    const commentsQuery = query(
      collection(
        db,
        COLLECTIONS.DISCUSSIONS,
        discussionId,
        COLLECTIONS.DISCUSSION_COMMENTS,
      ).withConverter(discussionCommentConverter),
      orderBy(COMMENT_DOC_FIELDS.CREATED_AT, SORT_ASCENDING),
      limit(MAX_COMMENTS_FETCHED),
    );
    const snapshot = await getDocs(commentsQuery);
    return snapshot.docs.map((document) => document.data());
  } catch {
    throw new AppError(COMMUNITY_MESSAGES.DISCUSSIONS_ERROR);
  }
}

// Agrega un comentario a una discusión.
export async function addComment(discussionId: string, input: NewCommentInput): Promise<void> {
  try {
    await addDoc(
      collection(db, COLLECTIONS.DISCUSSIONS, discussionId, COLLECTIONS.DISCUSSION_COMMENTS),
      {
        [COMMENT_DOC_FIELDS.BODY]: input.body.trim(),
        [COMMENT_DOC_FIELDS.HAS_SPOILERS]: input.hasSpoilers,
        [COMMENT_DOC_FIELDS.AUTHOR_ID]: input.authorId,
        [COMMENT_DOC_FIELDS.AUTHOR_NAME]: input.authorName,
        [COMMENT_DOC_FIELDS.CREATED_AT]: serverTimestamp(),
      },
    );
  } catch {
    throw new AppError(COMMUNITY_MESSAGES.SAVE_COMMENT_ERROR);
  }
}
