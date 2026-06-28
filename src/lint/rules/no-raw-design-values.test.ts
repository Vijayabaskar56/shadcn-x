import tsParser from "@typescript-eslint/parser"
import { RuleTester } from "eslint"

import { plugin } from "../index"

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

ruleTester.run(
  "no-raw-design-values",
  plugin.rules["no-raw-design-values"] as never,
  {
    valid: [
      // Token names are decisions, not raw values.
      { code: `const a = <Box color="text-primary" />` },
      { code: `const a = <Box padding="l" />` },
      // Raw values outside JSX are out of this rule's scope.
      { code: `const x = "16px"` },
    ],
    invalid: [
      // Hex color literal in a JSX attribute.
      {
        code: `const a = <Box color="#fff" />`,
        errors: [{ messageId: "rawDesignValue" }],
      },
      // CSS unit literal inside an sx/style object in JSX.
      {
        code: `const a = <Box sx={{ padding: "16px" }} />`,
        errors: [{ messageId: "rawDesignValue" }],
      },
      // Color function inside an sx object.
      {
        code: `const a = <Box sx={{ color: "oklch(0.5 0 0)" }} />`,
        errors: [{ messageId: "rawDesignValue" }],
      },
    ],
  }
)
