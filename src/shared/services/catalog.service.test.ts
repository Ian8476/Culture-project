import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as firestore from 'firebase/firestore';
import { clearCatalogCache, getInterests, getPerspectives, getSubgenres } from './catalog.service';

vi.mock('@/lib/firebase/client', () => ({ db: {} }));
vi.mock('@/lib/firebase/converters', () => ({
  interestConverter: {},
  subgenreConverter: {},
  perspectiveConverter: {},
}));
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({ withConverter: vi.fn(() => 'query') })),
  getDocs: vi.fn(),
}));

function asDocs(items: unknown[]): unknown {
  return { docs: items.map((item) => ({ data: () => item })) };
}

beforeEach(() => {
  vi.clearAllMocks();
  clearCatalogCache();
});

describe('getInterests', () => {
  it('filtra inactivos y ordena por nombre', async () => {
    vi.mocked(firestore.getDocs).mockResolvedValue(
      asDocs([
        { id: 'b', name: 'Teatro', slug: 'teatro', active: true },
        { id: 'a', name: 'Cine', slug: 'cine', active: true },
        { id: 'c', name: 'Oculto', slug: 'oculto', active: false },
      ]) as never,
    );

    const result = await getInterests();
    expect(result.map((interest) => interest.name)).toEqual(['Cine', 'Teatro']);
  });

  it('cachea el resultado y no vuelve a leer Firestore', async () => {
    vi.mocked(firestore.getDocs).mockResolvedValue(
      asDocs([{ id: 'a', name: 'Cine', slug: 'cine', active: true }]) as never,
    );

    await getInterests();
    await getInterests();

    expect(firestore.getDocs).toHaveBeenCalledTimes(1);
  });
});

describe('getSubgenres y getPerspectives', () => {
  it('también filtran inactivos', async () => {
    vi.mocked(firestore.getDocs).mockResolvedValueOnce(
      asDocs([
        { id: 's1', name: 'Drama', slug: 'drama', interestSlug: 'cine', active: true },
        { id: 's2', name: 'Inactivo', slug: 'x', interestSlug: 'cine', active: false },
      ]) as never,
    );
    const subgenres = await getSubgenres();
    expect(subgenres).toHaveLength(1);

    vi.mocked(firestore.getDocs).mockResolvedValueOnce(
      asDocs([{ id: 'p1', name: 'Trama', description: null, active: true }]) as never,
    );
    const perspectives = await getPerspectives();
    expect(perspectives).toHaveLength(1);
  });
});
