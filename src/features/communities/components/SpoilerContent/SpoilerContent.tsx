'use client';

import { useState } from 'react';
import { Button } from '@/shared/components';
import { COMMUNITY_BUTTONS, COMMUNITY_MESSAGES } from '../../constants/communities.constants';
import { SPOILER_COVER_STYLES } from '../communityUi.constants';
import type { SpoilerContentProps } from './SpoilerContent.types';

// Mitigación de spoilers: cubre el contenido marcado hasta que el lector
// decida revelarlo explícitamente.
export function SpoilerContent({ hasSpoilers, children }: SpoilerContentProps) {
  const [revealed, setRevealed] = useState(false);

  if (!hasSpoilers || revealed) {
    return <>{children}</>;
  }

  return (
    <div className={SPOILER_COVER_STYLES}>
      <p>{COMMUNITY_MESSAGES.SPOILER_HIDDEN}</p>
      <Button
        label={COMMUNITY_BUTTONS.REVEAL_SPOILER}
        variant="secondary"
        size="sm"
        onClick={() => setRevealed(true)}
      />
    </div>
  );
}
