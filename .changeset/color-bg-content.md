---
"@antonio-ds/tokens": minor
---

Colores semánticos reorganizados por uso: `color.bg.*` (fondos) y `color.content.*` (texto e iconos).

- `color.text.*` → `color.content.*`
- Accent plano dentro de bg/content: `color.bg.accent`, `color.bg.accent-hover`, `color.bg.accent-subtle`, `color.content.accent`
- Estados con subfamilia en bg: `color.bg.danger.{default,hover,subtle}`, `color.bg.success.subtle`, `color.bg.warning.subtle`; contenido: `color.content.{danger,success,warning}`

Los nombres CSS antiguos (`--ds-color-text-primary`, `--ds-color-accent-default`…) siguen funcionando como alias hasta la 2.0.
