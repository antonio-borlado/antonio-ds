---
"@antonio-ds/tokens": minor
"@antonio-ds/components": minor
"@antonio-ds/react": minor
---

Controles de fila y modo edición, equivalentes a Stepper, Pop-up Button, Date and Time (compact) y Row / Edit de Figma.

- Nuevos `<ds-stepper>`, `<ds-select>` (pop-up sobre `<select>` nativo) y `<ds-date-picker type="date|time|datetime">`, todos form-associated, con wrappers React `Stepper`, `Select`, `DatePicker`.
- `<ds-list-row edit="select|add|remove" selected>`: control de edición accesible (checkbox para seleccionar; evento `ds-edit` para añadir/quitar).
- Nuevos roles de texto `lead` (20 Regular) y `small-medium` (13 Medium): estilos `text/*/lead` y `text/*/small-medium` en Figma y clases `.ds-text-lead` / `.ds-text-small-medium`.
- Icono nuevo `chevrons-up-down` en las tres librerías.
