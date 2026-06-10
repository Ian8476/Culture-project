'use client';

import Link from 'next/link';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { LandingCtaProps } from './LandingCta.types';
import {
  LANDING_CTA_LABELS,
  LANDING_CTA_WELCOME_BACK,
  LANDING_CTA_ROW_STYLES,
  LANDING_CTA_PRIMARY_STYLES,
  LANDING_CTA_SECONDARY_STYLES,
  LANDING_CTA_CLOSING_STYLES,
  LANDING_CTA_WELCOME_STYLES,
  LANDING_CTA_SKELETON_ROW_STYLES,
  LANDING_CTA_SKELETON_PILL_STYLES,
} from './LandingCta.constants';

// Llamados a la acción de la landing conscientes de la sesión persistida:
// a una visita nueva la invitan a registrarse; a quien ya tiene sesión la
// llevan directo a las comunidades o a su perfil (nada de pedir login otra vez).
export function LandingCta({ variant }: LandingCtaProps) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className={LANDING_CTA_SKELETON_ROW_STYLES} aria-hidden="true">
        <span className={LANDING_CTA_SKELETON_PILL_STYLES} />
        {variant === 'hero' && <span className={LANDING_CTA_SKELETON_PILL_STYLES} />}
      </div>
    );
  }

  if (variant === 'closing') {
    return user !== null ? (
      <Link href={ROUTES.COMMUNITIES.ROOT} className={LANDING_CTA_CLOSING_STYLES}>
        {LANDING_CTA_LABELS.AUTHED_CLOSING}
      </Link>
    ) : (
      <Link href={ROUTES.AUTH.REGISTER} className={LANDING_CTA_CLOSING_STYLES}>
        {LANDING_CTA_LABELS.GUEST_CLOSING}
      </Link>
    );
  }

  if (user !== null) {
    return (
      <div className={LANDING_CTA_ROW_STYLES}>
        <Link href={ROUTES.COMMUNITIES.ROOT} className={LANDING_CTA_PRIMARY_STYLES}>
          {LANDING_CTA_LABELS.AUTHED_PRIMARY}
        </Link>
        <Link href={ROUTES.PROFILE.ROOT} className={LANDING_CTA_SECONDARY_STYLES}>
          {LANDING_CTA_LABELS.AUTHED_SECONDARY}
        </Link>
        <p className={LANDING_CTA_WELCOME_STYLES}>{LANDING_CTA_WELCOME_BACK}</p>
      </div>
    );
  }

  return (
    <div className={LANDING_CTA_ROW_STYLES}>
      <Link href={ROUTES.AUTH.REGISTER} className={LANDING_CTA_PRIMARY_STYLES}>
        {LANDING_CTA_LABELS.GUEST_PRIMARY}
      </Link>
      <Link href={ROUTES.AUTH.LOGIN} className={LANDING_CTA_SECONDARY_STYLES}>
        {LANDING_CTA_LABELS.GUEST_SECONDARY}
      </Link>
    </div>
  );
}
