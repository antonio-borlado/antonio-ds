import { defineConfig } from 'vite';

// Default: ESM for bundlers (lit stays external, deduped by the app).
// `--mode cdn`: single self-contained file for <script type="module"> from jsDelivr/unpkg.
export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: mode !== 'cdn',
    outDir: mode === 'cdn' ? 'dist/cdn' : 'dist',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => (mode === 'cdn' ? 'ds-components.js' : 'index.js'),
    },
    minify: mode === 'cdn',
    rollupOptions: { external: mode === 'cdn' ? [] : [/^lit/] },
  },
}));
