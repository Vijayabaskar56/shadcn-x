import type { Element, Root } from "hast"
import type { Plugin } from "unified"

import rehypeShiki from "@shikijs/rehype"
import { toText } from "hast-util-to-text"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCallouts from "rehype-callouts"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { visit } from "unist-util-visit"

export type TocEntry = {
  /** Heading text */
  value: string
  /** Slug id produced by rehype-slug, used as the anchor target */
  id: string
  /** Heading depth: 2 for h2, 3 for h3 */
  depth: number
}

/**
 * Collect h2/h3 headings (after rehype-slug has assigned ids) into a flat
 * table-of-contents list. Writes the result to `file.data.toc`.
 */
const rehypeCollectToc: Plugin<[], Root> = () => (tree, file) => {
  const toc: Array<TocEntry> = []
  visit(tree, "element", (node: Element) => {
    if (node.tagName !== "h2" && node.tagName !== "h3") return
    const id = typeof node.properties?.id === "string" ? node.properties.id : ""
    if (!id) return
    toc.push({
      value: toText(node),
      id,
      depth: node.tagName === "h2" ? 2 : 3,
    })
  })
  file.data.toc = toc
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeCallouts, { theme: "github" })
  .use(rehypeAutolinkHeadings, { behavior: "wrap" })
  .use(rehypeCollectToc)
  .use(rehypeShiki, {
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })
  .use(rehypeStringify, { allowDangerousHtml: true })

export type CompiledMarkdown = {
  /** Rendered HTML string */
  html: string
  /** Table of contents extracted from h2/h3 headings */
  toc: Array<TocEntry>
}

/** Compile a markdown string to HTML plus a table of contents. */
export async function compileDoc(markdown: string): Promise<CompiledMarkdown> {
  const file = await processor.process(markdown)
  return {
    html: String(file),
    toc: (file.data.toc as Array<TocEntry> | undefined) ?? [],
  }
}
