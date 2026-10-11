# @antonio-ds/react

## 1.5.0

### Minor Changes

- 28bb84a: Controles de fila y modo edición, equivalentes a Stepper, Pop-up Button, Date and Time (compact) y Row / Edit de Figma.

  - Nuevos `<ds-stepper>`, `<ds-select>` (pop-up sobre `<select>` nativo) y `<ds-date-picker type="date|time|datetime">`, todos form-associated, con wrappers React `Stepper`, `Select`, `DatePicker`.
  - `<ds-list-row edit="select|add|remove" selected>`: control de edición accesible (checkbox para seleccionar; evento `ds-edit` para añadir/quitar).
  - Nuevos roles de texto `lead` (20 Regular) y `small-medium` (13 Medium): estilos `text/*/lead` y `text/*/small-medium` en Figma y clases `.ds-text-lead` / `.ds-text-small-medium`.
  - Icono nuevo `chevrons-up-down` en las tres librerías.

### Patch Changes

- Updated dependencies [28bb84a]
  - @antonio-ds/components@1.5.0

## 1.4.0

### Minor Changes

- 4a288f9: Listas y switch, equivalentes a _Lists and Tables_ y _Toggle_ de Figma.

  - Nuevos `<ds-list type="default|grouped">`, `<ds-list-row>` (leading/trailing, label, description, detail, disclosure, href/interactive, separador con sangría), `<ds-list-header type="default|plain|prominent|section">`, `<ds-list-footer>` y `<ds-switch>` (form-associated). Wrappers React `List`, `ListRow`, `ListHeader`, `ListFooter`, `Switch`.
  - Nuevo token `color.bg.success.default` (relleno sólido de éxito: switch activo, acciones de añadir), con contraste AA validado.

### Patch Changes

- Updated dependencies [4a288f9]
  - @antonio-ds/components@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies [6f44d43]
  - @antonio-ds/components@1.3.0

## 1.2.0

### Patch Changes

- @antonio-ds/components@1.2.0

## 1.1.0

### Patch Changes

- @antonio-ds/components@1.1.0

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
  - @antonio-ds/components@1.0.0
