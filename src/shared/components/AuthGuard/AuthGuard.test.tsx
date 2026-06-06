import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ROUTES } from '@/shared/constants/routes.constants';
import { AuthGuard } from './AuthGuard';

const replaceMock = vi.fn();

let mockAuth: { user: { uid: string } | null; isLoading: boolean; signOut: () => Promise<void> } = {
  user: { uid: 'u1' },
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

describe('AuthGuard', () => {
  it('renderiza los hijos cuando hay sesión', () => {
    mockAuth = { user: { uid: 'u1' }, isLoading: false, signOut: vi.fn() };
    render(
      <AuthGuard>
        <span>contenido protegido</span>
      </AuthGuard>,
    );
    expect(screen.getByText('contenido protegido')).toBeInTheDocument();
  });

  it('redirige a /login y oculta los hijos sin sesión', async () => {
    mockAuth = { user: null, isLoading: false, signOut: vi.fn() };
    render(
      <AuthGuard>
        <span>contenido protegido</span>
      </AuthGuard>,
    );
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(ROUTES.AUTH.LOGIN));
    expect(screen.queryByText('contenido protegido')).not.toBeInTheDocument();
  });
});
