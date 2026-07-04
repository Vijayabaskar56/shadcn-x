import * as stylex from "@stylexjs/stylex"
import { createFileRoute } from "@tanstack/react-router"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Link } from "@/components/link"
import { Text } from "@/components/text"
import { ThemeSelect } from "@/components/theme-select"
import { ThemeToggle } from "@/components/theme-toggle"

import { colors, fontSize, fontWeight } from "../styles/tokens.stylex"

export const Route = createFileRoute("/")({ component: App })

const styles = stylex.create({
  exampleGrid: {
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  },
  heading: { color: colors["text-primary"] },
  textPrimary: { color: colors["text-primary"] },
  demoLink: {
    color: colors.accent,
    fontSize: fontSize.s,
    textDecorationLine: { default: "underline", ":hover": "none" },
    fontWeight: fontWeight.medium,
  },
})

function App() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100svh"
      padding="xl"
      gap="xl"
    >
      <Box display="flex" justifyContent="between" alignItems="center">
        <Text variant="h1" sx={styles.heading}>
          shadcn-x
        </Text>
        <Box display="flex" alignItems="center" gap="m">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link to="/docs/$" params={{ _splat: "introduction" }} />}
          >
            Docs
          </Button>
          <ThemeSelect />
          <ThemeToggle />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap="l"
        padding="l"
        backgroundColor="background-card"
        borderRadius="m"
        border
        borderColor="border-primary"
      >
        <Box fontSize="l" fontWeight="semibold" color="text-primary">
          Box Component
        </Box>
        <Box color="text-secondary" fontSize="s">
          A polymorphic layout primitive from the Orbit design system. Uses
          StyleX tokens for type-safe, intent-based styling with automatic dark
          mode via{" "}
          <Box as="code" color="accent">
            light-dark()
          </Box>
          .
        </Box>
      </Box>

      <Box fontSize="m" fontWeight="semibold" color="text-primary">
        Examples
      </Box>

      <Box display="grid" gap="m" sx={styles.exampleGrid}>
        <Box
          display="flex"
          flexDirection="column"
          gap="m"
          padding="m"
          backgroundColor="background-card"
          borderRadius="m"
          border
          borderColor="border-primary"
        >
          <Box fontSize="s" fontWeight="semibold" color="text-primary">
            Card
          </Box>
          <Box color="text-secondary" fontSize="s">
            A basic card surface with border, rounded corners, and card
            background.
          </Box>
          <Text variant="small" sx={styles.textPrimary}>
            Use{" "}
            <Box as="code" color="accent">
              backgroundColor="background-card"
            </Box>{" "}
            for card surfaces.
          </Text>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap="m"
          padding="m"
          backgroundColor="background-card"
          borderRadius="m"
          border
          borderColor="border-primary"
        >
          <Box fontSize="s" fontWeight="semibold" color="text-primary">
            Flex Layout
          </Box>
          <Box display="flex" gap="s">
            <Box
              padding="xs"
              backgroundColor="accent"
              borderRadius="s"
              color="text-primary"
              fontSize="s"
            >
              Item 1
            </Box>
            <Box
              padding="xs"
              backgroundColor="accent"
              borderRadius="s"
              color="text-primary"
              fontSize="s"
            >
              Item 2
            </Box>
            <Box
              padding="xs"
              backgroundColor="accent"
              borderRadius="s"
              color="text-primary"
              fontSize="s"
            >
              Item 3
            </Box>
          </Box>
          <Box color="text-secondary" fontSize="s">
            Use{" "}
            <Box as="code" color="accent">
              display="flex" gap="s"
            </Box>{" "}
            for inline flex layouts.
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap="m"
          padding="m"
          backgroundColor="background-card"
          borderRadius="m"
          border
          borderColor="border-primary"
        >
          <Box fontSize="s" fontWeight="semibold" color="text-primary">
            Semantic HTML
          </Box>
          <Box
            as="nav"
            display="flex"
            gap="s"
            padding="s"
            backgroundColor="background-muted"
            borderRadius="s"
          >
            <Link href="#" sx={styles.demoLink}>
              Home
            </Link>
            <Link href="#" sx={styles.demoLink}>
              About
            </Link>
            <Link href="#" sx={styles.demoLink}>
              Contact
            </Link>
          </Box>
          <Box color="text-secondary" fontSize="s">
            Use{" "}
            <Box as="code" color="accent">
              as="nav"
            </Box>{" "}
            for semantic elements with all Box styling.
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap="m"
          padding="m"
          backgroundColor="background-card"
          borderRadius="m"
          border
          borderColor="border-primary"
        >
          <Box fontSize="s" fontWeight="semibold" color="text-primary">
            Themed Tokens
          </Box>
          <Box display="flex" gap="s">
            <Box
              padding="s"
              backgroundColor="success"
              borderRadius="s"
              color="text-primary"
              fontSize="s"
            >
              Success
            </Box>
            <Box
              padding="s"
              backgroundColor="danger"
              borderRadius="s"
              color="text-primary"
              fontSize="s"
            >
              Danger
            </Box>
            <Box
              padding="s"
              backgroundColor="accent"
              borderRadius="s"
              color="text-primary"
              fontSize="s"
            >
              Accent
            </Box>
          </Box>
          <Box color="text-secondary" fontSize="s">
            Tokens use{" "}
            <Box as="code" color="accent">
              light-dark()
            </Box>{" "}
            — no dark: variants needed.
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
