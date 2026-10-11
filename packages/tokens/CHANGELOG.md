# @antonio-ds/tokens

## 1.2.0

### Minor Changes

- efa4855: Colores semánticos reorganizados por uso: `color.bg.*` (fondos) y `color.content.*` (texto e iconos).

  - `color.text.*` → `color.content.*`
  - Accent plano dentro de bg/content: `color.bg.accent`, `color.bg.accent-hover`, `color.bg.accent-subtle`, `color.content.accent`
  - Estados con subfamilia en bg: `color.bg.danger.{default,hover,subtle}`, `color.bg.success.subtle`, `color.bg.warning.subtle`; contenido: `color.content.{danger,success,warning}`

  Los nombres CSS antiguos (`--ds-color-text-primary`, `--ds-color-accent-default`…) siguen funcionando como alias hasta la 2.0.

## 1.1.0

### Minor Changes

- ab4f311: Estilos de texto: tokens de tipografía compuestos (set `typography/text-styles`) para que Tokens Studio cree en Figma los estilos `text/mobile/*` y `text/desktop/*` (display, h1, h2, h3, body, body-medium, small, caption). En código, clases `.ds-text-<rol>` en `global.css`. Los interlineados pasan a porcentaje en los tokens (115%, 130%, 150%) para Figma; el CSS sigue siendo 1.15 / 1.3 / 1.5.

## 1.0.0

### Minor Changes

- dac084e: Tipografía e iconos.

  - Manrope como familia de la marca base, solo pesos Regular 400 y Medium 500 (se elimina semibold/bold).
  - Interletrado de marca: −1% en texto (`font.tracking.body`) y −2% en títulos (`font.tracking.heading`).
  - Escala tipográfica de ratio 1.6 con medios pasos desde 16px, calculada desde `font.scale.base` y `font.scale.ratio`. En móvil cada título baja un paso.
  - `ds-theme.js` carga la fuente de cada marca desde Google Fonts; nuevo `css/fonts.css` para apps con bundler; `global.css` estiliza títulos.
  - Nuevo `<ds-icon>` (y `Icon` en React) con 56 iconos en Lucide (por defecto), Material Symbols y Heroicons. La librería se elige por proyecto con `data-icon-set`, `DS.setIconSet()`, `<Theme iconSet>` o el token de marca `icon.set`.
