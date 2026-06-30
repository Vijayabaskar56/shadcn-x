import { definePlugin, eslintCompatPlugin } from "@oxlint/plugins"

import { noClassNameStyle } from "./rules/no-className-style.ts"
import { noRawDesignValues } from "./rules/no-raw-design-values.ts"
import { noRawHtml } from "./rules/no-raw-html.ts"
import { noStylexAtoms } from "./rules/no-stylex-atoms.ts"

/**
 * shadcn-x lint plugin — the escape-hatch fence (ADR-0001).
 *
 * Rules are authored with oxlint's optimized `createOnce` API; `eslintCompatPlugin`
 * adds the ESLint-compatible `create` method to each, so the one plugin runs
 * under both oxlint (primary/fast) and ESLint (the hedge, and the path into
 * consumer repos).
 */
export const plugin = eslintCompatPlugin(
  definePlugin({
    meta: { name: "shadcn-x" },
    rules: {
      "no-raw-html": noRawHtml,
      "no-className-style": noClassNameStyle,
      "no-raw-design-values": noRawDesignValues,
      "no-stylex-atoms": noStylexAtoms,
    },
  })
)

/** Recommended flat-config preset turning every guardrail on as an error. */
export const recommended = {
  plugins: { "shadcn-x": plugin },
  rules: {
    "shadcn-x/no-raw-html": "error",
    "shadcn-x/no-className-style": "error",
    "shadcn-x/no-raw-design-values": "error",
    "shadcn-x/no-stylex-atoms": "error",
  },
} as const

export default plugin
