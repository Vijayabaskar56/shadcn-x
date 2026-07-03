import type { StyleXStyles } from "@stylexjs/stylex"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { useColorTheme } from "@/hooks/use-color-theme"
import type { ColorThemeName } from "../styles/themes"

const themes: ColorThemeName[] = ["default", "sunset", "forest"]

/** Switches the color-theme variant (default / sunset / forest) for testing. */
export function ThemeSelect({ sx }: { sx?: StyleXStyles }) {
  const { theme, setColorTheme } = useColorTheme()

  return (
    <Box display="flex" alignItems="center" gap="xs" sx={sx}>
      {themes.map((name) => (
        <Button
          key={name}
          variant={name === theme ? "default" : "outline"}
          size="sm"
          onClick={() => setColorTheme(name)}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Button>
      ))}
    </Box>
  )
}
