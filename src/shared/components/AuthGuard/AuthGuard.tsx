'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import { loginRouteWithNext } from '@/shared/constants/routes.constants';
import { LOADING_MESSAGE } from '@/shared/constants/app.constants';
import { Spinner } from '../Spinner';
import type { AuthGuardProps } from './AuthGuard.types';
import { AUTH_GUARD_WRAPPER_STYLES } from './AuthGuard.constants';

// Protección de rutas en cliente: redirige a /login si no hay sesión,
// recordando la ruta original (?next=) para volver tras autenticarse.
// La seguridad real vive en las Firestore Security Rules; esto es solo UX.
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && user === null) {
      router.replace(loginRouteWithNext(pathname));
    }
  }, [isLoading, user, router, pathname]);

  if (isLoading) {
    return (
      <div className={AUTH_GUARD_WRAPPER_STYLES}>
        <Spinner size="lg" ariaLabel={LOADING_MESSAGE} />
      </div>
    );
  }

  if (user === null) return null;

  return <>{children}</>;
}
