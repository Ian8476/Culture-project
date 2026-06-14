<!-- BEGIN:nextjs-agent-rules -->
# Next.js

Stack fijado a **Next.js 15** (App Router) según el documento de contexto. Si una API
difiere de lo esperado, consultar la guía en `node_modules/next/dist/docs/` antes de escribir código.
<!-- END:nextjs-agent-rules -->

# Plataforma Cultural — Reglas para agentes

**Antes de generar o modificar cualquier código, leer `.claude/Project-context.md`** (fuente de
verdad operativa) y el skill de arquitectura en `.claude/Skill scaffold/`.

## Stack
Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind v4 · Firebase (Firestore + Auth)
· Zod · Vitest · pnpm.

## Reglas absolutas (bloquean PR)
- **R1 Zero Hardcoded Strings** → todo string de lógica/config/Firebase va en `*.constants.ts`. Solo se permite JSX de presentación final.
- **R2 Zero Magic Numbers** → todo número ≠ 0,1,-1 es constante `UPPER_SNAKE_CASE`.
- **R3 SRP** → un archivo, una responsabilidad. Componente, hook, service, types y constants separados.
- **R4 Tipos en `*.types.ts`** → nunca co-ubicar interfaces/types con lógica.
- **R6 Dependencias unidireccionales** → page → component → hook → service → constants/types. Un service no importa un hook; un hook no importa un componente; un componente no llama al Firestore SDK directo.
- **R8 Reutilización** → antes de crear UI, revisar `src/shared/components/`.
- **R9 Data access desacoplada** → los services exponen tipos de dominio (`Profile`, `Date`), nunca tipos de Firestore (`DocumentSnapshot`, `Timestamp`). Traducción vía `src/lib/firebase/converters.ts`.

## Ubicaciones clave
- Inicialización Firebase: `src/lib/firebase/client.ts`
- Nombres de colección: `src/lib/firebase/collections.ts`
- Converters Firestore↔dominio: `src/lib/firebase/converters.ts`
- Tipos de dominio: `src/shared/types/domain.types.ts`
- Estado de sesión: `src/shared/context/AuthProvider.tsx` + `useAuthContext`
- Componentes UI compartidos: `src/shared/components/` (barrel en `index.ts`)
- Security Rules: `firestore.rules` (actualizar en el mismo PR que toque Firestore)

## Comandos
`pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm format` · `pnpm seed`

## Nunca
`any` · Pages Router · Redux/MobX · llamar Firestore SDK desde un componente · exponer `Timestamp`
fuera del service · versionar la service account key (`KEY DE PROYECTO ADMIN 3.json`).
