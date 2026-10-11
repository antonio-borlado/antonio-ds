# Antonio DS

Sistema de diseño multimarca para todos mis productos: web (móvil y desktop), apps y artefactos.
**Figma es la fuente**, el código se genera, y cada cambio publicado llega a todos los productos.

```
Figma (Tokens Studio) ──push──▶ tokens/tokens.json ──CI──▶ npm + jsDelivr ──▶ productos
```

## Paquetes

| Paquete | Qué es |
| --- | --- |
| `@antonio-ds/tokens` | Variables CSS `--ds-*` por marca y tema, JS/TS, JSON y `ds-theme.js` (loader para CDN) |
| `@antonio-ds/components` | Web Components en Lit: `<ds-button>`, `<ds-input>`, `<ds-card>`, `<ds-badge>`, `<ds-icon>` |
| `@antonio-ds/react` | Wrappers React (`Button`, `Input`, `Card`, `Badge`, `Icon`, `Theme`) |
| `apps/docs` | Storybook con selector de marca, tema y viewport (se publica en Vercel) |

## Usar el DS en un producto

**Artefacto de Claude / HTML** (se actualiza solo, sin redeploy) — ver [examples/artifact.html](examples/artifact.html):

```html
<script src="https://cdn.jsdelivr.net/npm/@antonio-ds/tokens@0/dist/ds-theme.js" data-brand="base"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@antonio-ds/components@0/dist/cdn/ds-components.js"></script>
<ds-button>Guardar</ds-button>
```

**React / Next.js** (versionado + Renovate con automerge, ver [docs/renovate.example.json](docs/renovate.example.json)):

```tsx
import '@antonio-ds/tokens/css/all.css';
import '@antonio-ds/tokens/css/fonts.css';  // Manrope desde Google Fonts
import '@antonio-ds/tokens/css/global.css'; // opcional: fondo, color, fuente y títulos
import { Button, Theme } from '@antonio-ds/react';

<Theme brand="base" mode="dark"><Button variant="secondary">Cancelar</Button></Theme>
```

**Marca y tema**: `data-brand="<marca>"` y `data-theme="light|dark"` en `<html>` o cualquier contenedor (se pueden anidar). Sin `data-theme`, se sigue la preferencia del sistema. En JS: `DS.setTheme({ brand, mode })`.

**Iconos**: `<ds-icon name="search">` con 56 iconos en Lucide (por defecto), Material Symbols o Heroicons; cada proyecto elige con `data-icon-set`. Ver [docs/ICONS.md](docs/ICONS.md).

**Valores en JS** (canvas, gráficos, apps nativas): `import { cssVar, values } from '@antonio-ds/tokens'`.

## Desarrollo

```bash
npm install
npm run build       # tokens → componentes → react
npm test            # contraste WCAG AA de todos los temas
npm run storybook   # http://localhost:6006
```

`examples/playground.html` es la plantilla de artefacto apuntando a los builds locales (`npx vite` en la raíz).

## Arquitectura de tokens

`tokens/tokens.json` (formato single-file de Tokens Studio) contiene estos sets:

- `core/primitives` — paleta, espaciado, radios, tipografía. Valores crudos; nunca se usan directamente en componentes.
- `brands/<marca>/brand` — personalidad de la marca: fuentes (`font.family.*`, `font.webfont`), radios y librería de iconos (`icon.set`).
- `brands/<marca>/light` · `dark` — colores semánticos (`color.bg.surface`, `color.text.primary`, `color.accent.default`…).
- `responsive/mobile` · `desktop` — qué paso de la escala usa cada rol (h1, h2…) y layout; desktop desde 1024px.

## Tipografía

Manrope, solo **Regular 400** y **Medium 500**. Escala de ratio **1.6** con medios pasos (×√1.6) desde 16px, calculada
a partir de `font.scale.base` y `font.scale.ratio`: cambia el ratio en Tokens Studio y se recalcula toda la escala.
Interletrado −1% en texto y −2% en títulos (`font.tracking.body` / `font.tracking.heading`).

| Paso | m1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| px | 13 | 16 | 20 | 26 | 32 | 41 | 52 | 66 | 83 | 105 |

| Rol | Móvil | Desktop |
| --- | --- | --- |
| display | 66 | 105 |
| h1 | 41 | 66 |
| h2 | 26 | 41 |
| h3 | 20 | 26 |
| body | 16 | 16 |
| small | 13 | 13 |
| caption | 12 (mínimo legible) | 12 |
- `components/components` — tokens de componente que solo apuntan a semánticos.

Más: [Conectar Figma](docs/FIGMA.md) · [Añadir una marca](docs/BRANDS.md) · [Iconos](docs/ICONS.md) · [Publicar](docs/PUBLISHING.md)
