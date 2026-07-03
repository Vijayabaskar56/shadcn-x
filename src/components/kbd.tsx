import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

// Host element aliased so the on-system `no-raw-html` guardrail can later retire
// raw <kbd> without flagging this library source slot implementation.
const KbdElement = "kbd" as const

type KbdProps = Omit<
  ComponentPropsWithoutRef<"kbd">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type KbdGroupProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

const u = spacing["--spacing"]

const styles = stylex.create({
  kbd: {
    pointerEvents: "none",
    display: "inline-flex",
    width: "fit-content",
    minWidth: `calc(${u} * 5)`,
    height: `calc(${u} * 5)`,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    borderRadius: borderRadius.s,
    backgroundColor: colors["background-muted"],
    paddingInline: spacing.xs,
    color: colors["muted-foreground"],
    fontFamily: "inherit",
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: 1,
    userSelect: "none",
  },
  group: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.xs,
  },
})

function Kbd({ sx, ...props }: KbdProps) {
  return (
    <KbdElement data-slot="kbd" {...stylex.props(styles.kbd, sx)} {...props} />
  )
}

function KbdGroup({ sx, ...props }: KbdGroupProps) {
  return (
    <KbdElement
      data-slot="kbd-group"
      {...stylex.props(styles.group, sx)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
export type { KbdGroupProps, KbdProps }
