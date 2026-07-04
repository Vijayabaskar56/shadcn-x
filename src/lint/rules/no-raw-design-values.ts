import type { Context } from "@oxlint/plugins"

import { defineRule } from "@oxlint/plugins"

import { findAncestor } from "../rule-kit.ts"

const HEX = /^#[0-9a-fA-F]{3,8}$/
const UNIT = /^-?\d*\.?\d+(px|rem|em|vh|vw|pt)$/
const COLOR_FN = /\b(rgba?|hsla?|oklch|oklab|lab|lch|color-mix)\(/

function isRawDesignValue(value: string): boolean {
  return HEX.test(value) || UNIT.test(value) || COLOR_FN.test(value)
}

/** Walk up from a node; true if it sits inside a JSX attribute value. */
function isInsideJsxAttribute(node: any): boolean {
  return (
    findAncestor(
      node,
      (ancestor) => ancestor.type === "JSXAttribute",
      (ancestor) =>
        ancestor.type === "JSXElement" || ancestor.type === "JSXFragment"
    ) !== null
  )
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
