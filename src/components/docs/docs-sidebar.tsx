import * as stylex from "@stylexjs/stylex"
import { Link } from "@tanstack/react-router"

import { Box } from "@/components/box"
import { docsNav } from "@/docs/docs-config"

import {
  colors,
  spacing,
  borderRadius,
  fontWeight,
} from "../../styles/tokens.stylex"

const styles = stylex.create({
  label: {
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  link: {
    display: "block",
    borderRadius: borderRadius.l,
    paddingInline: spacing.s,
    paddingBlock: "6px",
    color: {
      default: colors["muted-foreground"],
      ":hover": colors["text-primary"],
    },
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
  },
  linkActive: {
    backgroundColor: colors["background-muted"],
    color: colors["text-primary"],
    fontWeight: fontWeight.medium,
  },
})

export function DocsSidebar() {
  return (
    <Box
      as="nav"
      display="flex"
      flexDirection="column"
      gap="xl"
      aria-label="Docs"
    >
      {docsNav.map((section) => (
        <Box
          as="div"
          key={section.label}
          display="flex"
          flexDirection="column"
          gap="xs"
        >
          <Box
            as="p"
            paddingX="s"
            fontSize="xs"
            fontWeight="semibold"
            color="text-secondary"
            sx={styles.label}
          >
            {section.label}
          </Box>
          {section.items.map((item) => (
            <Link key={item.slug} to="/docs/$" params={{ _splat: item.slug }}>
              {({ isActive }) => (
                <Box
                  as="span"
                  fontSize="s"
                  sx={isActive ? [styles.link, styles.linkActive] : styles.link}
                >
                  {item.label}
                </Box>
              )}
            </Link>
          ))}
        </Box>
      ))}
    </Box>
  )
}
