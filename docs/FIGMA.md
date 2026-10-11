# Figma como fuente (Tokens Studio)

Los tokens se editan en Figma con el plugin **Tokens Studio** y se sincronizan con `tokens/tokens.json` en GitHub.

## Conectar (una vez)

1. En GitHub crea un **fine-grained personal access token** con acceso solo a este repo y permiso *Contents: Read and write*.
2. En Figma: *Plugins → Tokens Studio for Figma* → **Settings → Sync providers → Add new → GitHub**:
   - Personal access token: el del paso 1
   - Repository: `<tu-usuario>/<repo>`
   - Branch: `tokens` (recomendado; así cada cambio pasa por PR y CI)
   - File path: `tokens/tokens.json`
3. **Pull from GitHub**: verás los sets (`core/primitives`, `brands/base/light`…) y los temas `light · mobile`, `dark · desktop`…
4. **Styles & Variables → Export to Figma** para crear las variables de Figma (colecciones y modos) a partir de los tokens.
   Usa las variables en tus componentes de Figma para que diseño y código compartan nombres.

> El plan gratuito de Tokens Studio sincroniza un único archivo, por eso el repo usa `tokens/tokens.json`. Algunas funciones (p. ej. gestionar temas y exportarlos como modos) pueden requerir Tokens Studio Pro; sin ellas puedes exportar los sets por separado.

## Flujo de un cambio

1. Cambias un token en Tokens Studio → **Push to GitHub** (rama `tokens`).
2. Abres un PR `tokens → main`. El workflow *Tokens PR* añade un changeset `patch` si no lo hay
   (edítalo a `minor`/`major` si el cambio lo requiere) y *CI* construye todo y valida el contraste AA.
3. Merge → *Release* publica en npm y purga jsDelivr. Los artefactos/webs con CDN lo ven en minutos;
   las apps con npm reciben un PR de Renovate.

## Reglas de nombrado

- Los componentes consumen directamente los semánticos (`color.bg.*`, `color.content.*`, `color.border.*`), los tokens de marca (`radius.control|container`, `font.family.body|heading`) y las escalas (`space.*`, `size.*`, `typography.size.*`). No hay capa de tokens de componente.
- Nunca referencies `color.blue.600` desde un componente: crea o usa un semántico.
- Nombres en kebab-case, sin espacios: se convierten en `--ds-<ruta-con-guiones>`.
