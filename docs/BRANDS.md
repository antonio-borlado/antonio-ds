# Añadir una marca o un tema

Una marca es solo un conjunto de tokens: los componentes no cambian.

## Nueva marca (ej. `acme`)

En Tokens Studio (o editando `tokens/tokens.json`):

1. Crea los sets `brands/acme/brand`, `brands/acme/light` y `brands/acme/dark` duplicando los de `base`.
2. En `brand`, cambia fuentes y radios (`font.family.body`, `radius.control`…). Si necesitas colores nuevos, añádelos a `core/primitives` (p. ej. `color.acme.500`).
3. En `light`/`dark`, apunta los semánticos a tus primitivos (`color.accent.default` → `{color.acme.600}`).
4. Añade los temas en `$themes` (`acme · light · mobile`, etc.) y el orden en `$metadata.tokenSetOrder`.
5. `npm run build && npm test` — el test de contraste avisa si algún par no cumple AA.

El build detecta las marcas automáticamente (`brands/<marca>/…`) y genera:

- `dist/css/brands/acme.css` (core + acme) y `dist/css/themes/acme-light.css`, `acme-dark.css`
- Inclusión en `dist/css/all.css` y en `ds-theme.js`

Uso: `<html data-brand="acme">` o `DS.setTheme({ brand: 'acme' })`.

## Nuevo modo (ej. `high-contrast`)

Crea `brands/<marca>/high-contrast` con los mismos semánticos. Se activa con `data-theme="high-contrast"`.
