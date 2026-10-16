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
| `@antonio-ds/components` | Web Components en Lit: `<ds-button>`, `<ds-input>`, `<ds-card>`, `<ds-badge>`, `<ds-icon>`, `<ds-switch>`, `<ds-stepper>`, `<ds-select>`, `<ds-date-picker>`, `<ds-progress>`, `<ds-list>` (+ `ds-list-row`, `ds-list-header`, `ds-list-footer`) |
| `@antonio-ds/react` | Wrappers React (`Button`, `Input`, `Card`, `Badge`, `Icon`, `Switch`, `Stepper`, `Select`, `DatePicker`, `Progress`, `List`, `ListRow`, `ListHeader`, `ListFooter`, `Theme`) |
| `apps/docs` | Storybook con selector de marca, tema y viewport (se publica en Vercel) |

## Usar el DS en un producto

**Artefacto de Claude / HTML** (se actualiza solo, sin redeploy) — ver [examples/artifact.html](examples/artifact.html):

```html
<script src="https://cdn.jsdelivr.net/npm/@antonio-ds/tokens@1/dist/ds-theme.js" data-brand="base"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@antonio-ds/components@1/dist/cdn/ds-components.js"></script>
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

**Listas** (igual que *Lists and Tables* en Figma):

```html
<ds-list type="grouped">
  <ds-list-header>Ajustes</ds-list-header>
  <ds-list-row label="Wi-Fi" detail="Casa" disclosure href="/wifi"><ds-icon slot="leading" name="globe"></ds-icon></ds-list-row>
  <ds-list-row label="Modo oscuro"><ds-switch slot="trailing" label="Modo oscuro"></ds-switch></ds-list-row>
  <ds-list-footer>Los cambios se guardan automáticamente.</ds-list-footer>
</ds-list>
```

Controles para filas: `<ds-stepper>`, `<ds-select>` (pop-up sobre un `<select>` nativo), `<ds-date-picker type="date|time|datetime">`.
Modo edición: `<ds-list-row edit="select|add|remove" selected>`.

**Progreso**: `<ds-progress value="3" max="10" segments="10" label="Semana 3 de 10">` (sin `segments`, barra continua).

**Iconos**: `<ds-icon name="search">` con 57 iconos en Lucide (por defecto), Material Symbols, Heroicons o la librería propia dibujada a mano (`hand`); cada proyecto elige con `data-icon-set`. Ver [docs/ICONS.md](docs/ICONS.md).

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
- `brands/<marca>/light` · `dark` — colores semánticos agrupados por uso: `color.bg.*` (fondos), `color.content.*` (texto e iconos), `color.border.*` y `color.focus.ring`; los estados tienen subfamilia en bg (`color.bg.danger.default`…). Ejemplos (`color.bg.surface`, `color.content.primary`, `color.bg.accent`…).
- `responsive/mobile` · `desktop` — qué paso de la escala usa cada rol (h1, h2…) y layout; desktop desde 1024px.

## Tipografía

Manrope, solo **Regular 400** y **Medium 500**. Escala de ratio **1.6** con medios pasos (×√1.6) desde 16px, calculada
a partir de `font.scale.base` y `font.scale.ratio`: cambia el ratio en Tokens Studio y se recalcula toda la escala.
Interletrado −1% en texto y −2% en títulos (`font.tracking.body` / `font.tracking.heading`).

**Estilos de texto** (set `typography/text-styles`): `display`, `h1`, `h2`, `h3`, `lead`, `body`, `body-medium`, `small`, `small-medium`, `caption`.
En Figma son estilos de texto `text/mobile/<rol>` y `text/desktop/<rol>`; en código, clases `.ds-text-<rol>`
(incluidas en `global.css`) que cambian de móvil a desktop solas.

| Paso | m1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| px | 13 | 16 | 20 | 26 | 32 | 41 | 52 | 66 | 83 | 105 |

| Rol | Móvil | Desktop |
| --- | --- | --- |
| display | 66 | 105 |
| lead | 20 | 20 |
| h1 | 41 | 66 |
| h2 | 26 | 41 |
| h3 | 20 | 26 |
| body | 16 | 16 |
| small / small-medium | 13 | 13 |
| caption | 12 (mínimo legible) | 12 |
- `typography/text-styles` — estilos de texto compuestos para Figma (`text/mobile|desktop/<rol>`).

No hay capa de tokens de componente: los componentes consumen directamente semánticos (`color.bg.*`, `color.content.*`…),
tokens de marca (`radius.control`, `font.family.*`) y escalas (`space.*`, `size.*`).

**Claude Code**: la skill [`skills/antonio-ds`](skills/README.md) hace que cualquier proyecto use el DS; descarga en cada uso
la referencia generada de la última versión (`dist/REFERENCE.md` de `@antonio-ds/components`).

Más: [Conectar Figma](docs/FIGMA.md) · [Añadir una marca](docs/BRANDS.md) · [Iconos](docs/ICONS.md) · [Publicar](docs/PUBLISHING.md)
