# Estado del Proyecto — Plataforma Cultural

> Bitácora viva del avance del prototipo. Se actualiza al cerrar cada tanda de trabajo.
> Fuente de verdad de arquitectura y reglas: [`Project-context.md`](./Project-context.md).

**Última actualización:** 2026-06-10
**Sprint:** 3–4 (Comunidades + pulido de UX y sesión persistente)
**Fase actual:** UX integral pulida (Tanda 4): sesión persistente visible en toda la app (AppHeader global + GuestGuard + CTAs de landing según sesión), toasts de confirmación, fechas relativas, estados vacíos amables, 404/error pages y metadata por página. Verificado: typecheck/lint/test/build verdes, **104 tests**, cobertura global ~63%. Pendiente: deploy de rules/índices (bloqueado por permisos, ver §3.ter) y de la app en Vercel.

---

## 1. Resumen del stack montado

| Área | Decisión | Estado |
|------|----------|--------|
| Framework | Next.js **15.5** (App Router, `src/`) | ✅ Instalado |
| UI | React 19 + Tailwind CSS v4 | ✅ |
| Lenguaje | TypeScript `strict` | ✅ |
| Backend | Firebase (Firestore + Auth), SDK cliente | ✅ Capa lista (faltan credenciales reales) |
| Validación | Zod | ✅ Esquemas base |
| Testing | Vitest + Testing Library | ✅ Configurado (sin tests aún) |
| Lint/format | ESLint (flat config) + Prettier | ✅ |
| Gestor | pnpm | ✅ |

> **Nota de versión:** `create-next-app` instala Next 16, pero el `Project-context.md` fija
> **Next 15**. Se ancló a 15.5 a propósito para honrar el stack documentado.

---

## 2. Lo que YA está hecho (Tanda 1 — Scaffold + Base)

### Configuración
- [x] Proyecto Next.js 15 scaffoldeado e integrado en la raíz (con `.git` inicializado).
- [x] `package.json` con scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `test`, `test:watch`, `test:coverage`, `seed`, `prepare`.
- [x] `tsconfig.json` con path aliases `@/*`, `@features/*`, `@shared/*`, `@lib/*`.
- [x] `eslint.config.mjs` con reglas del proyecto: `no-explicit-any` (error), `consistent-type-imports` (error), `no-magic-numbers` (warn, ignora 0/1/-1).
- [x] `.prettierrc` + `.prettierignore`.
- [x] `vitest.config.ts` + `vitest.setup.ts` (jsdom, alias `@`, coverage v8).

### Capa Firebase (`src/lib/firebase/`)
- [x] `client.ts` — inicialización única del SDK (auth + firestore) leyendo env vars.
- [x] `collections.ts` — constante `COLLECTIONS` con nombres de colección.
- [x] `converters.ts` — `FirestoreDataConverter` para User, Profile, Interest, Subgenre, Perspective (traduce `Timestamp` ↔ `Date`).
- [x] `src/lib/utils/validation.ts` — esquemas Zod compartidos (email, password, displayName, bio).

### Base compartida (`src/shared/`)
- [x] `types/domain.types.ts` — entidades de dominio (User, Profile, Interest, Subgenre, Perspective, KnowledgeLevel).
- [x] `types/common.types.ts` — `AsyncState<T>`, `SelectOption`.
- [x] `types/errors.types.ts` — `AppError`, `AuthError`, `ValidationError`, `NotFoundError`.
- [x] `constants/app.constants.ts`, `constants/routes.constants.ts`, `constants/validation.constants.ts`.
- [x] `context/AuthProvider.tsx` + `context/authContext.ts` + `AuthProvider.types.ts` — estado global de sesión vía `onAuthStateChanged`.
- [x] `hooks/useAuthContext.ts` — consumo del provider.

### Shared components (`src/shared/components/`)
Cada uno con `.tsx`, `.types.ts`, `.constants.ts` (donde aplica) e `index.ts`. Barrel en `components/index.ts`.
- [x] `Button` (variantes primary/secondary/danger/ghost, tamaños, loading con Spinner).
- [x] `Input` (control puro: text/email/password/number/search…).
- [x] `Select` (dropdown simple sobre `SelectOption[]`).
- [x] `MultiSelect` (chips toggle con límite `maxSelected`).
- [x] `WeightSlider` (rango 1–5 para peso de perspectivas).
- [x] `Spinner` (sm/md/lg).
- [x] `FormField` (wrapper label + error, compone cualquier control).

### App Router
- [x] `app/layout.tsx` — envuelve la app con `AuthProvider`, metadata desde constantes, `lang="es"`.
- [x] `app/page.tsx` — landing (presentación pura, enlaces a login/register vía `ROUTES`).
- [x] `src/styles/globals.css` — Tailwind v4.

