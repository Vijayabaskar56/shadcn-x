import contentCollections from "@content-collections/vite"
import babel from "@rolldown/plugin-babel"
import stylex from "@stylexjs/unplugin"
import tailwindcss from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react"
import browserslist from "browserslist"
import { browserslistToTargets } from "lightningcss"
import { defineConfig } from "vite"

// StyleX's unplugin runs lightningcss over the generated token CSS. With old
// targets, lightningcss lowers `light-dark(oklch(...), oklch(...))` into two
// space-separated values, which silently breaks every color token (transparent
// backgrounds, split per-axis border colors). Pin targets to versions that
// support light-dark() + oklch natively so the tokens survive untouched.
const cssTargets = browserslistToTargets(
  browserslist("chrome >= 123, edge >= 123, firefox >= 120, safari >= 17.5, ios_saf >= 17.5")
)

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    contentCollections(),
    stylex.vite({
      useCSSLayers: true,
      lightningcssOptions: { targets: cssTargets },
    }),
    devtools(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
