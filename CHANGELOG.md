# Changelog

Registro de todos los cambios del proyecto, **agrupados por sesión de cambios**.
Formato inspirado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

> **Convención:** al cerrar cada sesión de trabajo se agrega una entrada nueva arriba (orden cronológico inverso),
> con la fecha y los cambios bajo las categorías _Añadido · Cambiado · Corregido · Eliminado · Documentación_.
> La bitácora técnica detallada vive en [`.claude/ESTADO-DEL-PROYECTO.md`](.claude/ESTADO-DEL-PROYECTO.md) (local, no versionada);
> este changelog es el resumen versionado del historial.

---

## Sesión — 2026-06-16

### Añadido
- **Toggle de modo oscuro/claro** en el `AppHeader` (componente compartido `ThemeToggle`). El tema se controla con el atributo `data-theme` en `<html>` (override manual de `prefers-color-scheme`), persiste en `localStorage` y aplica un script inline anti-FOUC en el root layout. Nuevo `ThemeProvider` + hook `useThemeContext` siguiendo el patrón de `AuthProvider`; tokens de paleta oscura reorganizados en `globals.css` para servir tanto al toggle como a la preferencia del sistema.

### Cambiado
- Despliegue migrado a la **integración Git de Vercel**: cada push a `main` despliega a producción y los PRs generan previews. Ya no depende de un workflow del repo.
- `.gitignore`: se ignora `graphify-out/` (artefactos transitorios de herramientas).

### Eliminado
- Workflow `.github/workflows/deploy.yml` (deploy por CLI de Vercel): redundante con la integración Git y fallaba sin los secrets `VERCEL_*`. Se conserva `ci.yml` (lint · typecheck · test · build · rules).

### Documentación
- **README** rediseñado a estilo editorial ("Tertulia"): hero SVG con tema claro/oscuro automático (`<picture>`), banda tipo marquesina, badges con la paleta de marca y secciones visuales. Assets nuevos en `.github/assets/`.
- `.claude/Project-context.md` sincronizado con el código real: feature `communities`, colecciones `discussions` + subcolección `comments`, nota de Security Rules y componentes compartidos nuevos.
- `.claude/ESTADO-DEL-PROYECTO.md` §6 — **alcances planificados (backlog)**: likes en discusiones/comentarios (con manejo de likes solapados y fantasmas), amigos + perfiles públicos + actividad de usuario, y chat de mensajes privados (DM).
- Se añade este `CHANGELOG.md`.

## Sesión — 2026-06-14

### Documentación
- Documentación del proyecto incorporada (`f8ca640`).

## Sesión — 2026-06-10

### Añadido
- Persistencia de sesión visible en toda la app + ruta de error 404 y mejoras de UX (`74a4ee3`).
- Workflow de despliegue inicial (`b9ee520`).

### Corregido
- Conexión con Firebase para una colección (`d429134`).

## Sesión — 2026-06-09

### Añadido
- Feature **communities**: explorador por subgénero, discusiones, comentarios y mitigación de spoilers (`17c5dc9`).
- Flujo de **login** + correcciones de UI (`1c8f720`).

## Sesión — 2026-06-06

### Añadido
- Avance en login y autenticación (`99ec43a`).

## Sesión — 2026-06-05

### Añadido
- Conexión base con Firebase (`296feca`).
- Scaffold inicial con Create Next App (`f1e08af`).
