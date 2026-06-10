import type { ReactNode } from 'react';
import { GuestGuard } from '@/shared/components';

interface AuthLayoutProps {
  children: ReactNode;
}

// Layout del grupo (auth): si ya hay sesión persistida, estas pantallas
// redirigen al perfil en vez de pedir credenciales otra vez.
export default function AuthLayout({ children }: AuthLayoutProps) {
  return <GuestGuard>{children}</GuestGuard>;
}
