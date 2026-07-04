import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { describe, expect, it } from "vitest"

import { docRehypePlugins } from "@/lib/markdown"

// Mirrors how fumadocs-mdx applies the shared chain (see source.config.ts):
// the preset supplies remark-gfm, then our rehype plugins run in order.
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(docRehypePlugins)
  .use(rehypeStringify)

async function render(markdown: string): Promise<string> {
  return String(await processor.process(markdown))
}

describe("docRehypePlugins", () => {
  it("assigns slug ids and wraps headings in anchor links", async () => {
    const html = await render("## First section\n\n### Nested")
    expect(html).toContain('id="first-section"')
    expect(html).toContain('<a href="#first-section">First section</a>')
    expect(html).toContain('id="nested"')
  }, 20000)

  it("highlights fenced code blocks with shiki dual themes", async () => {
    const html = await render("```ts\nconst x = 1\n```")
    expect(html).toContain("shiki")
    // dual-theme output exposes both light and dark colors as CSS vars
    expect(html).toContain("--shiki-dark")
  })

  it("renders GitHub callouts", async () => {
    const html = await render("> [!NOTE]\n> Heads up")
    expect(html).toContain("callout")
  })

  it("supports GFM tables", async () => {
    const html = await render("| a | b |\n| - | - |\n| 1 | 2 |")
    expect(html).toContain("<table>")
  })
})
