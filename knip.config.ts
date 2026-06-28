import type { KnipConfig } from "knip"

export default {
  entry: [
    "src/routes/**/*.{ts,tsx}", // TanStack Router file-based routes
    "src/router.tsx", // router factory (framework convention)
    "content-collections.ts", // content-collections config (default export consumed by the build)
    "scripts/build-content.mjs", // standalone content generation
  ],
  project: ["src/**/*.{ts,tsx}"],
  ignoreDependencies: [
    "@tanstack/router-plugin", // route codegen, run via TanStack Start's vite plugin (no direct import)
  ],
  ignoreExportsUsedInFile: true,
} satisfies KnipConfig
