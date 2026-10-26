import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// index.html ships static SEO tags for crawlers without JavaScript; Helmet owns them once React runs.
document.querySelectorAll("head [data-seo]").forEach((node) => node.remove());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
