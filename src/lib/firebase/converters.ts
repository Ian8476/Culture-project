import {
  Timestamp,
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from 'firebase/firestore';
import type {
  User,
  Profile,
  Interest,
  Subgenre,
  Perspective,
  ProfileInterest,
  ProfilePerspective,
  Discussion,
  DiscussionComment,
} from '@/shared/types/domain.types';

// Helpers de traducción Firestore <-> dominio. Mantienen los tipos de Firestore
// (Timestamp) dentro de esta capa: el dominio solo conoce `Date`.
function toDate(value: unknown): Date {
  return value instanceof Timestamp ? value.toDate() : new Date(0);
}

function toNullableDate(value: unknown): Date | null {
  return value instanceof Timestamp ? value.toDate() : null;
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user) {
    return {
      email: user.email,
      createdAt: Timestamp.fromDate(user.createdAt as Date),
      updatedAt: Timestamp.fromDate(user.updatedAt as Date),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions): User {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      email: data.email as string,
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };
  },
};

export const profileConverter: FirestoreDataConverter<Profile> = {
  toFirestore(profile) {
    return {
      displayName: profile.displayName,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      interests: profile.interests,
      subgenres: profile.subgenres,
      perspectives: profile.perspectives,
      completedAt:
        profile.completedAt instanceof Date ? Timestamp.fromDate(profile.completedAt) : null,
      createdAt: Timestamp.fromDate(profile.createdAt as Date),
      updatedAt: Timestamp.fromDate(profile.updatedAt as Date),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions): Profile {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      displayName: data.displayName as string,
      bio: (data.bio as string | null) ?? null,
      avatarUrl: (data.avatarUrl as string | null) ?? null,
      interests: (data.interests as Record<string, ProfileInterest>) ?? {},
      subgenres: (data.subgenres as Record<string, true>) ?? {},
      perspectives: (data.perspectives as Record<string, ProfilePerspective>) ?? {},
      completedAt: toNullableDate(data.completedAt),
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };
  },
};

export const interestConverter: FirestoreDataConverter<Interest> = {
  toFirestore(interest) {
    return { name: interest.name, slug: interest.slug, active: interest.active };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): Interest {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name as string,
      slug: data.slug as string,
      active: data.active as boolean,
    };
  },
};

export const subgenreConverter: FirestoreDataConverter<Subgenre> = {
  toFirestore(subgenre) {
    return {
      interestSlug: subgenre.interestSlug,
      name: subgenre.name,
      slug: subgenre.slug,
      active: subgenre.active,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): Subgenre {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      interestSlug: data.interestSlug as string,
      name: data.name as string,
      slug: data.slug as string,
      active: data.active as boolean,
    };
  },
};

export const discussionConverter: FirestoreDataConverter<Discussion> = {
  toFirestore(discussion) {
    return {
      subgenreSlug: discussion.subgenreSlug,
      interestSlug: discussion.interestSlug,
      title: discussion.title,
      body: discussion.body,
      hasSpoilers: discussion.hasSpoilers,
      authorId: discussion.authorId,
      authorName: discussion.authorName,
      createdAt: Timestamp.fromDate(discussion.createdAt as Date),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): Discussion {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      subgenreSlug: data.subgenreSlug as string,
      interestSlug: data.interestSlug as string,
      title: data.title as string,
      body: data.body as string,
      hasSpoilers: data.hasSpoilers as boolean,
      authorId: data.authorId as string,
      authorName: data.authorName as string,
      createdAt: toDate(data.createdAt),
    };
  },
};

export const discussionCommentConverter: FirestoreDataConverter<DiscussionComment> = {
  toFirestore(comment) {
    return {
      body: comment.body,
      hasSpoilers: comment.hasSpoilers,
      authorId: comment.authorId,
      authorName: comment.authorName,
      createdAt: Timestamp.fromDate(comment.createdAt as Date),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): DiscussionComment {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      body: data.body as string,
      hasSpoilers: data.hasSpoilers as boolean,
      authorId: data.authorId as string,
      authorName: data.authorName as string,
      createdAt: toDate(data.createdAt),
    };
  },
};

export const perspectiveConverter: FirestoreDataConverter<Perspective> = {
  toFirestore(perspective) {
    return {
      name: perspective.name,
      description: perspective.description,
      active: perspective.active,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): Perspective {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name as string,
      description: (data.description as string | null) ?? null,
      active: data.active as boolean,
    };
  },
};
