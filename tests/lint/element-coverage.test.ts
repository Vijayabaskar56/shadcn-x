/**
 * The element-coverage table (`src/element-coverage.ts`) is the single source
 * of truth for "which host tag does which primitive retire". These tests pin
 * the WHOLE table:
 *
 * 1. every covered tag is banned by `no-raw-html` and the message names the
 *    covering primitive;
 * 2. every primitive named in the table is a real export from
 *    `src/components/`;
 * 3. the Box-permitted subset is EXACTLY the documented exceptions — in
 *    particular, `table`/`th`/`td`/`hr` being both banned by the guardrail
 *    and accepted by `Box as=` is an explicit decision (`mdx-prose-infra`),
 *    not an accident.
 */
import tsParser from "@typescript-eslint/parser"
import { RuleTester } from "eslint"
import { describe, expect, it } from "vitest"

import type { BoxAllowedTag } from "@/element-coverage"

// Import every component module a coverage entry points into; assert each `primitive` name is a real export.
import * as boxModule from "@/components/box"
import * as buttonModule from "@/components/button"
import * as fieldModule from "@/components/field"
import * as iconModule from "@/components/icon"
import * as imageModule from "@/components/image"
import * as inputModule from "@/components/input"
import * as kbdModule from "@/components/kbd"
import * as labelModule from "@/components/label"
import * as linkModule from "@/components/link"
import * as nativeSelectModule from "@/components/native-select"
import * as separatorModule from "@/components/separator"
import * as tableModule from "@/components/table"
import * as textModule from "@/components/text"
import * as textareaModule from "@/components/textarea"
import {
  BOX_ALLOWED_TAGS,
  DEFAULT_ELEMENTS,
  ELEMENT_COVERAGE,
} from "@/element-coverage"
import { plugin } from "@/lint/index"

const componentExports: Record<string, unknown> = {
  ...boxModule,
  ...buttonModule,
  ...fieldModule,
  ...iconModule,
  ...imageModule,
  ...inputModule,
  ...kbdModule,
  ...labelModule,
  ...linkModule,
  ...nativeSelectModule,
  ...separatorModule,
  ...tableModule,
  ...textModule,
  ...textareaModule,
}

const coveredEntries = ELEMENT_COVERAGE.filter(
  (entry) => entry.primitive !== null
)

// `Array#toSorted` needs lib es2023; sort a copy instead.
const sorted = <T>(items: readonly T[]): T[] =>
  [...items].sort((a, b) => String(a).localeCompare(String(b)))

describe("element coverage table", () => {
  it("has no duplicate tags", () => {
    const tags = ELEMENT_COVERAGE.map((entry) => entry.tag)
    expect(new Set(tags).size).toBe(tags.length)
  })

  it("derives DEFAULT_ELEMENTS from exactly the covered entries", () => {
    expect(sorted(Object.entries(DEFAULT_ELEMENTS))).toEqual(
      sorted(coveredEntries.map((entry) => [entry.tag, entry.primitive]))
    )
    // `form` has no covering primitive (react-hook-form `Form` renders no
    // DOM), so it must stay un-banned.
    expect(DEFAULT_ELEMENTS).not.toHaveProperty("form")
  })

  it("names only real component exports as primitives", () => {
    for (const entry of coveredEntries) {
      expect(
        componentExports[entry.primitive as string],
        `primitive "${entry.primitive}" (retiring <${entry.tag}>) is not exported from src/components/`
      ).toBeTypeOf("function")
    }
  })
})

describe("no-raw-html bans the whole covered table", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  })

  ruleTester.run(
    "no-raw-html (from element coverage)",
    plugin.rules["no-raw-html"] as never,
    {
      // Uncovered entries (primitive: null) stay allowed as raw tags.
      valid: ELEMENT_COVERAGE.filter((entry) => entry.primitive === null).map(
        (entry) => ({ code: `const a = <${entry.tag} />` })
      ),
      invalid: coveredEntries.map((entry) => ({
        code: `const a = <${entry.tag} />`,
        errors: [
          {
            messageId: "rawHtml",
            data: { tag: entry.tag, primitive: entry.primitive as string },
          },
        ],
      })),
    }
  )

  it("covers every DEFAULT_ELEMENTS tag (table drove the cases above)", () => {
    expect(sorted(coveredEntries.map((entry) => entry.tag))).toEqual(
      sorted(Object.keys(DEFAULT_ELEMENTS))
    )
  })
})

describe("Box as= permitted subset", () => {
  // The full, explicit list of tags Box may render. Changing Box's surface
  // means changing this list on purpose.
  const expectedBoxTags = [
    // Box IS the primitive for generic flow content.
    "div",
    "span",
    "section",
    "nav",
    "article",
    "main",
    "aside",
    "header",
    "footer",
    "ul",
    "ol",
    "li",
    "figure",
    "figcaption",
    "blockquote",
    "pre",
    "code",
    "time",
    // No primitive covers <form> yet.
    "form",
    // Banned by the guardrail, kept ONLY for markdown prose in docs.
    "table",
    "th",
    "td",
    "hr",
  ] as const

  it("is exactly the documented exceptions", () => {
    expect(sorted([...BOX_ALLOWED_TAGS])).toEqual(sorted([...expectedBoxTags]))
  })

  it("gives every Box-permitted tag a documented reason", () => {
    for (const entry of ELEMENT_COVERAGE) {
      if (!("boxAllowed" in entry)) continue
      expect(
        entry.boxAllowed,
        `<${entry.tag}> is Box-permitted without a reason`
      ).toBeTruthy()
    }
  })

  it("keeps the guardrail/Box overlap explicit: banned tags Box still renders", () => {
    const bannedButBoxAllowed = ELEMENT_COVERAGE.filter(
      (entry) =>
        entry.primitive !== null &&
        entry.primitive !== "Box" &&
        "boxAllowed" in entry
    ).map((entry) => [entry.tag, entry.boxAllowed])
    // table/th/td/hr: MDX prose infra only (docs markdown rendering goes
    // through `Box as=`). Nothing else may straddle the fence.
    expect(sorted(bannedButBoxAllowed)).toEqual(
      sorted([
        ["table", "mdx-prose-infra"],
        ["th", "mdx-prose-infra"],
        ["td", "mdx-prose-infra"],
        ["hr", "mdx-prose-infra"],
      ])
    )
  })
})

// Type-level pin: Box `as=` union derived from table must equal documented exception list (compile error = table/test disagree).
type Eq<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false
type ExpectedBoxAllowedTag =
  | "div"
  | "span"
  | "section"
  | "nav"
  | "article"
  | "main"
  | "aside"
  | "header"
  | "footer"
  | "ul"
  | "ol"
  | "li"
  | "figure"
  | "figcaption"
  | "blockquote"
  | "pre"
  | "code"
  | "time"
  | "form"
  | "table"
  | "th"
  | "td"
  | "hr"
const boxAllowedTagUnionMatches: Eq<BoxAllowedTag, ExpectedBoxAllowedTag> = true
void boxAllowedTagUnionMatches
