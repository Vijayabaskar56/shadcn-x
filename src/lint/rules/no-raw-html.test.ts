import tsParser from "@typescript-eslint/parser"
import { RuleTester } from "eslint"

import { plugin } from "../index"

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

ruleTester.run("no-raw-html", plugin.rules["no-raw-html"] as never, {
  valid: [
    // A shadcn-x primitive is on-system.
    { code: "const a = <Box />" },
    // A host element with no primitive yet is allowed (ADR-0003: ban only what we cover).
    { code: "const a = <input />" },
    { code: "const a = <svg />" },
    // The banned list is configurable; an empty map bans nothing.
    { code: "const a = <div />", options: [{ elements: {} }] },
  ],
  invalid: [
    // A covered host element is off-system; the message names the primitive.
    {
      code: "const a = <div />",
      errors: [
        { messageId: "rawHtml", data: { tag: "div", primitive: "Box" } },
      ],
    },
    {
      code: "const a = <button />",
      errors: [
        { messageId: "rawHtml", data: { tag: "button", primitive: "Button" } },
      ],
    },
  ],
})
