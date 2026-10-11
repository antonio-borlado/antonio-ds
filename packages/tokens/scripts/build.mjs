// Builds CSS variables, JS and JSON from the Tokens Studio single-file export (tokens/tokens.json).
// Layers: core/primitives → brands/<brand>/{brand,light,dark} → components. Responsive sets become media queries.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { getTransforms, register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = resolve(ROOT, '../../tokens/tokens.json');
const DIST = join(ROOT, 'dist');
const PREFIX = 'ds';
const DEFAULT_BRAND = 'base';
const DESKTOP_MIN_WIDTH = '1024px';

const file = JSON.parse(readFileSync(SOURCE, 'utf8'));
const setNames = Object.keys(file).filter((k) => !k.startsWith('$'));

// Write each set to its own temp file so Style Dictionary can tell which set a token came from.
const SETS_DIR = join(tmpdir(), `ds-token-sets-${process.pid}`);
const setPath = (name) => join(SETS_DIR, `${name.replaceAll('/', '__')}.json`);
mkdirSync(SETS_DIR, { recursive: true });
for (const name of setNames) writeFileSync(setPath(name), JSON.stringify(file[name]));

const brands = [...new Set(setNames.filter((s) => s.startsWith('brands/')).map((s) => s.split('/')[1]))];
const modesOf = (brand) => setNames.filter((s) => s.startsWith(`brands/${brand}/`) && !s.endsWith('/brand')).map((s) => s.split('/')[2]);
if (!brands.includes(DEFAULT_BRAND)) throw new Error(`Default brand "${DEFAULT_BRAND}" not found in tokens.json`);

const CORE = 'core/primitives';
const COMPONENTS = 'components/components';
const MOBILE = 'responsive/mobile';
const DESKTOP = 'responsive/desktop';

function dictionary(sets) {
  return new StyleDictionary({
    source: sets.map(setPath),
    preprocessors: ['tokens-studio'],
    log: { verbosity: 'silent', warnings: 'disabled' },
    platforms: {
      css: {
        transforms: [...getTransforms({ platform: 'css' }), 'name/kebab', 'shadow/css/shorthand'],
        prefix: PREFIX,
        options: { outputReferences: true, showFileHeader: false },
      },
    },
  });
}

const fromSets = (names) => (token) => names.some((n) => token.filePath === setPath(n));

// Tokens consumed by the loader/JS only. `font.webfont` holds a Google Fonts spec ("Manrope:wght@400;500")
// whose semicolons would break a CSS declaration.
const NOT_CSS = new Set(['font.webfont']);

/** CSS custom properties for tokens of `outputSets`, resolved against `contextSets`. */
async function cssBlock(contextSets, outputSets, selector) {
  const sd = dictionary(contextSets);
  const tokens = await sd.getPlatformTokens('css');
  const lines = tokens.allTokens
    .filter(fromSets(outputSets))
    .filter((token) => !NOT_CSS.has(token.path.join('.')))
    .map((token) => {
      const value = refValue(token);
      return `  --${token.name}: ${value};`;
    });
  return `${selector} {\n${lines.join('\n')}\n}\n`;
}

// Keep aliases as var() references so component/semantic tokens follow whichever theme is active.
function refValue(token) {
  const original = token.original.value;
  if (typeof original === 'string' && /^\{[^}]+\}$/.test(original.trim())) {
    const path = original.trim().slice(1, -1).split('.');
    return `var(--${[PREFIX, ...path].join('-')})`;
  }
  return token.value;
}

async function flatResolved(sets) {
  const sd = dictionary(sets);
  const tokens = await sd.getPlatformTokens('css');
  return Object.fromEntries(tokens.allTokens.map((t) => [t.path.join('.'), t.value]));
}

const indent = (css) => css.replace(/^(?=.)/gm, '  ');
const media = (query, css) => `@media ${query} {\n${indent(css)}}\n`;

function themeSelectors(brand, mode) {
  const sel = [`[data-brand="${brand}"][data-theme="${mode}"]`, `[data-brand="${brand}"] [data-theme="${mode}"]`];
  if (brand === DEFAULT_BRAND) sel.push(`:root:not([data-brand])[data-theme="${mode}"]`, `:root:not([data-brand]) [data-theme="${mode}"]`);
  return sel.join(',\n');
}

async function buildBrand(brand) {
  const modes = modesOf(brand);
  const brandSet = `brands/${brand}/brand`;
  const defaultMode = modes.includes('light') ? 'light' : modes[0];
  const ctx = (mode) => [CORE, brandSet, `brands/${brand}/${mode}`, MOBILE, COMPONENTS];
  const rootSel = brand === DEFAULT_BRAND ? `:root,\n[data-brand="${brand}"]` : `[data-brand="${brand}"]`;

  let css = `/* Brand: ${brand} */\n`;
  // Brand personality + default mode colors.
  css += await cssBlock(ctx(defaultMode), [brandSet, `brands/${brand}/${defaultMode}`], rootSel);
  if (modes.includes('dark')) {
    const autoSel = [`[data-brand="${brand}"]:not([data-theme])`];
    if (brand === DEFAULT_BRAND) autoSel.unshift(':root:not([data-brand]):not([data-theme])');
    css += media('(prefers-color-scheme: dark)', await cssBlock(ctx('dark'), [`brands/${brand}/dark`], autoSel.join(',\n')));
  }
  const perMode = {};
  for (const mode of modes) {
    const block = await cssBlock(ctx(mode), [`brands/${brand}/${mode}`], themeSelectors(brand, mode));
    perMode[mode] = block;
    css += block;
  }
  return { css, modes, perMode };
}

