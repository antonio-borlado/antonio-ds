---
"@antonio-ds/tokens": minor
"@antonio-ds/components": minor
---

Se elimina la capa de tokens de componente (set `components/components`). Los componentes consumen directamente tokens semánticos, de marca y escalas; su aspecto no cambia, salvo el borde del input enfocado, que pasa a `color.focus.ring`.

Las variables CSS antiguas (`--ds-button-*`, `--ds-input-*`, `--ds-card-*`, `--ds-badge-*`, `--ds-icon-size-*`) siguen disponibles como alias de solo lectura hasta la 2.0; ya no sirven para personalizar los componentes.
