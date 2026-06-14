---
name: nextjs-feature-architecture
description: >
  Scaffolds and enforces a strict feature-based architecture for TypeScript + React + Next.js projects.
  Apply this skill whenever the user wants to start, scaffold, or structure a new Next.js project,
  create a new feature, add a component, hook, service, type, or constant inside a Next.js/React/TypeScript
  codebase. Also trigger when the user asks to refactor existing frontend code to match clean architecture,
  SOLID principles, or feature-based structure. Trigger on phrases like "crear proyecto", "nueva feature",
  "nuevo componente", "agregar constante", "agregar tipo", "agregar hook", "scaffold", "estructura proyecto",
  "proyecto Next.js", "proyecto React TypeScript", "arquitectura", "feature module", or any request to
  produce, review, or fix code in a TypeScript + React + Next.js stack. This skill is MANDATORY whenever
  any file is generated for this stack — never skip it, even for "small" additions.
---

# Next.js Feature-Based Architecture — TypeScript + React

Esta skill define la arquitectura, reglas y estructura obligatoria para **todos** los proyectos
Next.js con TypeScript y React. Se aplica **sin excepción** en cada archivo generado.

Antes de generar cualquier código, lee el archivo de referencia correspondiente a la tarea:
- Scaffolding inicial del proyecto → `references/project-scaffold.md`
- Crear o modificar una feature → `references/feature-rules.md`
- Crear componentes → `references/component-rules.md`
- Crear hooks → `references/hook-rules.md`
- Crear servicios → `references/service-rules.md`
- Crear constantes o tipos → `references/constants-and-types.md`
- Crear o reutilizar minicomponentes compartidos → `references/shared-components.md`

---

## Reglas Absolutas (no negociables)

Las siguientes reglas no tienen excepciones. Si alguna se viola, el código no es aceptable.

### R1 — Zero Hardcoded Strings
Toda cadena de texto que aparezca en lógica, rendering, configuración o comunicación
con APIs debe extraerse a un archivo `.constants.ts`. Esto incluye:
- Rutas y URLs
- Endpoints de API
- Mensajes de error y labels
- Nombres de eventos
- Claves de localStorage / cookies
- Nombres de query params

**No hay excepción.** Si es un string literal que no es un valor de datos del usuario,
pertenece a un constants file.

### R2 — Zero Magic Numbers
Todo número literal que no sea `0`, `1`, o `-1` en contexto de índice/incremento obvio
debe ser una constante nombrada en `UPPER_SNAKE_CASE` que explique su propósito semántico.

### R3 — SRP Estricto: Un archivo, una responsabilidad
- Un archivo de componente exporta **exactamente un componente** que retorna JSX.
- Un archivo de hook exporta **exactamente un hook**.
- Un archivo de servicio exporta **solo funciones del mismo dominio de datos**.
- Un archivo de tipos exporta **solo tipos/interfaces/enums**.
- Un archivo de constantes exporta **solo constantes**.
- **NUNCA** mezclar tipos con lógica, constantes con componentes, hooks con servicios.

### R4 — Types e interfaces en su propio archivo
Toda `interface`, `type`, o `enum` que sea usada por más de una expresión va en un
archivo `*.types.ts` dedicado. Nunca co-ubicar con componentes, hooks, o servicios.

### R5 — Constantes con naming convention obligatorio
Los archivos de constantes siguen el patrón: `<nombre>.constants.ts`
Las constantes se nombran en `UPPER_SNAKE_CASE`.

### R6 — Flujo de dependencias unidireccional
```
page / layout (Next.js)
  └── component (presentation)
        └── hook (state + side effects)
              └── service (data access)
                    └── constants (config)
                    └── types (contracts)
```
**Nunca** invertir este flujo. Un servicio no importa un hook. Un hook no importa
un componente. Un componente no importa directamente un servicio.

### R7 — Un componente, una responsabilidad de UI
Un componente no puede:
- Hacer fetching de datos Y renderizar UI
- Manejar estado global Y presentar datos
- Contener lógica de negocio Y estructura HTML
- Contener más de un `return` con JSX significativo

La lógica va en el hook. La presentación va en el componente.

### R8 — Reutilización obligatoria de minicomponentes
Antes de crear cualquier elemento UI (botón, input, badge, spinner, modal, etc.),
verificar si ya existe un componente en `shared/components/`. Si existe, usarlo.
Si no existe pero se usará en más de una feature, crearlo en `shared/components/`.

**La duplicación de elementos UI es una violación.** No se crea un botón de búsqueda
por feature: se crea un `Button` o `SearchBar` compartido y se configura vía props.

Los minicomponentes compartidos se parametrizan con props, no se duplican.
Leer `references/shared-components.md` para la guía completa de reutilización.

---

## Estructura de Proyecto Obligatoria