### Firebase / infra
- [x] `firestore.rules` — reglas de Sprint 2 (owner-based para users/profiles, catálogos read-only).
- [x] `firestore.indexes.json` (vacío), `firebase.json` (con emuladores auth+firestore).
- [x] `.env.example` y `.env.local` (placeholders — faltan valores reales del config web).
- [x] `.gitignore` protegiendo la service account key (`KEY DE PROYECTO ADMIN 3.json`).
- [x] `AGENTS.md` con resumen de reglas y ubicaciones clave.

---

## 3. Lo que FALTA (en orden sugerido)

### 3.1 Cerrar la base (inmediato)
- [x] **Verificar compilación:** `pnpm typecheck`, `pnpm lint`, `pnpm build`. Todo verde (solo warnings de magic-numbers en archivos `*.constants.ts`).
- [ ] **Aprobar build scripts de pnpm** (esbuild/protobufjs) si vitest/tsx lo requieren.
- [x] **Pegar credenciales reales** del config web de Firebase en `.env.local`.

> Nota: se descartó Husky/lint-staged como pre-commit hook por decisión del equipo. La calidad se valida vía `pnpm lint`/`pnpm typecheck` (manual o en CI).

### 3.2 Feature `auth` (Sprint 2) — ✅ completada
- [x] `features/auth/services/auth.service.ts` — `register`/`login`/`logout`/`requestPasswordReset` + creación del doc `users` post-registro y mapeo de errores Firebase → `AuthError`.
- [x] `features/auth/types/auth.types.ts` — `RegisterPayload`, `LoginPayload`, `PasswordResetPayload`, `AuthFieldErrors`.
- [x] `features/auth/constants/auth.constants.ts` — labels, placeholders, autoComplete, códigos y mensajes de error.
- [x] `features/auth/hooks/` — `useRegister`, `useLogin`, `usePasswordReset`.
- [x] `features/auth/components/` — `RegisterForm`, `LoginForm`, `ForgotPasswordForm` + `AuthCard` (wrapper compartido).
- [x] Pages: `app/(auth)/login`, `app/(auth)/register`, `app/(auth)/forgot-password`.
- [x] `features/auth/index.ts` (barrel público).
- [x] Tests de `auth.service`, hooks y `RegisterForm`.

### 3.3 Feature `profile` (Sprint 2) — ✅ completada
- [x] `features/profile/services/catalog.service.ts` — lectura de catálogos con caching en memoria + `clearCatalogCache`.
- [x] `features/profile/services/profile.service.ts` — `getProfile`/`createProfile`/`updateProfile` (serverTimestamp para fechas).
- [x] `features/profile/types/profile.types.ts` — `ProfileFormValues`, `ProfileFieldErrors`, `CatalogData`, `ProfileFormController`.
- [x] `features/profile/constants/profile.constants.ts`.
- [x] `features/profile/hooks/` — `useCatalog`, `useProfile`, `useProfileForm`, `useProfileSetup`, `useProfileEdit`.
- [x] `features/profile/components/` — `ProfileSetupForm`, `ProfileEditForm`, `ProfileView`, `ProfileForm`/`ProfileFormBody` (compartidos), `InterestPicker`, `SubgenrePicker`, `PerspectivePicker`.
- [x] Pages: `app/profile/{page,setup/page,edit/page}.tsx` + `app/profile/layout.tsx` protegido (vía `AuthGuard`, redirige a `/login`).
- [x] `features/profile/index.ts`.
- [x] Tests (services, hooks, `ProfileSetupForm`, `ProfileView`).

### 3.4 Datos y seguridad
- [x] `scripts/seed-firestore.ts` (+ `scripts/seed.data.ts`) — carga catálogos con firebase-admin. Ejecutable con `pnpm seed`.
- [x] Tests de Security Rules con `@firebase/rules-unit-testing` (`tests/rules/`, runner aparte: `pnpm test:rules`).
- [ ] Desplegar rules: `firebase deploy --only firestore` (manual, requiere `firebase login`).

### 3.5 Entrega / DevOps
- [x] GitHub Actions (`.github/workflows/ci.yml`): job `verify` (lint + typecheck + test + build) y job `rules` (emulador + rules tests).
- [ ] Deploy en Vercel con las env vars configuradas (manual).
- [ ] Verificar Definition of Done (sección 14 de `Project-context.md`) por cada US.

### Cobertura actual
Global ~62% (DoD ≥ 50% ✓). Capa de lógica: services 88–92%, hooks de features 89–94%, converters 100%. Sin cubrir intencionalmente: `AuthProvider` (estado global) y UI puramente presentacional menor.

