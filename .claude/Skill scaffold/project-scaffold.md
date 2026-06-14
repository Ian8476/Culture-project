# Project Scaffold Reference

Este archivo define cómo inicializar un proyecto nuevo desde cero con la arquitectura feature-based
obligatoria para TypeScript + React + Next.js.

---

## Comando de Inicialización

```bash
npx create-next-app@latest <project-name> \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

Tras la creación, eliminar los archivos de ejemplo de Next.js y estructurar así:

---

## Archivos Iniciales Obligatorios

### `src/shared/constants/app.constants.ts`
```typescript
export const APP_NAME = '<ProjectName>' as const;
export const APP_VERSION = '1.0.0' as const;
```

### `src/shared/constants/routes.constants.ts`
```typescript
export const ROUTES = {
  HOME: '/',
  // Agregar rutas aquí a medida que se crean
} as const;
```

### `src/shared/constants/api.constants.ts`
```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '' as const;

export const API_ENDPOINTS = {
  // Agregar endpoints aquí por dominio
} as const;
```

### `src/shared/types/common.types.ts`
```typescript
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

export type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};
```

### `src/shared/types/api.types.ts`
```typescript
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
}
```

### `src/lib/utils/http.ts`
```typescript
import { API_BASE_URL } from '@/shared/constants/api.constants';
import type { RequestConfig, ApiResponse } from '@/shared/types/api.types';

export async function httpClient<T>(
  endpoint: string,
  config: RequestConfig
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: config.method,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<ApiResponse<T>>;
}
```

### `src/app/layout.tsx`
```typescript
import type { Metadata } from 'next';
import { APP_NAME } from '@/shared/constants/app.constants';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_NAME,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

### `src/app/page.tsx`
```typescript
// Las pages de Next.js SOLO delegan a componentes de feature.
// Cero lógica aquí.
import { HomePage } from '@/features/home';

export default function Page() {
  return <HomePage />;
}
```

---

## Variables de Entorno

Crear `.env.local` con:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

Crear `.env.example` con las mismas claves (sin valores sensibles) para documentar.

---

## tsconfig.json — Path Aliases recomendados

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@features/*": ["./src/features/*"],
      "@shared/*": ["./src/shared/*"],
      "@lib/*": ["./src/lib/*"]
    }
  }
}
```

---

## ESLint — Reglas recomendadas (`.eslintrc.json`)

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "no-magic-numbers": ["warn", { "ignore": [0, 1, -1] }],
    "no-hardcoded-credentials": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-imports": "error"
  }
}
```
