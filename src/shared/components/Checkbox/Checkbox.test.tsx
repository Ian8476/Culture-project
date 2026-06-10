import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('notifica el cambio de estado al hacer clic', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Contiene spoilers" checked={false} onChange={onChange} />);

    await user.click(screen.getByRole('checkbox', { name: 'Contiene spoilers' }));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('no permite interacción cuando está deshabilitado', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Contiene spoilers" checked={false} onChange={onChange} disabled />);

    await user.click(screen.getByRole('checkbox', { name: 'Contiene spoilers' }));

    expect(onChange).not.toHaveBeenCalled();
  });
});