---

## 3.bis Tanda 3 (2026-06-09) — Categorías sembradas + feature `communities`

### Datos
- [x] **Seed ejecutado contra Firestore de producción** (`pnpm seed`): 22 documentos (3 intereses, 14 subgéneros, 5 perspectivas). Las categorías ya existen en la base real.

### Refactor a shared (regla "features no se importan entre sí")
- [x] `catalog.service.ts` movido de `features/profile/services/` → `src/shared/services/` (con `shared/constants/catalog.constants.ts`).
- [x] `useCatalog` movido a `src/shared/hooks/useCatalog.ts`. Imports de profile actualizados; el barrel de profile ya no exporta el catálogo.

### Modelo de datos nuevo
- [x] Dominio: `Discussion` y `DiscussionComment` en `domain.types.ts`.
- [x] Colecciones: `discussions` + subcolección `comments` (en `collections.ts`).
- [x] Converters: `discussionConverter`, `discussionCommentConverter` (+ test de converters al 100%).
- [x] `firestore.rules`: discusiones/comentarios → lectura autenticada, creación con forma válida y `authorId == uid`, sin update/delete en este sprint.
- [x] `firestore.indexes.json`: índice compuesto `discussions(subgenreSlug ASC, createdAt DESC)`.

### Shared components nuevos
- [x] `TextArea` y `Checkbox` (con tests), exportados en el barrel.

### Feature `communities`
- [x] Services: `discussion.service.ts` (CRUD lectura/creación + comentarios), `members.service.ts` (perfiles por subgénero vía dot notation `subgenres.{slug}`, perfil del autor).
- [x] Hooks: `useCommunity`, `useCommunityMembers`, `useDiscussions`, `useDiscussion`, `useComments`, `useDiscussionComposer`, `useCommentComposer`.
- [x] Componentes: `CommunityExplorer` (categorías agrupadas por interés), `CommunityCard`, `CommunityDetail` (miembros + discusiones + composer), `MemberCard`, `DiscussionCard`, `DiscussionComposer`, `DiscussionDetail`, `CommentCard`, `CommentComposer`, `SpoilerContent` (mitigación de spoilers: contenido cubierto hasta revelar).
- [x] Pages: `/communities`, `/communities/[subgenreSlug]`, `/communities/[subgenreSlug]/[discussionId]` con layout protegido (`AuthGuard`). En Next 15 `params` es Promise (se hace `await params`).
- [x] Navegación: botón "Explorar comunidades" en `ProfileView`; rutas en `routes.constants.ts` (`communityRoute()`, `discussionRoute()`); `lib/utils/dates.ts` (`formatDateTime`).
- [x] Tests: services, hooks, componentes raíz y rules (15 tests de rules en emulador, todos verdes).

### Notas de entorno (esta máquina)
- El puerto 8080 lo ocupa un Apache local (XAMPP) → **emulador de Firestore movido al puerto 8181** (`firebase.json` y `tests/rules/firestore.rules.test.ts`).
- `firebase-tools` ≥ 14 exige Java 21 y hay Java 17 instalado → los rules tests se corren con `pnpm dlx firebase-tools@13 emulators:exec --only firestore --project demo-culture-platform "vitest run -c vitest.rules.config.ts"`.
- **Pendiente manual:** `firebase deploy --only firestore` (rules + índice compuesto; sin esto las queries de discusiones fallarán en producción) y deploy en Vercel.

---

## 3.ter Tanda 4 (2026-06-10) — Sesión persistente visible + pulido integral de UX

### Sesión persistente (requisito del equipo: "cerrar la página y seguir loggeado")
Firebase Auth **ya persistía** la sesión (IndexedDB); el problema era que la UI no lo
reflejaba: la landing siempre mostraba "Iniciar sesión" y /login no redirigía. Cambios:
- [x] `lib/firebase/client.ts` — persistencia **explícita** (`initializeAuth` con
  `indexedDBLocalPersistence` + respaldo `browserLocalPersistence`; en SSR/hot-reload cae a `getAuth`).
- [x] **`AppHeader` global** (shared, en el root layout): con sesión muestra Comunidades / Mi perfil
  (con estado activo) + Cerrar sesión; sin sesión, login/registro; mientras restaura, skeleton (sin parpadeo).
- [x] **`GuestGuard`** (shared) + `app/(auth)/layout.tsx`: /login, /register y /forgot-password
  redirigen a /profile si la sesión sigue activa.
