import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ROUTES } from '@/shared/constants/routes.constants';
import { LandingCta } from './LandingCta';
import { LANDING_CTA_LABELS } from './LandingCta.constants';

let mockAuth: { user: { uid: string } | null; isLoading: boolean; signOut: () => Promise<void> } = {
  user: null,
  isLoading: false,
  signOut: vi.fn(),
};

vi.mock('@/shared/hooks/useAuthContext', () => ({
  useAuthContext: () => mockAuth,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('LandingCta', () => {
  it('invita a registrarse cuando no hay sesión', () => {
    mockAuth = { user: null, isLoading: false, signOut: vi.fn() };
    render(<LandingCta variant="hero" />);

    expect(screen.getByRole('link', { name: LANDING_CTA_LABELS.GUEST_PRIMARY })).toHaveAttribute(
      'href',
      ROUTES.AUTH.REGISTER,
    );
    expect(screen.getByRole('link', { name: LANDING_CTA_LABELS.GUEST_SECONDARY })).toHaveAttribute(
      'href',
      ROUTES.AUTH.LOGIN,
    );
  });

  it('lleva a comunidades y perfil cuando la sesión sigue abierta', () => {
    mockAuth = { user: { uid: 'u1' }, isLoading: false, signOut: vi.fn() };
    render(<LandingCta variant="hero" />);

    expect(screen.getByRole('link', { name: LANDING_CTA_LABELS.AUTHED_PRIMARY })).toHaveAttribute(
      'href',
      ROUTES.COMMUNITIES.ROOT,
    );
    expect(screen.getByRole('link', { name: LANDING_CTA_LABELS.AUTHED_SECONDARY })).toHaveAttribute(
      'href',
      ROUTES.PROFILE.ROOT,
    );
    expect(
      screen.queryByRole('link', { name: LANDING_CTA_LABELS.GUEST_PRIMARY }),
    ).not.toBeInTheDocument();
  });

  it('en la variante de cierre cambia el CTA según la sesión', () => {
    mockAuth = { user: { uid: 'u1' }, isLoading: false, signOut: vi.fn() };
    render(<LandingCta variant="closing" />);

    expect(screen.getByRole('link', { name: LANDING_CTA_LABELS.AUTHED_CLOSING })).toHaveAttribute(
      'href',
      ROUTES.COMMUNITIES.ROOT,
    );
  });
});
