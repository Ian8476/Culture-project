// Tema visual de la interfaz. El valor se refleja en el atributo `data-theme`
// del documento, que los tokens de `globals.css` traducen a la paleta correcta.
export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