- [x] **`LandingCta`** (shared): los CTAs del hero y del cierre de la landing cambian según sesión
  ("Explorar comunidades / Ir a mi perfil" en vez de "Unirme / Ya tengo cuenta"). La landing ya no
  tiene header propio (lo cubre el AppHeader) y muestra "Tu sesión sigue abierta."
- [x] **Volver a donde ibas**: `AuthGuard` redirige a `/login?next=<ruta>` y `useLogin` respeta el
  `next` (solo rutas internas; se rechazan URLs protocol-relative `//`). Login page envuelta en
  `<Suspense>` (requisito de `useSearchParams` en prerender).

### Feedback y micro-UX
- [x] **Sistema de toasts**: `ToastProvider` + `useToast` (shared/context + shared/hooks), región
  `aria-live`, auto-descarte (4.5 s) y descarte manual. Integrado en: perfil creado/actualizado,
  discusión publicada, comentario publicado y cierre de sesión.
- [x] **Input de contraseña con toggle mostrar/ocultar** (ícono de ojo, `aria-pressed`, sin libs).
- [x] **Fechas relativas** (`formatRelativeTime`, Intl.RelativeTimeFormat es-CR): "hace 2 horas",
  "ayer"; pasada una semana, fecha absoluta. En `<time title="…">` con la fecha exacta al hover.
- [x] **`EmptyState`** (shared): estados vacíos de miembros/discusiones/comentarios con invitación
  a participar, en lugar de un párrafo suelto.
- [x] **Reintentos**: errores de carga de miembros/discusiones/comentarios muestran botón
  "Reintentar" (`refresh` añadido a `useCommunityMembers`, ya existía en los otros hooks).
- [x] **Metadata por página** (`title.template` en root + `PAGE_TITLES`): pestañas legibles
  ("Iniciar sesión · Plataforma Cultural").
- [x] **`app/not-found.tsx` y `app/error.tsx`** con el tono editorial (404 "no está en cartelera",
  error boundary con reintento).
- [x] Limpieza de redundancias: "Cerrar sesión" salió de `ProfileView` y "Mi perfil" del explorador
  (ambos viven en el AppHeader).

### Verificación (DoD)
- [x] `pnpm typecheck` / `pnpm lint` (0 errores) / `pnpm test` (**104 tests**, 29 archivos) /
  `pnpm build` (12 rutas) — todo verde. Cobertura global ~63 % (DoD ≥ 50 % ✓).
- [x] Tests nuevos: ToastProvider, GuestGuard, AppHeader, LandingCta, EmptyState, Input (toggle),
  dates, `?next=` en useLogin/AuthGuard (incluye caso anti open-redirect).

### Deploy (sigue manual — intentado en esta tanda)
- [ ] **Firestore rules/índices**: se intentó `firebase deploy --only firestore` con la service
  account (`GOOGLE_APPLICATION_CREDENTIALS`) → **403**: la key del seed no tiene permisos sobre la
  API de Rules. Dos salidas (cualquiera sirve):
  1. `firebase login` (una vez, en el browser) y luego
     `pnpm dlx firebase-tools@13 deploy --only firestore --project culture-platform-f7500`, o
  2. en Google Cloud Console → IAM, darle a la service account los roles
     **Firebase Rules Admin** + **Cloud Datastore Index Admin** y repetir el comando con la key.
  Sin este deploy, las queries de discusiones fallan en producción (falta el índice compuesto).
- [ ] **Vercel**: CLI no instalada en esta máquina. Importar el repo en vercel.com, configurar las
  6 env vars `NEXT_PUBLIC_FIREBASE_*` y desplegar (build ya verificado localmente).

---

## 4. Decisiones / notas pendientes de confirmar

- **Versión de Next:** anclada a 15 (no 16) por el documento. Si el equipo acepta 16, requiere ADR.
- **Converters vs serverTimestamp:** los converters convierten `Date` ↔ `Timestamp`. Para `createdAt`/`updatedAt` en escrituras, los services usarán `serverTimestamp()` directamente (el converter cubre principalmente las lecturas).
- **Tipos de dominio en `shared/types/`:** se centralizaron ahí (no por feature) para que `lib/firebase/converters.ts` pueda usarlos sin romper el flujo de dependencias.
- **`.claude/` está gitignored:** esta bitácora no se versiona; es apoyo local del equipo/agente.

---

## 5. Comandos útiles

```bash
pnpm dev            # desarrollo local
pnpm typecheck      # tsc --noEmit
pnpm lint           # eslint
pnpm test           # vitest run
pnpm build          # build de producción
pnpm seed           # cargar catálogos (requiere service account key)

firebase emulators:start          # auth + firestore locales
firebase deploy --only firestore  # desplegar rules e indexes
```
