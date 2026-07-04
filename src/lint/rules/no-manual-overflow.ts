import type { Context } from "@oxlint/plugins"

import { defineRule } from "@oxlint/plugins"

import { findAncestor } from "../rule-kit.ts"

// CSS overflow property names that produce scrollable behavior when set to
// "auto" or "scroll".
const OVERFLOW_PROPS = new Set([
  "overflow",
  "overflowX",
  "overflowY",
  "overflowBlock",
  "overflowInline",
])

// Values that create scrollable overflow. "hidden"/"visible"/"clip" are layout
// concerns (clipping / no clipping) — they don't create user-facing scrollbars.
const SCROLLABLE_VALUES = new Set(["auto", "scroll"])

export const noManualOverflow = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow manual scrollable overflow (`overflow: 'auto'|'scroll'`). Use the `ScrollArea` component for user-facing scroll containers — on any component, not just Box.",
    },
    messages: {
      manualOverflow:
        "Use <ScrollArea> instead of manual scrollable overflow \"{{property}}: '{{value}}'\".",
    },
    schema: [],
  },
  createOnce(context: Context) {
    return {
      // Catches overflow properties in style objects:
      //
      //   1. stylex.create({ root: { overflow: "auto" } })
      //   2. <Foo sx={{ overflow: "auto" }}>   (inline sx prop, any component)
      //
      // Does NOT fire on plain object literals (e.g. `const config = {...}`)
      // or on variant definitions (defineVariants(stylex.create({...}))).
      Property(node: any) {
        const property = getPropertyName(node)
        if (property === null) return
        if (!OVERFLOW_PROPS.has(property)) return

        const value = getOverflowValue(node.value)
        if (value === null) return
        if (!SCROLLABLE_VALUES.has(value)) return

        // Only fire inside stylex.create() or a JSX attribute (inline sx).
        // A plain object literal elsewhere is not CSS — skip it.
        if (!isInsideStylexCreate(node) && !isInsideJsxAttribute(node)) return

        // Variant definitions (defineVariants(stylex.create({...}))) back Box's
        // shorthand `overflow` prop — not raw CSS application. Skip.
        if (isInsideVariantDefinition(node)) return

        // ScrollArea is the scroll primitive; it needs raw overflow internally.
        if (isInsideScrollAreaSource(context.filename ?? "")) return

        context.report({
          node: node.key,
          messageId: "manualOverflow",
          data: { property, value },
        })
      },

      // Catches shorthand props on ANY JSX element:
      //
      //   <Box overflow="auto">
      //   <DropdownMenu overflowY="scroll">
      //   <NewComponent overflowX="auto">
      //
      // Not Box-specific — fires on every component, present or future.
      JSXAttribute(node: any) {
        const name = node.name
        if (name?.type !== "JSXIdentifier") return
        if (!OVERFLOW_PROPS.has(name.name)) return

        const value = getJsxAttributeValue(node.value)
        if (value === null) return
        if (!SCROLLABLE_VALUES.has(value)) return

        if (isInsideScrollAreaSource(context.filename ?? "")) return

        context.report({
          node: name,
          messageId: "manualOverflow",
          data: { property: name.name, value },
        })
      },
    }
  },
})

// --- helpers ---

function getPropertyName(node: any): string | null {
  if (node.computed) return null
  const key = node.key
  if (key.type === "Identifier") return key.name
  if (key.type === "Literal" && typeof key.value === "string") return key.value
  return null
}

function getOverflowValue(node: any): string | null {
  if (node.type === "Literal" && typeof node.value === "string")
    return node.value

  // Pseudo-property objects: { default: "auto", ":hover": "scroll" }
  if (node.type === "ObjectExpression") {
    for (const prop of node.properties) {
      if (prop.key?.type === "Identifier" && prop.key.name === "default") {
        return getOverflowValue(prop.value)
      }
    }
  }

  return null
}

// String value of a JSX attribute: `overflow="auto"` → "auto".
function getJsxAttributeValue(node: any): string | null {
  if (node === null || node === undefined) return null
  if (node.type === "Literal" && typeof node.value === "string")
    return node.value
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

/** Walk up from a node; true if it sits inside a JSX attribute value (e.g. sx={{...}}). */
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

// True if the node sits inside `defineVariants(stylex.create({...}))`. The
// stylex.create call is an argument to defineVariants, so we check whether the
// stylex.create ancestor's parent is a defineVariants call.
function isInsideVariantDefinition(node: any): boolean {
  const createAncestor = findAncestor(
    node,
    (ancestor) =>
      ancestor.type === "CallExpression" && isStylexCreateCall(ancestor)
  )
  if (createAncestor === null) return false

  const parent = createAncestor.parent
  return (
    parent?.type === "CallExpression" &&
    parent.callee?.type === "Identifier" &&
    parent.callee?.name === "defineVariants"
  )
}

// The ScrollArea component implements scroll containers and needs raw overflow.
// Every other file must use <ScrollArea>.
function isInsideScrollAreaSource(filename: string): boolean {
  return filename.endsWith("src/components/scroll-area.tsx")
}