async function build() {
  rmSync(DIST, { recursive: true, force: true });
  for (const dir of ['css/themes', 'css/brands', 'json', 'js']) mkdirSync(join(DIST, dir), { recursive: true });

  const baseCtx = [CORE, `brands/${DEFAULT_BRAND}/brand`, `brands/${DEFAULT_BRAND}/${modesOf(DEFAULT_BRAND)[0]}`, MOBILE, COMPONENTS];
  let core = '/* @antonio-ds/tokens — generated, do not edit. Source: tokens/tokens.json */\n';
  core += await cssBlock(baseCtx, [CORE], ':root');
  // Component tokens alias semantic ones; redeclare them on every themed scope so var() re-resolves there
  // (custom properties inherit computed values, so declaring only on :root would freeze nested themes).
  core += await cssBlock(baseCtx, [COMPONENTS], ':root,\n[data-brand],\n[data-theme]');
  core += await cssBlock(baseCtx, [MOBILE], ':root');
  core += media(`(min-width: ${DESKTOP_MIN_WIDTH})`, await cssBlock([...baseCtx.slice(0, 3), DESKTOP, COMPONENTS], [DESKTOP], ':root'));
  writeFileSync(join(DIST, 'css/core.css'), core);

  const global = `/* Opt-in page defaults */
html { color-scheme: light dark; }
[data-theme="light"] { color-scheme: light; }
[data-theme="dark"] { color-scheme: dark; }
body {
  margin: 0;
  background: var(--${PREFIX}-color-bg-canvas);
  color: var(--${PREFIX}-color-text-primary);
  font-family: var(--${PREFIX}-font-family-body);
  font-size: var(--${PREFIX}-typography-size-body);
  line-height: var(--${PREFIX}-font-line-height-normal);
  letter-spacing: var(--${PREFIX}-font-tracking-body);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, h5, h6 {
  font-family: var(--${PREFIX}-font-family-heading);
  font-weight: var(--${PREFIX}-font-weight-medium);
  line-height: var(--${PREFIX}-font-line-height-tight);
  letter-spacing: var(--${PREFIX}-font-tracking-heading);
}
h1 { font-size: var(--${PREFIX}-typography-size-h1); }
h2 { font-size: var(--${PREFIX}-typography-size-h2); }
h3 { font-size: var(--${PREFIX}-typography-size-h3); }
small { font-size: var(--${PREFIX}-typography-size-small); }
b, strong { font-weight: var(--${PREFIX}-font-weight-medium); }

/* Text styles: same names as the Figma text styles (text/mobile|desktop/<role>); mobile/desktop switch via tokens. */
${[
  ['display', 'medium', 'tight', 'heading'],
  ['h1', 'medium', 'tight', 'heading'],
  ['h2', 'medium', 'tight', 'heading'],
  ['h3', 'medium', 'snug', 'heading'],
  ['body', 'regular', 'normal', 'body'],
  ['body-medium', 'medium', 'normal', 'body'],
  ['small', 'regular', 'normal', 'body'],
  ['caption', 'regular', 'normal', 'body'],
]
  .map(
    ([role, weight, line, track]) => `.ds-text-${role} {
  font-family: var(--${PREFIX}-font-family-${track});
  font-size: var(--${PREFIX}-typography-size-${role === 'body-medium' ? 'body' : role});
  font-weight: var(--${PREFIX}-font-weight-${weight});
  line-height: var(--${PREFIX}-font-line-height-${line});
  letter-spacing: var(--${PREFIX}-font-tracking-${track});
}`,
  )
  .join('\n')}
`;
  writeFileSync(join(DIST, 'css/global.css'), global);

  let all = core;
  const themes = [];
  const resolved = {};
  for (const brand of brands) {
    const { css, modes, perMode } = await buildBrand(brand);
    writeFileSync(join(DIST, `css/brands/${brand}.css`), core + css);
    all += css;
    for (const mode of modes) {
      const id = `${brand}-${mode}`;
      themes.push({ id, brand, mode });
      writeFileSync(join(DIST, `css/themes/${id}.css`), perMode[mode]);
      for (const bp of ['mobile', 'desktop']) {
        const flat = await flatResolved([CORE, `brands/${brand}/brand`, `brands/${brand}/${mode}`, `responsive/${bp}`, COMPONENTS]);
        resolved[`${id}-${bp}`] = flat;
        writeFileSync(join(DIST, `json/${id}-${bp}.json`), JSON.stringify(flat, null, 2) + '\n');
      }
    }
  }
  writeFileSync(join(DIST, 'css/all.css'), all);

  // Web fonts per brand (Google Fonts). Loaded by ds-theme.js, or via css/fonts.css in bundled apps.
  const fonts = {};
  for (const brand of brands) {
    const spec = resolved[`${brand}-${modesOf(brand)[0]}-mobile`]['font.webfont'];
    if (spec) fonts[brand] = `https://fonts.googleapis.com/css2?family=${spec.replaceAll(' ', '+')}&display=swap`;
  }
  writeFileSync(join(DIST, 'css/fonts.css'), Object.values([...new Set(Object.values(fonts))]).map((u) => `@import url("${u}");`).join('\n') + '\n');

  // JS: token path → CSS var reference, plus resolved values per theme (for canvas, charts, native bridges).
  const anyFlat = resolved[`${DEFAULT_BRAND}-${modesOf(DEFAULT_BRAND)[0]}-mobile`];
  const vars = Object.fromEntries(Object.keys(anyFlat).map((p) => [p, `var(--${[PREFIX, ...p.split('.')].join('-')})`]));
  writeFileSync(join(DIST, 'js/tokens.js'), `// generated
export const brands = ${JSON.stringify(brands)};
export const defaultBrand = ${JSON.stringify(DEFAULT_BRAND)};
export const themes = ${JSON.stringify(themes)};
export const vars = ${JSON.stringify(vars, null, 2)};
export const values = ${JSON.stringify(resolved)};
export const fonts = ${JSON.stringify(fonts)};
export const cssVar = (path) => vars[path] ?? \`var(--${PREFIX}-\${path.split('.').join('-')})\`;
`);
  const pathUnion = Object.keys(vars).map((p) => JSON.stringify(p)).join(' | ');
  writeFileSync(join(DIST, 'js/tokens.d.ts'), `export type TokenPath = ${pathUnion};
export type Brand = ${brands.map((b) => JSON.stringify(b)).join(' | ')};
export type Mode = ${[...new Set(themes.map((t) => t.mode))].map((m) => JSON.stringify(m)).join(' | ')};
export declare const brands: Brand[];
export declare const defaultBrand: Brand;
export declare const themes: { id: string; brand: Brand; mode: Mode }[];
export declare const vars: Record<TokenPath, string>;
export declare const values: Record<string, Record<TokenPath, string>>;
/** Google Fonts stylesheet URL per brand. */
export declare const fonts: Partial<Record<Brand, string>>;
export declare function cssVar(path: TokenPath | (string & {})): string;
`);

  // Script loader for environments that only allow scripts from a CDN (e.g. Claude artifacts).
  writeFileSync(join(DIST, 'ds-theme.js'), `/* @antonio-ds/tokens theme loader — generated */
(function () {
  var CSS = ${JSON.stringify(all)};
  var GLOBAL = ${JSON.stringify(global)};
  var script = document.currentScript;
  var root = document.documentElement;
  function inject(id, css) {
    if (document.getElementById(id)) return;
    var el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    (document.head || root).appendChild(el);
  }
  var FONTS = ${JSON.stringify(fonts)};
  var loadFonts = !script || script.getAttribute('data-fonts') !== 'false';
  function loadFont(brand) {
    var url = loadFonts && FONTS[brand];
    if (!url || document.querySelector('link[data-ds-font="' + brand + '"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.setAttribute('data-ds-font', brand);
    (document.head || root).appendChild(link);
  }
  inject('ds-tokens', CSS);
  if (!script || script.getAttribute('data-global') !== 'false') inject('ds-global', GLOBAL);
  var api = {
    brands: ${JSON.stringify(brands)},
    themes: ${JSON.stringify(themes)},
    setTheme: function (opts) {
      opts = opts || {};
      var el = opts.target || root;
      if (opts.brand) {
        el.setAttribute('data-brand', opts.brand);
        loadFont(opts.brand);
      }
      if (opts.mode === 'auto') el.removeAttribute('data-theme');
      else if (opts.mode) el.setAttribute('data-theme', opts.mode);
    },
    getTheme: function (el) {
      el = el || root;
      var mode = el.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      return { brand: el.getAttribute('data-brand') || ${JSON.stringify(DEFAULT_BRAND)}, mode: mode };
    },
    /** Icon library for the page or a subtree: 'lucide' | 'material' | 'heroicons'. Its set must be loaded. */
    setIconSet: function (name, target) {
      (target || root).setAttribute('data-icon-set', name);
    }
  };
  if (script) {
    var b = script.getAttribute('data-brand'), m = script.getAttribute('data-mode');
    if (b || m) api.setTheme({ brand: b, mode: m });
    var icons = script.getAttribute('data-icon-set');
    if (icons) api.setIconSet(icons);
  }
  loadFont(root.getAttribute('data-brand') || ${JSON.stringify(DEFAULT_BRAND)});
  window.DS = Object.assign(window.DS || {}, api);
})();
`);

  rmSync(SETS_DIR, { recursive: true, force: true });
  console.log(`tokens: ${brands.length} brand(s), ${themes.length} theme(s) → ${DIST}`);
}

build().catch((err) => {
  rmSync(SETS_DIR, { recursive: true, force: true });
  console.error(err);
  process.exit(1);
});
