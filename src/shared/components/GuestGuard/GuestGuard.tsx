'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import { ROUTES } from '@/shared/constants/routes.constants';
import { LOADING_MESSAGE } from '@/shared/constants/app.constants';
import { Spinner } from '../Spinner';
import type { GuestGuardProps } from './GuestGuard.types';
import { GUEST_GUARD_WRAPPER_STYLES } from './GuestGuard.constants';

// Inverso de AuthGuard: las pantallas de auth (login/registro/recuperación)
// no tienen sentido con sesión activa — si Firebase restauró la sesión,
// lleva directo al perfil. Así "volver a abrir la app" retoma donde estabas.
export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && user !== null) {
      router.replace(ROUTES.PROFILE.ROOT);
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className={GUEST_GUARD_WRAPPER_STYLES}>
        <Spinner size="lg" ariaLabel={LOADING_MESSAGE} />
      </div>
    );
  }

  if (user !== null) return null;

  return <>{children}</>;
}
