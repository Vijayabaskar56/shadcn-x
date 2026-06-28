import type { StyleXStyles } from "@stylexjs/stylex"
import type { ReactElement } from "react"

import * as stylex from "@stylexjs/stylex"
import { cloneElement } from "react"

type IconSize = "s" | "m" | "l"
type IconPosition = "inline-start" | "inline-end"

const styles = stylex.create({
  base: {
    flexShrink: 0,
    // Default 1rem (shadcn's [&_svg]:size-4); auto-shrink inside an xs button via
    // stylex.when.ancestor — the button carries a marker + data-size (see button.tsx).
    width: {
      default: "1rem",
      [stylex.when.ancestor('[data-size="xs"]')]: "0.75rem",
    },
    height: {
      default: "1rem",
      [stylex.when.ancestor('[data-size="xs"]')]: "0.75rem",
    },
  },
  s: { width: "0.75rem", height: "0.75rem" },
  m: { width: "1rem", height: "1rem" },
  l: { width: "1.25rem", height: "1.25rem" },
})

type IconProps = {
  /** A single icon element (e.g. an SVG or a lucide icon element). */
  children: ReactElement
  /** Explicit size; omit to use the default (1rem, auto-shrinking in xs buttons). */
  size?: IconSize
  /** Marks the icon for button spacing (data-icon) so the button can adjust padding. */
  position?: IconPosition
  /** Accessible label. Omit for a decorative icon (rendered aria-hidden). */
  label?: string
  sx?: StyleXStyles
}

/**
 * Sizes and marks an icon on-system. It applies sizing to the passed element
 * itself (no descendant selector) and a `data-icon` marker that the Button reads
 * via stylex.when.descendant to tighten its padding.
 */
export function Icon({ children, size, position, label, sx }: IconProps) {
  return cloneElement(children, {
    ...stylex.props(
      size ? styles[size] : styles.base,
      stylex.defaultMarker(),
      sx
    ),
    "data-slot": "icon",
    "data-icon": position,
    "aria-hidden": label ? undefined : true,
    "aria-label": label,
    role: label ? "img" : undefined,
  } as Record<string, unknown>)
}
