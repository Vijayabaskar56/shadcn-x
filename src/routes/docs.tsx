import * as stylex from "@stylexjs/stylex"
import { Link, Outlet, createFileRoute } from "@tanstack/react-router"

import { Box } from "@/components/box"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

import { colors } from "../styles/tokens.stylex"

export const Route = createFileRoute("/docs")({ component: DocsLayout })

const styles = stylex.create({
  container: {
    marginInline: "auto",
    width: "100%",
    maxWidth: "80rem",
    minHeight: "100svh",
  },
  header: {
    height: "3.5rem",
  },
  separator: {
    marginInline: "0.5rem",
    color: colors["muted-foreground"],
  },
  spacer: {
    marginInlineStart: "auto",
  },
  aside: {
    display: "none",
    width: "14rem",
    flexShrink: 0,
    "@media (min-width: 768px)": {
      display: "block",
    },
  },
  sticky: {
    position: "sticky",
    top: "2rem",
  },
  main: {
    minWidth: 0,
  },
})

function DocsLayout() {
  return (
    <Box
      as="div"
      display="flex"
      flexDirection="column"
      paddingX="l"
      sx={styles.container}
    >
      <Box
        as="header"
        display="flex"
        alignItems="center"
        borderBottom
        borderColor="border-primary"
        sx={styles.header}
      >
        <Box as="span" fontSize="s" fontWeight="semibold">
          <Link to="/">shadcn-x</Link>
        </Box>
        <Box as="span" sx={styles.separator}>
          /
        </Box>
        <Box as="span" fontSize="s">
          <Link to="/docs/$" params={{ _splat: "introduction" }}>
            docs
          </Link>
        </Box>
        <Box as="div" sx={styles.spacer}>
          <ThemeToggle />
        </Box>
      </Box>
      <Box as="div" display="flex" flex="1" gap="2xl" paddingY="2xl">
        <Box as="aside" sx={styles.aside}>
          <Box as="div" sx={styles.sticky}>
            <DocsSidebar />
          </Box>
        </Box>
        <Box as="main" flex="1" sx={styles.main}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
