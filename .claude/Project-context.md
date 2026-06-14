# PROJECT_CONTEXT.md

Documento maestro de contexto del prototipo de la Plataforma Cultural. Define stack, arquitectura, reglas de codigo, modelo de datos en Firestore, Security Rules y convenciones generales. Cualquier desarrollador o agente que trabaje en el proyecto debe leer este documento antes de generar codigo.

La gestion de Historias de Usuario, ramas asociadas y mapeo de US a artefactos es responsabilidad del equipo y se lleva fuera de este documento.

---

## 1. Identificacion del proyecto

- **Nombre**: Plataforma Cultural
- **Caso asignado**: Caso 3 del Proyecto Final de Administracion de Proyectos
- **Curso**: Administracion de Proyectos, Grupo 51, I Semestre 2026
- **Equipo**: 3 integrantes
- **Marco de trabajo**: SCRUM, 5 sprints para Prototipo Funcional del MVP
- **Fecha maxima de entrega**: Jueves 25 de Junio del 2026

---

## 2. Descripcion funcional del producto

Plataforma que reune personas geograficamente dispersas con intereses culturales afines en cine, teatro y lectura. El valor diferencial es agrupar usuarios por subgenero, perfil de analisis (trama, tecnica, actuacion, reflexion, contexto historico) y nivel de conocimiento, evitando ruido de redes sociales generales y mitigando spoilers en discusiones de obras.

---

## 3. Cambio de stack respecto al ADR 001

El ADR 001 inicial proponia React + Vite + Express + PostgreSQL + Prisma. Tras evaluar el skill de arquitectura feature based y el uso de Firebase como backend, la decision vigente es la siguiente:

- **Framework**: Next.js 15 fullstack con App Router. Un solo repositorio, un solo deployment.
- **Backend as a Service**: Firebase. Firestore como base de datos, Firebase Authentication para identidad, Firestore Security Rules como capa de autorizacion.
- **Sin servidor custom en Sprint 2**: las features hablan directo al Firestore SDK del cliente. No hay API Routes propias salvo casos puntuales que requieran Firebase Admin SDK, lo cual no aplica en este sprint.
- **Lo que se conserva del ADR 001**: el modelo de feature based architecture, TypeScript estricto, Vitest para tests, GitHub Actions para CI/CD, pnpm como gestor de paquetes, Vercel para hosting.
- **Lo que se elimina**: PostgreSQL, Prisma, Express, bcrypt, JWT manual, refresh tokens propios, Railway como hosting de backend, todo el codigo que estaria en `src/lib/server/`. Firebase lo cubre.

El ADR 001 debe regenerarse en una version 2 que refleje este nuevo stack. Hasta entonces, este documento es la fuente de verdad operativa.

---

## 4. Stack tecnologico definitivo

- **Framework fullstack**: Next.js 15 con App Router
- **Lenguaje**: TypeScript en modo `strict`
- **UI**: React 19, Tailwind CSS v4
- **Base de datos**: Firestore (Firebase)
- **Autenticacion**: Firebase Authentication con email y password
- **Autorizacion**: Firestore Security Rules
- **SDK de Firebase**: `firebase` (client SDK). El Admin SDK se incorpora solo si una feature futura lo requiere.
- **Validacion de input**: Zod
- **Estado global de sesion**: React Context (AuthProvider)
- **Testing**: Vitest para unit tests, Testing Library para componentes
- **Linting y formateo**: ESLint, Prettier (validación manual / en CI; sin pre-commit hooks)
- **Gestor de paquetes**: pnpm
- **Hosting de la app**: Vercel
- **Hosting de datos y auth**: Firebase (proyecto del equipo)
- **CI/CD**: GitHub Actions

---

## 5. Reglas absolutas de arquitectura

Las siguientes reglas son no negociables. Su violacion bloquea cualquier Pull Request.

### R1: Zero Hardcoded Strings

Toda cadena de texto en logica, rendering, configuracion o llamadas a Firebase debe extraerse a un archivo `.constants.ts`. Esto incluye rutas, nombres de colecciones, mensajes, labels, nombres de eventos, claves de localStorage y query params. Los unicos strings literales permitidos son JSX puro de presentacion final.

### R2: Zero Magic Numbers

