import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sentry from '@sentry/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://maryanapp.fr',
  output: 'static',
  integrations: [
    sitemap(),
    sentry({
      dsn: process.env.SENTRY_DSN || import.meta.env.SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: 'maryan',
        authToken: process.env.SENTRY_AUTH_TOKEN || import.meta.env.SENTRY_AUTH_TOKEN,
      },
      tracesSampleRate: 0.2,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
    }),
  ],
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
