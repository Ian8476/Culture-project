import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as firestore from 'firebase/firestore';
import { NotFoundError, AppError } from '@/shared/types/errors.types';
import {
  addComment,
  createDiscussion,
  getComments,
  getDiscussion,
  getDiscussionsBySubgenre,
} from './discussion.service';

vi.mock('@/lib/firebase/client', () => ({ db: {} }));
vi.mock('@/lib/firebase/converters', () => ({
  discussionConverter: {},
  discussionCommentConverter: {},
}));
vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn(),
  collection: vi.fn(() => ({ withConverter: vi.fn(() => 'collection') })),
  doc: vi.fn(() => ({ withConverter: vi.fn(() => 'doc') })),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  limit: vi.fn(),
  orderBy: vi.fn(),
  query: vi.fn(() => 'query'),
  serverTimestamp: vi.fn(() => 'server-timestamp'),
  where: vi.fn(),
}));

function asDocs(items: unknown[]): unknown {
  return { docs: items.map((item) => ({ data: () => item })) };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getDiscussionsBySubgenre', () => {
  it('devuelve las discusiones mapeadas al dominio', async () => {
    vi.mocked(firestore.getDocs).mockResolvedValue(asDocs([{ id: 'd1', title: 'Dune' }]) as never);

    const result = await getDiscussionsBySubgenre('ciencia-ficcion');

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ id: 'd1', title: 'Dune' });
  });

  it('lanza AppError si la query falla', async () => {
    vi.mocked(firestore.getDocs).mockRejectedValue(new Error('network'));
    await expect(getDiscussionsBySubgenre('drama')).rejects.toBeInstanceOf(AppError);
  });
});

describe('getDiscussion', () => {
  it('lanza NotFoundError si el documento no existe', async () => {
    vi.mocked(firestore.getDoc).mockResolvedValue({
      exists: () => false,
      data: () => undefined,
    } as never);

    await expect(getDiscussion('missing')).rejects.toBeInstanceOf(NotFoundError);
  });

  it('devuelve la discusión cuando existe', async () => {
    vi.mocked(firestore.getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ id: 'd1', title: 'Dune' }),
    } as never);

    const result = await getDiscussion('d1');
    expect(result.title).toBe('Dune');
  });
});

describe('createDiscussion', () => {
  it('crea el documento con serverTimestamp y devuelve el id', async () => {
    vi.mocked(firestore.addDoc).mockResolvedValue({ id: 'new-id' } as never);

    const id = await createDiscussion({
      subgenreSlug: 'drama',
      interestSlug: 'cine',
      title: '  Parásitos  ',
      body: ' Análisis ',
      hasSpoilers: true,
      authorId: 'u1',
      authorName: 'Ana',
    });

    expect(id).toBe('new-id');
    const payload = vi.mocked(firestore.addDoc).mock.calls[0][1] as Record<string, unknown>;
    expect(payload.title).toBe('Parásitos');
    expect(payload.body).toBe('Análisis');
    expect(payload.createdAt).toBe('server-timestamp');
    expect(payload.authorId).toBe('u1');
  });
});

describe('comments', () => {
  it('getComments devuelve los comentarios mapeados', async () => {
    vi.mocked(firestore.getDocs).mockResolvedValue(asDocs([{ id: 'c1' }]) as never);
    const result = await getComments('d1');
    expect(result).toHaveLength(1);
  });

  it('addComment escribe el comentario con autor y timestamp', async () => {
    vi.mocked(firestore.addDoc).mockResolvedValue({ id: 'c1' } as never);

    await addComment('d1', {
      body: ' Bien dicho ',
      hasSpoilers: false,
      authorId: 'u2',
      authorName: 'Luis',
    });

    const payload = vi.mocked(firestore.addDoc).mock.calls[0][1] as Record<string, unknown>;
    expect(payload.body).toBe('Bien dicho');
    expect(payload.authorName).toBe('Luis');
    expect(payload.createdAt).toBe('server-timestamp');
  });
});
