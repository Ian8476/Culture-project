# Shared Components Reference — Minicomponentes Reutilizables

Este archivo define cómo crear, estructurar y consumir los minicomponentes compartidos
de `shared/components/`. Estos son la base UI del proyecto: se crean una sola vez
y se reutilizan en todas las features que los necesiten.

---

## Principio Central

**Antes de crear cualquier elemento UI en una feature, siempre preguntar:**

> ¿Este elemento (botón, input, campo de búsqueda, spinner, badge, modal) ya existe
> en `shared/components/`?

- **Sí existe** → importarlo y usarlo. Cero código nuevo.
- **No existe, pero se usará en más de una feature** → crearlo en `shared/components/`.
- **No existe, y es 100% específico de esta feature** → crearlo dentro de la feature,
  pero diseñarlo pensando en que podría moverse a `shared/` si se reutiliza.

La duplicación de elementos UI es una violación arquitectural, no una preferencia.

---

## Estructura de un Shared Component

Cada minicomponente compartido vive en su propia subcarpeta:

```
shared/components/
├── Button/
│   ├── Button.tsx             ← componente
│   ├── Button.types.ts        ← props e interfaces
│   ├── Button.constants.ts    ← variantes, tamaños como constantes
│   ├── Button.module.css      ← estilos propios
│   └── index.ts               ← barrel export
├── Input/
│   ├── Input.tsx
│   ├── Input.types.ts
│   ├── Input.constants.ts
│   ├── Input.module.css
│   └── index.ts
├── SearchBar/
│   ├── SearchBar.tsx
│   ├── SearchBar.types.ts
│   ├── SearchBar.constants.ts
│   ├── SearchBar.module.css
│   └── index.ts
└── index.ts                   ← barrel de todos los shared components
```

---

## Catálogo de Minicomponentes Base

Los siguientes componentes DEBEN existir en `shared/components/` desde el inicio
del proyecto. Nunca se duplican en features individuales.

### `Button` — Botón genérico configurable

El botón base del sistema. Todas las acciones interactivas lo usan: botón de buscar,
de guardar, de cancelar, de eliminar, de cargar más. No hay un "BotónDeBúsqueda"
ni un "BotónDeGuardar" — hay un `Button` con `variant` y `label`.

#### `Button.types.ts`
```typescript
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}
```

#### `Button.constants.ts`
```typescript
import type { ButtonVariant, ButtonSize } from './Button.types';
import styles from './Button.module.css';

export const BUTTON_VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
  ghost: styles.ghost,
} as const;

export const BUTTON_SIZE_STYLES: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as const;

export const BUTTON_DEFAULT_VARIANT: ButtonVariant = 'primary';
export const BUTTON_DEFAULT_SIZE: ButtonSize = 'md';
export const BUTTON_DEFAULT_TYPE = 'button' as const;
```

#### `Button.tsx`
```typescript
import type { ButtonProps } from './Button.types';
import {
  BUTTON_VARIANT_STYLES,
  BUTTON_SIZE_STYLES,
  BUTTON_DEFAULT_VARIANT,
  BUTTON_DEFAULT_SIZE,
  BUTTON_DEFAULT_TYPE,
} from './Button.constants';
import styles from './Button.module.css';

export function Button({
  label,
  onClick,
  variant = BUTTON_DEFAULT_VARIANT,
  size = BUTTON_DEFAULT_SIZE,
  disabled = false,
  isLoading = false,
  type = BUTTON_DEFAULT_TYPE,
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel ?? label}
      className={`${styles.base} ${BUTTON_VARIANT_STYLES[variant]} ${BUTTON_SIZE_STYLES[size]}`}
    >
      {isLoading ? <span className={styles.spinner} /> : label}
    </button>
  );
}
```

#### `index.ts`
```typescript
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';
```

---

### `Input` — Campo de texto genérico

Base para todos los campos de texto: búsqueda, formularios, filtros.

#### `Input.types.ts`
```typescript
export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  type?: InputType;
  id?: string;
  ariaLabel?: string;
}
```

#### `Input.constants.ts`
```typescript
export const INPUT_DEFAULT_TYPE = 'text' as const;
```

#### `Input.tsx`
```typescript
import type { InputProps } from './Input.types';
import { INPUT_DEFAULT_TYPE } from './Input.constants';
import styles from './Input.module.css';

export function Input({
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  type = INPUT_DEFAULT_TYPE,
  id,
  ariaLabel,
}: InputProps) {
  return (
    <div className={styles.wrapper}>
      {label !== undefined && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel ?? label}
        className={`${styles.input} ${error !== undefined ? styles.inputError : ''}`}
      />
      {error !== undefined && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
}
```

---

### `SearchBar` — Barra de búsqueda reutilizable

**Ejemplo clave de reutilización.** Una sola `SearchBar` se usa en:
- `product-catalog` para buscar productos
- `user-list` para buscar usuarios
- `order-history` para buscar pedidos

La feature NO crea su propio campo de búsqueda. Usa `SearchBar` y pasa su lógica
a través de props. La `SearchBar` no sabe qué se está buscando — solo maneja el input
y dispara el callback `onSearch`.

#### `SearchBar.types.ts`
```typescript
export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  isLoading?: boolean;
  debounceMs?: number;
}
```

#### `SearchBar.constants.ts`
```typescript
export const SEARCH_BAR_DEFAULT_PLACEHOLDER = 'Buscar...' as const;
export const SEARCH_BAR_DEFAULT_DEBOUNCE_MS = 300 as const;
export const SEARCH_BAR_BUTTON_LABEL = 'Buscar' as const;
export const SEARCH_BAR_CLEAR_LABEL = 'Limpiar búsqueda' as const;
export const SEARCH_BAR_MIN_QUERY_LENGTH = 0 as const;
```

