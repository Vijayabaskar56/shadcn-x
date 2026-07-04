import type { KnipConfig } from "knip"

export default {
  entry: [
    "src/routes/**/*.{ts,tsx}", // TanStack Router file-based routes
    "src/router.tsx", // router factory (framework convention)
    "source.config.ts", // fumadocs-mdx config (consumed by the vite plugin + CLI)
    // shadcn-x is a component library: every export under src/components/ is
    // public API. Subcomponent types (`CardHeaderProps`, `AlertTitleProps`, …)
    // exist for consumers, not internal call sites. Listing the dir as entry
    // surface prevents knip from flagging those shadcn-style aliases as unused.
    "src/components/**/*.{ts,tsx}",
  ],
  project: ["src/**/*.{ts,tsx}"],
  ignoreDependencies: [
    "@tanstack/router-plugin", // route codegen, run via TanStack Start's vite plugin (no direct import)
    // CSS-only import — knip reads JS/TS sources, so it can't see the
    // `@import "@fontsource-variable/inter"` in src/styles/globals.css.
    "@fontsource-variable/inter",
    // shadcn is the registry CLI (invoked as `bunx shadcn add ...`), never
    // imported from source.
    "shadcn",
  ],
  ignoreExportsUsedInFile: true,
} satisfies KnipConfig
