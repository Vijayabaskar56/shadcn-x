import type { Context } from "@oxlint/plugins"

import { defineRule } from "@oxlint/plugins"

import { matchesSource, perFileOption } from "../rule-kit.ts"

/**
 * Default import sources treated as "our" components. Configurable so the rule
 * works both in this repo (`@/components`) and in consumer repos that install
 * the published package.
 */
const DEFAULT_SOURCES = ["shadcn-x", "@/components"]

export const noClassNameStyle = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow raw className/style on shadcn-x components; customize via sx, variants, or createTheme.",
    },
    messages: {
      noClassName:
        "Don't pass className to <{{name}}>. Use the sx prop, a variant, or createTheme.",
      noStyle:
        "Don't pass style to <{{name}}>. Use the sx prop, a variant, or createTheme.",
    },
    schema: [
      {
        type: "object",
        properties: {
          sources: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
    ],
  },
  createOnce(context: Context) {
    // `createOnce` runs once; resolve per-file config and reset per-file state
    // in `before()` (the runtime calls it for each file).
    const option = perFileOption(context, { sources: DEFAULT_SOURCES })
    let ours = new Set<string>()

    return {
      before() {
        option.before()
        ours = new Set<string>()
      },
      ImportDeclaration(node: any) {
        if (typeof node.source.value !== "string") return
        if (!matchesSource(node.source.value, option.current.sources)) return
        for (const spec of node.specifiers) {
          if (
            spec.type === "ImportSpecifier" ||
            spec.type === "ImportDefaultSpecifier"
          ) {
            ours.add(spec.local.name)
          }
        }
      },
      JSXAttribute(node: any) {
        const attr = node.name
        if (attr.type !== "JSXIdentifier") return
        if (attr.name !== "className" && attr.name !== "style") return

        const opening = node.parent
        const elName = opening?.name
        if (!elName || elName.type !== "JSXIdentifier") return
        if (!ours.has(elName.name)) return

        context.report({
          node,
          messageId: attr.name === "className" ? "noClassName" : "noStyle",
          data: { name: elName.name },
        })
      },
    }
  },
})
