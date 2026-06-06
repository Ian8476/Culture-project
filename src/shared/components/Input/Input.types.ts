export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: InputType;
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  hasError?: boolean;
  autoComplete?: string;
  ariaLabel?: string;
}
