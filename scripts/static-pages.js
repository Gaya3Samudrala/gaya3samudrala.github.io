// GitHub Pages only serves files that exist, so after the build we copy
// index.html to a file for each page (e.g. dist/research.html). GitHub Pages
// serves that at gaya3samudrala.github.io/research, so links load directly.
import { copyFileSync } from 'node:fs';
import { milestones, pages } from '../src/data/content.js';

const all = [...pages, ...milestones];

const index = 'dist/index.html';
for (const { path } of all) {
  if (path === '/') continue;
  copyFileSync(index, `dist${path}.html`);
}
copyFileSync(index, 'dist/404.html');
console.log(`Created static pages for: ${all.map((p) => p.path).join(', ')}`);
