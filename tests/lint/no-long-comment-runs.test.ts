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

const rule = plugin.rules["no-long-comment-runs"] as never

describe("no-long-comment-runs", () => {
  ruleTester.run("no-long-comment-runs", rule, {
    valid: [
      // no comments
      "const x = 1;",
      // single line comment
      "// short note\nconst x = 1;",
      // two consecutive line comments (within limit)
      "// line one\n// line two\nconst x = 1;",
      // block comments exempt (any length)
      "/**\n * TSDoc comment\n * on multiple lines\n */\nconst x = 1;",
      // plain block comment exempt
      "/*\n * multi-line\n * block comment\n */\nconst x = 1;",
      // non-consecutive (separated by code)
      "// first\nconst x = 1\n// second",
      // mixed block and line
      "/** doc */\n// line\nconst x = 1;",
      // Shebang exempt (not a Line comment)
      "#!/usr/bin/env node\n// one liner",
      // inline code comments (code before //) are not counted — they're annotations, not prose
      "const a = 1 // first\nconst b = 2 // second\nconst c = 3 // third",
      // custom maxLines=3 allows runs of 3, but not 4
      {
        code: "// a\n// b\n// c\nconst x = 1;",
        options: [{ maxLines: 3 }] as never,
      },
    ],
    invalid: [
      // three consecutive line comments (exceeds default maxLines=2)
      {
        code: "// line one\n// line two\n// line three\nconst x = 1;",
        errors: [
          {
            messageId: "tooManyLines" as const,
            data: { length: "3", maxLines: "2" },
          },
        ],
      },
      // four consecutive line comments
      {
        code: "// a\n// b\n// c\n// d\nconst x = 1;",
        errors: [
          {
            messageId: "tooManyLines" as const,
            data: { length: "4", maxLines: "2" },
          },
        ],
      },
      // two separate long runs
      {
        code: "// a\n// b\n// c\nconst x = 1;\n// d\n// e\n// f\nconst y = 2;",
        errors: [
          {
            messageId: "tooManyLines" as const,
            data: { length: "3", maxLines: "2" },
          },
          {
            messageId: "tooManyLines" as const,
            data: { length: "3", maxLines: "2" },
          },
        ],
      },
      // custom maxLines=3 still flags a run of 4
      {
        code: "// a\n// b\n// c\n// d\nconst x = 1;",
        options: [{ maxLines: 3 }] as never,
        errors: [
          {
            messageId: "tooManyLines" as const,
            data: { length: "4", maxLines: "3" },
          },
        ],
      },
    ],
  })
})
