import type { Context } from "@oxlint/plugins"

import { defineRule } from "@oxlint/plugins"

/**
 * Import sources banned as arbitrary-value escape hatches (ADR-0002). StyleX's
 * `@stylexjs/atoms` exposes an open inline-value surface — `x.padding._16px`,
 * `x.color(c)`, `x.width['calc(...)']` — that bypasses design tokens the same way
 * raw `className` does. StyleX in app code must go through tokens (`defineVars`)
 * + the closed prop surface (`variant`/`sx`/`createTheme`), not atoms.
 *
 * Catches static imports, side-effect imports, and re-exports. The banned source
 * list is configurable so consumers can extend it to other atom-like packages.
 */
const DEFAULT_SOURCES = ["@stylexjs/atoms"]

function matchesSource(value: string, sources: string[]): boolean {
  return sources.some((s) => value === s || value.startsWith(`${s}/`))
}

export const noStylexAtoms = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow @stylexjs/atoms (and similar arbitrary-value atom imports); use design tokens + the closed prop surface instead.",
    },
    messages: {
      noAtoms:
        'Don\'t import "{{source}}" — it is an arbitrary-value escape hatch (ADR-0002). Use design tokens (defineVars) + the closed prop surface (variant/sx/createTheme).',
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
    // `createOnce` runs once; resolve per-file config in `before()` (the runtime
    // calls it for each file; `context.options` is null at setup time).
    let sources = DEFAULT_SOURCES

    const reportIfBanned = (sourceNode: any) => {
      if (!sourceNode) return
      const value = sourceNode.value
      if (typeof value !== "string") return
      if (!matchesSource(value, sources)) return
      context.report({
        node: sourceNode,
        messageId: "noAtoms",
        data: { source: value },
      })
    }

    return {
      before() {
        const option = ((context.options ?? [])[0] ?? {}) as {
          sources?: string[]
        }
        sources = option.sources ?? DEFAULT_SOURCES
      },
      // Static named/default/side-effect import.
      ImportDeclaration(node: any) {
        reportIfBanned(node.source)
      },
      // Re-exports: `export { x } from "..."` / `export * from "..."`.
      ExportNamedDeclaration(node: any) {
        reportIfBanned(node.source)
      },
      ExportAllDeclaration(node: any) {
        reportIfBanned(node.source)
      },
    }
  },
})
