import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth';
import { PAGE_TITLES } from '@/shared/constants/app.constants';

export const metadata: Metadata = { title: PAGE_TITLES.LOGIN };

// La page solo delega al componente raíz de la feature. El Suspense es
// requisito de Next para useSearchParams (lee ?next=) durante el prerender.
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
