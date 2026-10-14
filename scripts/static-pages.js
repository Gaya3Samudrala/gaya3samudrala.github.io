// GitHub Pages only serves files that exist, so after the build we copy
// index.html into a folder for each page (e.g. dist/research/index.html).
// That way links like gaya3samudrala.github.io/research load directly.
import { copyFileSync, mkdirSync } from 'node:fs';
import { pages } from '../src/data/content.js';

const index = 'dist/index.html';
for (const { path } of pages) {
  if (path === '/') continue;
  mkdirSync(`dist${path}`, { recursive: true });
  copyFileSync(index, `dist${path}/index.html`);
}
copyFileSync(index, 'dist/404.html');
console.log(`Created static pages for: ${pages.map((p) => p.path).join(', ')}`);
