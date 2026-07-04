import * as stylex from "@stylexjs/stylex"

// Single-source derived scale: `--spacing` knob → every step re-scales. Knob typed `<length>` (interpolatable); calc steps plain strings.
export const spacing = stylex.defineVars({
  "--spacing": stylex.types.length("0.25rem"), // 4px — the single knob
  none: stylex.types.length("0"),
  xs: "calc(var(--spacing) * 1)", //   4px
  s: "calc(var(--spacing) * 2)", //    8px
  m: "calc(var(--spacing) * 3)", //   12px
  l: "calc(var(--spacing) * 4)", //   16px
  xl: "calc(var(--spacing) * 6)", //  24px
  "2xl": "calc(var(--spacing) * 8)", //  32px
  "3xl": "calc(var(--spacing) * 12)", // 48px
  "4xl": "calc(var(--spacing) * 16)", // 64px
  "5xl": "calc(var(--spacing) * 24)", // 96px
})

export const colors = stylex.defineVars({
  // `stylex.types.color()` → typed + interpolatable: color transitions animate instead of snapping.
  "background-primary": stylex.types.color(
    "light-dark(oklch(1 0 0), oklch(0.145 0 0))"
  ),
  "background-card": stylex.types.color(
    "light-dark(oklch(0.97 0 0), oklch(0.205 0 0))"
  ),
  "background-muted": stylex.types.color(
    "light-dark(oklch(0.922 0 0), oklch(0.269 0 0))"
  ),
  "text-primary": stylex.types.color(
    "light-dark(oklch(0.145 0 0), oklch(0.985 0 0))"
  ),
  "text-secondary": stylex.types.color(
    "light-dark(oklch(0.556 0 0), oklch(0.708 0 0))"
  ),
  "text-disabled": stylex.types.color(
    "light-dark(oklch(0.708 0 0), oklch(0.556 0 0))"
  ),
  "border-primary": stylex.types.color(
    "light-dark(oklch(0.922 0 0), oklch(0.269 0 0))"
  ),
  // shadcn's `--input`: form-control surface token; own semantic so controls can diverge from layout borders later.
  input: stylex.types.color("light-dark(oklch(0.922 0 0), oklch(0.269 0 0))"),
  // shadcn's `bg-transparent dark:bg-input/30` → `light-dark(transparent, oklch(.../0.3))` for all form controls.
  "background-input": stylex.types.color(
    "light-dark(transparent, oklch(0.269 0 0 / 0.3))"
  ),
  accent: stylex.types.color(
    "light-dark(oklch(0.546 0.245 262.881), oklch(0.546 0.245 262.881))"
  ),
  // Accent-surface foreground: near-white in both modes against blue accent; used by Toggle + accent-backed controls.
  "accent-foreground": stylex.types.color(
    "light-dark(oklch(0.985 0 0), oklch(0.985 0 0))"
  ),
  danger: stylex.types.color(
    "light-dark(oklch(0.577 0.245 27.325), oklch(0.577 0.245 27.325))"
  ),
  success: stylex.types.color(
    "light-dark(oklch(0.596 0.145 163.225), oklch(0.596 0.145 163.225))"
  ),
  // Role-based action/control tokens (used by Button and other controls).
  primary: stylex.types.color("light-dark(oklch(0.205 0 0), oklch(0.922 0 0))"),
  "primary-foreground": stylex.types.color(
    "light-dark(oklch(0.985 0 0), oklch(0.205 0 0))"
  ),
  secondary: stylex.types.color(
    "light-dark(oklch(0.97 0 0), oklch(0.269 0 0))"
  ),
  "secondary-foreground": stylex.types.color(
    "light-dark(oklch(0.205 0 0), oklch(0.985 0 0))"
  ),
  "muted-foreground": stylex.types.color(
    "light-dark(oklch(0.556 0 0), oklch(0.708 0 0))"
  ),
  ring: stylex.types.color("light-dark(oklch(0.708 0 0), oklch(0.556 0 0))"),
  destructive: stylex.types.color(
    "light-dark(oklch(0.577 0.245 27.325), oklch(0.704 0.191 22.216))"
  ),
  "destructive-foreground": stylex.types.color(
    "light-dark(oklch(0.985 0 0), oklch(0.985 0 0))"
  ),
})

// Single-source derived scale: `--radius` knob → every radius re-scales. Same @property constraint as spacing.
export const borderRadius = stylex.defineVars({
  "--radius": stylex.types.length("0.625rem"), // 10px — the single knob
  none: stylex.types.length("0"),
  s: "calc(var(--radius) - 4px)", //  6px
  m: "calc(var(--radius) - 2px)", //  8px
  l: "var(--radius)", //              10px
  xl: "calc(var(--radius) + 4px)", // 14px
  full: stylex.types.length("9999px"),
})

export const fontSize = stylex.defineVars({
  xs: stylex.types.length("0.75rem"),
  s: stylex.types.length("0.875rem"),
  m: stylex.types.length("1rem"),
  l: stylex.types.length("1.125rem"),
  xl: stylex.types.length("1.25rem"),
  "2xl": stylex.types.length("1.5rem"),
  "3xl": stylex.types.length("1.875rem"),
  "4xl": stylex.types.length("2.25rem"),
})

export const fontWeight = stylex.defineVars({
  regular: stylex.types.integer(400),
  medium: stylex.types.integer(500),
  semibold: stylex.types.integer(600),
  bold: stylex.types.integer(700),
  extrabold: stylex.types.integer(800),
})

export const boxShadow = stylex.defineVars({
  none: "none",
  s: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  m: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  l: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  xl: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
})

// Transition-speed knob: one themable duration per component subtree.
export const duration = stylex.defineVars({
  fast: stylex.types.time("150ms"),
})

// Focus ring derived from `ring` token + destructive variant. Re-theme once, re-skins everywhere.
export const focusRing = stylex.defineVars({
  ring: `0 0 0 3px color-mix(in oklch, ${colors.ring}, transparent 50%)`,
  invalidRing: `0 0 0 3px color-mix(in oklch, ${colors.destructive}, transparent 80%)`,
  // 4px ring for larger touch targets (Slider thumb). Same derived-from-`ring` color; thickness differs.
  largeRing: `0 0 0 4px color-mix(in oklch, ${colors.ring}, transparent 50%)`,
})

// Opt-in scroll-overflow tokens for Base UI popups. Use <ScrollArea> for standalone containers.
export const scroll = stylex.defineConsts({
  auto: "auto",
  scroll: "scroll",
})
