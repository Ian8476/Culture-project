import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { ROUTES, NEXT_QUERY_PARAM } from '@/shared/constants/routes.constants';
import { AuthError } from '@/shared/types/errors.types';
import * as authService from '../services/auth.service';
import { useRegister } from './useRegister';
import { useLogin } from './useLogin';
import { usePasswordReset } from './usePasswordReset';

const pushMock = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn() }),
  useSearchParams: () => mockSearchParams,
}));

vi.mock('../services/auth.service', () => ({
  register: vi.fn(),
  login: vi.fn(),
  requestPasswordReset: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockSearchParams = new URLSearchParams();
});

describe('useRegister', () => {
  it('redirige al onboarding tras un registro exitoso', async () => {
    vi.mocked(authService.register).mockResolvedValue('uid-1');
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.submit({ email: 'a@b.com', password: 'segura123', displayName: 'Ana' });
    });

    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(ROUTES.PROFILE.SETUP);
    expect(result.current.error).toBeNull();
  });

  it('expone el error y no redirige si falla', async () => {
    vi.mocked(authService.register).mockRejectedValue(new AuthError('correo en uso'));
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.submit({ email: 'a@b.com', password: 'segura123', displayName: 'Ana' });
    });

    await waitFor(() => expect(result.current.error).toBe('correo en uso'));
    expect(pushMock).not.toHaveBeenCalled();
  });
});

describe('useLogin', () => {
  it('redirige al perfil tras login exitoso', async () => {
    vi.mocked(authService.login).mockResolvedValue('uid-1');
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.submit({ email: 'a@b.com', password: 'segura123' });
    });

    expect(pushMock).toHaveBeenCalledWith(ROUTES.PROFILE.ROOT);
  });

  it('vuelve a la ruta original si hay ?next= interno', async () => {
    vi.mocked(authService.login).mockResolvedValue('uid-1');
    mockSearchParams = new URLSearchParams({ [NEXT_QUERY_PARAM]: '/communities/drama' });
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.submit({ email: 'a@b.com', password: 'segura123' });
    });

    expect(pushMock).toHaveBeenCalledWith('/communities/drama');
  });

  it('ignora un ?next= externo (protocol-relative) y va al perfil', async () => {
    vi.mocked(authService.login).mockResolvedValue('uid-1');
    mockSearchParams = new URLSearchParams({ [NEXT_QUERY_PARAM]: '//evil.example.com' });
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.submit({ email: 'a@b.com', password: 'segura123' });
    });

    expect(pushMock).toHaveBeenCalledWith(ROUTES.PROFILE.ROOT);
  });
});

describe('usePasswordReset', () => {
  it('marca isSent al enviar el correo', async () => {
    vi.mocked(authService.requestPasswordReset).mockResolvedValue();
    const { result } = renderHook(() => usePasswordReset());

    await act(async () => {
      await result.current.submit({ email: 'a@b.com' });
    });

    expect(result.current.isSent).toBe(true);
    expect(result.current.error).toBeNull();
  });
});
