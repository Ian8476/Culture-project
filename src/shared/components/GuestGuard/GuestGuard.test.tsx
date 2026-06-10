import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ROUTES } from '@/shared/constants/routes.constants';
import { GuestGuard } from './GuestGuard';

const replaceMock = vi.fn();

let mockAuth: { user: { uid: string } | null; isLoading: boolean; signOut: () => Promise<void> } = {
  user: null,
  isLoading: false,
  signOut: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock, push: vi.fn() }),
}));

vi.mock('@/shared/hooks/useAuthContext', () => ({
  useAuthContext: () => mockAuth,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GuestGuard', () => {
  it('renderiza los hijos cuando NO hay sesión', () => {
    mockAuth = { user: null, isLoading: false, signOut: vi.fn() };
    render(
      <GuestGuard>
        <span>formulario de login</span>
      </GuestGuard>,
    );
    expect(screen.getByText('formulario de login')).toBeInTheDocument();
  });

  it('redirige al perfil y oculta los hijos si la sesión sigue activa', async () => {
    mockAuth = { user: { uid: 'u1' }, isLoading: false, signOut: vi.fn() };
    render(
      <GuestGuard>
        <span>formulario de login</span>
      </GuestGuard>,
    );
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(ROUTES.PROFILE.ROOT));
    expect(screen.queryByText('formulario de login')).not.toBeInTheDocument();
  });

  it('muestra un spinner mientras Firebase restaura la sesión', () => {
    mockAuth = { user: null, isLoading: true, signOut: vi.fn() };
    render(
      <GuestGuard>
        <span>formulario de login</span>
      </GuestGuard>,
    );
    expect(screen.queryByText('formulario de login')).not.toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