Todo numero literal distinto de `0`, `1` o `-1` debe nombrarse como constante en `UPPER_SNAKE_CASE`. Ejemplo: `MIN_DISPLAY_NAME_LENGTH = 3`, `MAX_PERSPECTIVE_WEIGHT = 5`.

### R3: SRP estricto

Un archivo, una responsabilidad. Componente, hook, service, types y constants viven en archivos separados, nunca mezclados.

### R4: Types e interfaces en archivos dedicados

Todo tipo, interface o enum que se use en mas de una expresion va en un archivo `*.types.ts` separado. Nunca co ubicar con componentes o hooks.

### R5: Naming convention obligatorio

| Artefacto | Convencion | Ejemplo |
|-----------|-----------|---------|
| Componente | `PascalCase.tsx` | `InterestPicker.tsx` |
| Hook | `useCamelCase.ts` | `useProfile.ts` |
| Service | `camelCase.service.ts` | `profile.service.ts` |
| Types | `camelCase.types.ts` | `profile.types.ts` |
| Constants | `camelCase.constants.ts` | `profile.constants.ts` |
| Valor constante | `UPPER_SNAKE_CASE` | `MIN_DISPLAY_NAME_LENGTH` |
| Interface | `PascalCase` | `Profile`, `ProfileInterest` |
| Type alias | `PascalCase` | `KnowledgeLevel` |
| Barrel | `index.ts` | (siempre asi) |

### R6: Flujo de dependencias unidireccional

```
page (Next.js)
  -> feature root component (orchestrator)
       -> sub component (presentation)
       -> hook (state + side effects)
            -> service (data access via Firebase SDK)
                 -> constants (config)
                 -> types (contracts)
```

Un servicio no importa un hook. Un hook no importa un componente. Un componente no llama directamente al Firestore SDK. Una page no contiene logica, solo delega.

### R7: Un componente, una responsabilidad de UI

Un componente nunca mezcla fetching con presentacion, ni estado global con renderizado, ni logica de negocio con HTML. La logica vive en el hook, la presentacion en el componente, los datos en el service.

### R8: Reutilizacion obligatoria de minicomponentes

Antes de crear un boton, input, badge, spinner o modal, verificar si existe en `src/shared/components/`. Si existe, reutilizarlo configurando props. Si va a usarse en mas de una feature y no existe, crearlo ahi. La duplicacion visual entre features es violacion.

### R9: Capa de data access desacoplada de Firebase

Aunque los services llamen al Firestore SDK directamente, su firma publica debe exponer tipos del dominio, no tipos de Firebase. Un hook nunca recibe un `DocumentSnapshot`, recibe un `Profile`. Los services traducen entre Firestore y el dominio mediante `converters`. Si en el futuro se migra a otra base, solo cambian los services internos.

---

## 6. Estructura del proyecto

