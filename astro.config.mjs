import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  adapter: vercel(),
  site: 'https://volcast.app',
  integrations: [
    sitemap({
      customSitemaps: [
        'https://volcast.app/sitemap-landing.xml',
      ],
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'tokyo-night',
    },
  },
});
