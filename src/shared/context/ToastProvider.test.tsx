import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useToast } from '@/shared/hooks/useToast';
import { ToastProvider } from './ToastProvider';
import { TOAST_DURATION_MS, TOAST_DISMISS_LABEL } from './ToastProvider.constants';

function Trigger({ message }: { message: string }) {
  const { showToast } = useToast();
  return (
    <button type="button" onClick={() => showToast(message)}>
      disparar
    </button>
  );
}

afterEach(() => {
  vi.useRealTimers();
});

describe('ToastProvider', () => {
  it('muestra el toast al dispararlo y permite descartarlo', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Trigger message="Perfil guardado." />
      </ToastProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'disparar' }));
    expect(screen.getByRole('status')).toHaveTextContent('Perfil guardado.');

    await user.click(screen.getByRole('button', { name: TOAST_DISMISS_LABEL }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('descarta el toast automáticamente al vencer su duración', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <Trigger message="Comentario publicado." />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'disparar' }));
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(TOAST_DURATION_MS + 1);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('useToast lanza si no hay provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => render(<Trigger message="sin provider" />)).toThrow();
    consoleError.mockRestore();
  });
});
