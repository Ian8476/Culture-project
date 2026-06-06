import Link from 'next/link';
import { APP_NAME, APP_DESCRIPTION } from '@/shared/constants/app.constants';
import { ROUTES } from '@/shared/constants/routes.constants';

// Las pages solo delegan/estructuran. La landing es presentación pura sin lógica.
export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{APP_NAME}</h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">{APP_DESCRIPTION}</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href={ROUTES.AUTH.REGISTER}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-6 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Crear cuenta
        </Link>
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-300 px-6 font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Iniciar sesión
        </Link>
      </div>
    </main>
  );
}
