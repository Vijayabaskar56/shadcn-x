---
title: Theming
description: Customize colors and radii with CSS variables, and toggle light and dark mode.
---

# Theming

shadcn-x is themed entirely through CSS custom properties defined in
`globals.css`. Each semantic color has a light value on `:root` and a dark value
on `.dark`.

## Tokens

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}
```

These map to Tailwind color utilities via `@theme inline`, so `bg-primary` and
`text-foreground` resolve to the variables above.

## Toggling dark mode

Use the `useTheme` hook to switch between `light`, `dark`, and `system`.

```tsx
import { useTheme } from "@/hooks/use-theme"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  )
}
```

> [!IMPORTANT]
> Set the initial class on `<html>` before hydration to avoid a flash of the
> wrong theme. The root document injects a tiny inline script that reads the
> stored preference.

## Custom radius

Change a single variable to rescale every component's corners:

```css
:root {
  --radius: 1rem; /* rounder everything */
}
```
