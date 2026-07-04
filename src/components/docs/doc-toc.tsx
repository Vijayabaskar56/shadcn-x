import type { TOCItemType } from "fumadocs-core/toc"
import type { ReactNode } from "react"

import * as stylex from "@stylexjs/stylex"
import { isValidElement } from "react"

import type { TocEntry } from "@/lib/markdown"

import { Box } from "@/components/box"
import { Link } from "@/components/link"
import { Text } from "@/components/text"

import {
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../../styles/tokens.stylex"

const styles = stylex.create({
  label: {
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  link: {
    display: "block",
    color: {
      default: colors["muted-foreground"],
      ":hover": colors["text-primary"],
    },
    // Neutralize the Link `subtle` variant's hover underline: TOC links signal
    // state through color only, matching the previous raw-anchor styling.
    textDecorationLine: { default: "none", ":hover": "none" },
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  linkNested: {
    paddingInlineStart: spacing.m,
  },
})

/** Flatten a fumadocs TOC title (heading JSX incl. autolink anchors) to text. */
function nodeToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(nodeToText).join("")
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return nodeToText(node.props.children)
  }
  return ""
}

/**
 * Adapt fumadocs' `toc` export (`{ title: ReactNode, url, depth }`, h1–h6) to
 * the flat h2/h3 text entries the sidebar renders — the same shape the old
 * rehype-collect-toc pipeline produced.
 */
function toTocEntries(toc: Array<TOCItemType>): Array<TocEntry> {
  return toc
    .filter((item) => item.depth === 2 || item.depth === 3)
    .map((item) => ({
      value: nodeToText(item.title),
      id: item.url.replace(/^#/, ""),
      depth: item.depth,
    }))
}

export function DocToc({ toc }: { toc: Array<TOCItemType> }) {
  const entries = toTocEntries(toc)
  if (entries.length === 0) return null

  return (
    <Box
      as="nav"
      display="flex"
      flexDirection="column"
      gap="s"
      fontSize="s"
      aria-label="On this page"
    >
      <Text variant="small" sx={styles.label}>
        On this page
      </Text>
      <Box as="ul" display="flex" flexDirection="column" gap="xs">
        {entries.map((entry) => (
          <Box as="li" key={entry.id}>
            <Link
              href={`#${entry.id}`}
              variant="subtle"
              sx={[styles.link, entry.depth === 3 && styles.linkNested]}
            >
              {entry.value}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
