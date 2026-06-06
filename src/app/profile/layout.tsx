import type { ReactNode } from 'react';
import { AuthGuard } from '@/shared/components';

interface ProfileLayoutProps {
  children: ReactNode;
}

// Layout protegido: todo el segmento /profile/* exige sesión (redirige a /login).
export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <AuthGuard>{children}</AuthGuard>;
}
