"use strict";

/* eslint-env node */

import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
  plugins: [
    createHtmlPlugin({
      entry: "/src/index.ts",
      template: "public/index.html",
    }),
  ],
  define: {
    ANALYTICS: JSON.stringify(process.env.ANALYTICS),
  },
});
