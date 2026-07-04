import tsParser from "@typescript-eslint/parser"
import { RuleTester } from "eslint"
import { describe } from "vitest"

import { plugin } from "@/lint/index"

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

const rule = plugin.rules["no-manual-overflow"] as never

describe("no-manual-overflow", () => {
  ruleTester.run("no-manual-overflow", rule, {
    valid: [
      // --- layout values (not scrollable) ---
      `stylex.create({ root: { overflow: "hidden" } })`,
      `stylex.create({ root: { overflowX: "hidden" } })`,
      `stylex.create({ root: { overflowY: "hidden" } })`,
      `stylex.create({ root: { overflow: "visible" } })`,
      `stylex.create({ root: { overflow: "clip" } })`,

      // --- NOT inside stylex.create or JSX sx ---
      `const config = { root: { overflow: "auto" } }`,
      `const opts = { overflowY: "scroll" }`,

      // --- variant definitions (defineVariants wraps stylex.create) ---
      `defineVariants(stylex.create({ auto: { overflow: "auto" } }))`,
      `defineVariants(stylex.create({ scroll: { overflowY: "scroll" } }))`,

      // --- computed keys (can't statically analyze) ---
      `stylex.create({ root: { [dynamicProp]: "auto" } })`,

      // --- layout shorthand props on JSX (not scrollable) ---
      `<Box overflow="hidden" />`,
      `<Box overflow="visible" />`,
      `<Box overflow="clip" />`,

      // --- non-overflow JSX props that happen to have similar names ---
      `<Box overflowWrap="break-word" />`,

      // --- tokenized overflow: value resolves to a defineConsts/defineVars
      //     named export (member expression, not a raw string literal) ---
      `stylex.create({ root: { overflow: scrollToken.auto } })`,
      `stylex.create({ root: { overflowY: overflowVars.scroll } })`,
      `<Box overflow={scrollToken.auto} />`,
    ],
    invalid: [
      // === stylex.create literals ===
      {
        code: `stylex.create({ root: { overflow: "auto" } })`,
        errors: [
          {
            messageId: "manualOverflow",
            data: { property: "overflow", value: "auto" },
          },
        ],
      },
      {
        code: `stylex.create({ list: { overflowY: "scroll" } })`,
        errors: [
          {
            messageId: "manualOverflow",
            data: { property: "overflowY", value: "scroll" },
          },
        ],
      },
      {
        code: `stylex.create({ table: { overflowX: "auto" } })`,
        errors: [
          {
            messageId: "manualOverflow",
            data: { property: "overflowX", value: "auto" },
          },
        ],
      },

      // === inline sx object on ANY component ===
      {
        code: `<PopoverContent sx={{ overflow: "auto" }} />`,
        errors: [
          {
            messageId: "manualOverflow",
            data: { property: "overflow", value: "auto" },
          },
        ],
      },
      {
        code: `<Command sx={{ overflowY: "scroll" }} />`,
        errors: [
          {
            messageId: "manualOverflow",
            data: { property: "overflowY", value: "scroll" },
          },
        ],
      },

      // === JSX shorthand prop on ANY component (not just Box) ===
      {
        code: `<Box overflow="auto" />`,
        errors: [
          {
            messageId: "manualOverflow",
            data: { property: "overflow", value: "auto" },
          },
        ],
      },
      {
        code: `<DropdownMenu overflowY="scroll" />`,
        errors: [
          {
            messageId: "manualOverflow",
            data: { property: "overflowY", value: "scroll" },
          },
        ],
      },
      {
        code: `<Combobox overflowX="auto" />`,
        errors: [
          {
            messageId: "manualOverflow",
            data: { property: "overflowX", value: "auto" },
          },
        ],
      },

      // === pseudo-property default value is scrollable ===
      {
        code: `stylex.create({ root: { overflow: { default: "auto", ":hover": "hidden" } } })`,
        errors: [
          {
            messageId: "manualOverflow",
            data: { property: "overflow", value: "auto" },
          },
        ],
      },
    ],
  })
})