```
plataforma-cultural/
├── public/
├── firestore.rules
├── firestore.indexes.json
├── firebase.json
├── .firebaserc
├── scripts/
│   ├── seed-firestore.ts                 # Carga catalogos via Admin SDK
│   └── seed.data.ts                      # Datos semilla (intereses, subgeneros, perspectivas)
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── layout.tsx                    # Root layout (AuthProvider + ToastProvider)
│   │   ├── page.tsx                      # Landing (delega a feature)
│   │   ├── not-found.tsx                 # 404
│   │   ├── error.tsx                     # Error boundary global
│   │   ├── (auth)/                       # Route group (layout con GuestGuard)
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   ├── profile/                      # Layout protegido con AuthGuard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                  # Vista de perfil propio
│   │   │   ├── setup/page.tsx            # Onboarding cultural
│   │   │   └── edit/page.tsx             # Edicion del perfil
│   │   └── communities/                  # Layout protegido con AuthGuard
│   │       ├── layout.tsx
│   │       ├── page.tsx                  # Explorador de comunidades
│   │       └── [subgenreSlug]/
│   │           ├── page.tsx              # Detalle de comunidad (miembros + discusiones)
│   │           └── [discussionId]/page.tsx  # Hilo de discusion + comentarios
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/                 # Llama a Firebase Auth SDK
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   └── index.ts
│   │   ├── profile/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/                 # Llama a Firestore SDK
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   └── index.ts
│   │   └── communities/
│   │       ├── components/               # Explorer, Detail, cards, composers, SpoilerContent
│   │       ├── hooks/
│   │       ├── services/                 # discussion.service.ts, members.service.ts
│   │       ├── types/
│   │       ├── constants/
│   │       └── index.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── TextArea/
│   │   │   ├── Checkbox/
│   │   │   ├── Select/
│   │   │   ├── MultiSelect/
│   │   │   ├── WeightSlider/
│   │   │   ├── Spinner/
│   │   │   ├── FormField/
│   │   │   ├── EmptyState/
│   │   │   ├── AuthGuard/                # Protege rutas: exige sesion
│   │   │   ├── GuestGuard/               # Inverso: redirige si ya hay sesion
│   │   │   ├── AppHeader/
│   │   │   ├── LandingCta/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useAuthContext.ts
│   │   │   ├── useCatalog.ts             # Lee y cachea el catalogo en memoria
│   │   │   └── useToast.ts
│   │   ├── context/
│   │   │   ├── AuthProvider.tsx          # + authContext.ts
│   │   │   └── ToastProvider.tsx         # + toastContext.ts (notificaciones efimeras)
│   │   ├── services/
│   │   │   └── catalog.service.ts        # Lecturas del catalogo
│   │   ├── types/
│   │   │   ├── common.types.ts           # AsyncState<T>
│   │   │   ├── domain.types.ts           # Tipos de dominio (Profile, Discussion, ...)
│   │   │   └── errors.types.ts           # Clases de error (AppError, NotFoundError)
│   │   └── constants/
│   │       ├── routes.constants.ts
│   │       ├── app.constants.ts
│   │       ├── catalog.constants.ts
│   │       └── validation.constants.ts
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── client.ts                 # Inicializacion del SDK
│   │   │   ├── collections.ts            # Nombres de colecciones (constantes)
│   │   │   └── converters.ts             # Firestore <-> dominio
│   │   └── utils/
│   │       ├── validation.ts             # Esquemas Zod compartidos
│   │       └── dates.ts                  # Formateo de fechas de dominio
│   └── styles/
│       └── globals.css
├── tests/
├── .env.example
├── .env.local
├── eslint.config.mjs
├── .prettierrc
├── postcss.config.mjs                    # Tailwind v4 (sin tailwind.config.ts)
├── tsconfig.json
├── next.config.ts
├── vitest.config.ts
├── vitest.rules.config.ts                # Config aislada para tests de Security Rules
└── package.json
```

### Notas sobre la estructura

- **No existe `src/lib/server/`** en Sprint 2. Firebase Auth y Firestore reemplazan la capa de servidor.
- **No existe `src/app/api/`** en Sprint 2. Si en sprints posteriores se requiere Admin SDK o logica de servidor, se agrega entonces.
- **`src/lib/firebase/client.ts`** es la unica fuente de inicializacion del SDK. Todos los services importan desde ahi.
- **`src/lib/firebase/collections.ts`** exporta constantes con los nombres de colecciones. Ningun string literal de coleccion vive en services.
- **`src/lib/firebase/converters.ts`** contiene los `FirestoreDataConverter<T>` por entidad, lo cual provee tipado fuerte en `getDoc`, `setDoc`, `query`, sin tener que castear manualmente.

---

## 7. Modelo de datos en Firestore

Firestore es documental, no relacional. El modelo a continuacion privilegia lecturas en una sola query para el perfil completo y mantiene los catalogos como colecciones independientes.

### Coleccion `users`

ID del documento: el UID generado por Firebase Authentication.

