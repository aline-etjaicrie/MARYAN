import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://maryan.vercel.app',
  output: 'static',
  adapter: vercel({
    edge: true,
    webAnalytics: {
      enabled: true,
    }
  })
});
