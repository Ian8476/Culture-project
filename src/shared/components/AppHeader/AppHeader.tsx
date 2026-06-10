'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import { useToast } from '@/shared/hooks/useToast';
import { ROUTES } from '@/shared/constants/routes.constants';
import { APP_NAME } from '@/shared/constants/app.constants';
import { Button } from '../Button';
import {
  APP_HEADER_LABELS,
  APP_HEADER_NAV_LINKS,
  APP_HEADER_SIGN_OUT_TOAST,
  APP_HEADER_WRAPPER_STYLES,
  APP_HEADER_NAV_STYLES,
  APP_HEADER_BRAND_STYLES,
  APP_HEADER_ACTIONS_STYLES,
  APP_HEADER_LINK_STYLES,
  APP_HEADER_LINK_ACTIVE_STYLES,
  APP_HEADER_CTA_STYLES,
  APP_HEADER_SKELETON_STYLES,
} from './AppHeader.constants';

// Header global presente en toda la app. Refleja la sesión persistida:
// con sesión muestra la navegación principal y "Cerrar sesión"; sin sesión,
// los accesos a login/registro. Mientras Firebase restaura la sesión muestra
// un placeholder para no parpadear el estado equivocado.
export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, signOut } = useAuthContext();
  const { showToast } = useToast();

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  async function handleSignOut(): Promise<void> {
    await signOut();
    showToast(APP_HEADER_SIGN_OUT_TOAST, 'info');
    router.push(ROUTES.HOME);
  }

  return (
    <header className={APP_HEADER_WRAPPER_STYLES}>
      <nav className={APP_HEADER_NAV_STYLES}>
        <Link href={ROUTES.HOME} className={APP_HEADER_BRAND_STYLES}>
          {APP_NAME}
        </Link>

        {isLoading ? (
          <span aria-hidden="true" className={APP_HEADER_SKELETON_STYLES} />
        ) : user !== null ? (
          <div className={APP_HEADER_ACTIONS_STYLES}>
            {APP_HEADER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={isActive(link.href) ? APP_HEADER_LINK_ACTIVE_STYLES : APP_HEADER_LINK_STYLES}
              >
                {link.label}
              </Link>
            ))}
            <Button
              label={APP_HEADER_LABELS.SIGN_OUT}
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
            />
          </div>
        ) : (
          <div className={APP_HEADER_ACTIONS_STYLES}>
            <Link href={ROUTES.AUTH.LOGIN} className={APP_HEADER_LINK_STYLES}>
              {APP_HEADER_LABELS.LOGIN}
            </Link>
            <Link href={ROUTES.AUTH.REGISTER} className={APP_HEADER_CTA_STYLES}>
              {APP_HEADER_LABELS.REGISTER}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
