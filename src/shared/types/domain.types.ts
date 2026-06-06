// Entidades de dominio expuestas por la capa de data access.
// Las fechas se exponen como `Date`, nunca como `Timestamp` de Firestore.

export type KnowledgeLevel = 'NOVICE' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface User {
  id: string; // UID de Firebase Authentication
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileInterest {
  knowledgeLevel: KnowledgeLevel;
}

export interface ProfilePerspective {
  weight: number; // 1 a 5
}

export interface Profile {
  id: string; // mismo UID del User
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  interests: Record<string, ProfileInterest>;
  subgenres: Record<string, true>;
  perspectives: Record<string, ProfilePerspective>;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Interest {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

export interface Subgenre {
  id: string;
  interestSlug: string;
  name: string;
  slug: string;
  active: boolean;
}

export interface Perspective {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
}
