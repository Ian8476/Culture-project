import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('propaga los cambios de texto', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TextArea value="" onChange={onChange} ariaLabel="cuerpo" />);

    await user.type(screen.getByLabelText('cuerpo'), 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('marca aria-invalid cuando hay error', () => {
    render(<TextArea value="" onChange={vi.fn()} ariaLabel="cuerpo" hasError />);
    expect(screen.getByLabelText('cuerpo')).toHaveAttribute('aria-invalid', 'true');
  });
});