```
src/
├── app/                          # Next.js App Router (solo routing y layouts)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Root page (delega a feature component)
│   ├── (auth)/                   # Route groups
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   └── [feature]/
│       └── page.tsx
│
├── features/                     # Módulos por dominio de negocio
│   └── <feature-name>/
│       ├── components/           # Componentes privados de la feature
│       │   ├── FeatureName.tsx
│       │   └── FeatureNameItem.tsx
│       ├── hooks/                # Hooks privados de la feature
│       │   └── useFeatureName.ts
│       ├── services/             # Acceso a datos de la feature
│       │   └── featureName.service.ts
│       ├── types/                # Tipos e interfaces de la feature
│       │   └── featureName.types.ts
│       ├── constants/            # Constantes de la feature
│       │   └── featureName.constants.ts
│       └── index.ts              # Barrel export público de la feature
│
├── shared/                       # Código transversal y reutilizable
│   ├── components/               # Minicomponentes UI reutilizables entre features
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchBar.module.css
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.module.css
│   │   │   └── index.ts
│   │   └── index.ts              # Barrel de todos los shared components
│   ├── hooks/                    # Hooks genéricos (useDebounce, useLocalStorage)
│   ├── services/                 # Servicios compartidos (http client, auth)
│   ├── types/                    # Tipos compartidos entre features
│   │   ├── api.types.ts
│   │   └── common.types.ts
│   └── constants/                # Constantes globales
│       ├── api.constants.ts
│       ├── routes.constants.ts
│       └── app.constants.ts
│
├── lib/                          # Utilidades puras sin dependencia de framework
│   └── utils/
│       └── formatters.ts
│
└── styles/                       # Estilos globales únicamente
    └── globals.css
```

---

## Checklist de Pre-Generación

Antes de generar **cualquier** archivo, ejecuta este checklist en orden:

### 0. Contexto del proyecto
- [ ] ¿Escaneé la estructura existente del proyecto? Si no → hacerlo primero.
- [ ] ¿El archivo que voy a crear ya existe (o algo equivalente)? Si sí → reusar o extender.
- [ ] Si es un elemento UI: ¿ya existe en `shared/components/`? Si sí → usarlo directamente.
- [ ] Si es un elemento UI nuevo que se usará en más de una feature → crearlo en `shared/components/`.
- [ ] ¿La feature a la que pertenece este archivo ya tiene su carpeta? Si no → crearla.

### 1. Tipo de archivo correcto
- [ ] ¿Es lógica de estado/side effects? → Hook (`use<Name>.ts`)
- [ ] ¿Es acceso a datos/API? → Service (`<name>.service.ts`)
- [ ] ¿Es presentación JSX? → Component (`<Name>.tsx`)
- [ ] ¿Es un contrato de datos? → Type (`<name>.types.ts`)
- [ ] ¿Es un valor reutilizable no calculado? → Constant (`<name>.constants.ts`)

### 2. SRP
- [ ] ¿Este archivo tiene exactamente UNA razón para cambiar?
- [ ] Si es componente: ¿exporta solo UN componente que retorna JSX?
- [ ] Si es hook: ¿exporta solo UN hook?
- [ ] ¿No hay tipos mezclados con lógica?
- [ ] ¿No hay constantes mezcladas con componentes?

### 3. Strings y números
- [ ] ¿Hay algún string literal hardcoded? → Extraer a `.constants.ts` antes de continuar.
- [ ] ¿Hay algún número literal que no sea 0, 1, -1? → Extraer a `.constants.ts`.

### 4. Flujo de dependencias
- [ ] ¿El componente importa desde un hook (no desde un service)?
- [ ] ¿El hook importa desde un service (no hace fetch directo)?
- [ ] ¿El service importa constantes (URLs hardcoded = violación)?
- [ ] ¿Los tipos están importados desde `.types.ts`?

---

## Reglas de Naming

| Artefacto | Convención | Ejemplo |
|-----------|-----------|---------|
| Componente | `PascalCase.tsx` | `UserCard.tsx` |
| Hook | `useCamelCase.ts` | `useUserProfile.ts` |
| Service | `camelCase.service.ts` | `userProfile.service.ts` |
| Types file | `camelCase.types.ts` | `userProfile.types.ts` |
| Constants file | `camelCase.constants.ts` | `userProfile.constants.ts` |
| Constant value | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Interface | `PascalCase` con prefijo `I` opcional | `UserProfile` o `IUserProfile` |
| Type alias | `PascalCase` | `ApiResponse<T>` |
| Barrel export | `index.ts` | — |

---

## Violaciones Críticas — Rechazar y Corregir

Si detectas cualquiera de lo siguiente en código propio o en revisiones, es una violación crítica
que debe corregirse antes de continuar:

1. **String literal en un componente, hook, o service** → extraer a constants
2. **Interface o type definido dentro de un `.tsx`, `.ts` funcional** → mover a `.types.ts`
3. **Componente que llama `fetch()` o `axios` directamente** → extraer a service
4. **Hook que importa desde un componente** → inversión de dependencia, refactorizar
5. **Un archivo `.tsx` con dos o más funciones que retornan JSX** → separar en archivos
6. **Constante definida inline en un componente** → mover a `.constants.ts`
7. **Número mágico en lógica de negocio** → extraer a constant con nombre semántico
8. **Page de Next.js con lógica de negocio o estado** → delegar a feature component + hook
9. **Elemento UI duplicado entre features** (botón, input, badge, etc.) → mover a `shared/components/` y reutilizar

---

Para detalles de implementación específicos por tipo de artefacto, leer los archivos en `references/`.
