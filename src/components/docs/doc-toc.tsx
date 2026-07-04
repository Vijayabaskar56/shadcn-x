import type { TOCItemType } from "fumadocs-core/toc"
import type { ReactNode } from "react"

import * as stylex from "@stylexjs/stylex"
import { isValidElement, useEffect, useMemo, useState } from "react"

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
  linkActive: {
    // The heading currently scrolled into the viewport's top band. Full-strength
    // text plus medium weight distinguishes it from the muted inactive links.
    color: colors["text-primary"],
    fontWeight: fontWeight.medium,
  },
  linkNested: {
    paddingInlineStart: spacing.m,
  },
})

/**
 * Track which heading is currently scrolled into the viewport's top band and
 * return its id, so the TOC can highlight the reader's place on the page.
 *
 * The `rootMargin` shrinks the observer's viewport to a thin band just under
 * the sticky header: a heading counts as "active" from when its top crosses
 * below the header until the next heading takes its place. The first still-in-
 * band heading (in document order) wins; when the band is empty — between two
 * far-apart headings — the last active id is kept.
 */
function useActiveHeading(ids: Array<string>): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (ids.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const firstVisible = ids.find((id) => visible.has(id))
        if (firstVisible) setActiveId(firstVisible)
      },
      // Top edge below header; only top-third headings qualify as active.
      // IntersectionObserver rootMargin accepts px/%, not rem.
      { rootMargin: "-64px 0px -66% 0px", threshold: 0 }
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

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
  const entries = useMemo(() => toTocEntries(toc), [toc])
  const ids = useMemo(() => entries.map((entry) => entry.id), [entries])
  const activeId = useActiveHeading(ids)

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
              aria-current={entry.id === activeId ? "location" : undefined}
              sx={[
                styles.link,
                entry.depth === 3 && styles.linkNested,
                entry.id === activeId && styles.linkActive,
              ]}
            >
              {entry.value}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
