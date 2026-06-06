import type { CatalogData, ProfileFieldErrors, ProfileFormController } from '../../types/profile.types';

export interface ProfileFormBodyProps {
  form: ProfileFormController;
  catalog: CatalogData;
  errors: ProfileFieldErrors;
  disabled?: boolean;
}
