import type { MDXProps } from "mdx/types"
import type { ComponentType } from "react"

import * as stylex from "@stylexjs/stylex"

import { Box } from "@/components/box"
import { mdxComponents } from "@/components/docs/mdx-components"

import { colors } from "../../styles/tokens.stylex"

// Docs prose container styling (replaces Tailwind prose). Per-element
// typography in mdxComponents; [data-prose] rules in globals.css own chrome.
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
