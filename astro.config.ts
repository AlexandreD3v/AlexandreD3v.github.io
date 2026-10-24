import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// User site (https://github.com/AlexandreD3v/AlexandreD3v.github.io).
// Do not set `base`: GitHub Pages serves this repository at the domain root.
export default defineConfig({
  site: 'https://alexandred3v.github.io',
  output: 'static',
  prefetch: false,
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
