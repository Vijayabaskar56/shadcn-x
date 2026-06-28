import { Button } from "@/components/button"
import { useTheme } from "@/hooks/use-theme"

const themes = ["light", "dark", "system"] as const

const icon = { light: "🌙", dark: "☀️", system: "🖥️" } as const

/** Cycles light → dark → system, showing the current selection. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]

  return (
    <Button variant="ghost" size="sm" onClick={() => setTheme(nextTheme)}>
      {icon[theme]} {theme.charAt(0).toUpperCase() + theme.slice(1)}
    </Button>
  )
}
