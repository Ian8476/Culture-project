// Barrel público de la feature profile. Las pages solo importan desde aquí.
export { ProfileSetupForm } from './components/ProfileSetupForm';
export { ProfileEditForm } from './components/ProfileEditForm';
export { ProfileView } from './components/ProfileView';

export { getProfile, createProfile, updateProfile } from './services/profile.service';

export type { ProfileFormValues, ProfileFieldErrors, CatalogData } from './types/profile.types';
