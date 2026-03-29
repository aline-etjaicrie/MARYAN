import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
export default defineConfig({
  site: 'https://maryanapp.fr',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    edge: true
  }),
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true,
    }
  }
});
