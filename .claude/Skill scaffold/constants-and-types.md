# Constants and Types Reference

---

## Constantes

### Naming Convention Obligatorio

| Qué | Patrón de archivo | Ejemplo |
|-----|------------------|---------|
| Constantes de feature | `features/<feature>/constants/<feature>.constants.ts` | `productCatalog.constants.ts` |
| Constantes compartidas | `shared/constants/<nombre>.constants.ts` | `api.constants.ts` |
| Constantes de app | `shared/constants/app.constants.ts` | — |

Los valores siempre en `UPPER_SNAKE_CASE`. Los objetos de agrupación en `UPPER_SNAKE_CASE` también.

### Qué va en cada archivo de constantes

#### `app.constants.ts` — Configuración global de la app
```typescript
export const APP_NAME = 'MiAplicacion' as const;
export const APP_VERSION = '1.0.0' as const;
export const DEFAULT_LOCALE = 'es-CR' as const;
export const DEFAULT_TIMEZONE = 'America/Costa_Rica' as const;
```

#### `api.constants.ts` — Endpoints y configuración HTTP
```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '' as const;
export const API_TIMEOUT_MS = 10_000 as const;
export const API_RETRY_COUNT = 3 as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
  },
} as const;
```

#### `routes.constants.ts` — Rutas de navegación
```typescript
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;
```

#
#### Ejemplo de constantes de feature
```typescript
// features/product-catalog/constants/productCatalog.constants.ts

export const PRODUCT_CATALOG_PAGE_SIZE = 20 as const;
export const PRODUCT_CATALOG_MAX_PRICE = 999_999 as const;
export const PRODUCT_CATALOG_SORT_OPTIONS = {
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  NEWEST: 'created_at_desc',
  RELEVANCE: 'relevance',
} as const;
export const PRODUCT_CATALOG_SEARCH_DEBOUNCE_MS = 300 as const;
export const PRODUCT_CATALOG_IMAGE_FALLBACK = '/images/product-placeholder.png' as const;
```

---

## Tipos e Interfaces

### Naming Convention Obligatorio

| Qué | Patrón de archivo | Ejemplo |
|-----|------------------|---------|
| Tipos de feature | `features/<feature>/types/<feature>.types.ts` | `productCatalog.types.ts` |
| Tipos compartidos entre features | `shared/types/<dominio>.types.ts` | `api.types.ts` |
| Props de componente | Co-ubicados con su componente en `<Component>.types.ts` o en el types folder de la feature | `UserCard.types.ts` |

### Reglas de Interfaces y Types

1. **Siempre en su propio archivo.** Nunca definir un `interface` o `type` dentro de un componente,
   hook, o servicio. Siempre en un `*.types.ts` separado.

2. **Preferir `interface` para contratos de objeto** (props, API responses, entidades de dominio).

3. **Usar `type` para uniones, intersecciones, y aliases** de tipos primitivos o compuestos.

4. **Usar `enum` solo para conjuntos cerrados** que no cambiarán. Para conjuntos abiertos,
   preferir `as const` objects que generan tipos más seguros.

5. **Nombres semánticos.** El nombre del tipo debe describir el dominio, no el uso:
   - `UserProfile` no `UserProfileProps` (a menos que sea efectivamente solo para props)
   - `ApiResponse<T>` no `Response<T>` (demasiado genérico)

### Tipos compartidos (`shared/types/`)

#### `common.types.ts`
```typescript
// Estado asíncrono genérico para cualquier entidad
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// Respuesta paginada genérica
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

// Opción de select genérica
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

#### `api.types.ts`
```typescript
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  status: number;
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
}
```

### Tipos de Feature — Ejemplo completo

```typescript
// features/product-catalog/types/productCatalog.types.ts

import type { PaginatedData } from '@/shared/types/common.types';
import type { PRODUCT_CATALOG_SORT_OPTIONS } from '../constants/productCatalog.constants';

// Entidad de dominio
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  categoryId: string;
  createdAt: string;
}

// Payloads de mutación
export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {}

// Tipos de UI / filtros
export type ProductSortOption = typeof PRODUCT_CATALOG_SORT_OPTIONS[
  keyof typeof PRODUCT_CATALOG_SORT_OPTIONS
];

export interface ProductFilters {
  search: string;
  categoryId: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: ProductSortOption;
}

// Respuesta paginada específica
export type ProductPage = PaginatedData<Product>;
```

---

## Anti-Patterns a Evitar

```typescript
// MAL — tipo definido dentro del componente
// UserCard.tsx
interface Props {         // ← esto viola SRP
  name: string;
}
export function UserCard({ name }: Props) { ... }

// BIEN — tipo en su archivo
// UserCard.types.ts
export interface UserCardProps {
  name: string;
}
// UserCard.tsx
import type { UserCardProps } from './UserCard.types';
export function UserCard({ name }: UserCardProps) { ... }
```

```typescript
// MAL — string hardcoded en lógica
export function fetchProducts() {
  return fetch('https://api.myapp.com/v1/products'); // ← violación R1
}

// BIEN — constante nombrada
import { API_BASE_URL, API_ENDPOINTS } from '@/shared/constants/api.constants';
export function fetchProducts() {
  return fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.BASE}`);
}
```

```typescript
// MAL — número mágico
if (response.status === 401) { ... }  // ← qué significa 401 en contexto?
setTimeout(retry, 3000);              // ← por qué 3000?

// BIEN — constante semántica
import { HTTP_STATUS, RETRY_DELAY_MS } from '@/shared/constants/api.constants';
if (response.status === HTTP_STATUS.UNAUTHORIZED) { ... }
setTimeout(retry, RETRY_DELAY_MS);
```
