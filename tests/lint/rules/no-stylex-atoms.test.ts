import tsParser from "@typescript-eslint/parser"
import { RuleTester } from "eslint"

import { plugin } from "@/lint/index"

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

ruleTester.run("no-stylex-atoms", plugin.rules["no-stylex-atoms"] as never, {
  valid: [
    // The sanctioned StyleX import (stylex.create / defineVars) is allowed.
    { code: `import * as stylex from "@stylexjs/stylex"` },
    { code: `import { createTheme } from "@stylexjs/stylex"` },
    // An unrelated package is none of our business.
    { code: `import { Box } from "@/components/box"` },
    // A source that merely contains the substring isn't flagged (exact/path match only).
    { code: `import { x } from "@stylexjs/atoms-foo"` },
  ],
  invalid: [
    // Named import.
    {
      code: `import { x } from "@stylexjs/atoms"`,
      errors: [{ messageId: "noAtoms", data: { source: "@stylexjs/atoms" } }],
    },
    // Default import.
    {
      code: `import x from "@stylexjs/atoms"`,
      errors: [{ messageId: "noAtoms" }],
    },
    // Side-effect import.
    {
      code: `import "@stylexjs/atoms"`,
      errors: [{ messageId: "noAtoms" }],
    },
    // Subpath import.
    {
      code: `import { x } from "@stylexjs/atoms/js"`,
      errors: [
        { messageId: "noAtoms", data: { source: "@stylexjs/atoms/js" } },
      ],
    },
    // Re-export.
    {
      code: `export { x } from "@stylexjs/atoms"`,
      errors: [{ messageId: "noAtoms" }],
    },
    // export *
    {
      code: `export * from "@stylexjs/atoms"`,
      errors: [{ messageId: "noAtoms" }],
    },
    // The banned list is configurable.
    {
      code: `import { x } from "@acme/atoms"`,
      options: [{ sources: ["@acme/atoms"] }],
      errors: [{ messageId: "noAtoms", data: { source: "@acme/atoms" } }],
    },
  ],
})
