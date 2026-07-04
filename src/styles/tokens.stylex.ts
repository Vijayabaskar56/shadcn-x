import * as stylex from "@stylexjs/stylex"

// Spacing is a single-source, derived scale — matching Tailwind v4 / shadcn's
// `--spacing` model. `--spacing` is a custom-named CSS variable; every step is a
// multiple of it. Override `--spacing` once and the whole scale (and anything
// built from it, e.g. button dimensions) re-scales together.
//
// The knob (`--spacing`) and `none` are typed `<length>` so they are
// interpolatable. The derived steps reference `var(--spacing)` inside `calc()`,
// which CSS `@property` cannot use as an initial-value (it must be
// computationally independent), so they stay plain strings — the `:root` rule
// still resolves them correctly.
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
  // Wrapped in `stylex.types.color(...)` so StyleX emits `@property` rules with
  // a `<color>` syntax. Typed color variables are interpolatable, so CSS
  // `transition`s over these tokens actually animate (theme/accent/dark-mode
  // switches fade) instead of snapping — the browser cannot animate untyped
  // (string) custom properties.
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
  // shadcn's `--input`: the surface token for form controls (their border + the
  // dark-mode filled look). Equal to border-primary in this theme; kept as its
  // own semantic so controls can diverge from layout borders later.
  input: stylex.types.color("light-dark(oklch(0.922 0 0), oklch(0.269 0 0))"),
  // shadcn's form-control surface `bg-transparent dark:bg-input/30`: transparent
  // in light, the `input` color at 30% opacity in dark. Shared by Input,
  // Textarea, Select, NativeSelect, Combobox and Checkbox so the filled dark-mode
  // look is one decision instead of an inline `light-dark()` per control. Typed
  // (interpolatable) so controls that transition background-color animate it.
  "background-input": stylex.types.color(
    "light-dark(transparent, oklch(0.269 0 0 / 0.3))"
  ),
  accent: stylex.types.color(
    "light-dark(oklch(0.546 0.245 262.881), oklch(0.546 0.245 262.881))"
  ),
  // The foreground paired with the `accent` surface (accent background →
  // accent-foreground text). shadcn's `--accent-foreground`; near-white in both
  // modes to contrast this theme's blue accent. Used by Toggle (pressed / outline
  // hover) and any other accent-backed control.
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

// Radius is a single-source, derived scale — matching shadcn's `--radius` system.
// `--radius` is a custom-named CSS variable (so it's literally `--radius`, the
// same knob shadcn themes expose); the named steps are computed from it at
// compile time. Override `--radius` once (via createTheme or :root) and every
// radius in the app re-scales — no hardcoded values to chase.
//
// Same `@property` constraint as spacing: the knob and concrete values
// (`none`, `full`) are typed `<length>`; the `calc(var(--radius)…)` steps
// reference another custom property so they stay plain strings.
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

// The transition-speed scale — a single themable knob for animation duration,
// consumed wherever a control transitions. Override via createTheme to re-speed a
// subtree. (`transitionProperty` legitimately differs per component; only the
// duration is the shared decision.)
export const duration = stylex.defineVars({
  fast: stylex.types.time("150ms"),
})

// The shared focus ring (shadcn's focus-visible:ring-[3px] focus-visible:ring-ring/50),
// DERIVED from the `ring` token so re-theming `ring` re-skins every focus ring
// from one place. Consumed inside boxShadow conditionals by Button/Input/Textarea.
// `invalidRing` is the destructive variant (aria-invalid:ring-destructive/20).
export const focusRing = stylex.defineVars({
  ring: `0 0 0 3px color-mix(in oklch, ${colors.ring}, transparent 50%)`,
  invalidRing: `0 0 0 3px color-mix(in oklch, ${colors.destructive}, transparent 80%)`,
  // The 4px variant (shadcn's `ring-4`), used for larger touch targets such as
  // the Slider thumb. Same derived-from-`ring` color so re-theming `ring`
  // re-skins it too — only the ring thickness differs.
  largeRing: `0 0 0 4px color-mix(in oklch, ${colors.ring}, transparent 50%)`,
})

// Scrollable overflow values. The `no-manual-overflow` lint rule bans raw
// `'auto'`/`'scroll'` strings in stylex.create — using these tokens is the
// deliberate opt-in. They document intent at the call site (`overflow:
// scroll.auto`) and centralize the decision. The canonical consumer is a
// Base UI positioned popup (Menu.Popup, Select.Popup, Combobox.Popup …),
// which Base UI expects to set its own `overflowY: auto` alongside
// `maxHeight: var(--available-height)`. Standalone scroll containers should
// reach for `<ScrollArea>` instead.
export const scroll = stylex.defineConsts({
  auto: "auto",
  scroll: "scroll",
})
