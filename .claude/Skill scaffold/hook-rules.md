# Hook and Service Rules Reference

---

## Hooks

### Responsabilidad del Hook

El hook es la capa de **estado y side effects** de una feature. Es el punto de
coordinación entre el componente (presentación) y el servicio (datos).

Un hook es responsable de:
- Mantener el estado local (`useState`, `useReducer`)
- Ejecutar side effects (`useEffect`)
- Invocar servicios para obtener o mutar datos
- Exponer el estado y acciones necesarias al componente

Un hook NO es responsable de:
- Hacer `fetch()` o `axios()` directamente (eso es del servicio)
- Renderizar JSX
- Importar otros componentes

---

### Regla SRP para Hooks

Si un hook hace más de una cosa semánticamente diferente, dividirlo:

```typescript
// MAL — un hook que hace todo
export function useProductPage(productId: string) {
  // Estado del producto
  // Estado del carrito
  // Estado de reviews
  // Lógica de filtros
  // Lógica de paginación
  // ...15 returns
}

// BIEN — hooks por responsabilidad
export function useProductData(productId: string) { ... }    // solo datos del producto
export function useProductCart(productId: string) { ... }    // solo carrito
export function useProductReviews(productId: string) { ... } // solo reviews
```

---

### Patrón Estándar de Hook de Datos

```typescript
// features/product-catalog/hooks/useProductList.ts
import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/productCatalog.service';
import type { Product } from '../types/productCatalog.types';
import type { AsyncState } from '@/shared/types/common.types';

export function useProductList(): AsyncState<Product[]> {
  const [state, setState] = useState<AsyncState<Product[]>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetchProducts()
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
  }, []);

  return state;
}
```

---

### Patrón de Hook de Mutación

```typescript
// features/product-catalog/hooks/useCreateProduct.ts
import { useState } from 'react';
import { createProduct } from '../services/productCatalog.service';
import type { CreateProductPayload, Product } from '../types/productCatalog.types';

interface UseCreateProductReturn {
  create: (payload: CreateProductPayload) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  createdProduct: Product | null;
}

export function useCreateProduct(): UseCreateProductReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);

  const create = async (payload: CreateProductPayload): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createProduct(payload);
      setCreatedProduct(response.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear producto';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error, createdProduct };
}
```

---

### ISP en Hooks

Un hook no debe retornar más de lo que el consumidor puede usar. Si hay consumidores
con necesidades muy diferentes, dividir en hooks especializados:

```typescript
// MAL — retorna 12 valores, los consumidores usan 2-3
export function useProduct(id: string) {
  return {
    product, reviews, relatedProducts, seller,
    isLoading, isLoadingReviews, isLoadingRelated,
    error, errorReviews,
    addToCart, removeFromCart, toggleWishlist,
  };
}

// BIEN — hooks segregados
export function useProductData(id: string) {
  return { product, isLoading, error };
}

export function useProductReviews(productId: string) {
  return { reviews, isLoading: isLoadingReviews, addReview };
}

export function useProductCart(productId: string) {
  return { addToCart, removeFromCart, isInCart };
}
```

---

## Services

### Responsabilidad del Service

El servicio es la capa de **acceso a datos**. Es el único lugar donde se hace
comunicación con APIs externas, bases de datos, o localStorage.

Un servicio es responsable de:
- Construir la URL con constantes
- Hacer el llamado HTTP
- Deserializar la respuesta
- Propagar errores hacia arriba

Un servicio NO es responsable de:
- Manejar estado
- Renderizar UI
- Importar hooks o componentes

---

### Estructura de un Service

```typescript
// features/product-catalog/services/productCatalog.service.ts
import { httpClient } from '@/lib/utils/http';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
  ProductPage,
} from '../types/productCatalog.types';
import type { ApiResponse } from '@/shared/types/api.types';
import { PRODUCT_CATALOG_PAGE_SIZE } from '../constants/productCatalog.constants';

export async function fetchProducts(page = 1): Promise<ApiResponse<ProductPage>> {
  return httpClient<ProductPage>(API_ENDPOINTS.PRODUCTS.BASE, {
    method: 'GET',
    // Se pueden agregar query params aquí
  });
}

export async function fetchProductById(id: string): Promise<ApiResponse<Product>> {
  return httpClient<Product>(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`, {
    method: 'GET',
  });
}

export async function createProduct(
  payload: CreateProductPayload
): Promise<ApiResponse<Product>> {
  return httpClient<Product>(API_ENDPOINTS.PRODUCTS.BASE, {
    method: 'POST',
    body: payload,
  });
}

export async function updateProduct(
  id: string,
  payload: UpdateProductPayload
): Promise<ApiResponse<Product>> {
  return httpClient<Product>(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`, {
    method: 'PUT',
    body: payload,
  });
}

export async function deleteProduct(id: string): Promise<ApiResponse<void>> {
  return httpClient<void>(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`, {
    method: 'DELETE',
  });
}
```

---

### ISP en Services — Segregar por Dominio

Si un servicio comienza a crecer con responsabilidades de dominios diferentes,
dividirlo en múltiples archivos:

```typescript
// MAL — un servicio que maneja productos Y reviews
// productCatalog.service.ts
export async function fetchProducts() { ... }
export async function createProduct() { ... }
export async function fetchReviews() { ... }   // ← dominio diferente
export async function addReview() { ... }       // ← dominio diferente

// BIEN — servicios segregados por dominio
// productCatalog.service.ts — solo productos
export async function fetchProducts() { ... }
export async function createProduct() { ... }

// productReview.service.ts — solo reviews
export async function fetchReviews() { ... }
export async function addReview() { ... }
```

---

## Checklist de Hooks y Services

### Hook
- [ ] ¿El nombre empieza con `use`?
- [ ] ¿Exporta exactamente UN hook?
- [ ] ¿NO llama `fetch()` o `axios()` directamente?
- [ ] ¿Importa desde el service de su feature?
- [ ] ¿Importa tipos desde `.types.ts`?
- [ ] ¿Tiene cleanup en `useEffect` (variable `cancelled` o `AbortController`)?
- [ ] ¿Retorna solo lo que los consumidores necesitan (ISP)?

### Service
- [ ] ¿Todas las URLs vienen de `api.constants.ts`?
- [ ] ¿Usa `httpClient` en lugar de `fetch()` directo?
- [ ] ¿Todas las funciones tienen tipado de retorno explícito?
- [ ] ¿Solo maneja un dominio de datos (ISP)?
- [ ] ¿NO importa hooks ni componentes?
