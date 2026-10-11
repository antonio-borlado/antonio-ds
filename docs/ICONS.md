# Iconos

El DS tiene **56 iconos con nombre propio** (`close`, `search`, `warning`…) disponibles en tres librerías.
Los productos y los componentes usan siempre el nombre del DS, así que cambiar de librería nunca rompe una pantalla.

| Librería | Valor | Estilo | Licencia |
| --- | --- | --- | --- |
| Lucide (por defecto) | `lucide` | Línea 2px, redondeada | ISC |
| Material Symbols | `material` | Outlined, relleno | Apache-2.0 |
| Heroicons | `heroicons` | Outline 1.5px | MIT |

## Usar un icono

```html
<ds-icon name="search"></ds-icon>                 <!-- decorativo -->
<ds-icon name="trash" label="Eliminar"></ds-icon> <!-- con significado: lo anuncia el lector de pantalla -->
<ds-icon name="plus" size="sm"></ds-icon>         <!-- sm 16 · md 20 (defecto) · lg 24 · inherit = 1.25em -->
<ds-button><ds-icon slot="start" name="plus" size="sm"></ds-icon>Nuevo</ds-button>
```

React: `<Icon name="search" />`.

## Elegir la librería de un proyecto

Orden de prioridad (gana la primera que exista):

1. Atributo en el icono: `<ds-icon name="home" set="material">`
2. El ancestro más cercano con `data-icon-set`: `<html data-icon-set="material">` (o `DS.setIconSet('material')`, o `<Theme iconSet="material">` en React)
3. El token de la marca `icon.set` (cada marca puede tener su librería por defecto)
4. `lucide`

Lucide viene incluida. Las otras se cargan una vez:

```html
<!-- CDN / artefactos -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@antonio-ds/components@0/dist/cdn/icons-material.js"></script>
<html data-icon-set="material">
```

```ts
// npm
import '@antonio-ds/components/icons/material';
```

## Añadir un icono

1. Añade una fila en `packages/components/scripts/icon-map.mjs` con el nombre del DS y su equivalente en cada librería
   (busca los nombres en lucide.dev, fonts.google.com/icons y heroicons.com).
2. `npm run build` — falla si algún nombre no existe en alguna librería.

## Añadir otra librería

Registra un set propio con los nombres del DS como claves:

```ts
import { registerIconSet } from '@antonio-ds/components';
registerIconSet('mi-libreria', { attrs: 'viewBox="0 0 24 24" fill="currentColor"', icons: { close: '<path d="…"/>', … } });
```

Para incluirla de forma permanente, añade una columna en `icon-map.mjs` y la librería en `scripts/build-icons.mjs`.
