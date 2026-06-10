import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { COMMUNITY_BUTTONS } from '../../constants/communities.constants';
import { DiscussionDetail } from './DiscussionDetail';

vi.mock('@/shared/hooks/useAuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'u1' }, isLoading: false, signOut: vi.fn() }),
}));

vi.mock('../../services/members.service', () => ({
  getMembersBySubgenre: vi.fn(),
  getMemberProfile: vi.fn(),
}));

vi.mock('../../services/discussion.service', () => ({
  getDiscussionsBySubgenre: vi.fn(),
  getDiscussion: vi.fn().mockResolvedValue({
    id: 'd1',
    subgenreSlug: 'drama',
    interestSlug: 'cine',
    title: 'Parásitos y la escalera',
    body: 'El sótano lo cambia todo.',
    hasSpoilers: true,
    authorId: 'u2',
    authorName: 'Zoe',
    createdAt: new Date('2026-06-01T12:00:00Z'),
  }),
  createDiscussion: vi.fn(),
  getComments: vi.fn().mockResolvedValue([
    {
      id: 'c1',
      body: 'Gran punto.',
      hasSpoilers: false,
      authorId: 'u3',
      authorName: 'Luis',
      createdAt: new Date('2026-06-02T12:00:00Z'),
    },
  ]),
  addComment: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('DiscussionDetail', () => {
  it('cubre el cuerpo con spoilers hasta revelarlo y lista los comentarios', async () => {
    const user = userEvent.setup();
    render(<DiscussionDetail subgenreSlug="drama" discussionId="d1" />);

    await waitFor(() => expect(screen.getByText('Parásitos y la escalera')).toBeInTheDocument());

    expect(screen.queryByText('El sótano lo cambia todo.')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: COMMUNITY_BUTTONS.REVEAL_SPOILER }));
    expect(screen.getByText('El sótano lo cambia todo.')).toBeInTheDocument();

    expect(screen.getByText('Luis')).toBeInTheDocument();
    expect(screen.getByText('Gran punto.')).toBeInTheDocument();
  });
});
