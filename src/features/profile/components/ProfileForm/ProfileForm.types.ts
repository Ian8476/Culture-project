import type {
  CatalogData,
  ProfileFormController,
  ProfileFormValues,
} from '../../types/profile.types';

export interface ProfileFormProps {
  title: string;
  subtitle: string;
  submitLabel: string;
  form: ProfileFormController;
  catalog: CatalogData;
  catalogLoading: boolean;
  catalogError: string | null;
  isSaving: boolean;
  saveError: string | null;
  onSubmit: (values: ProfileFormValues) => void | Promise<void>;
}
