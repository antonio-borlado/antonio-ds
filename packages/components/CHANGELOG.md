# @antonio-ds/components

## 1.3.0

### Minor Changes

- 6f44d43: Se elimina la capa de tokens de componente (set `components/components`). Los componentes consumen directamente tokens semánticos, de marca y escalas; su aspecto no cambia, salvo el borde del input enfocado, que pasa a `color.focus.ring`.

  Las variables CSS antiguas (`--ds-button-*`, `--ds-input-*`, `--ds-card-*`, `--ds-badge-*`, `--ds-icon-size-*`) siguen disponibles como alias de solo lectura hasta la 2.0; ya no sirven para personalizar los componentes.

## 1.2.0

## 1.1.0

## 1.0.0

### Minor Changes

- dac084e: Tipografía e iconos.

  - Manrope como familia de la marca base, solo pesos Regular 400 y Medium 500 (se elimina semibold/bold).
  - Interletrado de marca: −1% en texto (`font.tracking.body`) y −2% en títulos (`font.tracking.heading`).
  - Escala tipográfica de ratio 1.6 con medios pasos desde 16px, calculada desde `font.scale.base` y `font.scale.ratio`. En móvil cada título baja un paso.
  - `ds-theme.js` carga la fuente de cada marca desde Google Fonts; nuevo `css/fonts.css` para apps con bundler; `global.css` estiliza títulos.
  - Nuevo `<ds-icon>` (y `Icon` en React) con 56 iconos en Lucide (por defecto), Material Symbols y Heroicons. La librería se elige por proyecto con `data-icon-set`, `DS.setIconSet()`, `<Theme iconSet>` o el token de marca `icon.set`.

### Patch Changes

- Updated dependencies [dac084e]
  - @antonio-ds/tokens@1.0.0
