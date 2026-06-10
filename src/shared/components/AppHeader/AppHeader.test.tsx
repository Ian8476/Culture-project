import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { APP_NAME } from '@/shared/constants/app.constants';
import { AppHeader } from './AppHeader';
import { APP_HEADER_LABELS } from './AppHeader.constants';

const pushMock = vi.fn();
const signOutMock = vi.fn().mockResolvedValue(undefined);
const showToastMock = vi.fn();

let mockAuth: { user: { uid: string } | null; isLoading: boolean; signOut: () => Promise<void> } = {
  user: null,
  isLoading: false,
  signOut: signOutMock,
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn() }),
  usePathname: () => '/communities',
}));

vi.mock('@/shared/hooks/useAuthContext', () => ({
  useAuthContext: () => mockAuth,
}));

vi.mock('@/shared/hooks/useToast', () => ({
  useToast: () => ({ showToast: showToastMock }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AppHeader', () => {
  it('sin sesión muestra los accesos a login y registro', () => {
    mockAuth = { user: null, isLoading: false, signOut: signOutMock };
    render(<AppHeader />);

    expect(screen.getByText(APP_NAME)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: APP_HEADER_LABELS.LOGIN })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: APP_HEADER_LABELS.REGISTER })).toBeInTheDocument();
    expect(screen.queryByText(APP_HEADER_LABELS.SIGN_OUT)).not.toBeInTheDocument();
  });

  it('con sesión muestra la navegación y permite cerrar sesión', async () => {
    const user = userEvent.setup();
    mockAuth = { user: { uid: 'u1' }, isLoading: false, signOut: signOutMock };
    render(<AppHeader />);

    const communitiesLink = screen.getByRole('link', { name: APP_HEADER_LABELS.COMMUNITIES });
    expect(communitiesLink).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: APP_HEADER_LABELS.PROFILE })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: APP_HEADER_LABELS.LOGIN })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: APP_HEADER_LABELS.SIGN_OUT }));
    await waitFor(() => expect(signOutMock).toHaveBeenCalledTimes(1));
    expect(showToastMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('mientras carga la sesión no muestra ni login ni navegación', () => {
    mockAuth = { user: null, isLoading: true, signOut: signOutMock };
    render(<AppHeader />);

    expect(screen.queryByRole('link', { name: APP_HEADER_LABELS.LOGIN })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: APP_HEADER_LABELS.COMMUNITIES }),
    ).not.toBeInTheDocument();
  });
});
