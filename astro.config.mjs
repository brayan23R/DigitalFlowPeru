import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: { format: 'directory' },
  compressHTML: true,
  vite: { build: { cssMinify: 'lightningcss' } }
});
