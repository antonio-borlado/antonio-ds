// Writes every DS icon as a standalone 24×24 SVG (dist/svg/<set>/<name>.svg) for importing into Figma.
// Reads the generated modules from scripts/build-icons.mjs, so run that first (npm run build does).
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src/icons/generated');
const OUT = join(ROOT, 'dist/svg');

rmSync(OUT, { recursive: true, force: true });
for (const file of readdirSync(SRC).filter((f) => f !== 'names.ts')) {
  const source = readFileSync(join(SRC, file), 'utf8');
  const set = file.replace(/\.ts$/, '');
  const icons = JSON.parse(source.match(/const icons: Record<string, string> = (\{[\s\S]*?\n\});/)[1].replace(/,\n\}$/, '\n}'));
  // Figma has no currentColor: draw in black so the import can be recoloured with a fill/stroke variable.
  const attrs = JSON.parse(source.match(/attrs: ("(?:[^"\\]|\\.)*")/)[1]).replaceAll('currentColor', '#000');
  mkdirSync(join(OUT, set), { recursive: true });
  for (const [name, body] of Object.entries(icons)) {
    writeFileSync(join(OUT, set, `${name}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ${attrs}>${body}</svg>\n`);
  }
  console.log(`svg: ${set} → ${Object.keys(icons).length} icons`);
}
