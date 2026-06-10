import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import * as catalogService from '../services/catalog.service';
import { useCatalog } from './useCatalog';

vi.mock('../services/catalog.service', () => ({
  getInterests: vi.fn(),
  getSubgenres: vi.fn(),
  getPerspectives: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useCatalog', () => {
  it('carga los tres catálogos', async () => {
    vi.mocked(catalogService.getInterests).mockResolvedValue([{ id: 'cine' }] as never);
    vi.mocked(catalogService.getSubgenres).mockResolvedValue([] as never);
    vi.mocked(catalogService.getPerspectives).mockResolvedValue([] as never);

    const { result } = renderHook(() => useCatalog());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.interests).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('expone el mensaje de error si el catálogo falla', async () => {
    vi.mocked(catalogService.getInterests).mockRejectedValue(new Error('boom'));
    vi.mocked(catalogService.getSubgenres).mockResolvedValue([] as never);
    vi.mocked(catalogService.getPerspectives).mockResolvedValue([] as never);

    const { result } = renderHook(() => useCatalog());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).not.toBeNull();
  });
});
