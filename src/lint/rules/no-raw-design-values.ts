import type { Context } from "@oxlint/plugins"

import { defineRule } from "@oxlint/plugins"

const HEX = /^#[0-9a-fA-F]{3,8}$/
const UNIT = /^-?\d*\.?\d+(px|rem|em|vh|vw|pt)$/
const COLOR_FN = /\b(rgba?|hsla?|oklch|oklab|lab|lch|color-mix)\(/

function isRawDesignValue(value: string): boolean {
  return HEX.test(value) || UNIT.test(value) || COLOR_FN.test(value)
}

/** Walk up from a node; true if it sits inside a JSX attribute value. */
function isInsideJsxAttribute(node: any): boolean {
  let current = node.parent
  while (current) {
    if (current.type === "JSXAttribute") return true
    if (current.type === "JSXElement" || current.type === "JSXFragment")
      return false
    current = current.parent
  }
  return false
}

export const noRawDesignValues = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow hardcoded design values (hex, CSS units, color functions) in JSX; use design tokens.",
    },
    messages: {
      rawDesignValue:
        'Don\'t hardcode the design value "{{value}}". Use a design token instead.',
    },
    schema: [],
  },
  createOnce(context: Context) {
    return {
      Literal(node: any) {
        if (typeof node.value !== "string") return
        if (!isRawDesignValue(node.value)) return
        if (!isInsideJsxAttribute(node)) return
        context.report({
          node,
          messageId: "rawDesignValue",
          data: { value: node.value },
        })
      },
    }
  },
})
