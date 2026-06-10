import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CommunityExplorer } from './CommunityExplorer';

vi.mock('@/shared/services/catalog.service', () => ({
  getInterests: vi.fn().mockResolvedValue([
    { id: 'cine', name: 'Cine', slug: 'cine', active: true },
    { id: 'teatro', name: 'Teatro', slug: 'teatro', active: true },
  ]),
  getSubgenres: vi.fn().mockResolvedValue([
    { id: 'drama', name: 'Drama', slug: 'drama', interestSlug: 'cine', active: true },
    { id: 'musical', name: 'Musical', slug: 'musical', interestSlug: 'teatro', active: true },
  ]),
  getPerspectives: vi.fn().mockResolvedValue([]),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('CommunityExplorer', () => {
  it('agrupa las comunidades por interés', async () => {
    render(<CommunityExplorer />);

    await waitFor(() => expect(screen.getByText('Drama')).toBeInTheDocument());
    expect(screen.getByRole('heading', { name: 'Cine' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Teatro' })).toBeInTheDocument();
    expect(screen.getByText('Musical')).toBeInTheDocument();
  });

  it('cada card enlaza a la ruta de su comunidad', async () => {
    render(<CommunityExplorer />);

    await waitFor(() => expect(screen.getByText('Drama')).toBeInTheDocument());
    const card = screen.getByText('Drama').closest('a');
    expect(card).toHaveAttribute('href', '/communities/drama');
  });
});
