import path from "node:path"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/react-use-scroll-sync/",
  resolve: {
    alias: {
      "react-use-scroll-sync": path.resolve(__dirname, "../src/index.ts"),
    },
  },
  plugins: [react()],
})
