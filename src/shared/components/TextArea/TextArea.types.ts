export interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  rows?: number;
  disabled?: boolean;
  hasError?: boolean;
  maxLength?: number;
  ariaLabel?: string;
}
