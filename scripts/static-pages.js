// GitHub Pages only serves files that exist, so after the build we copy
// index.html to a file for each page (e.g. dist/research.html). GitHub Pages
// serves that at gaya3samudrala.github.io/research, so links load directly.
import { copyFileSync } from 'node:fs';
import { pages } from '../src/data/content.js';

const index = 'dist/index.html';
for (const { path } of pages) {
  if (path === '/') continue;
  copyFileSync(index, `dist${path}.html`);
}
copyFileSync(index, 'dist/404.html');
console.log(`Created static pages for: ${pages.map((p) => p.path).join(', ')}`);
