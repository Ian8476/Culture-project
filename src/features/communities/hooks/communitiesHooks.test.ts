import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import * as discussionService from '../services/discussion.service';
import * as membersService from '../services/members.service';
import { useDiscussions } from './useDiscussions';
import { useCommunityMembers } from './useCommunityMembers';
import { useDiscussionComposer } from './useDiscussionComposer';
import { useCommentComposer } from './useCommentComposer';
import { COMMUNITY_MESSAGES } from '../constants/communities.constants';

vi.mock('@/shared/hooks/useAuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'u1' }, isLoading: false, signOut: vi.fn() }),
}));

vi.mock('../services/discussion.service', () => ({
  getDiscussionsBySubgenre: vi.fn(),
  getDiscussion: vi.fn(),
  createDiscussion: vi.fn(),
  getComments: vi.fn(),
  addComment: vi.fn(),
}));

vi.mock('../services/members.service', () => ({
  getMembersBySubgenre: vi.fn(),
  getMemberProfile: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useDiscussions', () => {
  it('carga las discusiones del subgénero', async () => {
    vi.mocked(discussionService.getDiscussionsBySubgenre).mockResolvedValue([
      { id: 'd1' },
    ] as never);

    const { result } = renderHook(() => useDiscussions('drama'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.discussions).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });
});

describe('useCommunityMembers', () => {
  it('carga los miembros del subgénero', async () => {
    vi.mocked(membersService.getMembersBySubgenre).mockResolvedValue([
      { id: 'u1', displayName: 'Ana' },
    ] as never);

    const { result } = renderHook(() => useCommunityMembers('drama'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.members).toHaveLength(1);
  });
});

describe('useDiscussionComposer', () => {
  const params = { subgenreSlug: 'drama', interestSlug: 'cine', onCreated: vi.fn() };

  it('valida título y cuerpo antes de publicar', async () => {
    const { result } = renderHook(() => useDiscussionComposer(params));

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.fieldErrors.title).toBeDefined();
    expect(result.current.fieldErrors.body).toBeDefined();
    expect(discussionService.createDiscussion).not.toHaveBeenCalled();
  });

  it('publica con el displayName del perfil y resetea el formulario', async () => {
    vi.mocked(membersService.getMemberProfile).mockResolvedValue({
      id: 'u1',
      displayName: 'Ana',
    } as never);
    vi.mocked(discussionService.createDiscussion).mockResolvedValue('d1');
    const onCreated = vi.fn();

    const { result } = renderHook(() => useDiscussionComposer({ ...params, onCreated }));

    act(() => {
      result.current.setTitle('Parásitos');
      result.current.setBody('Análisis de la escalera.');
    });
    await act(async () => {
      await result.current.submit();
    });

    expect(discussionService.createDiscussion).toHaveBeenCalledWith(
      expect.objectContaining({ authorId: 'u1', authorName: 'Ana', subgenreSlug: 'drama' }),
    );
    expect(onCreated).toHaveBeenCalled();
    expect(result.current.title).toBe('');
  });

  it('exige perfil completo para publicar', async () => {
    vi.mocked(membersService.getMemberProfile).mockResolvedValue(null);

    const { result } = renderHook(() => useDiscussionComposer(params));

    act(() => {
      result.current.setTitle('Título válido');
      result.current.setBody('Contenido.');
    });
    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.error).toBe(COMMUNITY_MESSAGES.PROFILE_REQUIRED);
    expect(discussionService.createDiscussion).not.toHaveBeenCalled();
  });
});

describe('useCommentComposer', () => {
  it('publica el comentario y resetea el cuerpo', async () => {
    vi.mocked(membersService.getMemberProfile).mockResolvedValue({
      id: 'u1',
      displayName: 'Ana',
    } as never);
    vi.mocked(discussionService.addComment).mockResolvedValue();
    const onCreated = vi.fn();

    const { result } = renderHook(() => useCommentComposer({ discussionId: 'd1', onCreated }));

    act(() => {
      result.current.setBody('Gran punto.');
    });
    await act(async () => {
      await result.current.submit();
    });

    expect(discussionService.addComment).toHaveBeenCalledWith(
      'd1',
      expect.objectContaining({ authorName: 'Ana' }),
    );
    expect(onCreated).toHaveBeenCalled();
    expect(result.current.body).toBe('');
  });

  it('no publica comentarios vacíos', async () => {
    const { result } = renderHook(() =>
      useCommentComposer({ discussionId: 'd1', onCreated: vi.fn() }),
    );

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.bodyError).toBe(COMMUNITY_MESSAGES.BODY_REQUIRED);
    expect(discussionService.addComment).not.toHaveBeenCalled();
  });
});
