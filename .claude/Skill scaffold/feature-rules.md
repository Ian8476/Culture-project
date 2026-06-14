# Feature Rules Reference

Una **feature** es un módulo de dominio de negocio autocontenido. Cada feature
encapsula todo lo necesario para esa unidad funcional: componentes, hooks, servicios,
tipos, y constantes.

---

## Cuándo Crear una Feature

Crear una feature cuando el dominio de negocio es identificable y discreto:
- `auth` — autenticación y sesión
- `user-profile` — perfil de usuario
- `product-catalog` — listado de productos
- `shopping-cart` — carrito de compras
- `dashboard` — panel principal
- `notifications` — sistema de notificaciones

**NO** crear una feature para:
- Un solo componente genérico → va en `shared/components/`
- Una utilidad pura → va en `lib/utils/`
- Un tipo compartido entre múltiples features → va en `shared/types/`

---

## Estructura Interna de una Feature

```
features/
└── product-catalog/
    ├── components/
    │   ├── ProductList.tsx          # Contenedor de lista (usa hook)
    │   ├── ProductCard.tsx          # Presentación de un producto
    │   └── ProductCardSkeleton.tsx  # Estado de carga
    ├── hooks/
    │   ├── useProductList.ts        # Estado y side effects de la lista
    │   └── useProductFilters.ts     # Lógica de filtros (separado por SRP)
    ├── services/
    │   └── productCatalog.service.ts
    ├── types/
    │   └── productCatalog.types.ts
    ├── constants/
    │   └── productCatalog.constants.ts
    └── index.ts                     # Solo exporta la API pública de la feature
```

---

## Barrel Export (`index.ts`)

El `index.ts` define la API pública de la feature. Solo exportar lo que otras
features o pages necesitan consumir. La implementación interna permanece privada.

```typescript
// features/product-catalog/index.ts

// Exportar el componente raíz de la feature (el que usan las pages)
export { ProductList } from './components/ProductList';

// Exportar tipos que otras features necesiten (si aplica)
export type { Product, ProductFilter } from './types/productCatalog.types';

// NO exportar hooks, services, constantes internas — son implementación privada
```

---

## Comunicación Entre Features

Las features **no se importan directamente entre sí**. Si la feature A necesita
datos de la feature B:

1. Los tipos compartidos van a `shared/types/`
2. Los servicios compartidos van a `shared/services/`
3. El estado global compartido usa Context o un state manager en `shared/`

**MAL:**
```typescript
// features/dashboard/hooks/useDashboard.ts
import { useProductList } from '@/features/product-catalog/hooks/useProductList'; // ← violación
```

**BIEN:**
```typescript
// features/dashboard/hooks/useDashboard.ts
import { fetchProducts } from '@/shared/services/product.service'; // ← correcto
```

---

## Ejemplo Completo de Feature: `user-profile`

### `features/user-profile/types/userProfile.types.ts`
```typescript
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface UpdateUserProfilePayload {
  name: string;
  avatarUrl?: string;
}
```

### `features/user-profile/constants/userProfile.constants.ts`
```typescript
export const USER_PROFILE_AVATAR_FALLBACK = '/images/avatar-default.png' as const;
export const USER_PROFILE_MAX_NAME_LENGTH = 60 as const;
export const USER_PROFILE_FORM_ID = 'user-profile-form' as const;
```

### `features/user-profile/services/userProfile.service.ts`
```typescript
import { httpClient } from '@/lib/utils/http';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';
import type { UserProfile, UpdateUserProfilePayload } from '../types/userProfile.types';
import type { ApiResponse } from '@/shared/types/common.types';

export async function fetchUserProfile(userId: string): Promise<ApiResponse<UserProfile>> {
  return httpClient<UserProfile>(`${API_ENDPOINTS.USER_PROFILE}/${userId}`, {
    method: 'GET',
  });
}

export async function updateUserProfile(
  userId: string,
  payload: UpdateUserProfilePayload
): Promise<ApiResponse<UserProfile>> {
  return httpClient<UserProfile>(`${API_ENDPOINTS.USER_PROFILE}/${userId}`, {
    method: 'PUT',
    body: payload,
  });
}
```

### `features/user-profile/hooks/useUserProfile.ts`
```typescript
import { useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/userProfile.service';
import type { UserProfile } from '../types/userProfile.types';
import type { AsyncState } from '@/shared/types/common.types';

export function useUserProfile(userId: string): AsyncState<UserProfile> {
  const [state, setState] = useState<AsyncState<UserProfile>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetchUserProfile(userId)
      .then(response => {
        if (!cancelled) {
          setState({ data: response.data, isLoading: false, error: null });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Error desconocido';
          setState({ data: null, isLoading: false, error: message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return state;
}
```

### `features/user-profile/components/UserProfileCard.tsx`
```typescript
import type { UserProfile } from '../types/userProfile.types';
import { USER_PROFILE_AVATAR_FALLBACK } from '../constants/userProfile.constants';
import styles from './UserProfileCard.module.css';

interface UserProfileCardProps {
  profile: UserProfile;
}

export function UserProfileCard({ profile }: UserProfileCardProps) {
  const avatarSrc = profile.avatarUrl ?? USER_PROFILE_AVATAR_FALLBACK;

  return (
    <article className={styles.card}>
      <img src={avatarSrc} alt={profile.name} className={styles.avatar} />
      <h2 className={styles.name}>{profile.name}</h2>
      <p className={styles.email}>{profile.email}</p>
    </article>
  );
}
```

### `features/user-profile/components/UserProfilePage.tsx`
```typescript
// Este es el componente raíz de la feature que consume la page de Next.js.
// Coordina hooks y componentes. NO hace fetching directamente.

import { useUserProfile } from '../hooks/useUserProfile';
import { UserProfileCard } from './UserProfileCard';
import { USER_PROFILE_FORM_ID } from '../constants/userProfile.constants';

interface UserProfilePageProps {
  userId: string;
}

export function UserProfilePage({ userId }: UserProfilePageProps) {
  const { data: profile, isLoading, error } = useUserProfile(userId);

  if (isLoading) return <p>Cargando perfil...</p>;
  if (error !== null) return <p>Error: {error}</p>;
  if (profile === null) return null;

  return (
    <main id={USER_PROFILE_FORM_ID}>
      <UserProfileCard profile={profile} />
    </main>
  );
}
```

### `features/user-profile/index.ts`
```typescript
export { UserProfilePage } from './components/UserProfilePage';
export type { UserProfile } from './types/userProfile.types';
```
