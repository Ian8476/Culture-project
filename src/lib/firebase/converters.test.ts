import { describe, it, expect } from 'vitest';
import { Timestamp } from 'firebase/firestore';
import {
  userConverter,
  profileConverter,
  interestConverter,
  subgenreConverter,
  perspectiveConverter,
  discussionConverter,
  discussionCommentConverter,
} from './converters';

const NOW = new Date('2026-06-01T12:00:00Z');

function asSnapshot(id: string, data: Record<string, unknown>): never {
  return { id, data: () => data } as never;
}

describe('userConverter', () => {
  it('traduce Timestamp a Date al leer', () => {
    const user = userConverter.fromFirestore(
      asSnapshot('u1', { email: 'ana@example.com', createdAt: Timestamp.fromDate(NOW) }),
    );
    expect(user.id).toBe('u1');
    expect(user.createdAt).toEqual(NOW);
    // Campo ausente: cae al epoch en vez de exponer undefined.
    expect(user.updatedAt).toEqual(new Date(0));
  });

  it('traduce Date a Timestamp al escribir', () => {
    const data = userConverter.toFirestore({
      id: 'u1',
      email: 'ana@example.com',
      createdAt: NOW,
      updatedAt: NOW,
    }) as Record<string, unknown>;
    expect(data.createdAt).toBeInstanceOf(Timestamp);
    expect(data.email).toBe('ana@example.com');
  });
});

describe('profileConverter', () => {
  it('rellena maps ausentes con objetos vacíos', () => {
    const profile = profileConverter.fromFirestore(
      asSnapshot('u1', { displayName: 'Ana', createdAt: Timestamp.fromDate(NOW) }),
    );
    expect(profile.interests).toEqual({});
    expect(profile.subgenres).toEqual({});
    expect(profile.perspectives).toEqual({});
    expect(profile.bio).toBeNull();
    expect(profile.completedAt).toBeNull();
  });

  it('serializa completedAt nulo y con valor', () => {
    const base = {
      id: 'u1',
      displayName: 'Ana',
      bio: null,
      avatarUrl: null,
      interests: {},
      subgenres: {},
      perspectives: {},
      createdAt: NOW,
      updatedAt: NOW,
    };
    const withNull = profileConverter.toFirestore({
      ...base,
      completedAt: null,
    }) as Record<string, unknown>;
    expect(withNull.completedAt).toBeNull();

    const withDate = profileConverter.toFirestore({
      ...base,
      completedAt: NOW,
    }) as Record<string, unknown>;
    expect(withDate.completedAt).toBeInstanceOf(Timestamp);
  });
});

describe('converters de catálogo', () => {
  it('interest y subgenre conservan slug y active', () => {
    const interest = interestConverter.fromFirestore(
      asSnapshot('cine', { name: 'Cine', slug: 'cine', active: true }),
    );
    expect(interest).toEqual({ id: 'cine', name: 'Cine', slug: 'cine', active: true });
    expect(interestConverter.toFirestore(interest)).toEqual({
      name: 'Cine',
      slug: 'cine',
      active: true,
    });

    const subgenre = subgenreConverter.fromFirestore(
      asSnapshot('drama', { name: 'Drama', slug: 'drama', interestSlug: 'cine', active: true }),
    );
    expect(subgenre.interestSlug).toBe('cine');
    expect(subgenreConverter.toFirestore(subgenre)).toEqual({
      interestSlug: 'cine',
      name: 'Drama',
      slug: 'drama',
      active: true,
    });
  });

  it('perspective normaliza description ausente a null', () => {
    const perspective = perspectiveConverter.fromFirestore(
      asSnapshot('trama', { name: 'Trama', active: true }),
    );
    expect(perspective.description).toBeNull();
    expect(perspectiveConverter.toFirestore(perspective)).toEqual({
      name: 'Trama',
      description: null,
      active: true,
    });
  });
});

describe('discussionConverter', () => {
  const raw = {
    subgenreSlug: 'drama',
    interestSlug: 'cine',
    title: 'Parásitos',
    body: 'Análisis.',
    hasSpoilers: true,
    authorId: 'u1',
    authorName: 'Ana',
    createdAt: Timestamp.fromDate(NOW),
  };

  it('lee y escribe la discusión completa', () => {
    const discussion = discussionConverter.fromFirestore(asSnapshot('d1', raw));
    expect(discussion.id).toBe('d1');
    expect(discussion.createdAt).toEqual(NOW);
    expect(discussion.hasSpoilers).toBe(true);

    const data = discussionConverter.toFirestore(discussion) as Record<string, unknown>;
    expect(data.title).toBe('Parásitos');
    expect(data.createdAt).toBeInstanceOf(Timestamp);
  });
});

describe('discussionCommentConverter', () => {
  it('lee y escribe el comentario completo', () => {
    const comment = discussionCommentConverter.fromFirestore(
      asSnapshot('c1', {
        body: 'Gran punto.',
        hasSpoilers: false,
        authorId: 'u2',
        authorName: 'Luis',
        createdAt: Timestamp.fromDate(NOW),
      }),
    );
    expect(comment.id).toBe('c1');
    expect(comment.createdAt).toEqual(NOW);

    const data = discussionCommentConverter.toFirestore(comment) as Record<string, unknown>;
    expect(data.body).toBe('Gran punto.');
    expect(data.createdAt).toBeInstanceOf(Timestamp);
  });
});