```typescript
{
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Coleccion `profiles`

ID del documento: el mismo UID del User. Esto permite leer perfil del usuario actual con una sola operacion sin necesidad de query.

```typescript
{
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  interests: {
    [interestSlug: string]: {
      knowledgeLevel: 'NOVICE' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
    };
  };
  subgenres: {
    [subgenreSlug: string]: true;
  };
  perspectives: {
    [perspectiveSlug: string]: {
      weight: number; // 1 a 5
    };
  };
  completedAt: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

Justificacion del uso de maps en vez de subcolecciones: un perfil cultural tiene como maximo 3 intereses, 15 subgeneros y 5 perspectivas. El documento se mantiene muy por debajo del limite de 1 MB y se lee en una sola operacion. Para queries de afinidad en sprints futuros, los maps permiten `where` con dot notation (`where('interests.cine.knowledgeLevel', '==', 'EXPERT')`).

### Coleccion `interests` (catalogo)

```typescript
{
  name: string;
  slug: string;
  active: boolean;
}
```

### Coleccion `subgenres` (catalogo)

```typescript
{
  interestSlug: string;
  name: string;
  slug: string;
  active: boolean;
}
```

### Coleccion `perspectives` (catalogo)

```typescript
{
  name: string;
  description: string | null;
  active: boolean;
}
```

### Coleccion `discussions` (feature communities)

ID del documento: autogenerado por Firestore (`addDoc`). Cada discusion pertenece a la
comunidad de un subgenero. El contenido marcado con `hasSpoilers` se oculta en la UI hasta
que el lector decide revelarlo.

```typescript
{
  subgenreSlug: string;   // comunidad a la que pertenece (filtrable con where)
  interestSlug: string;   // interes padre, para encabezados y navegacion
  title: string;          // 3 a 120 caracteres
  body: string;           // 1 a 5000 caracteres
  hasSpoilers: boolean;
  authorId: string;       // == request.auth.uid (lo fuerzan las rules)
  authorName: string;     // displayName del perfil al publicar
  createdAt: Timestamp;   // serverTimestamp() en la escritura
}
```

El listado de una comunidad consulta `where('subgenreSlug', '==', slug)` con
`orderBy('createdAt', 'desc')`, lo que requiere el indice compuesto definido en
`firestore.indexes.json`.

### Subcoleccion `discussions/{discussionId}/comments`

ID del documento: autogenerado. Los comentarios viven como subcoleccion del documento de
discusion para mantener la lectura del hilo en una sola query y respetar el limite de 1 MB
por documento.

```typescript
{
  body: string;           // 1 a 2000 caracteres
  hasSpoilers: boolean;
  authorId: string;       // == request.auth.uid
  authorName: string;
  createdAt: Timestamp;   // serverTimestamp()
}
```

Nota sobre descubrimiento de miembros: la lista de "miembros" de una comunidad no es una
coleccion propia; se deriva de `profiles` consultando el map `subgenres` con dot notation
(`where('subgenres.{slug}', '==', true)`), aprovechando el modelo de la seccion `profiles`.

### Datos semilla iniciales

Antes del primer deployment debe ejecutarse un script de seed que cargue:

- **Intereses**: Cine, Teatro, Lectura.
- **Subgeneros de Cine**: Ciencia ficcion, Drama, Comedia, Documental, Animacion.
- **Subgeneros de Teatro**: Clasico, Contemporaneo, Musical, Experimental.
- **Subgeneros de Lectura**: Novela, Ensayo, Poesia, Cuento, No ficcion.
- **Perspectivas**: Trama, Tecnica, Actuacion o interpretacion, Reflexion filosofica, Contexto historico.

El script vive en `scripts/seed-firestore.ts` y se ejecuta con permisos de admin (cuenta de servicio descargada desde Firebase Console, no versionada).

---

## 8. Firestore Security Rules

Las rules son la capa de seguridad. Sin rules robustas, exponer Firestore al cliente directamente es inseguro. La version base para Sprint 2 vive en `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helpers
    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    function isValidProfileShape(data) {
      return data.keys().hasAll(['displayName', 'interests', 'subgenres', 'perspectives'])
        && data.displayName is string
        && data.displayName.size() >= 3
        && data.displayName.size() <= 50;
    }

    // users: solo el dueno lee y escribe sus datos basicos
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isOwner(userId);
      allow update: if isOwner(userId);
      allow delete: if false;
    }

    // profiles: lectura para autenticados (preparado para discovery futuro),
    // escritura solo del dueno
    match /profiles/{userId} {
      allow read: if isSignedIn();
      allow create: if isOwner(userId) && isValidProfileShape(request.resource.data);
      allow update: if isOwner(userId) && isValidProfileShape(request.resource.data);
      allow delete: if false;
    }

    // Catalogos: lectura para autenticados, escritura solo desde scripts admin
    match /interests/{id} {
      allow read: if isSignedIn();
      allow write: if false;
    }

    match /subgenres/{id} {
      allow read: if isSignedIn();
      allow write: if false;
    }

    match /perspectives/{id} {
      allow read: if isSignedIn();
      allow write: if false;
    }
  }
}
```

> **Actualizacion (feature communities):** `firestore.rules` evoluciono respecto al bloque base
> mostrado arriba. La version vigente (autoritativa, en el repo) añade reglas para las nuevas
> colecciones, con validacion de forma server-side via helpers `isValidDiscussionShape` y
> `isValidCommentShape`:
>
> - `match /discussions/{discussionId}`: `read` para autenticados; `create` solo si la forma es
>   valida y `authorId == request.auth.uid`; `update` y `delete` denegados en este sprint.
> - `match /discussions/{discussionId}/comments/{commentId}`: mismas reglas (lectura autenticada,
>   creacion validada, sin edicion ni borrado).
>
> Ante discrepancia, `firestore.rules` manda sobre este documento.

Reglas para mantener:

- Cualquier nueva coleccion que se agregue al modelo debe tener sus rules antes de mergear el feature branch.
- Las rules se testean con `@firebase/rules-unit-testing` antes de cada release.
- El default en caso de duda es denegar: `allow read, write: if false`.

---

## 9. Estado global y autenticacion

### AuthProvider

`src/shared/context/AuthProvider.tsx` es el contenedor global de sesion. Suscribe a `onAuthStateChanged` del Firebase Auth SDK y expone:

```typescript
interface AuthContextValue {
  user: User | null;          // Firebase User
  isLoading: boolean;
  signOut: () => Promise<void>;
}
```

`User` es el tipo de `firebase/auth`. El consumo se hace mediante el hook `useAuthContext` en `src/shared/hooks/useAuthContext.ts`.

### Flujo de proteccion de rutas

No hay middleware del lado del servidor en Sprint 2. La proteccion se hace en el cliente con dos mecanismos:

1. **Layout protegido**: el segmento `/profile/*` envuelve sus pages en un layout que verifica `useAuthContext` y redirige a `/login` si no hay usuario.
2. **Security Rules**: aunque el cliente intente leer datos sin sesion, las rules deniegan acceso a nivel de base. La proteccion del cliente es UX, la real esta en Firestore.

### Token de sesion

Firebase Auth maneja el token de sesion automaticamente:

- Almacena el ID token y refresh token en `IndexedDB` (manejado por el SDK).
- Renueva el ID token cada hora sin intervencion del codigo.
- Sobrevive a recargas de pagina.

No hay implementacion manual de access tokens, refresh tokens, ni logica de refresh en `httpClient`.

---

## 10. Features del producto (Sprint 2 en adelante)

### Feature `auth`

Responsabilidades:

- Registro con email y password mediante `createUserWithEmailAndPassword`.
- Login mediante `signInWithEmailAndPassword`.
- Logout mediante `signOut`.
- Recuperacion de contrasena mediante `sendPasswordResetEmail` (incluida por Firebase, ya no es stretch goal).
- Creacion del documento en `users` al completarse el registro.

Service: `auth.service.ts` con funciones puras que envuelven los metodos de Firebase Auth y manejan la creacion del documento `users` post registro.

### Feature `profile`

Responsabilidades:

- Lectura del catalogo (intereses, subgeneros, perspectivas).
- Creacion del documento en `profiles` con datos basicos.
- Actualizacion de intereses con nivel de conocimiento.
- Actualizacion de subgeneros.
- Actualizacion de perspectivas con peso.
- Visualizacion del perfil propio.
- Edicion del perfil propio.

Service: `profile.service.ts` para CRUD del perfil. Service separado `catalog.service.ts` para lecturas del catalogo (porque tienen otra cadencia y caching distinto).

### Feature `communities` (incorporada en Sprint 3)

Comunidades por subgenero: cada subgenero del catalogo es una comunidad donde los usuarios
descubren miembros afines y abren discusiones sobre obras, con manejo de spoilers.

Responsabilidades:

- Explorador de comunidades a partir del catalogo de subgeneros (`CommunityExplorer`).
- Detalle de comunidad: miembros del subgenero + listado de discusiones (`CommunityDetail`).
- Descubrimiento de miembros via query sobre el map `subgenres` de `profiles`.
- Creacion y listado de discusiones por subgenero.
- Hilo de discusion con comentarios (`DiscussionDetail`).
- Ocultamiento de contenido marcado como spoiler hasta revelarlo (`SpoilerContent`).
- Confirmaciones efimeras (toasts) al publicar discusion o comentario.

Services:

- `discussion.service.ts`: CRUD de discusiones y comentarios. Las escrituras usan
  `serverTimestamp()` para `createdAt`; las lecturas pasan por converters de dominio.
- `members.service.ts`: descubrimiento de miembros y lectura del perfil propio para firmar
  publicaciones con su `displayName`.

Rutas: `/communities`, `/communities/[subgenreSlug]`, `/communities/[subgenreSlug]/[discussionId]`
(builders centralizados en `routes.constants.ts`: `communityRoute`, `discussionRoute`).

### Componentes y shared incorporados

Del Sprint 2:

- `shared/components/Button` para todos los forms.
- `shared/components/Input` para texto, email, password.
- `shared/components/Select` para seleccion simple (interes principal).
- `shared/components/MultiSelect` para subgeneros y perspectivas.
- `shared/components/WeightSlider` para peso de perspectivas en rango 1 a 5.
- `shared/components/Spinner` para estados de carga.
- `shared/components/FormField` que combina label + input + mensaje de error.
- `shared/context/AuthProvider` para estado global de sesion.
- `shared/hooks/useAuthContext` para consumir el provider.

Agregados en sprints posteriores:

- `shared/components/TextArea` para cuerpos de discusiones y comentarios.
- `shared/components/Checkbox` para la marca "contiene spoilers".
- `shared/components/EmptyState` para estados vacios (sin miembros, sin discusiones, etc.).
- `shared/components/AuthGuard` para proteger rutas que exigen sesion (con redirect a login + `next`).
- `shared/components/GuestGuard` inverso: aparta de las pantallas de auth a quien ya tiene sesion.
- `shared/components/AppHeader` cabecera de navegacion autenticada.
- `shared/components/LandingCta` calls-to-action de la landing.
- `shared/context/ToastProvider` + `shared/hooks/useToast` para notificaciones efimeras.
- `shared/services/catalog.service.ts` + `shared/hooks/useCatalog` para leer y cachear el catalogo.
- `lib/utils/dates.ts` para formatear fechas de dominio en la UI.

---

## 11. Convenciones generales de codigo

### Imports

- Usar siempre alias de path (`@/...`), nunca rutas relativas largas como `../../../`.
- Importar tipos con `import type` cuando solo sean tipos (regla de ESLint activa).
- Orden: librerias externas, alias `@/`, imports relativos cortos, imports de estilos.

### Estilos

- Tailwind CSS v4 como sistema principal.
- Si un componente necesita estilos especificos no triviales, crear `Component.module.css` al lado del `.tsx`.
- No usar `styled-components` ni `emotion` para evitar mezcla de paradigmas.

### Tipado

- `strict: true` en `tsconfig.json`.
- Nunca usar `any`. Si es genuinamente desconocido, usar `unknown` y refinar.
- Tipos de Firestore (`DocumentSnapshot`, `QueryDocumentSnapshot`, `Timestamp`) permanecen dentro de la capa de service. Nunca cruzan a hooks ni a componentes.
- Las fechas se exponen como `Date` en el dominio, no como `Timestamp`. Los converters hacen la conversion.

### Manejo de errores

- Los services lanzan errores tipados (clases de error propias en `src/shared/types/errors.types.ts`).
- Los hooks capturan y exponen `error: string | null` para consumo del componente.
- Los componentes muestran errores via `FormField` o un componente de notificacion compartido (si se decide agregar).

### Async state

Usar el patron `AsyncState<T>` definido en `shared/types/common.types.ts`:

```typescript
export type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};
```

---

## 12. Variables de entorno

Crear `.env.example` con la siguiente estructura, sin valores sensibles, y versionarlo:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

`.env.local` se mantiene fuera del repositorio (gitignored) con los valores reales para desarrollo. Los mismos valores se configuran como Environment Variables en Vercel.

Aunque las claves de Firebase del cliente sean publicas por diseno (el SDK las usa en el browser), la seguridad real se delega a las Firestore Security Rules. Una clave expuesta no implica acceso a los datos si las rules estan bien escritas.

---

## 13. Comandos del proyecto

```bash
# Instalacion
pnpm install

# Desarrollo
pnpm dev

# Build de produccion
pnpm build
pnpm start

# Tests
pnpm test
pnpm test:watch
pnpm test:coverage

# Lint y formato
pnpm lint
pnpm format

# Firebase (requiere firebase-tools instalado: pnpm add -g firebase-tools)
firebase login
firebase init                       # Solo la primera vez
firebase deploy --only firestore    # Despliega rules e indexes
firebase emulators:start            # Emuladores locales (auth + firestore)

# Seed del catalogo (script propio, ver seccion 7)
pnpm seed
```

---

## 14. Definition of Done tecnico

Una unidad de trabajo se considera tecnicamente terminada cuando cumple:

1. Codigo integrado a `main` via Pull Request aprobado.
2. Pipeline de CI verde (lint, build, tests).
3. Cobertura de tests del codigo nuevo igual o mayor a 50%.
4. Funcionalidad desplegada en staging y verificable por URL publica.
5. Si la funcionalidad toca Firestore, las Security Rules estan actualizadas y desplegadas.
6. Si la funcionalidad introduce nueva coleccion o estructura, este documento se actualiza.
7. Ningun string hardcoded en componentes, hooks o services.
8. Ningun numero magico en logica de negocio.
9. Tipos definidos en archivos `.types.ts` separados.
10. Importaciones siguiendo el flujo de dependencias unidireccional.
11. Documentacion actualizada si aplica (README, ADR, o este PROJECT_CONTEXT).

---

## 15. Que NO hacer en este proyecto

- No usar Pages Router de Next.js, solo App Router.
- No usar Redux ni MobX. Para estado global usar React Context. Si crece, evaluar Zustand antes que Redux.
- No usar `any` en TypeScript. Si es necesario un tipo desconocido, usar `unknown` y refinar.
- No llamar al Firestore SDK desde un componente. Pasar siempre por un service de feature.
- No exponer tipos de Firestore (`DocumentSnapshot`, `Timestamp`) fuera de la capa de service.
- No definir constantes inline en componentes. Extraer a `.constants.ts`.
- No co ubicar tipos con componentes. Extraer a `.types.ts`.
- No invertir el flujo de dependencias: services no importan hooks, hooks no importan componentes.
- No duplicar elementos UI entre features. Usar o crear en `shared/components/`.
- No tocar Firestore sin actualizar Security Rules en el mismo Pull Request.
- No subir credenciales de service account de Firebase al repositorio. Solo van como GitHub Secrets o Environment Variables de Vercel.
- No implementar logica propia de hashing, JWT o refresh tokens. Firebase Auth lo cubre.

---

## 16. Limitaciones conocidas de Firestore

Decisiones tomadas con conciencia del costo a futuro:

- **Sin joins**: para queries de afinidad entre perfiles (Sprint 4), el equipo debera disenar consultas con `where` sobre maps con dot notation. Si la complejidad crece, evaluar Cloud Functions con Admin SDK para procesamiento server side.
- **Maximo un `array-contains` por query**: el modelo usa maps en `subgenres` para evitar esta limitacion.
- **Limite de 1 MB por documento**: el perfil cultural cabe holgadamente, pero si en el futuro se agregan historiales o discusiones embebidas, deberan moverse a subcolecciones.
- **Tarificacion por lectura**: cada query suma reads. El catalogo se debe cachear en memoria del cliente despues de la primera lectura del sprint.
- **Indices compuestos manuales**: cualquier query con mas de un `where` o un `orderBy` adicional puede requerir indice compuesto que se define en `firestore.indexes.json`.

---

## 17. Roadmap de uso de este documento

Este documento se actualiza al cierre de cada sprint con:

- Nuevas features incorporadas a la estructura.
- Nuevos componentes en `shared/components/`.
- Cambios en colecciones de Firestore.
- Cambios en Security Rules con justificacion.
- Nuevos ADRs aprobados.
- Lecciones aprendidas que afecten convenciones.

Cualquier cambio de stack o de regla absoluta exige un ADR nuevo firmado por el equipo antes de actualizar este documento.