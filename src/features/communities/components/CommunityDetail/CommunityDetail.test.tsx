import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CommunityDetail } from './CommunityDetail';

vi.mock('@/shared/hooks/useAuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'u1' }, isLoading: false, signOut: vi.fn() }),
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
  getPerspectives: vi.fn().mockResolvedValue([]),
}));

vi.mock('../../services/members.service', () => ({
  getMembersBySubgenre: vi
    .fn()
    .mockResolvedValue([{ id: 'u2', displayName: 'Zoe', bio: 'Dramaturga' }]),
  getMemberProfile: vi.fn(),
}));

vi.mock('../../services/discussion.service', () => ({
  getDiscussionsBySubgenre: vi.fn().mockResolvedValue([
    {
      id: 'd1',
      subgenreSlug: 'drama',
      interestSlug: 'cine',
      title: 'Parásitos y la escalera',
      body: 'Análisis.',
      hasSpoilers: true,
      authorId: 'u2',
      authorName: 'Zoe',
      createdAt: new Date('2026-06-01T12:00:00Z'),
    },
  ]),
  getDiscussion: vi.fn(),
  createDiscussion: vi.fn(),
  getComments: vi.fn(),
  addComment: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('CommunityDetail', () => {
  it('muestra encabezado, miembros y discusiones de la comunidad', async () => {
    render(<CommunityDetail subgenreSlug="drama" />);

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Drama' })).toBeInTheDocument());
    expect(screen.getByText('Cine')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Dramaturga')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Parásitos y la escalera')).toBeInTheDocument());
  });

  it('muestra error de comunidad inexistente para un slug desconocido', async () => {
    render(<CommunityDetail subgenreSlug="inexistente" />);

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  });
});
