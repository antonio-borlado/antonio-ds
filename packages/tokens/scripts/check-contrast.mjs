// WCAG 2.1 contrast checks for every generated theme. Fails the build if a pair is below its minimum.
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const JSON_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../dist/json');

// [foreground, background, minimum ratio]
const PAIRS = [
  ['color.content.primary', 'color.bg.surface', 4.5],
  ['color.content.primary', 'color.bg.canvas', 4.5],
  ['color.content.secondary', 'color.bg.surface', 4.5],
  ['color.content.secondary', 'color.bg.canvas', 4.5],
  ['color.content.secondary', 'color.bg.subtle', 4.5],
  ['color.content.on-accent', 'color.bg.accent', 4.5],
  ['color.content.on-accent', 'color.bg.accent-hover', 4.5],
  ['color.content.on-accent', 'color.bg.danger.default', 4.5],
  ['color.content.on-accent', 'color.bg.danger.hover', 4.5],
  ['color.content.accent', 'color.bg.surface', 4.5],
  ['color.content.accent', 'color.bg.accent-subtle', 4.5],
  ['color.content.success', 'color.bg.success.subtle', 4.5],
  ['color.content.warning', 'color.bg.warning.subtle', 4.5],
  ['color.content.danger', 'color.bg.danger.subtle', 4.5],
  ['color.content.danger', 'color.bg.surface', 4.5],
  ['color.border.strong', 'color.bg.surface', 3],
  ['color.focus.ring', 'color.bg.surface', 3],
  ['color.focus.ring', 'color.bg.canvas', 3],
];

function luminance(hex) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

let failures = 0;
const files = readdirSync(JSON_DIR).filter((f) => f.endsWith('-mobile.json'));
if (!files.length) throw new Error('No built themes found. Run `npm run build` first.');
for (const f of files) {
  const tokens = JSON.parse(readFileSync(join(JSON_DIR, f), 'utf8'));
  const theme = f.replace('-mobile.json', '');
  for (const [fg, bg, min] of PAIRS) {
    if (!tokens[fg] || !tokens[bg]) continue;
    const r = ratio(tokens[fg], tokens[bg]);
    if (r < min) {
      failures++;
      console.error(`✗ ${theme}: ${fg} on ${bg} = ${r.toFixed(2)} (min ${min})`);
    }
  }
  console.log(`✓ ${theme}: ${PAIRS.length} pairs checked`);
}
if (failures) {
  console.error(`\n${failures} contrast failure(s)`);
  process.exit(1);
}
