import type { Context } from "@oxlint/plugins"

import { defineRule } from "@oxlint/plugins"

/**
 * Default banned host elements → the shadcn-x primitive that covers them.
 *
 * The list is curated, not exhaustive (ADR-0003): we ban only the host elements
 * a primitive already replaces, so raw HTML shrinks toward zero as primitives
 * ship. Elements with no primitive yet (e.g. img) are intentionally absent and
 * stay allowed until their primitive lands.
 */
const DEFAULT_ELEMENTS: Record<string, string> = {
  div: "Box",
  span: "Box",
  section: "Box",
  nav: "Box",
  article: "Box",
  main: "Box",
  aside: "Box",
  header: "Box",
  footer: "Box",
  ul: "Box",
  ol: "Box",
  li: "Box",
  p: "Text",
  h1: "Text",
  h2: "Text",
  h3: "Text",
  h4: "Text",
  h5: "Text",
  h6: "Text",
  figure: "Box",
  figcaption: "Box",
  blockquote: "Box",
  pre: "Box",
  code: "Box",
  kbd: "Kbd",
  time: "Box",
  table: "Table",
  thead: "TableHeader",
  tbody: "TableBody",
  tfoot: "TableFooter",
  tr: "TableRow",
  th: "TableHead",
  td: "TableCell",
  caption: "TableCaption",
  hr: "Separator",
  img: "Image",
  button: "Button",
  a: "Link",
  label: "Label",
  svg: "Icon",
  textarea: "Textarea",
  input: "Input",
  select: "NativeSelect",
  option: "NativeSelectOption",
  optgroup: "NativeSelectOptGroup",
  // No `form` mapping: our `Form` is the react-hook-form `FormProvider` context
  // (it renders no DOM), so it does NOT retire the `<form>` element — you still
  // need a real `<form onSubmit>` inside it. Like `img` before `Image`, `<form>`
  // stays allowed until a primitive actually covers it.
  fieldset: "FieldSet",
  legend: "FieldLegend",
}

export const noRawHtml = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow raw HTML host elements that a shadcn-x primitive covers; use the primitive instead.",
    },
    messages: {
      rawHtml: "Use <{{primitive}}> instead of the raw <{{tag}}> element.",
    },
    schema: [
      {
        type: "object",
        properties: {
          elements: {
            type: "object",
            additionalProperties: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  createOnce(context: Context) {
    // `createOnce` runs once; `context.options` is only populated per-file, so
    // resolve the option in `before()` (which the runtime calls for each file).
    let elements = DEFAULT_ELEMENTS
    return {
      before() {
        const option = ((context.options ?? [])[0] ?? {}) as {
          elements?: Record<string, string>
        }
        elements = option.elements ?? DEFAULT_ELEMENTS
      },
      JSXOpeningElement(node: any) {
        const nameNode = node.name
        if (nameNode.type !== "JSXIdentifier") return
        const tag: string = nameNode.name
        const primitive = elements[tag]
        if (primitive === undefined) return
        context.report({
          node: nameNode,
          messageId: "rawHtml",
          data: { tag, primitive },
        })
      },
    }
  },
})
