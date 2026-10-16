# @antonio-ds/components

## 2.0.0

## 1.8.0

### Minor Changes

- a4e06d1: Nueva librería de iconos `hand`, dibujada a mano (Figma): `data-icon-set="hand"`, `import '@antonio-ds/components/icons/hand'` o `dist/cdn/icons-hand.js`. Los SVG exportados de Figma se optimizan en el build (1 MB → 66 KB) y heredan `currentColor`.

## 1.7.0

### Minor Changes

- 03b6dfa: Nuevo `<ds-progress>` (`Progress` en React): barra de progreso continua o dividida en `segments` (p. ej. semanas de un programa), con `role="progressbar"` y `label` accesible.

## 1.6.0

### Minor Changes

- 6561a8a: `dist/REFERENCE.md` (referencia generada de componentes, tokens e iconos) y `dist/custom-elements.json` (manifiesto estándar de Web Components, útil para editores) se publican con el paquete. Los usa la skill de Claude Code `antonio-ds`.

## 1.5.0

### Minor Changes

- 28bb84a: Controles de fila y modo edición, equivalentes a Stepper, Pop-up Button, Date and Time (compact) y Row / Edit de Figma.

  - Nuevos `<ds-stepper>`, `<ds-select>` (pop-up sobre `<select>` nativo) y `<ds-date-picker type="date|time|datetime">`, todos form-associated, con wrappers React `Stepper`, `Select`, `DatePicker`.
  - `<ds-list-row edit="select|add|remove" selected>`: control de edición accesible (checkbox para seleccionar; evento `ds-edit` para añadir/quitar).
  - Nuevos roles de texto `lead` (20 Regular) y `small-medium` (13 Medium): estilos `text/*/lead` y `text/*/small-medium` en Figma y clases `.ds-text-lead` / `.ds-text-small-medium`.
  - Icono nuevo `chevrons-up-down` en las tres librerías.

## 1.4.0

### Minor Changes

- 4a288f9: Listas y switch, equivalentes a _Lists and Tables_ y _Toggle_ de Figma.

  - Nuevos `<ds-list type="default|grouped">`, `<ds-list-row>` (leading/trailing, label, description, detail, disclosure, href/interactive, separador con sangría), `<ds-list-header type="default|plain|prominent|section">`, `<ds-list-footer>` y `<ds-switch>` (form-associated). Wrappers React `List`, `ListRow`, `ListHeader`, `ListFooter`, `Switch`.
  - Nuevo token `color.bg.success.default` (relleno sólido de éxito: switch activo, acciones de añadir), con contraste AA validado.

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
