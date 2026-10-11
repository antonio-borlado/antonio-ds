// Generates dist/REFERENCE.md: the always-current guide for humans and AI agents (the antonio-ds Claude skill fetches it
// from the CDN). Built from the custom elements manifest, the token build output and the icon map, so it never drifts.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ICONS } from './icon-map.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS = resolve(ROOT, '../tokens');
const read = (p) => readFileSync(p, 'utf8');
const json = (p) => JSON.parse(read(p));

const pkg = json(join(ROOT, 'package.json'));
const major = pkg.version.split('.')[0];
const manifest = json(join(ROOT, 'dist/custom-elements.json'));
const light = json(join(TOKENS, 'dist/json/base-light-mobile.json'));
const dark = json(join(TOKENS, 'dist/json/base-dark-mobile.json'));
const desktop = json(join(TOKENS, 'dist/json/base-light-desktop.json'));

// Resolve `export type Foo = 'a' | 'b'` aliases so the reference lists real values.
const aliases = {};
for (const f of readdirSync(join(ROOT, 'src/components'))) {
  for (const m of read(join(ROOT, 'src/components', f)).matchAll(/export type (\w+) = ([^;]+);/g)) aliases[m[1]] = m[2].trim();
}
const typeText = (t) => (t ? (aliases[t] ?? t) : '').replace(/\(string & \{\}\)/g, 'string').replace(/\|/g, '\\|');
const cell = (s) => (s ?? '').replace(/\n+/g, ' ').replace(/\|/g, '\\|');
const cssVar = (path) => `--ds-${path.replaceAll('.', '-')}`;

const elements = manifest.modules
  .flatMap((m) => m.declarations ?? [])
  .filter((d) => d.tagName)
  .sort((a, b) => a.tagName.localeCompare(b.tagName));

let md = `# @antonio-ds — referencia ${pkg.version}

Generado automáticamente en cada versión. No editar a mano.

## Instalación

**HTML / artefactos de Claude** (se actualiza solo dentro de la ${major}.x):

\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/@antonio-ds/tokens@${major}/dist/ds-theme.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@antonio-ds/components@${major}/dist/cdn/ds-components.js"></script>
<!-- Solo si el proyecto usa otra librería de iconos: -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@antonio-ds/components@${major}/dist/cdn/icons-material.js"></script>
\`\`\`

**React / Next.js**: \`npm i @antonio-ds/tokens @antonio-ds/react\`

\`\`\`tsx
import '@antonio-ds/tokens/css/all.css';
import '@antonio-ds/tokens/css/fonts.css';
import '@antonio-ds/tokens/css/global.css';
import { Button, List, ListRow } from '@antonio-ds/react'; // mismo nombre que el tag sin "ds-", en PascalCase
\`\`\`

**Tema, marca e iconos** (en \`<html>\` o cualquier contenedor): \`data-theme="light|dark"\` (sin él, sigue al sistema),
\`data-brand="base"\`, \`data-icon-set="lucide|material|heroicons"\`. En JS: \`DS.setTheme({ mode: 'dark' })\`, \`DS.setIconSet('material')\`.

## Componentes

`;

for (const el of elements) {
  md += `### \`<${el.tagName}>\`\n\n${cell(el.description) || ''}\n\n`;
  const attrs = (el.attributes ?? []).filter((a) => !a.name.startsWith('_'));
  if (attrs.length) {
    md += `| Atributo | Tipo | Defecto | Descripción |\n| --- | --- | --- | --- |\n`;
    for (const a of attrs) md += `| \`${a.name}\` | ${typeText(a.type?.text)} | ${cell(a.default)} | ${cell(a.description)} |\n`;
    md += '\n';
  }
  const slots = el.slots ?? [];
  if (slots.length) md += `**Slots**: ${slots.map((s) => `\`${s.name || '(default)'}\`${s.description ? ` ${cell(s.description)}` : ''}`).join(' · ')}\n\n`;
  const events = el.events ?? [];
  if (events.length) md += `**Eventos**: ${events.map((e) => `\`${e.name}\`${e.description ? ` ${cell(e.description)}` : ''}`).join(' · ')}\n\n`;
  const parts = el.cssParts ?? [];
  if (parts.length) md += `**CSS parts**: ${parts.map((p) => `\`${p.name}\``).join(', ')}\n\n`;
}

const group = (prefix) => Object.keys(light).filter((k) => k.startsWith(prefix));

md += `## Tokens

Usa siempre variables \`--ds-*\`; nunca colores hex ni medidas sueltas. Colores: solo semánticos (\`bg\`, \`content\`, \`border\`, \`focus\`), nunca la paleta primitiva.

### Color

| Token | CSS | Light | Dark |
| --- | --- | --- | --- |
${['color.bg.', 'color.content.', 'color.border.', 'color.focus.']
  .flatMap(group)
  .map((k) => `| \`${k}\` | \`${cssVar(k)}\` | ${light[k]} | ${dark[k]} |`)
  .join('\n')}

- \`bg\`: fondos. \`canvas\` = página, \`surface\` = tarjetas/inputs, \`subtle\` = zonas resaltadas/hover, \`inverse\` = tooltips/toasts.
- \`content\`: texto e iconos. \`on-accent\` va sobre \`bg.accent\`, \`bg.danger.default\` y \`bg.success.default\`.

### Tipografía

Familia \`var(--ds-font-family-body)\` (${light['font.family.body']}). Pesos: regular ${light['font.weight.regular']}, medium ${light['font.weight.medium']} (no hay otros).
Escala ratio ${light['font.scale.ratio']} desde ${light['font.scale.base']}px. Clases listas para usar (cambian de móvil a desktop desde 1024px):

| Clase | Móvil | Desktop |
| --- | --- | --- |
${['display', 'h1', 'h2', 'h3', 'lead', 'body', 'small', 'caption']
  .map((r) => `| \`.ds-text-${r}\` | ${light[`typography.size.${r}`]} | ${desktop[`typography.size.${r}`]} |`)
  .join('\n')}

También \`.ds-text-body-medium\` y \`.ds-text-small-medium\`. Variables: \`--ds-typography-size-<rol>\`, \`--ds-font-weight-regular|medium\`,
\`--ds-font-line-height-tight|snug|normal\`, \`--ds-font-tracking-body|heading\`.

### Espacio, tamaño, radio, sombra

| Grupo | Tokens |
| --- | --- |
| Espacio | ${group('space.').map((k) => `\`${cssVar(k)}\` ${light[k]}`).join(' · ')} |
| Layout | ${group('layout.').map((k) => `\`${cssVar(k)}\` ${light[k]}`).join(' · ')} (desktop: ${group('layout.').map((k) => desktop[k]).join(' / ')}) |
| Tamaño | ${group('size.').map((k) => `\`${cssVar(k)}\` ${light[k]}`).join(' · ')} |
| Radio | ${[...group('radius.')].map((k) => `\`${cssVar(k)}\` ${light[k]}`).join(' · ')} |
| Sombra | ${group('shadow.').map((k) => `\`${cssVar(k)}\``).join(' · ')} |

## Iconos

\`<ds-icon name="…">\` con: ${ICONS.map((r) => `\`${r[0]}\``).join(', ')}.

Librerías: \`lucide\` (por defecto, incluida), \`material\`, \`heroicons\` (cargar su script/import).
`;

writeFileSync(join(ROOT, 'dist/REFERENCE.md'), md);
console.log(`reference: ${elements.length} components → dist/REFERENCE.md`);
