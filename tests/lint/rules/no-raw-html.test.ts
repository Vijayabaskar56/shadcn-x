import tsParser from "@typescript-eslint/parser"
import { RuleTester } from "eslint"

import { plugin } from "@/lint/index"

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
    { code: "const a = <video />" },
    // `<form>` stays allowed: `Form` is the react-hook-form provider (no DOM), so
    // it does not retire the `<form>` element.
    { code: "const a = <form />" },
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
    {
      code: "const a = <a href='/' />",
      errors: [{ messageId: "rawHtml", data: { tag: "a", primitive: "Link" } }],
    },
    {
      code: "const a = <label htmlFor='x' />",
      errors: [
        { messageId: "rawHtml", data: { tag: "label", primitive: "Label" } },
      ],
    },
    {
      code: "const a = <svg />",
      errors: [
        { messageId: "rawHtml", data: { tag: "svg", primitive: "Icon" } },
      ],
    },
    {
      code: "const a = <textarea />",
      errors: [
        {
          messageId: "rawHtml",
          data: { tag: "textarea", primitive: "Textarea" },
        },
      ],
    },
    {
      code: "const a = <input />",
      errors: [
        { messageId: "rawHtml", data: { tag: "input", primitive: "Input" } },
      ],
    },
    {
      code: "const a = <img src='x' alt='a' />",
      errors: [
        { messageId: "rawHtml", data: { tag: "img", primitive: "Image" } },
      ],
    },
    {
      code: "const a = <p>hello</p>",
      errors: [{ messageId: "rawHtml", data: { tag: "p", primitive: "Text" } }],
    },
    {
      code: "const a = <h1>hello</h1>",
      errors: [
        { messageId: "rawHtml", data: { tag: "h1", primitive: "Text" } },
      ],
    },
    {
      code: "const a = <table />",
      errors: [
        { messageId: "rawHtml", data: { tag: "table", primitive: "Table" } },
      ],
    },
    {
      code: "const a = <tr />",
      errors: [
        { messageId: "rawHtml", data: { tag: "tr", primitive: "TableRow" } },
      ],
    },
    {
      code: "const a = <td />",
      errors: [
        { messageId: "rawHtml", data: { tag: "td", primitive: "TableCell" } },
      ],
    },
    {
      code: "const a = <hr />",
      errors: [
        { messageId: "rawHtml", data: { tag: "hr", primitive: "Separator" } },
      ],
    },
    {
      code: "const a = <kbd />",
      errors: [
        { messageId: "rawHtml", data: { tag: "kbd", primitive: "Kbd" } },
      ],
    },
  ],
})
