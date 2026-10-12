// Purges jsDelivr's cache for the floating major-version URLs (e.g. @antonio-ds/tokens@1/...) after a release,
// so products that load the DS from the CDN pick up the new version within minutes.
import { readFileSync } from 'node:fs';

const FILES = {
  'packages/tokens': ['dist/ds-theme.js', 'dist/css/all.css', 'dist/css/core.css', 'dist/css/global.css', 'dist/css/fonts.css'],
  'packages/components': ['dist/cdn/ds-components.js', 'dist/cdn/icons-heroicons.js', 'dist/cdn/icons-material.js', 'dist/cdn/icons-hand.js', 'dist/REFERENCE.md', 'dist/custom-elements.json'],
};

let failed = false;
for (const [dir, files] of Object.entries(FILES)) {
  const pkg = JSON.parse(readFileSync(`${dir}/package.json`, 'utf8'));
  const major = pkg.version.split('.')[0];
  for (const file of files) {
    const url = `https://purge.jsdelivr.net/npm/${pkg.name}@${major}/${file}`;
    const res = await fetch(url);
    console.log(`${res.ok ? '✓' : '✗'} ${url} (${res.status})`);
    if (!res.ok) failed = true;
  }
}
if (failed) process.exitCode = 1;
