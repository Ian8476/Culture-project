import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('muestra el título y la pista', () => {
    render(<EmptyState title="Aún no hay discusiones." hint="Abre la primera." />);

    expect(screen.getByText('Aún no hay discusiones.')).toBeInTheDocument();
    expect(screen.getByText('Abre la primera.')).toBeInTheDocument();
  });

  it('omite la pista si no se pasa', () => {
    render(<EmptyState title="Nada por aquí." />);

    expect(screen.getByText('Nada por aquí.')).toBeInTheDocument();
  });
});
