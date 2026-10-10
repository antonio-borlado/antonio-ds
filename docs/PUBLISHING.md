# Publicar el DS (configuración inicial)

Estos pasos requieren tus cuentas, así que los haces tú una sola vez.

## 1. Nombre en npm
Los paquetes usan el scope `@antonio-ds`. Crea esa organización gratuita en npmjs.com (*Add organization*),
o cambia el scope en todo el repo por tu usuario de npm:

```bash
grep -rl "@antonio-ds" --exclude-dir=node_modules --exclude-dir=dist . | xargs sed -i '' 's/@antonio-ds/@tu-scope/g'
```

## 2. GitHub
1. Crea un repo vacío y súbelo:
   ```bash
   git add -A && git commit -m "feat: initial design system" && git branch -M main
   git remote add origin git@github.com:<tu-usuario>/<repo>.git && git push -u origin main
   ```
2. En npm crea un **Granular Access Token** con permiso de publicación en `@antonio-ds` y guárdalo en
   *GitHub → Settings → Secrets and variables → Actions* como `NPM_TOKEN`.
3. *Settings → Actions → General → Workflow permissions*: **Read and write**.

El primer push a `main` publica la versión `0.1.0` de los tres paquetes.

## 3. Documentación en Vercel
*Add New → Project →* importa el repo. `vercel.json` ya define build (`npm run build:docs`) y salida.
Cada PR tendrá su preview de Storybook.

## 4. Productos
- **Con CDN** (artefactos, HTML): usa las URLs `@0` de [examples/artifact.html](../examples/artifact.html). Tras la 1.0, `@1`.
  Los cambios de versión mayor nunca se cuelan solos.
- **Con npm**: `npm i @antonio-ds/tokens @antonio-ds/react` y copia `docs/renovate.example.json` como `renovate.json` del producto (instala la app de Renovate en GitHub).

## Versionado
- `npx changeset` antes de mergear un cambio de código (elige patch/minor/major y describe el cambio).
- Los cambios de tokens desde Figma reciben un changeset `patch` automático.
- Los tres paquetes comparten versión (grupo `fixed` en `.changeset/config.json`).
