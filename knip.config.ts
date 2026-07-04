import type { KnipConfig } from "knip"

export default {
  entry: [
    "src/routes/**/*.{ts,tsx}", // TanStack Router file-based routes
    "src/router.tsx", // router factory (framework convention)
    "source.config.ts", // fumadocs-mdx config (consumed by the vite plugin + CLI)
  ],
  project: ["src/**/*.{ts,tsx}"],
  ignoreDependencies: [
    "@tanstack/router-plugin", // route codegen, run via TanStack Start's vite plugin (no direct import)
  ],
  ignoreExportsUsedInFile: true,
} satisfies KnipConfig
