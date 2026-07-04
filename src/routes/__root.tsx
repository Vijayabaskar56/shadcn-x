import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"

import { Box } from "@/components/box"
import { Text } from "@/components/text"
import { useColorTheme } from "@/hooks/use-color-theme"
import appCss from "@/styles/globals.css?url"

import { DevStyleXInject } from "../DevStyleXInject"
import { forestTheme, sunsetTheme } from "../styles/themes"
import { colors } from "../styles/tokens.stylex"

const styles = stylex.create({
  notFound: {
    marginInline: "auto",
    maxWidth: "80rem",
    paddingTop: "4rem",
  },
  heading: { color: colors["text-primary"] },
  paragraph: { color: colors["text-secondary"] },
})

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <Box as="main" padding="l" sx={styles.notFound}>
      <Text variant="h1" sx={styles.heading}>
        404
      </Text>
      <Text variant="p" sx={styles.paragraph}>
        The requested page could not be found.
      </Text>
    </Box>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <DevStyleXInject cssHref="/stylex.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('vite-ui-theme');var d=t==='dark'||((t==='system'||!t)&&matchMedia('(prefers-color-scheme:dark)').matches);var m=d?'dark':'light';document.documentElement.classList.add(m);document.documentElement.style.colorScheme=m}catch(e){}`,
          }}
        />
      </head>
      <body>
        <ColorThemeScope>{children}</ColorThemeScope>
        <Scripts />
      </body>
    </html>
  )
}

/** Applies the selected createTheme to the whole app subtree. */
function ColorThemeScope({ children }: { children: React.ReactNode }) {
  const { theme } = useColorTheme()
  const themeStyles =
    theme === "sunset" ? sunsetTheme : theme === "forest" ? forestTheme : null
  // `createTheme` returns a `Theme` object, which StyleX's `stylex.props`
  // (called inside Box) accepts, but `Theme` isn't part of the `StyleXStyles`
  // union `sx` is typed as. Cast at this one boundary: applying a color theme to
  // a subtree is exactly what a wrapping Box is for.
  return <Box sx={themeStyles as StyleXStyles | null}>{children}</Box>
}
