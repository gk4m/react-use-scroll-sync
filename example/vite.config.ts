import path from "node:path"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/react-use-scroll-sync/",
  resolve: {
    alias: [
      {
        find: /^react$/,
        replacement: path.resolve(__dirname, "node_modules/react/index.js"),
      },
      {
        find: /^react\/jsx-runtime$/,
        replacement: path.resolve(
          __dirname,
          "node_modules/react/jsx-runtime.js",
        ),
      },
      {
        find: /^react\/jsx-dev-runtime$/,
        replacement: path.resolve(
          __dirname,
          "node_modules/react/jsx-dev-runtime.js",
        ),
      },
      {
        find: /^react-dom$/,
        replacement: path.resolve(__dirname, "node_modules/react-dom/index.js"),
      },
      {
        find: /^react-dom\/client$/,
        replacement: path.resolve(
          __dirname,
          "node_modules/react-dom/client.js",
        ),
      },
      {
        find: /^react-use-scroll-sync$/,
        replacement: path.resolve(__dirname, "../src/index.ts"),
      },
    ],
    dedupe: ["react", "react-dom"],
  },
  plugins: [react()],
})
