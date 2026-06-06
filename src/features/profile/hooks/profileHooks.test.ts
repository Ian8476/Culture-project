import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { ROUTES } from '@/shared/constants/routes.constants';
import * as profileService from '../services/profile.service';
import * as catalogService from '../services/catalog.service';
import type { ProfileFormValues } from '../types/profile.types';
import { useProfile } from './useProfile';
import { useCatalog } from './useCatalog';
import { useProfileSetup } from './useProfileSetup';
import { useProfileEdit } from './useProfileEdit';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn() }),
}));

vi.mock('@/shared/hooks/useAuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'u1' }, isLoading: false, signOut: vi.fn() }),
}));

vi.mock('../services/profile.service', () => ({
  getProfile: vi.fn(),
  createProfile: vi.fn(),
  updateProfile: vi.fn(),
}));

vi.mock('../services/catalog.service', () => ({
  getInterests: vi.fn(),
  getSubgenres: vi.fn(),
  getPerspectives: vi.fn(),
}));

const values: ProfileFormValues = {
  displayName: 'Ana',
  bio: '',
  interests: { cine: { knowledgeLevel: 'NOVICE' } },
  subgenres: {},
  perspectives: {},
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useProfile', () => {
  it('carga el perfil del usuario autenticado', async () => {
    const profile = { id: 'u1', displayName: 'Ana' };
    vi.mocked(profileService.getProfile).mockResolvedValue(profile as never);

    const { result } = renderHook(() => useProfile());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.profile).toEqual(profile);
  });
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
});

describe('useProfileSetup', () => {
  it('crea el perfil y redirige a la vista', async () => {
    vi.mocked(profileService.createProfile).mockResolvedValue();
    const { result } = renderHook(() => useProfileSetup());

    await act(async () => {
      await result.current.submit(values);
    });

    expect(profileService.createProfile).toHaveBeenCalledWith('u1', values);
    expect(pushMock).toHaveBeenCalledWith(ROUTES.PROFILE.ROOT);
  });
});

describe('useProfileEdit', () => {
  it('actualiza el perfil y redirige a la vista', async () => {
    vi.mocked(profileService.updateProfile).mockResolvedValue();
    const { result } = renderHook(() => useProfileEdit());

    await act(async () => {
      await result.current.submit(values);
    });

    expect(profileService.updateProfile).toHaveBeenCalledWith('u1', values);
    expect(pushMock).toHaveBeenCalledWith(ROUTES.PROFILE.ROOT);
  });
});
