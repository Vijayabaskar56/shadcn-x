import type { MDXProps } from "mdx/types"
import type { ComponentType } from "react"

import * as stylex from "@stylexjs/stylex"

import { Box } from "@/components/box"
import { mdxComponents } from "@/components/docs/mdx-components"

import { colors } from "../../styles/tokens.stylex"

// Container styling for the docs prose region. Replaces Tailwind's `prose`
// classes. The per-element typography lives in `mdxComponents`; the global
// `[data-prose]` rules in `globals.css` still provide the heading-anchor reset,
// scroll-margin, and shiki/callout chrome.
const styles = stylex.create({
  prose: {
    maxWidth: "none",
    color: colors["text-primary"],
  },
})

/** Render a compiled MDX doc (fumadocs-mdx) with live React components. */
export function DocMdxContent({ Mdx }: { Mdx: ComponentType<MDXProps> }) {
  return (
    <Box as="div" data-prose="" sx={styles.prose}>
      <Mdx components={mdxComponents} />
    </Box>
  )
}
