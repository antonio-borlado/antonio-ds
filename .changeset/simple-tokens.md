---
"@antonio-ds/tokens": major
---

Arquitectura de tokens simplificada (2.0). Se mantienen las capas primitivos → marca → claro/oscuro y el sistema de marcas.

- Eliminados los alias deprecados de 1.2 y 1.3 (`--ds-color-text-*`, `--ds-color-accent-*`, `--ds-button-*`, `--ds-input-*`…). Usa los nombres semánticos (`--ds-color-bg-*`, `--ds-color-content-*`).
- Eliminados tokens sin uso: `color.bg.inverse`, `color.content.inverse`, `font.family.mono`, `space.none`, `space.4xl`, `size.56`, `radius.none`, `radius.xl`, `shadow.md` y los pasos de paleta que no usaba ningún tema.
- La escala tipográfica ya no se calcula con una fórmula: `font.size.<px>` (12, 13, 16, 20, 26, 41, 66, 105). Desaparecen `font.scale.*`, `font.size.step-*`, `font.size.min` y `font.letter-spacing.*` (el tracking vive solo en la marca). Los tamaños resueltos no cambian.
