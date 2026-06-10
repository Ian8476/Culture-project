import { APP_NAME, APP_DESCRIPTION } from '@/shared/constants/app.constants';
import { LandingCta } from '@/shared/components';

// Las pages solo delegan/estructuran. La landing es presentación pura; el header
// global (AppHeader) y los CTA (LandingCta) reflejan la sesión persistida.
export default function Page() {
  return (
    <>
      <main className="flex-1">
        {/* Hero */}
        <section className="relative mx-auto grid max-w-6xl items-center gap-16 overflow-x-clip px-6 pb-24 pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-24">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-0 select-none font-display text-[16rem] italic leading-none text-accent/10"
          >
            “
          </span>

          <div className="relative lg:col-span-7">
            <p className="reveal mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-ochre">
              <span aria-hidden="true" className="h-px w-10 bg-ochre/60" />
              Tertulia digital · Cine · Teatro · Lectura
            </p>
            <h1 className="reveal font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink [animation-delay:120ms] sm:text-6xl lg:text-7xl">
              Donde cada obra encuentra <em className="text-accent">su conversación</em>.
            </h1>
            <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-ink-soft [animation-delay:240ms]">
              {APP_DESCRIPTION}
            </p>
            <div className="reveal mt-10 [animation-delay:360ms]">
              <LandingCta variant="hero" />
            </div>
            <p className="reveal mt-8 text-sm text-ink-soft [animation-delay:480ms]">
              Aquí las discusiones marcan los spoilers:{' '}
              <span className="cursor-help rounded bg-surface-deep px-1.5 blur-[5px] transition-all duration-300 hover:blur-0">
                como este final inesperado
              </span>
            </p>
          </div>

          {/* Boletos decorativos apilados */}
          <div className="relative hidden h-[480px] lg:col-span-5 lg:block" aria-hidden="true">
            <article className="absolute left-0 top-2 w-80 -rotate-6 border border-line bg-surface shadow-[0_18px_40px_-18px_rgba(35,25,15,0.45)] transition-all duration-500 hover:z-10 hover:-translate-y-2 hover:rotate-0">
              <div className="flex items-center justify-between border-b border-dashed border-line px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-ochre">
                <span>Entrada N.º 001</span>
                <span>Sala 1</span>
              </div>
              <div className="px-5 py-6">
                <p className="font-display text-4xl font-semibold italic text-ink">Cine</p>
                <p className="mt-1 text-xs text-ink-soft">
                  Ciencia ficción · Drama · Comedia · Documental · Animación
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-line px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-ink-soft">
                <span>Fila A · Asiento 12</span>
                <span className="text-accent">Sin spoilers</span>
              </div>
            </article>

            <article className="absolute left-24 top-40 w-80 rotate-3 border border-line bg-surface shadow-[0_18px_40px_-18px_rgba(35,25,15,0.45)] transition-all duration-500 hover:z-10 hover:-translate-y-2 hover:rotate-0">
              <div className="flex items-center justify-between border-b border-dashed border-line px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-ochre">
                <span>Entrada N.º 002</span>
                <span>Platea</span>
              </div>
              <div className="px-5 py-6">
                <p className="font-display text-4xl font-semibold italic text-ink">Teatro</p>
                <p className="mt-1 text-xs text-ink-soft">
                  Clásico · Contemporáneo · Musical · Experimental
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-line px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-ink-soft">
                <span>Función de noche</span>
                <span className="text-accent">Sin spoilers</span>
              </div>
            </article>

            <article className="absolute left-6 top-[19rem] w-80 -rotate-2 border border-line bg-surface shadow-[0_18px_40px_-18px_rgba(35,25,15,0.45)] transition-all duration-500 hover:z-10 hover:-translate-y-2 hover:rotate-0">
              <div className="flex items-center justify-between border-b border-dashed border-line px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-ochre">
                <span>Entrada N.º 003</span>
                <span>Biblioteca</span>
              </div>
              <div className="px-5 py-6">
                <p className="font-display text-4xl font-semibold italic text-ink">Lectura</p>
                <p className="mt-1 text-xs text-ink-soft">
                  Novela · Ensayo · Poesía · Cuento · No ficción
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-line px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-ink-soft">
                <span>Capítulo abierto</span>
                <span className="text-accent">Sin spoilers</span>
              </div>
            </article>
          </div>
        </section>

        {/* Marquesina */}
        <div
          className="overflow-hidden border-y border-ink/20 bg-ink py-3 text-paper"
          aria-hidden="true"
        >
          <div className="flex w-max animate-marquee">
            <p className="shrink-0 pr-8 text-sm font-semibold uppercase tracking-[0.35em]">
              Cine ✦ Teatro ✦ Lectura ✦ Sin spoilers ✦ Por subgénero ✦ Por nivel ✦ Por perspectiva
              ✦{' '}
            </p>
            <p className="shrink-0 pr-8 text-sm font-semibold uppercase tracking-[0.35em]">
              Cine ✦ Teatro ✦ Lectura ✦ Sin spoilers ✦ Por subgénero ✦ Por nivel ✦ Por perspectiva
              ✦{' '}
            </p>
          </div>
        </div>

        {/* Tres escenarios */}
        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Tres escenarios, una misma mesa
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
                Nada de redes generales con ruido: te agrupamos por subgénero, perspectiva de
                análisis y nivel de conocimiento.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              <article className="group border-t-2 border-ink pt-6 transition-transform duration-300 hover:-translate-y-1.5">
                <p className="font-display text-sm italic text-accent">N.º 01</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink group-hover:text-accent">
                  Cine
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  De la ciencia ficción al documental: discute la trama, la técnica y la dirección
                  con personas que miran lo mismo que tú.
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ochre">
                  Ciencia ficción · Drama · Comedia · Documental · Animación
                </p>
              </article>

              <article className="group border-t-2 border-ink pt-6 transition-transform duration-300 hover:-translate-y-1.5">
                <p className="font-display text-sm italic text-accent">N.º 02</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink group-hover:text-accent">
                  Teatro
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  Del clásico al experimental: comenta la puesta en escena, la actuación y el texto
                  con tu propia platea.
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ochre">
                  Clásico · Contemporáneo · Musical · Experimental
                </p>
              </article>

              <article className="group border-t-2 border-ink pt-6 transition-transform duration-300 hover:-translate-y-1.5">
                <p className="font-display text-sm italic text-accent">N.º 03</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink group-hover:text-accent">
                  Lectura
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  De la novela al ensayo: subraya, reflexiona y comparte el contexto histórico con
                  tu círculo de lectura.
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ochre">
                  Novela · Ensayo · Poesía · Cuento · No ficción
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 flex items-center gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              La función comienza así
            </h2>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-line sm:block" />
          </div>

          <ol className="grid gap-12 md:grid-cols-3">
            <li className="relative pl-2">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 left-0 select-none font-display text-8xl font-semibold italic text-accent/15"
              >
                01
              </span>
              <h3 className="relative font-display text-xl font-semibold text-ink">
                Crea tu perfil cultural
              </h3>
              <p className="relative mt-3 leading-relaxed text-ink-soft">
                Elige tus intereses entre cine, teatro y lectura, y cuéntanos tu nivel: de quien
                apenas empieza a quien domina la materia.
              </p>
            </li>
            <li className="relative pl-2">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 left-0 select-none font-display text-8xl font-semibold italic text-accent/15"
              >
                02
              </span>
              <h3 className="relative font-display text-xl font-semibold text-ink">
                Afina tu lente
              </h3>
              <p className="relative mt-3 leading-relaxed text-ink-soft">
                Marca subgéneros y pondera tus perspectivas de análisis: trama, técnica, actuación,
                reflexión filosófica o contexto histórico.
              </p>
            </li>
            <li className="relative pl-2">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 left-0 select-none font-display text-8xl font-semibold italic text-accent/15"
              >
                03
              </span>
              <h3 className="relative font-display text-xl font-semibold text-ink">
                Únete a la tertulia
              </h3>
              <p className="relative mt-3 leading-relaxed text-ink-soft">
                Conecta con personas afines aunque estén lejos, y conversa a fondo sin ruido y sin
                spoilers que arruinen la obra.
              </p>
            </li>
          </ol>
        </section>

        {/* Llamado final */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-ochre">
              Telón arriba
            </p>
            <h2 className="font-display text-4xl font-semibold italic tracking-tight text-ink sm:text-5xl">
              La butaca de al lado está libre.
            </h2>
            <div className="mt-10 flex justify-center">
              <LandingCta variant="closing" />
            </div>
          </div>
        </section>
      </main>

      {/* Pie editorial con doble filete */}
      <footer className="border-t-2 border-ink bg-paper pt-1">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 border-t border-line px-6 py-12 text-center">
          <span className="font-display text-lg font-semibold italic text-ink">{APP_NAME}</span>
          <p className="text-xs uppercase tracking-[0.25em] text-ink-soft">
            Cine · Teatro · Lectura
          </p>
          <p className="text-xs text-ink-soft">
            Proyecto del curso Administración de Proyectos · Grupo 51
          </p>
        </div>
      </footer>
    </>
  );
}
