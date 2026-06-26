import * as stylex from "@stylexjs/stylex"

export const spacing = stylex.defineVars({
  none: "0",
  xs: "4px",
  s: "8px",
  m: "12px",
  l: "16px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "48px",
  "4xl": "64px",
  "5xl": "96px",
})

export const colors = stylex.defineVars({
  "background-primary": "light-dark(oklch(1 0 0), oklch(0.145 0 0))",
  "background-card": "light-dark(oklch(0.97 0 0), oklch(0.205 0 0))",
  "background-muted": "light-dark(oklch(0.922 0 0), oklch(0.269 0 0))",
  "text-primary": "light-dark(oklch(0.145 0 0), oklch(0.985 0 0))",
  "text-secondary": "light-dark(oklch(0.556 0 0), oklch(0.708 0 0))",
  "text-disabled": "light-dark(oklch(0.708 0 0), oklch(0.556 0 0))",
  "border-primary": "light-dark(oklch(0.922 0 0), oklch(0.269 0 0))",
  accent: "light-dark(oklch(0.546 0.245 262.881), oklch(0.546 0.245 262.881))",
  danger: "light-dark(oklch(0.577 0.245 27.325), oklch(0.577 0.245 27.325))",
  success: "light-dark(oklch(0.596 0.145 163.225), oklch(0.596 0.145 163.225))",
})

export const borderRadius = stylex.defineVars({
  none: "0",
  s: "4px",
  m: "8px",
  l: "12px",
  xl: "16px",
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
})

export const fontWeight = stylex.defineVars({
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
})

export const boxShadow = stylex.defineVars({
  none: "none",
  s: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  m: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  l: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  xl: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
})
