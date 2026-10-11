# @antonio-ds/tokens

## 1.6.0

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
