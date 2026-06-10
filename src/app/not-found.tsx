import type { Metadata } from 'next';
import Link from 'next/link';
import { PAGE_TITLES } from '@/shared/constants/app.constants';
import { ROUTES } from '@/shared/constants/routes.constants';

export const metadata: Metadata = { title: PAGE_TITLES.NOT_FOUND };

// 404 con el tono editorial del sitio: función que no está en cartelera.
export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <p className="font-display text-8xl font-semibold italic text-accent/20">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
          Esta función no está en cartelera
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          La página que buscas no existe o cambió de sala. Vuelve al inicio y retoma la
          conversación.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={ROUTES.HOME}
            className="rounded-full bg-ink px-8 py-3 text-sm font-semibold tracking-wide text-paper transition-all hover:bg-accent active:scale-95"
          >
            Volver al inicio
          </Link>
          <Link
            href={ROUTES.COMMUNITIES.ROOT}
            className="rounded-full border border-line bg-surface px-8 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink"
          >
            Ir a las comunidades
          </Link>
        </div>
      </div>
    </main>
  );
}
