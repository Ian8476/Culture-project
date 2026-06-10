import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { COMMUNITY_BUTTONS } from '../../constants/communities.constants';
import { SpoilerContent } from './SpoilerContent';

describe('SpoilerContent', () => {
  it('muestra el contenido directamente si no hay spoilers', () => {
    render(
      <SpoilerContent hasSpoilers={false}>
        <p>Contenido visible</p>
      </SpoilerContent>,
    );
    expect(screen.getByText('Contenido visible')).toBeInTheDocument();
  });

  it('cubre el contenido con spoilers hasta que se revela', async () => {
    const user = userEvent.setup();
    render(
      <SpoilerContent hasSpoilers>
        <p>El final de la obra</p>
      </SpoilerContent>,
    );

    expect(screen.queryByText('El final de la obra')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: COMMUNITY_BUTTONS.REVEAL_SPOILER }));

    expect(screen.getByText('El final de la obra')).toBeInTheDocument();
  });
});
