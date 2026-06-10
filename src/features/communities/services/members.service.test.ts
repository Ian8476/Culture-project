import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as firestore from 'firebase/firestore';
import { AppError } from '@/shared/types/errors.types';
import { getMembersBySubgenre, getMemberProfile } from './members.service';

vi.mock('@/lib/firebase/client', () => ({ db: {} }));
vi.mock('@/lib/firebase/converters', () => ({ profileConverter: {} }));
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({ withConverter: vi.fn(() => 'collection') })),
  doc: vi.fn(() => ({ withConverter: vi.fn(() => 'doc') })),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  limit: vi.fn(),
  query: vi.fn(() => 'query'),
  where: vi.fn(),
}));

function asDocs(items: unknown[]): unknown {
  return { docs: items.map((item) => ({ data: () => item })) };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getMembersBySubgenre', () => {
  it('consulta por dot notation del map subgenres y ordena por nombre', async () => {
    vi.mocked(firestore.getDocs).mockResolvedValue(
      asDocs([
        { id: 'u2', displayName: 'Zoe' },
        { id: 'u1', displayName: 'Ana' },
      ]) as never,
    );

    const result = await getMembersBySubgenre('drama');

    expect(vi.mocked(firestore.where)).toHaveBeenCalledWith('subgenres.drama', '==', true);
    expect(result.map((member) => member.displayName)).toEqual(['Ana', 'Zoe']);
  });

  it('lanza AppError si la query falla', async () => {
    vi.mocked(firestore.getDocs).mockRejectedValue(new Error('network'));
    await expect(getMembersBySubgenre('drama')).rejects.toBeInstanceOf(AppError);
  });
});

describe('getMemberProfile', () => {
  it('devuelve null si el perfil no existe', async () => {
    vi.mocked(firestore.getDoc).mockResolvedValue({
      exists: () => false,
      data: () => undefined,
    } as never);

    const result = await getMemberProfile('u1');
    expect(result).toBeNull();
  });

  it('devuelve el perfil cuando existe', async () => {
    vi.mocked(firestore.getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ id: 'u1', displayName: 'Ana' }),
    } as never);

    const result = await getMemberProfile('u1');
    expect(result?.displayName).toBe('Ana');
  });
});
