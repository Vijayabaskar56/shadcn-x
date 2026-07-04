import type { Context } from "@oxlint/plugins"

import { defineRule } from "@oxlint/plugins"

// Default banned host elements → the shadcn-x primitive that covers them,
// derived from the single source of truth for element coverage (ADR-0003).
// The list is curated, not exhaustive: elements with no primitive yet (e.g.
// `form`, whose react-hook-form `Form` renders no DOM) are intentionally
// absent and stay allowed until their primitive lands. Curation notes live
// with the table in `src/element-coverage.ts`.
import { DEFAULT_ELEMENTS } from "../../element-coverage.ts"
import { perFileOption } from "../rule-kit.ts"

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
    const option = perFileOption<{
      elements: Readonly<Record<string, string>>
    }>(context, { elements: DEFAULT_ELEMENTS })
    return {
      before() {
        option.before()
      },
      JSXOpeningElement(node: any) {
        const nameNode = node.name
        if (nameNode.type !== "JSXIdentifier") return
        const tag: string = nameNode.name
        const primitive = option.current.elements[tag]
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
