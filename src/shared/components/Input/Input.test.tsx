import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { INPUT_SHOW_PASSWORD_LABEL, INPUT_HIDE_PASSWORD_LABEL } from './Input.constants';

describe('Input', () => {
  it('propaga los cambios de valor', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input value="" onChange={onChange} ariaLabel="correo" />);

    await user.type(screen.getByLabelText('correo'), 'a');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('permite mostrar y volver a ocultar la contraseña', async () => {
    const user = userEvent.setup();
    render(<Input value="secreta" onChange={vi.fn()} type="password" ariaLabel="contraseña" />);

    const field = screen.getByLabelText('contraseña');
    expect(field).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: INPUT_SHOW_PASSWORD_LABEL }));
    expect(field).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: INPUT_HIDE_PASSWORD_LABEL }));
    expect(field).toHaveAttribute('type', 'password');
  });

  it('no muestra el toggle en inputs que no son de contraseña', () => {
    render(<Input value="" onChange={vi.fn()} type="email" ariaLabel="correo" />);

    expect(
      screen.queryByRole('button', { name: INPUT_SHOW_PASSWORD_LABEL }),
    ).not.toBeInTheDocument();
  });
});
