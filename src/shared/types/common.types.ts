// Estado asíncrono genérico para cualquier entidad del dominio.
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// Opción genérica para selects y multiselects.
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
