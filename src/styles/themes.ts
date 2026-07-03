import * as stylex from "@stylexjs/stylex"

import { colors } from "./tokens.stylex"

export type ColorThemeName = "default" | "sunset" | "forest"

/**
 * Warm orange/amber palette. Overrides only the accent-family tokens — every
 * other color (surfaces, text, borders) inherits from {@link colors} so
 * `light-dark()` dark mode still works.
 */
export const sunsetTheme = stylex.createTheme(colors, {
  accent: stylex.types.color(
    "light-dark(oklch(0.646 0.222 41.116), oklch(0.696 0.17 22.216))",
  ),
  primary: stylex.types.color(
    "light-dark(oklch(0.55 0.22 35), oklch(0.65 0.2 45))",
  ),
  "primary-foreground": stylex.types.color(
    "light-dark(oklch(0.985 0 0), oklch(0.2 0 0))",
  ),
  ring: stylex.types.color(
    "light-dark(oklch(0.646 0.222 41.116), oklch(0.696 0.17 22.216))",
  ),
  danger: stylex.types.color(
    "light-dark(oklch(0.637 0.237 25.451), oklch(0.696 0.17 22.216))",
  ),
})

/**
 * Green palette.
 */
export const forestTheme = stylex.createTheme(colors, {
  accent: stylex.types.color(
    "light-dark(oklch(0.6 0.15 155), oklch(0.65 0.15 155))",
  ),
  primary: stylex.types.color(
    "light-dark(oklch(0.45 0.12 155), oklch(0.6 0.13 155))",
  ),
  "primary-foreground": stylex.types.color(
    "light-dark(oklch(0.985 0 0), oklch(0.2 0 0))",
  ),
  ring: stylex.types.color(
    "light-dark(oklch(0.6 0.15 155), oklch(0.65 0.15 155))",
  ),
  danger: stylex.types.color(
    "light-dark(oklch(0.577 0.245 27.325), oklch(0.704 0.191 22.216))",
  ),
})
