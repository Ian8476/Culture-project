import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ProfileView } from './ProfileView';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('@/shared/hooks/useAuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'u1' }, isLoading: false, signOut: vi.fn() }),
}));

vi.mock('../../services/profile.service', () => ({
  getProfile: vi.fn().mockResolvedValue({
    id: 'u1',
    displayName: 'Ana López',
    bio: 'Cinéfila',
    avatarUrl: null,
    interests: { cine: { knowledgeLevel: 'ADVANCED' } },
    subgenres: { drama: true },
    perspectives: { trama: { weight: 4 } },
    completedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  createProfile: vi.fn(),
  updateProfile: vi.fn(),
}));

vi.mock('@/shared/services/catalog.service', () => ({
  getInterests: vi
    .fn()
    .mockResolvedValue([{ id: 'cine', name: 'Cine', slug: 'cine', active: true }]),
  getSubgenres: vi
    .fn()
    .mockResolvedValue([
      { id: 'drama', name: 'Drama', slug: 'drama', interestSlug: 'cine', active: true },
    ]),
  getPerspectives: vi
    .fn()
    .mockResolvedValue([{ id: 'trama', name: 'Trama', description: null, active: true }]),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ProfileView', () => {
  it('muestra los datos del perfil con nombres resueltos', async () => {
    render(<ProfileView />);

    await waitFor(() => expect(screen.getByText('Ana López')).toBeInTheDocument());
    expect(screen.getByText('Cinéfila')).toBeInTheDocument();
    expect(screen.getByText(/Cine ·/)).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
  });
});
