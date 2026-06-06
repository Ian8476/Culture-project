import type { AuthCardProps } from './AuthCard.types';
import {
  AUTH_CARD_WRAPPER_STYLES,
  AUTH_CARD_PANEL_STYLES,
  AUTH_CARD_HEADER_STYLES,
  AUTH_CARD_TITLE_STYLES,
  AUTH_CARD_SUBTITLE_STYLES,
  AUTH_CARD_FOOTER_STYLES,
} from './AuthCard.constants';

// Wrapper presentacional de las pantallas de auth: panel centrado con header y footer.
export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <main className={AUTH_CARD_WRAPPER_STYLES}>
      <section className={AUTH_CARD_PANEL_STYLES}>
        <header className={AUTH_CARD_HEADER_STYLES}>
          <h1 className={AUTH_CARD_TITLE_STYLES}>{title}</h1>
          <p className={AUTH_CARD_SUBTITLE_STYLES}>{subtitle}</p>
        </header>
        {children}
        {footer !== undefined && <footer className={AUTH_CARD_FOOTER_STYLES}>{footer}</footer>}
      </section>
    </main>
  );
}
