import type { Metadata } from 'next';
import { RegisterForm } from '@/features/auth';
import { PAGE_TITLES } from '@/shared/constants/app.constants';

export const metadata: Metadata = { title: PAGE_TITLES.REGISTER };

// La page solo delega al componente raíz de la feature.
export default function RegisterPage() {
  return <RegisterForm />;
}
