import type { Interest, Subgenre } from '@/shared/types/domain.types';

// Valores del formulario de nueva discusión.
export interface DiscussionFormValues {
  title: string;
  body: string;
  hasSpoilers: boolean;
}

// Valores del formulario de comentario.
export interface CommentFormValues {
  body: string;
  hasSpoilers: boolean;
}

// Errores de campo del formulario de discusión.
export interface DiscussionFieldErrors {
  title?: string;
  body?: string;
}

// Payload que recibe el service para crear una discusión.
export interface NewDiscussionInput {
  subgenreSlug: string;
  interestSlug: string;
  title: string;
  body: string;
  hasSpoilers: boolean;
  authorId: string;
  authorName: string;
}

// Payload que recibe el service para crear un comentario.
export interface NewCommentInput {
  body: string;
  hasSpoilers: boolean;
  authorId: string;
  authorName: string;
}

// Subgénero resuelto contra su interés padre (para encabezados y cards).
export interface CommunityInfo {
  subgenre: Subgenre;
  interest: Interest | null;
}
