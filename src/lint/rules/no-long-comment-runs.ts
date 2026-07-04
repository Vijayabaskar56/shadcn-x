import type { Context } from "@oxlint/plugins"

import { defineRule } from "@oxlint/plugins"

import { perFileOption } from "../rule-kit.ts"

/** True if a `//` comment occupies its own line (no code before `//`). */
function isFullLineComment(comment: any, sourceLines: string[]): boolean {
  const line = sourceLines[comment.loc.start.line - 1]
  if (line === undefined) return false
  return line.slice(0, comment.loc.start.column).trim() === ""
}

export const noLongCommentRuns = defineRule({
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow consecutive `//` line-comment runs exceeding 2 lines; use block comments or keep it terse.",
    },
    messages: {
      tooManyLines:
        "Consecutive `//` line-comment run is {{length}} lines; max {{maxLines}}.",
    },
    schema: [
      {
        type: "object",
        properties: {
          maxLines: { type: "integer", minimum: 1, maximum: 10 },
        },
        additionalProperties: false,
      },
    ],
  },
  createOnce(context: Context) {
    const option = perFileOption(context, { maxLines: 2 })

    return {
      before() {
        option.before()
      },
      Program(node: any) {
        const comments =
          (context.sourceCode as any)?.getAllComments?.() ?? node.comments ?? []
        if (!comments.length) return

        const sourceLines = context.sourceCode.lines
        const lines = comments.filter(
          (c: any) => c.type === "Line" && isFullLineComment(c, sourceLines)
        )
        if (!lines.length) return

        const { maxLines } = option.current

        let runStart = 0
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].loc.start.line !== lines[i - 1].loc.start.line + 1) {
            reportIfLong(runStart, i - 1)
            runStart = i
          }
        }
        reportIfLong(runStart, lines.length - 1)

        function reportIfLong(from: number, to: number) {
          const length = to - from + 1
          if (length > maxLines) {
            context.report({
              node: lines[from],
              messageId: "tooManyLines",
              data: {
                length: String(length),
                maxLines: String(maxLines),
              },
            })
          }
        }
      },
    }
  },
})
