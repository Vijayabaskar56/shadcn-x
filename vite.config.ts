import babel from "@rolldown/plugin-babel"
import stylex from "@stylexjs/unplugin"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react"
import browserslist from "browserslist"
import mdx from "fumadocs-mdx/vite"
import { browserslistToTargets } from "lightningcss"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

// StyleX's unplugin runs lightningcss over the generated token CSS. With old
// targets, lightningcss lowers `light-dark(oklch(...), oklch(...))` into two
// space-separated values, which silently breaks every color token (transparent
// backgrounds, split per-axis border colors). Pin targets to versions that
// support light-dark() + oklch natively so the tokens survive untouched.
const cssTargets = browserslistToTargets(
  browserslist(
    "chrome >= 123, edge >= 123, firefox >= 120, safari >= 17.5, ios_saf >= 17.5"
  )
)

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    // Compiles content/docs MDX per source.config.ts and generates `.source/`
    // (server/browser entries, aliased as `collections/*`). Must run first so
    // its `order: 'pre'` transforms see raw MDX.
    mdx(),
    stylex.vite({
      useCSSLayers: true,
      enableLTRRTLComments: true,
      // Enables StyleX theming APIs (createTheme + cross-file variable
      // resolution). The default themeFileExtension (`.stylex`) must be kept —
      // imports are written extensionless (`tokens.stylex`) and the resolver
      // matches the `.stylex` suffix, then tries `.ts` via getPossibleFilePaths.
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: fileURLToPath(new URL(".", import.meta.url)),
      },
      lightningcssOptions: { targets: cssTargets },
    }),
    devtools(),
    tanstackStart(),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
