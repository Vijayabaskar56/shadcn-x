import type { Pluggable } from "unified"

import rehypeShiki from "@shikijs/rehype"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCallouts from "rehype-callouts"
import rehypeSlug from "rehype-slug"

export type TocEntry = {
  /** Heading text */
  value: string
  /** Slug id shared with the rendered heading, used as the anchor target */
  id: string
  /** Heading depth: 2 for h2, 3 for h3 */
  depth: number
}

/** Shiki options: dual github themes, colors resolved by CSS in globals.css. */
const shikiOptions = {
  themes: { light: "github-light", dark: "github-dark" },
  defaultColor: false,
} as const

/**
 * Rehype plugins fed into the fumadocs-mdx compiler (see `source.config.ts`).
 * They run after the preset's remark-heading (which assigns github-slugger
 * heading ids, making rehype-slug a no-op there) and before the preset's
 * rehype-toc (which exports the per-doc `toc`). remark-gfm comes from the
 * fumadocs preset itself.
 */
export const docRehypePlugins: Array<Pluggable> = [
  rehypeSlug,
  [rehypeCallouts, { theme: "github" }],
  [rehypeAutolinkHeadings, { behavior: "wrap" }],
  [rehypeShiki, shikiOptions],
]
