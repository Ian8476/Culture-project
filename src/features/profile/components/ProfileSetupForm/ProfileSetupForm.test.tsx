import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { PROFILE_TITLES } from '../../constants/profile.constants';
import { ProfileSetupForm } from './ProfileSetupForm';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('@/shared/hooks/useAuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'u1' }, isLoading: false, signOut: vi.fn() }),
}));

vi.mock('@/shared/hooks/useToast', () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock('../../services/profile.service', () => ({
  getProfile: vi.fn(),
  createProfile: vi.fn(),
  updateProfile: vi.fn(),
}));

vi.mock('@/shared/services/catalog.service', () => ({
  getInterests: vi
    .fn()
    .mockResolvedValue([{ id: 'cine', name: 'Cine', slug: 'cine', active: true }]),
  getSubgenres: vi.fn().mockResolvedValue([]),
  getPerspectives: vi.fn().mockResolvedValue([]),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ProfileSetupForm', () => {
  it('renderiza el formulario con el catálogo cargado', async () => {
    render(<ProfileSetupForm />);

    expect(screen.getByText(PROFILE_TITLES.SETUP)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Cine')).toBeInTheDocument());
  });
});
