// Contratos de la feature profile. Forma de los valores del formulario de
// onboarding/edición y de los catálogos cargados.

import type {
  Interest,
  KnowledgeLevel,
  Perspective,
  ProfileInterest,
  ProfilePerspective,
  Subgenre,
} from '@/shared/types/domain.types';

// Valores editables del perfil (compartidos por onboarding y edición).
export interface ProfileFormValues {
  displayName: string;
  bio: string;
  interests: Record<string, ProfileInterest>;
  subgenres: Record<string, true>;
  perspectives: Record<string, ProfilePerspective>;
}

// Errores por nombre de campo del formulario de perfil.
export type ProfileFieldErrors = Record<string, string>;

// Catálogos cargados desde Firestore para alimentar los selectores.
export interface CatalogData {
  interests: Interest[];
  subgenres: Subgenre[];
  perspectives: Perspective[];
}

// Controlador del estado del formulario (lo que expone useProfileForm).
export interface ProfileFormController {
  values: ProfileFormValues;
  setDisplayName: (displayName: string) => void;
  setBio: (bio: string) => void;
  toggleInterest: (slug: string) => void;
  setKnowledgeLevel: (slug: string, level: KnowledgeLevel) => void;
  toggleSubgenre: (slug: string) => void;
  togglePerspective: (slug: string) => void;
  setPerspectiveWeight: (slug: string, weight: number) => void;
}
