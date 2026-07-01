import * as stylex from "@stylexjs/stylex"

import type { TocEntry } from "@/lib/markdown"

import { Box } from "@/components/box"
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
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  linkNested: {
    paddingInlineStart: spacing.m,
  },
})

export function DocToc({ toc }: { toc: Array<TocEntry> }) {
  if (toc.length === 0) return null

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
        {toc.map((entry) => (
          <Box as="li" key={entry.id}>
            <a
              href={`#${entry.id}`}
              {...stylex.props(
                styles.link,
                entry.depth === 3 && styles.linkNested
              )}
            >
              {entry.value}
            </a>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
