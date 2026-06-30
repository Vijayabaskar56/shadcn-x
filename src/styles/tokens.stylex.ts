import * as stylex from "@stylexjs/stylex"

// Spacing is a single-source, derived scale — matching Tailwind v4 / shadcn's
// `--spacing` model. `--spacing` is a custom-named CSS variable; every step is a
// multiple of it. Override `--spacing` once and the whole scale (and anything
// built from it, e.g. button dimensions) re-scales together.
export const spacing = stylex.defineVars({
  "--spacing": "0.25rem", // 4px — the single knob
  none: "0",
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
  "background-primary": "light-dark(oklch(1 0 0), oklch(0.145 0 0))",
  "background-card": "light-dark(oklch(0.97 0 0), oklch(0.205 0 0))",
  "background-muted": "light-dark(oklch(0.922 0 0), oklch(0.269 0 0))",
  "text-primary": "light-dark(oklch(0.145 0 0), oklch(0.985 0 0))",
  "text-secondary": "light-dark(oklch(0.556 0 0), oklch(0.708 0 0))",
  "text-disabled": "light-dark(oklch(0.708 0 0), oklch(0.556 0 0))",
  "border-primary": "light-dark(oklch(0.922 0 0), oklch(0.269 0 0))",
  // shadcn's `--input`: the surface token for form controls (their border + the
  // dark-mode filled look). Equal to border-primary in this theme; kept as its
  // own semantic so controls can diverge from layout borders later.
  input: "light-dark(oklch(0.922 0 0), oklch(0.269 0 0))",
  accent: "light-dark(oklch(0.546 0.245 262.881), oklch(0.546 0.245 262.881))",
  danger: "light-dark(oklch(0.577 0.245 27.325), oklch(0.577 0.245 27.325))",
  success: "light-dark(oklch(0.596 0.145 163.225), oklch(0.596 0.145 163.225))",
  // Role-based action/control tokens (used by Button and other controls).
  primary: "light-dark(oklch(0.205 0 0), oklch(0.922 0 0))",
  "primary-foreground": "light-dark(oklch(0.985 0 0), oklch(0.205 0 0))",
  secondary: "light-dark(oklch(0.97 0 0), oklch(0.269 0 0))",
  "secondary-foreground": "light-dark(oklch(0.205 0 0), oklch(0.985 0 0))",
  "muted-foreground": "light-dark(oklch(0.556 0 0), oklch(0.708 0 0))",
  ring: "light-dark(oklch(0.708 0 0), oklch(0.556 0 0))",
  destructive:
    "light-dark(oklch(0.577 0.245 27.325), oklch(0.704 0.191 22.216))",
  "destructive-foreground": "light-dark(oklch(0.985 0 0), oklch(0.985 0 0))",
})

// Radius is a single-source, derived scale — matching shadcn's `--radius` system.
// `--radius` is a custom-named CSS variable (so it's literally `--radius`, the
// same knob shadcn themes expose); the named steps are computed from it at
// compile time. Override `--radius` once (via createTheme or :root) and every
// radius in the app re-scales — no hardcoded values to chase.
export const borderRadius = stylex.defineVars({
  "--radius": "0.625rem", // 10px — the single knob (CSS custom property `--radius`)
  none: "0",
  s: "calc(var(--radius) - 4px)", //  6px  (shadcn rounded-sm)
  m: "calc(var(--radius) - 2px)", //  8px  (shadcn rounded-md)
  l: "var(--radius)", //             10px  (shadcn rounded-lg)
  xl: "calc(var(--radius) + 4px)", // 14px (shadcn rounded-xl)
  full: "9999px",
})

export const fontSize = stylex.defineVars({
  xs: "0.75rem",
  s: "0.875rem",
  m: "1rem",
  l: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
})

export const fontWeight = stylex.defineVars({
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
})

export const boxShadow = stylex.defineVars({
  none: "none",
  s: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  m: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  l: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  xl: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
})

// The transition-speed scale — a single themable knob for animation duration,
// consumed wherever a control transitions. Override via createTheme to re-speed a
// subtree. (`transitionProperty` legitimately differs per component; only the
// duration is the shared decision.)
export const duration = stylex.defineVars({
  fast: "150ms",
})

// The shared focus ring (shadcn's focus-visible:ring-[3px] focus-visible:ring-ring/50),
// DERIVED from the `ring` token so re-theming `ring` re-skins every focus ring
// from one place. Consumed inside boxShadow conditionals by Button/Input/Textarea.
// `invalidRing` is the destructive variant (aria-invalid:ring-destructive/20).
export const focusRing = stylex.defineVars({
  ring: `0 0 0 3px color-mix(in oklch, ${colors.ring}, transparent 50%)`,
  invalidRing: `0 0 0 3px color-mix(in oklch, ${colors.destructive}, transparent 80%)`,
})
