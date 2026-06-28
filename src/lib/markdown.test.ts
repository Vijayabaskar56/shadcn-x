import { describe, expect, it } from "vitest"

import { compileDoc } from "@/lib/markdown"

describe("compileDoc", () => {
  it("renders headings with slug ids and collects a table of contents", async () => {
    const { html, toc } = await compileDoc(
      "# Title\n\n## First section\n\n### Nested\n\n## Second section"
    )
    expect(html).toContain('id="first-section"')
    expect(toc).toEqual([
      { value: "First section", id: "first-section", depth: 2 },
      { value: "Nested", id: "nested", depth: 3 },
      { value: "Second section", id: "second-section", depth: 2 },
    ])
  })

  it("highlights fenced code blocks with shiki dual themes", async () => {
    const { html } = await compileDoc("```ts\nconst x = 1\n```")
    expect(html).toContain("shiki")
    // dual-theme output exposes both light and dark colors as CSS vars
    expect(html).toContain("--shiki-dark")
  })

  it("renders GitHub callouts", async () => {
    const { html } = await compileDoc("> [!NOTE]\n> Heads up")
    expect(html).toContain("callout")
  })

  it("supports GFM tables", async () => {
    const { html } = await compileDoc("| a | b |\n| - | - |\n| 1 | 2 |")
    expect(html).toContain("<table>")
  })
})