#### `SearchBar.tsx`
```typescript
import { useState, useEffect, useRef } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import type { SearchBarProps } from './SearchBar.types';
import {
  SEARCH_BAR_DEFAULT_PLACEHOLDER,
  SEARCH_BAR_DEFAULT_DEBOUNCE_MS,
  SEARCH_BAR_BUTTON_LABEL,
  SEARCH_BAR_CLEAR_LABEL,
} from './SearchBar.constants';
import styles from './SearchBar.module.css';

export function SearchBar({
  onSearch,
  placeholder = SEARCH_BAR_DEFAULT_PLACEHOLDER,
  initialValue = '',
  isLoading = false,
  debounceMs = SEARCH_BAR_DEFAULT_DEBOUNCE_MS,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, debounceMs, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={styles.container}>
      <Input
        value={query}
        onChange={setQuery}
        placeholder={placeholder}
        type="search"
        ariaLabel={placeholder}
      />
      <Button
        label={SEARCH_BAR_BUTTON_LABEL}
        onClick={() => onSearch(query)}
        isLoading={isLoading}
        variant="primary"
      />
      {query.length > 0 && (
        <Button
          label={SEARCH_BAR_CLEAR_LABEL}
          onClick={handleClear}
          variant="ghost"
        />
      )}
    </div>
  );
}
```

#### Cómo lo usa una feature:
```typescript
// features/product-catalog/components/ProductList.tsx
import { SearchBar } from '@/shared/components';
import { useProductList } from '../hooks/useProductList';
import { ProductCard } from './ProductCard';
import { PRODUCT_CATALOG_SEARCH_PLACEHOLDER } from '../constants/productCatalog.constants';

export function ProductList() {
  const { products, isLoading, isSearching, handleSearch } = useProductList();

  return (
    <section>
      <SearchBar
        onSearch={handleSearch}
        placeholder={PRODUCT_CATALOG_SEARCH_PLACEHOLDER}
        isLoading={isSearching}
      />
      {isLoading ? <p>Cargando...</p> : (
        <ul>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </ul>
      )}
    </section>
  );
}

// features/user-list/components/UserList.tsx — misma SearchBar, diferente feature
import { SearchBar } from '@/shared/components';
import { useUserList } from '../hooks/useUserList';
import { USER_LIST_SEARCH_PLACEHOLDER } from '../constants/userList.constants';

export function UserList() {
  const { users, handleSearch } = useUserList();

  return (
    <section>
      <SearchBar
        onSearch={handleSearch}
        placeholder={USER_LIST_SEARCH_PLACEHOLDER}
      />
      {/* ...lista de usuarios */}
    </section>
  );
}
```

---

## Otros Minicomponentes Comunes

Estos se crean en `shared/components/` cuando se necesitan por primera vez
y se reutilizan a partir de entonces:

- `Badge` — etiquetas de estado (activo, inactivo, pendiente)
- `Spinner` — indicador de carga
- `EmptyState` — estado vacío genérico con mensaje e ícono configurable
- `Modal` — ventana modal con slot de contenido
- `Pagination` — control de paginación
- `Select` — dropdown genérico
- `Checkbox` — campo de selección múltiple
- `Avatar` — imagen de perfil con fallback

---

## Barrel Export de Shared Components

```typescript
// shared/components/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { SearchBar } from './SearchBar';
// ... demás componentes

export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';
export type { InputProps, InputType } from './Input';
export type { SearchBarProps } from './SearchBar';
```

Importar siempre desde el barrel:
```typescript
import { Button, SearchBar, Input } from '@/shared/components';
```

---

## Decisión: ¿`shared/components/` o dentro de la feature?

| Criterio | `shared/components/` | Dentro de la feature |
|----------|---------------------|---------------------|
| Se usa en 2+ features | Obligatorio | Nunca |
| Es un elemento UI primitivo (botón, input) | Siempre | Nunca |
| Contiene lógica de dominio de negocio | Nunca | Sí |
| Es un layout específico de una pantalla | Nunca | Sí |
| Se usa solo en esta feature hoy, pero podría reutilizarse | Crear aquí pensando en props genéricas | Solo si es 100% específico |

---

## Anti-Patterns Críticos

```typescript
// MAL — botón duplicado por feature
// features/product-catalog/components/SearchButton.tsx
export function SearchButton({ onClick }) {
  return <button onClick={onClick}>Buscar</button>;
}

// features/user-list/components/UserSearchButton.tsx
export function UserSearchButton({ onClick }) {
  return <button onClick={onClick}>Buscar usuarios</button>;  // ← duplicación
}

// BIEN — un solo Button compartido, configurado vía props
import { Button } from '@/shared/components';
<Button label="Buscar" onClick={handleSearch} variant="primary" />
<Button label="Buscar usuarios" onClick={handleUserSearch} variant="primary" />
```

```typescript
// MAL — SearchBar reimplementada dentro de la feature
// features/product-catalog/components/ProductSearch.tsx
export function ProductSearch({ onSearch }) {
  const [q, setQ] = useState('');
  return (
    <div>
      <input value={q} onChange={e => setQ(e.target.value)} />
      <button onClick={() => onSearch(q)}>Buscar</button>
    </div>
  );
}

// BIEN — reutilizar el componente compartido
import { SearchBar } from '@/shared/components';
<SearchBar onSearch={onSearch} placeholder={PRODUCT_SEARCH_PLACEHOLDER} />
```
