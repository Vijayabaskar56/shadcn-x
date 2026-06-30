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
  p: "Box",
  h1: "Box",
  h2: "Box",
  h3: "Box",
  h4: "Box",
  h5: "Box",
  h6: "Box",
  figure: "Box",
  figcaption: "Box",
  blockquote: "Box",
  pre: "Box",
  code: "Box",
  time: "Box",
  table: "Box",
  thead: "Box",
  tbody: "Box",
  tr: "Box",
  th: "Box",
  td: "Box",
  caption: "Box",
  hr: "Box",
  img: "Box",
  button: "Button",
  a: "Link",
  label: "Label",
  svg: "Icon",
  textarea: "Textarea",
  input: "Input",
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
