import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as authService from '../../services/auth.service';
import { AUTH_LABELS, AUTH_BUTTONS, AUTH_TITLES } from '../../constants/auth.constants';
import { RegisterForm } from './RegisterForm';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('../../services/auth.service', () => ({
  register: vi.fn(),
  login: vi.fn(),
  requestPasswordReset: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('RegisterForm', () => {
  it('renderiza el título de registro', () => {
    render(<RegisterForm />);
    expect(screen.getByText(AUTH_TITLES.REGISTER)).toBeInTheDocument();
  });

  it('no llama al service si los campos son inválidos', () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole('button', { name: AUTH_BUTTONS.REGISTER }));
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('envía el registro con datos válidos', async () => {
    vi.mocked(authService.register).mockResolvedValue('uid-1');
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(AUTH_LABELS.DISPLAY_NAME, { exact: false }), {
      target: { value: 'Ana' },
    });
    fireEvent.change(screen.getByLabelText(AUTH_LABELS.EMAIL, { exact: false }), {
      target: { value: 'ana@example.com' },
    });
    fireEvent.change(screen.getByLabelText(AUTH_LABELS.PASSWORD, { exact: false }), {
      target: { value: 'segura123' },
    });
    fireEvent.click(screen.getByRole('button', { name: AUTH_BUTTONS.REGISTER }));

    await waitFor(() =>
      expect(authService.register).toHaveBeenCalledWith({
        email: 'ana@example.com',
        password: 'segura123',
        displayName: 'Ana',
      }),
    );
  });
});
