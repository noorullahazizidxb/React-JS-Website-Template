import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { jsonLd } from "./src/seo/site";

/** Injects the JSON-LD from src/seo/site.ts into the static <head> for crawlers without JavaScript. */
const staticJsonLd = (): Plugin => ({
  name: "static-jsonld",
  transformIndexHtml: (html) =>
    html.replace(
      "<!--seo-jsonld-->",
      `<script type="application/ld+json" data-seo>${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
    ),
});

export default defineConfig({
  plugins: [react(), staticJsonLd()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
