# Component Rules Reference

---

## Principios Fundamentales de Componentes

### Un archivo = Un componente = Una responsabilidad de UI

Cada archivo `.tsx` exporta exactamente una función que retorna JSX. Si necesitas
un sub-componente pequeño, crea un archivo separado en la misma carpeta.

### Componentes como "Cáscaras de Presentación"

Un componente solo sabe:
- Qué datos recibe (props)
- Cómo renderizarlos

Un componente NO sabe:
- De dónde vienen los datos
- Cómo se obtienen del servidor
- Qué otras features existen

Toda la lógica de estado y side effects va en el hook. El componente solo consume el hook.

---

## Patrones Obligatorios

### 0. Verificación de Reutilización — SIEMPRE PRIMERO

Antes de crear cualquier componente, ejecutar esta verificación:

1. ¿Es un elemento UI primitivo (botón, input, campo, badge, spinner)?
   - **Sí** → buscar en `shared/components/`. Si existe, usarlo. Si no, crearlo ahí.
2. ¿Lo van a usar más de una feature?
   - **Sí** → va en `shared/components/`, nunca dentro de la feature.
3. ¿Es 100% específico de esta feature y nunca se reutilizará?
   - **Solo entonces** → crearlo dentro de la feature.

Leer `references/shared-components.md` para el catálogo completo y ejemplos de uso.

---

### Separación Container / Presentación

Cuando una feature tiene un componente raíz que coordina estado y un componente que presenta datos,
siempre separarlos:

```
ProductList.tsx        ← "Container" o "Page Component" — usa el hook, coordina
ProductCard.tsx        ← "Presentational" — solo props, cero estado
```

**Container component (usa hook):**
```typescript
// features/product-catalog/components/ProductList.tsx
import { useProductList } from '../hooks/useProductList';
import { ProductCard } from './ProductCard';
import { ProductListSkeleton } from './ProductListSkeleton';

export function ProductList() {
  const { products, isLoading, error } = useProductList();

  if (isLoading) return <ProductListSkeleton />;
  if (error !== null) return <p>{error}</p>;

  return (
    <ul>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
```

**Presentational component (solo props):**
```typescript
// features/product-catalog/components/ProductCard.tsx
import type { Product } from '../types/productCatalog.types';
import { PRODUCT_CATALOG_IMAGE_FALLBACK } from '../constants/productCatalog.constants';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.imageUrl ?? PRODUCT_CATALOG_IMAGE_FALLBACK;

  return (
    <article className={styles.card}>
      <img src={imageSrc} alt={product.name} className={styles.image} />
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>{product.price}</p>
    </article>
  );
}
```

---

### ISP en Props (Interface Segregation)

Los componentes reciben **solo lo que usan**. Nunca pasar un objeto completo
cuando el componente solo necesita dos campos.

```typescript
// MAL — ISP violation
interface ProductPriceProps {
  product: Product;   // ← recibe todo el objeto pero solo usa price y currency
}
export function ProductPrice({ product }: ProductPriceProps) {
  return <span>{product.price} {product.currency}</span>;
}

// BIEN — solo lo que necesita
interface ProductPriceProps {
  price: number;
  currency: string;
}
export function ProductPrice({ price, currency }: ProductPriceProps) {
  return <span>{price} {currency}</span>;
}
```

---

### OCP en Componentes (Open/Closed Principle)

Para componentes con variantes (tipos de botón, alertas, badges), usar un mapa
de estilos en lugar de if/else o switch:

```typescript
// MAL — OCP violation: agregar una variante requiere editar el componente
export function Alert({ type, message }: AlertProps) {
  let className = '';
  if (type === 'success') className = 'alert-success';
  else if (type === 'error') className = 'alert-error';
  else if (type === 'warning') className = 'alert-warning';
  // Agregar 'info' obliga a editar aquí ← violación OCP
  return <div className={className}>{message}</div>;
}

// BIEN — extender sin modificar
import { ALERT_STYLES } from './alert.constants';

export function Alert({ type, message }: AlertProps) {
  return (
    <div className={ALERT_STYLES[type]}>{message}</div>
  );
}

// alert.constants.ts — agregar variante = solo editar aquí
export const ALERT_STYLES: Record<AlertType, string> = {
  success: styles.success,
  error: styles.error,
  warning: styles.warning,
  info: styles.info,   // ← nueva variante sin tocar el componente
} as const;
```

---

### LSP en Componentes (Liskov Substitution)

Componentes del mismo "tipo" (ej. todos los campos de formulario, todos los botones)
deben honrar el mismo contrato de props para poder intercambiarse:

```typescript
// Todos los inputs de formulario deben tener este contrato
interface FormFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  error?: string;
  disabled?: boolean;
}

// TextInput.tsx — honra el contrato
export function TextInput({ value, onChange, label, error, disabled }: FormFieldProps) { ... }

// SelectInput.tsx — mismo contrato, sustituible
export function SelectInput({ value, onChange, label, error, disabled }: FormFieldProps) { ... }

// EmailInput.tsx — mismo contrato, sustituible
export function EmailInput({ value, onChange, label, error, disabled }: FormFieldProps) { ... }
```

---

## Props Types — Siempre en Archivo Separado

Para props de componentes que se exportan o que son usadas en múltiples lugares,
el tipo va en su archivo `*.types.ts`. Para componentes pequeños internos,
puede ir en un `<Feature>.types.ts` de la feature.

```typescript
// features/product-catalog/types/productCatalog.types.ts
// (agregar las props de componentes aquí si son usadas en más de un lugar)
export interface ProductCardProps {
  product: Product;
  onSelect?: (id: string) => void;
}
```

---

## CSS Modules — Convención Obligatoria

Cada componente tiene su propio CSS Module. No compartir clases entre componentes.

```
ProductCard.tsx
ProductCard.module.css
```

Las clases en CSS Modules siempre en `camelCase`:

```css
/* ProductCard.module.css */
.card { ... }
.cardImage { ... }
.cardName { ... }
.cardPrice { ... }
```

---

## Checklist de Componentes

Antes de generar un componente, verificar:

- [ ] ¿Ya existe un componente equivalente en `shared/components/`? Si sí → usarlo.
- [ ] Si es UI primitivo y se usará en 2+ features → ¿está en `shared/components/`?
- [ ] ¿Exporta exactamente UN componente?
- [ ] ¿El componente NO hace fetching directamente?
- [ ] ¿El componente NO tiene lógica de negocio (solo presentación)?
- [ ] ¿Las props son el mínimo necesario (ISP)?
- [ ] ¿Los strings están en `.constants.ts`?
- [ ] ¿Los números están en `.constants.ts`?
- [ ] ¿Los tipos/interfaces están en `.types.ts`?
- [ ] ¿Tiene su propio CSS Module?
- [ ] ¿El nombre del archivo es `PascalCase.tsx`?
