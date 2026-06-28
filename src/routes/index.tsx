import { Link, createFileRoute } from "@tanstack/react-router"

import { Box } from "@/components/box"
import { Button, buttonVariants } from "@/components/button"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const { theme, setTheme } = useTheme()

  const themes = ["light", "dark", "system"] as const
  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100svh"
      padding="xl"
      gap="xl"
    >
      <Box display="flex" justifyContent="between" alignItems="center">
        <Box as="h1" fontSize="xl" fontWeight="bold" color="text-primary">
          shadcn-x
        </Box>
        <Box display="flex" alignItems="center" gap="m">
          <Link
            to="/docs/$"
            params={{ _splat: "introduction" }}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Docs
          </Link>
          <Button onClick={() => setTheme(nextTheme)}>
            {theme === "dark" ? "☀️" : theme === "light" ? "🌙" : "🖥️"}{" "}
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </Button>
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

      <Box
        display="grid"
        gap="m"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
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
          <Box as="p" color="text-primary" fontSize="s">
            Use{" "}
            <Box as="code" color="accent">
              backgroundColor="background-card"
            </Box>{" "}
            for card surfaces.
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
            <Box as="a" color="accent" fontSize="s" href="#">
              Home
            </Box>
            <Box as="a" color="accent" fontSize="s" href="#">
              About
            </Box>
            <Box as="a" color="accent" fontSize="s" href="#">
              Contact
            </Box>
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
