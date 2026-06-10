export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
}
