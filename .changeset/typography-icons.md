---
"@antonio-ds/tokens": minor
"@antonio-ds/components": minor
"@antonio-ds/react": minor
---

Tipografía e iconos.

- Manrope como familia de la marca base, solo pesos Regular 400 y Medium 500 (se elimina semibold/bold).
- Interletrado de marca: −1% en texto (`font.tracking.body`) y −2% en títulos (`font.tracking.heading`).
- Escala tipográfica de ratio 1.6 con medios pasos desde 16px, calculada desde `font.scale.base` y `font.scale.ratio`. En móvil cada título baja un paso.
- `ds-theme.js` carga la fuente de cada marca desde Google Fonts; nuevo `css/fonts.css` para apps con bundler; `global.css` estiliza títulos.
- Nuevo `<ds-icon>` (y `Icon` en React) con 56 iconos en Lucide (por defecto), Material Symbols y Heroicons. La librería se elige por proyecto con `data-icon-set`, `DS.setIconSet()`, `<Theme iconSet>` o el token de marca `icon.set`.
