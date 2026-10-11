import { defineConfig } from 'vite';

// Default: ESM for bundlers (lit stays external, deduped by the app).
// `--mode cdn`: self-contained files for <script type="module"> from jsDelivr/unpkg:
// ds-components.js (includes Lucide) + icons-<set>.js per extra icon library.
export default defineConfig(({ mode }) => {
  const cdn = mode === 'cdn';
  const entry = cdn
    ? { 'ds-components': 'src/index.ts', 'icons-heroicons': 'src/icons/generated/heroicons.ts', 'icons-material': 'src/icons/generated/material.ts' }
    : {
        index: 'src/index.ts',
        'icons/lucide': 'src/icons/generated/lucide.ts',
        'icons/heroicons': 'src/icons/generated/heroicons.ts',
        'icons/material': 'src/icons/generated/material.ts',
      };
  return {
    build: {
      emptyOutDir: !cdn,
      outDir: cdn ? 'dist/cdn' : 'dist',
      lib: { entry, formats: ['es'], fileName: (_format, name) => `${name}.js` },
      minify: cdn,
      rollupOptions: { external: cdn ? [] : [/^lit/] },
    },
  };
});
