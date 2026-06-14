# Plataforma Cultural

Plataforma que reúne a personas geográficamente dispersas con intereses culturales afines en
**cine, teatro y lectura**. Agrupa usuarios por subgénero, perfil de análisis (trama, técnica,
actuación, reflexión, contexto histórico) y nivel de conocimiento, evitando el ruido de las redes
sociales generales y mitigando spoilers en las discusiones sobre obras.

Prototipo funcional del MVP — Caso 3 del Proyecto Final de Administración de Proyectos
(Grupo 51, I Semestre 2026).

> La fuente de verdad operativa (arquitectura, reglas de código, modelo de datos y Security Rules)
> es [`.claude/Project-context.md`](.claude/Project-context.md). Léelo antes de contribuir.

## Stack

- **Framework:** Next.js 15 (App Router) · React 19
- **Lenguaje:** TypeScript en modo `strict`
- **UI:** Tailwind CSS v4
- **Backend (BaaS):** Firebase — Firestore (datos), Firebase Authentication (identidad),
  Firestore Security Rules (autorización)
- **Validación:** Zod
- **Estado global:** React Context (`AuthProvider`, `ToastProvider`)
- **Testing:** Vitest + Testing Library (+ `@firebase/rules-unit-testing` para las rules)
- **Gestor de paquetes:** pnpm
- **Hosting:** Vercel (app) · Firebase (datos y auth)
- **CI/CD:** GitHub Actions

## Arquitectura en una línea

Feature-based, con flujo de dependencias unidireccional:

```
page → componente → hook → service → firebase SDK / constants / types
```

Reglas absolutas (bloquean PR): cero strings hardcodeados, cero magic numbers, SRP estricto,
tipos en `*.types.ts`, y los componentes nunca llaman al SDK de Firestore directo (pasan por un
service). Detalle completo en [`.claude/Project-context.md`](.claude/Project-context.md).

## Requisitos previos

- Node.js 20+
- pnpm 10+ (`npm install -g pnpm`)
- Una app web de Firebase (Firestore + Authentication con email/password habilitado)
- Para tests de Security Rules y emuladores: Java 17+ y `firebase-tools`
  (`npm install -g firebase-tools`)

## Puesta en marcha

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env.local   # y rellenar con los valores de tu app de Firebase

# 3. Levantar el entorno de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

Definidas en `.env.local` (nunca se versiona; el ejemplo sí). Las claves del cliente de Firebase
son públicas por diseño: la seguridad real vive en las Security Rules.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Solo para el script de seed (Admin SDK). NUNCA se versiona.
FIREBASE_ADMIN_CREDENTIALS_PATH=./KEY DE PROYECTO ADMIN 3.json
```

### Datos semilla (catálogo)

El catálogo de intereses, subgéneros y perspectivas se carga con un script que usa el Admin SDK
y una cuenta de servicio descargada de Firebase Console (gitignored):

```bash
pnpm seed
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Chequeo de tipos (`tsc --noEmit`) |
| `pnpm test` | Tests unitarios (Vitest) |
| `pnpm test:watch` | Tests en modo watch |
| `pnpm test:coverage` | Tests con reporte de cobertura |
| `pnpm test:rules` | Tests de Security Rules (emulador de Firestore) |
| `pnpm format` | Prettier `--write` |
| `pnpm seed` | Carga el catálogo en Firestore (Admin SDK) |

### Emuladores de Firebase

```bash
firebase emulators:start   # Auth (9099) + Firestore (8181) con UI
```

## Estructura

```
src/
├── app/            # Rutas (App Router): auth, profile, communities, landing, 404, error
├── features/       # auth · profile · communities (components, hooks, services, types, constants)
├── shared/         # components, hooks, context, services, types, constants reutilizables
└── lib/            # firebase (client, collections, converters) · utils (validation, dates)
```

Funcionalidades principales: registro/login/recuperación de contraseña, onboarding y edición de
perfil cultural, y comunidades por subgénero con discusiones, comentarios y manejo de spoilers.

## Tests

```bash
pnpm test            # unitarios + componentes
pnpm test:coverage   # con cobertura (umbral del proyecto: >= 50% en código nuevo)
pnpm test:rules      # Security Rules contra el emulador
```

## CI/CD

- **CI** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)): en cada push/PR corre lint,
  typecheck, tests, build y los tests de Security Rules.
- **Deploy** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)): tras un CI verde en
  `main`, despliega la app a Vercel.

Las **Firestore Security Rules** y los índices se despliegan aparte con la Firebase CLI:

```bash
firebase deploy --only firestore
```

## Seguridad

- Las claves de Firebase del cliente son públicas; la autorización real está en
  [`firestore.rules`](firestore.rules), testeadas en CI.
- La cuenta de servicio del Admin SDK (`KEY DE PROYECTO ADMIN 3.json`) y `.env.local` están
  gitignored y nunca deben versionarse.
