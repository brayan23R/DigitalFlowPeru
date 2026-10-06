import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const root = process.cwd();
const dist = resolve(root, 'dist');
mkdirSync(resolve(dist, 'docs'), { recursive: true });
for (const file of ['README.md', 'robots.txt', 'sitemap.xml', 'llms.txt']) {
  const source = resolve(root, file);
  if (existsSync(source)) cpSync(source, resolve(dist, file));
}
if (existsSync(resolve(root, 'docs'))) cpSync(resolve(root, 'docs'), resolve(dist, 'docs'), { recursive: true });
