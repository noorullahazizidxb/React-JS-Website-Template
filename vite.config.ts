import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { jsonLd } from "./src/seo/site";
import { sentryVitePlugin } from '@sentry/vite-plugin';

/** Injects the JSON-LD from src/seo/site.ts into the static <head> for crawlers without JavaScript. */
const staticJsonLd = (): Plugin => ({
  name: "static-jsonld",
  transformIndexHtml: (html) =>
    html.replace(
      "<!--seo-jsonld-->",
      `<script type="application/ld+json" data-seo>${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
    ),
});


function sentryVitePlugins() {
  const authToken = process.env.SENTRY_AUTH_TOKEN;
  if (!authToken) return [];
  return [
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken,
      disable: !authToken,
      release: { name: process.env.VERCEL_GIT_COMMIT_SHA },
      sourcemaps: { filesToDeleteAfterUpload: ['./dist/**/*.map'] },
    }),
  ];
}

export default defineConfig({
  define: {
    'import.meta.env.VITE_SENTRY_RELEASE': JSON.stringify(process.env.VERCEL_GIT_COMMIT_SHA || ''),
    'import.meta.env.VITE_SENTRY_ENVIRONMENT': JSON.stringify(process.env.VERCEL_ENV || process.env.NODE_ENV || 'development'),
  },
  plugins: [react(), staticJsonLd(), ...sentryVitePlugins()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build: { sourcemap: Boolean(process.env.SENTRY_AUTH_TOKEN) },
});
