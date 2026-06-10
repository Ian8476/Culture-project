import type { ReactNode } from 'react';
import { AuthGuard } from '@/shared/components';

interface CommunitiesLayoutProps {
  children: ReactNode;
}

// Layout protegido: todo el segmento /communities/* exige sesión (redirige a /login).
export default function CommunitiesLayout({ children }: CommunitiesLayoutProps) {
  return <AuthGuard>{children}</AuthGuard>;
}
