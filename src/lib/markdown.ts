import type { Element, Root } from "hast"
import type { Plugin, Pluggable } from "unified"

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

/** Shiki options shared by the HTML and MDX pipelines. */
const shikiOptions = {
  themes: { light: "github-light", dark: "github-dark" },
  defaultColor: false,
} as const

/**
 * Remark plugins shared with the MDX compiler (`@content-collections/mdx`).
 * MDX understands JSX/HTML natively, so `rehype-raw` is intentionally omitted.
 */
export const docRemarkPlugins: Array<Pluggable> = [remarkGfm]

/**
 * Rehype plugins shared with the MDX compiler. Note: TOC for MDX is collected
 * separately via `extractToc` because the MDX compiler only returns a code
 * string and does not expose the unified `file.data`.
 */
export const docRehypePlugins: Array<Pluggable> = [
  rehypeSlug,
  [rehypeCallouts, { theme: "github" }],
  [rehypeAutolinkHeadings, { behavior: "wrap" }],
  [rehypeShiki, shikiOptions],
]

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeCallouts, { theme: "github" })
  .use(rehypeAutolinkHeadings, { behavior: "wrap" })
  .use(rehypeCollectToc)
  .use(rehypeShiki, shikiOptions)
  .use(rehypeStringify, { allowDangerousHtml: true })

/**
 * Lightweight pipeline that only assigns slug ids and collects the TOC. Used
 * for MDX docs (and reused by `compileDoc`) so headings get stable anchors
 * regardless of whether the doc is rendered as HTML or as compiled MDX.
 */
const tocProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeCollectToc)
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

/**
 * Extract the h2/h3 table of contents from markdown or MDX source. Headings use
 * the same slug ids that `rehype-slug` produces in the rendered output, so TOC
 * anchors line up for both `.md` (HTML) and `.mdx` (compiled component) docs.
 */
export async function extractToc(source: string): Promise<Array<TocEntry>> {
  const file = await tocProcessor.process(source)
  return (file.data.toc as Array<TocEntry> | undefined) ?? []
}
