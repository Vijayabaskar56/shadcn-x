import tsParser from "@typescript-eslint/parser"
import { RuleTester } from "eslint"

import { plugin } from "@/lint/index"

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

ruleTester.run(
  "no-physical-stylex-properties",
  plugin.rules["no-physical-stylex-properties"] as never,
  {
    valid: [
      {
        code: `
          const styles = stylex.create({
            root: { paddingInlineStart: spacing.m, insetInlineEnd: 0 }
          })
        `,
      },
      {
        code: `
          const styles = stylex.create({
            root: { textAlign: "start" }
          })
        `,
      },
      {
        code: `
          const outside = { marginLeft: spacing.m }
        `,
      },
    ],
    invalid: [
      {
        code: `
          const styles = stylex.create({
            root: { marginLeft: spacing.m }
          })
        `,
        errors: [
          {
            messageId: "physicalProperty",
            data: {
              property: "marginLeft",
              replacement: "marginInlineStart",
            },
          },
        ],
      },
      {
        code: `
          const styles = stylex.create({
            root: { right: 0 }
          })
        `,
        errors: [
          {
            messageId: "physicalProperty",
            data: { property: "right", replacement: "insetInlineEnd" },
          },
        ],
      },
      {
        code: `
          const styles = stylex.create({
            root: { borderTopLeftRadius: borderRadius.m }
          })
        `,
        errors: [
          {
            messageId: "physicalProperty",
            data: {
              property: "borderTopLeftRadius",
              replacement: "borderStartStartRadius",
            },
          },
        ],
      },
      {
        code: `
          const styles = stylex.create({
            root: { textAlign: "right" }
          })
        `,
        errors: [
          {
            messageId: "physicalTextAlign",
            data: { value: "right", replacement: "end" },
          },
        ],
      },
    ],
  }
)
