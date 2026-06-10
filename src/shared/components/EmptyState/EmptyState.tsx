import type { EmptyStateProps } from './EmptyState.types';
import {
  EMPTY_STATE_DEFAULT_ORNAMENT,
  EMPTY_STATE_WRAPPER_STYLES,
  EMPTY_STATE_ORNAMENT_STYLES,
  EMPTY_STATE_TITLE_STYLES,
  EMPTY_STATE_HINT_STYLES,
} from './EmptyState.constants';

// Estado vacío amable: en lugar de un párrafo suelto, una invitación clara
// a ser la primera persona en participar.
export function EmptyState({ title, hint, ornament = EMPTY_STATE_DEFAULT_ORNAMENT }: EmptyStateProps) {
  return (
    <div className={EMPTY_STATE_WRAPPER_STYLES}>
      <span aria-hidden="true" className={EMPTY_STATE_ORNAMENT_STYLES}>
        {ornament}
      </span>
      <p className={EMPTY_STATE_TITLE_STYLES}>{title}</p>
      {hint !== undefined && <p className={EMPTY_STATE_HINT_STYLES}>{hint}</p>}
    </div>
  );
}
