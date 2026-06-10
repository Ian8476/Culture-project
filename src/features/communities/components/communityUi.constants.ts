// Estilos compartidos por los componentes de la feature communities.
export const COMMUNITY_PAGE_WRAPPER_STYLES = 'mx-auto w-full max-w-3xl px-6 py-14' as const;
export const COMMUNITY_HEADER_STYLES =
  'reveal mb-10 flex flex-col gap-2 border-b border-line pb-8' as const;
export const COMMUNITY_TITLE_STYLES =
  'font-display text-4xl font-semibold tracking-tight text-ink' as const;
export const COMMUNITY_SUBTITLE_STYLES = 'text-ink-soft' as const;
export const COMMUNITY_EYEBROW_STYLES =
  'text-xs font-semibold uppercase tracking-[0.25em] text-ochre' as const;
export const COMMUNITY_SECTION_STYLES = 'mb-10 flex flex-col gap-4' as const;
export const COMMUNITY_SECTION_HEADING_STYLES =
  'text-xs font-semibold uppercase tracking-[0.25em] text-ochre' as const;
export const COMMUNITY_ERROR_STYLES =
  'rounded-sm border border-alert/30 bg-alert-soft px-3 py-2 text-sm text-alert' as const;
// Variante de error con acción de reintento al lado.
export const COMMUNITY_ERROR_ROW_STYLES =
  'flex flex-wrap items-center justify-between gap-3 rounded-sm border border-alert/30 bg-alert-soft px-3 py-2' as const;
export const COMMUNITY_ERROR_TEXT_STYLES = 'text-sm text-alert' as const;
export const COMMUNITY_NAV_STYLES = 'mb-8 flex flex-wrap items-center gap-3 text-sm' as const;
export const COMMUNITY_NAV_LINK_STYLES =
  'text-accent underline-offset-4 transition-colors hover:text-accent-deep hover:underline' as const;

// Grilla de cards de comunidades en el explorador.
export const COMMUNITY_CARD_GRID_STYLES = 'grid gap-3 sm:grid-cols-2' as const;
export const COMMUNITY_CARD_STYLES =
  'group flex flex-col gap-1 rounded-sm border border-line bg-surface px-4 py-3.5 transition-colors hover:border-accent/50 hover:bg-accent-soft/40' as const;
export const COMMUNITY_CARD_NAME_STYLES =
  'font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent-deep' as const;
export const COMMUNITY_CARD_HINT_STYLES = 'text-sm text-ink-soft' as const;

// Miembros.
export const MEMBER_LIST_STYLES = 'flex flex-wrap gap-2' as const;
export const MEMBER_CARD_STYLES =
  'inline-flex max-w-full flex-col gap-0.5 rounded-sm border border-line bg-surface px-3.5 py-2' as const;
export const MEMBER_NAME_STYLES = 'text-sm font-medium text-ink' as const;
export const MEMBER_BIO_STYLES = 'max-w-60 truncate text-xs text-ink-soft' as const;

// Discusiones y comentarios.
export const DISCUSSION_LIST_STYLES = 'flex flex-col gap-3' as const;
export const DISCUSSION_CARD_STYLES =
  'group flex flex-col gap-1.5 rounded-sm border border-line bg-surface px-4 py-3.5 transition-colors hover:border-accent/50' as const;
export const DISCUSSION_CARD_TITLE_STYLES =
  'font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent-deep' as const;
export const DISCUSSION_META_STYLES =
  'flex flex-wrap items-center gap-2 text-xs text-ink-soft' as const;
export const DISCUSSION_BODY_STYLES =
  'whitespace-pre-wrap text-base leading-relaxed text-ink' as const;
export const SPOILER_BADGE_STYLES =
  'inline-flex items-center rounded-full border border-alert/30 bg-alert-soft px-2.5 py-0.5 text-xs font-medium text-alert' as const;
export const SPOILER_COVER_STYLES =
  'flex flex-col items-start gap-3 rounded-sm border border-dashed border-line bg-surface-deep/60 px-4 py-4 text-sm text-ink-soft' as const;
export const COMMENT_LIST_STYLES = 'flex flex-col gap-3' as const;
export const COMMENT_CARD_STYLES =
  'flex flex-col gap-1.5 rounded-sm border border-line bg-surface px-4 py-3' as const;

// Formularios de publicación.
export const COMPOSER_STYLES =
  'flex flex-col gap-4 rounded-sm border border-line bg-surface px-5 py-5' as const;
export const COMPOSER_ACTIONS_STYLES = 'flex items-center justify-between gap-3' as const;
export const COMPOSER_BUTTON_ROW_STYLES = 'flex gap-3' as const;
