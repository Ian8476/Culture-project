'use client';

import { Button } from '@/shared/components';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Boundary global de errores inesperados: mensaje amable + reintento,
// en lugar de una pantalla rota.
export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <p aria-hidden="true" className="font-display text-7xl font-semibold italic text-accent/20">
          ¡Telón!
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
          Algo se salió del guion
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Ocurrió un error inesperado. Puedes intentarlo de nuevo; si persiste, recarga la página.
        </p>
        <div className="mt-8 flex justify-center">
          <Button label="Intentar de nuevo" onClick={reset} />
        </div>
      </div>
    </main>
  );
}
