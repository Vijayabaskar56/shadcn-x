import tsParser from "@typescript-eslint/parser"
import { RuleTester } from "eslint"

import { plugin } from "../index"

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

const opts = [{ sources: ["@/components"] }]

ruleTester.run(
  "no-className-style",
  plugin.rules["no-className-style"] as never,
  {
    valid: [
      // sx is the sanctioned override prop.
      {
        code: `import { Box } from "@/components/box"; const a = <Box sx={s} />`,
        options: opts,
      },
      // className on a component NOT from our sources is none of our business.
      {
        code: `import { Box } from "other-lib"; const a = <Box className="x" />`,
        options: opts,
      },
    ],
    invalid: [
      // className on our primitive → off-system.
      {
        code: `import { Box } from "@/components/box"; const a = <Box className="x" />`,
        options: opts,
        errors: [{ messageId: "noClassName" }],
      },
      // style on our primitive → off-system.
      {
        code: `import { Button } from "@/components/button"; const a = <Button style={{}} />`,
        options: opts,
        errors: [{ messageId: "noStyle" }],
      },
    ],
  }
)
