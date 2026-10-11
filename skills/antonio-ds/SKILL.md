---
name: antonio-ds
description: Sistema de diseño de Antonio (@antonio-ds). Úsalo SIEMPRE que construyas o modifiques interfaz en cualquier proyecto (pantallas, páginas, componentes, formularios, listas, artefactos HTML de Claude, apps React/Next, prototipos), o cuando se mencione antonio-ds, "el sistema de diseño", "el DS", tokens, temas o la marca. Da la instalación, el catálogo de componentes y tokens de la última versión publicada, y las reglas para no inventar estilos.
---

# Sistema de diseño @antonio-ds

Todo producto de Antonio usa este sistema de diseño. No inventes colores, tipografías, espaciados ni componentes que el DS ya cubre.

## 1. Carga la referencia actual (siempre, antes de escribir UI)

La referencia se genera con cada versión publicada: componentes con atributos, slots y eventos, tokens con sus valores, roles de texto e iconos. Es la fuente de verdad; esta skill solo da las reglas.

1. Averigua la versión mayor vigente: `npm view @antonio-ds/components version` (p. ej. `1.5.0` → mayor `1`). Sin red o sin npm, usa `1`.
2. Descarga la referencia de esa mayor:
   `curl -fsSL https://cdn.jsdelivr.net/npm/@antonio-ds/components@<mayor>/dist/REFERENCE.md`
   Si no puedes usar la terminal, ábrela con la herramienta de lectura web. Si tampoco hay red y existe el repo local, lee `~/Documents/ds/packages/components/dist/REFERENCE.md`.
3. Usa SOLO los tags, atributos, tokens e iconos que aparecen en ella. Si algo no está, no lo supongas.

## 2. Instala según el tipo de proyecto

- **Artefacto de Claude o HTML estático**: las dos etiquetas `<script>` de jsDelivr que da la referencia (sección Instalación), con `@<mayor>`. Los artefactos solo admiten scripts de CDN, no hojas de estilo: `ds-theme.js` inyecta los estilos y la fuente. Para Material o Heroicons, añade también su script de iconos.
- **React / Next.js / Vite con React**: `npm i @antonio-ds/tokens @antonio-ds/react`, importa `css/all.css`, `css/fonts.css` y `css/global.css` una vez en la raíz, y usa los wrappers (`Button`, `List`, `ListRow`, `Switch`…).
- **Otro framework (Vue, Svelte, Astro, HTML con bundler)**: `npm i @antonio-ds/tokens @antonio-ds/components`, importa los mismos CSS y `@antonio-ds/components`; usa los tags `<ds-*>` directamente.
- Si el proyecto ya tiene el DS instalado, no lo reinstales; respeta la versión del `package.json`.

## 3. Reglas

1. **Componentes primero.** Si existe un `<ds-*>` para algo (botón, input, lista, switch, select, fecha, tarjeta, badge, icono), úsalo. No lo recrees con divs ni lo copies.
2. **Solo tokens.** Para estilos propios usa variables `--ds-*`: color, espacio, radio, tipografía, sombra. Nada de hex, `rgb()`, px sueltos para espacios o radios, ni familias tipográficas propias.
3. **Colores semánticos.** `--ds-color-bg-*` para fondos, `--ds-color-content-*` para texto e iconos, `--ds-color-border-*` para bordes. Nunca la paleta primitiva (`--ds-color-blue-600`…): rompe el modo oscuro y las marcas.
4. **Tipografía.** Usa las clases `.ds-text-<rol>` (display, h1, h2, h3, lead, body, body-medium, small, small-medium, caption) o `global.css` para `h1`–`h3`. Solo dos pesos: regular y medium.
5. **Tema y marca.** Nunca fuerces colores para el modo oscuro: usa `data-theme="light|dark"` (o nada, para seguir al sistema) y deja que los tokens cambien solos.
6. **Iconos.** `<ds-icon name="…">` con los nombres del DS. La librería se elige por proyecto con `data-icon-set`; no mezcles otras librerías de iconos.
7. **Accesibilidad.** Da `label` a los controles sin texto visible (`ds-switch`, `ds-stepper`, `ds-select`, iconos con significado). Mantén el contraste: texto `content.*` sobre `bg.*`.
8. **No uses otras librerías de UI** (Tailwind con colores propios, MUI, shadcn…) salvo que el usuario lo pida. Si usa Tailwind, mapea a las variables `--ds-*`.

## 4. Cuando falte algo en el DS

Si la interfaz necesita un componente o token que no existe:
1. Compónlo con componentes y tokens existentes, sin valores sueltos.
2. Díselo al usuario al terminar: qué faltaba y que convendría añadirlo al sistema de diseño (repo `antonio-borlado/antonio-ds`) para que llegue a todos los productos.

No añadas tokens ni componentes al DS desde otro proyecto: el DS se cambia en su repo.

## 5. Antes de dar la tarea por terminada

- ¿Hay algún hex, `rgb()`, px de espaciado o radio, o `font-family` fuera de tokens? Sustitúyelo.
- ¿Funciona en `data-theme="dark"`? Pruébalo si puedes abrir la página.
- ¿Los componentes usan atributos que existen en la referencia?
