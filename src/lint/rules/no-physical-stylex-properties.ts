import type { Context } from "@oxlint/plugins"

import { defineRule } from "@oxlint/plugins"

import { findAncestor } from "../rule-kit.ts"

const PHYSICAL_PROPERTY_REPLACEMENTS: Record<string, string> = {
  left: "insetInlineStart",
  right: "insetInlineEnd",
  marginLeft: "marginInlineStart",
  marginRight: "marginInlineEnd",
  paddingLeft: "paddingInlineStart",
  paddingRight: "paddingInlineEnd",
  borderLeft: "borderInlineStart",
  borderRight: "borderInlineEnd",
  borderLeftWidth: "borderInlineStartWidth",
  borderLeftStyle: "borderInlineStartStyle",
  borderLeftColor: "borderInlineStartColor",
  borderRightWidth: "borderInlineEndWidth",
  borderRightStyle: "borderInlineEndStyle",
  borderRightColor: "borderInlineEndColor",
  borderTopLeftRadius: "borderStartStartRadius",
  borderTopRightRadius: "borderStartEndRadius",
  borderBottomLeftRadius: "borderEndStartRadius",
  borderBottomRightRadius: "borderEndEndRadius",
}

function getPropertyName(node: any): string | null {
  if (node.computed) return null
  const key = node.key
  if (key.type === "Identifier") return key.name
  if (key.type === "Literal" && typeof key.value === "string") return key.value
  return null
}

function isStylexCreateCall(node: any): boolean {
  const callee = node.callee
  if (callee?.type !== "MemberExpression") return false
  const property = callee.property
  if (property?.type !== "Identifier" || property.name !== "create")
    return false
  return true
}

function isInsideStylexCreate(node: any): boolean {
  return (
    findAncestor(
      node,
      (ancestor) =>
        ancestor.type === "CallExpression" && isStylexCreateCall(ancestor)
    ) !== null
  )
}

export const noPhysicalStylexProperties = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow physical left/right StyleX properties; use logical inline properties for RTL-safe styles.",
    },
    messages: {
      physicalProperty:
        'Use "{{replacement}}" instead of physical StyleX property "{{property}}".',
      physicalTextAlign:
        'Use textAlign "{{replacement}}" instead of physical value "{{value}}".',
    },
    schema: [],
  },
  createOnce(context: Context) {
    return {
      Property(node: any) {
        if (!isInsideStylexCreate(node)) return

        const property = getPropertyName(node)
        if (property === null) return

        const replacement = PHYSICAL_PROPERTY_REPLACEMENTS[property]
        if (replacement !== undefined) {
          context.report({
            node: node.key,
            messageId: "physicalProperty",
            data: { property, replacement },
          })
          return
        }

        if (property !== "textAlign") return
        const value = node.value
        if (value.type !== "Literal") return
        if (value.value !== "left" && value.value !== "right") return

        context.report({
          node: value,
          messageId: "physicalTextAlign",
          data: {
            value: value.value,
            replacement: value.value === "left" ? "start" : "end",
          },
        })
      },
    }
  },
})
