import * as stylex from "@stylexjs/stylex"
import { Link, Outlet, createFileRoute } from "@tanstack/react-router"

import { Box } from "@/components/box"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/sidebar"
import { ThemeSelect } from "@/components/theme-select"
import { ThemeToggle } from "@/components/theme-toggle"

import { colors } from "../styles/tokens.stylex"

export const Route = createFileRoute("/docs")({ component: DocsLayout })

const styles = stylex.create({
  container: {
    marginInline: "auto",
    width: "100%",
    maxWidth: "80rem",
    height: "100svh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    flexShrink: 0,
    height: "3.5rem",
  },
  separator: {
    marginInline: "0.5rem",
    color: colors["muted-foreground"],
  },
  spacer: {
    marginInlineStart: "auto",
  },
  body: {
    display: "flex",
    flex: "1",
    gap: "2xl",
    paddingY: "2xl",
    minHeight: 0,
  },
  sidebar: {
    // The docs sidebar should blend with the page — override the Sidebar's
    // default `background-card` to match the page background.
    backgroundColor: colors["background-primary"],
  },
  main: {
    minWidth: 0,
  },
})

function DocsLayout() {
  return (
    <SidebarProvider defaultOpen>
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
          <Box
            as="div"
            display="flex"
            alignItems="center"
            gap="m"
            sx={styles.spacer}
          >
            <ThemeSelect />
            <ThemeToggle />
          </Box>
        </Box>
        <Box as="div" sx={styles.body}>
          <Sidebar collapsible="none" variant="sidebar" sx={styles.sidebar}>
            <SidebarContent>
              <DocsSidebar />
            </SidebarContent>
          </Sidebar>
          <Box as="main" flex="1" sx={styles.main}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </SidebarProvider>
  )
}
