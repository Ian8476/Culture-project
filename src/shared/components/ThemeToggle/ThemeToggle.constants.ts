// Etiquetas accesibles: describen la acción que ejecuta el botón (el tema al que
// cambiaría), no el estado actual.
export const THEME_TOGGLE_LABELS = {
  TO_DARK: 'Activar modo oscuro',
  TO_LIGHT: 'Activar modo claro',
} as const;

// Botón ícono redondo, alineado con el lenguaje visual del header y de Button.
export const THEME_TOGGLE_BUTTON_STYLES =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-all hover:border-ink hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-95' as const;

export const THEME_TOGGLE_ICON_STYLES = 'h-[18px] w-[18px]' as const;
