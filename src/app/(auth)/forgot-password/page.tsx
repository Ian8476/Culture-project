import type { Metadata } from 'next';
import { ForgotPasswordForm } from '@/features/auth';
import { PAGE_TITLES } from '@/shared/constants/app.constants';

export const metadata: Metadata = { title: PAGE_TITLES.FORGOT_PASSWORD };

// La page solo delega al componente raíz de la feature.
export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
