import type { StyleXStyles } from "@stylexjs/stylex"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  focusRing,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

type Variant = "default" | "outline"
type Size = "default" | "sm" | "lg"

export const toggleStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: `calc(${u} * 2)`,
    whiteSpace: "nowrap",
    borderRadius: borderRadius.m,
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration.fast,
    outline: "none",
    userSelect: "none",
    cursor: "pointer",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
    pointerEvents: {
      default: null,
      ":disabled": "none",
    },
  },
  defaultVariant: {
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
    color: {
      default: colors["text-primary"],
      ":hover": colors["muted-foreground"],
    },
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
  },
  outline: {
    backgroundColor: {
      default: "transparent",
      ":hover": colors.accent,
    },
    borderColor: colors.input,
    color: {
      default: colors["text-primary"],
      ":hover": colors["primary-foreground"],
    },
    boxShadow: {
      default: boxShadow.s,
      ":focus-visible": focusRing.ring,
    },
  },
  pressed: {
    backgroundColor: colors.accent,
    color: colors["primary-foreground"],
  },
  sizeDefault: {
    height: `calc(${u} * 9)`,
    minWidth: `calc(${u} * 9)`,
    paddingInline: `calc(${u} * 2)`,
  },
  sizeSm: {
    height: `calc(${u} * 8)`,
    minWidth: `calc(${u} * 8)`,
    paddingInline: `calc(${u} * 1.5)`,
  },
  sizeLg: {
    height: `calc(${u} * 10)`,
    minWidth: `calc(${u} * 10)`,
    paddingInline: `calc(${u} * 2.5)`,
  },
})

const variantStyles = {
  default: toggleStyles.defaultVariant,
  outline: toggleStyles.outline,
} satisfies Record<Variant, StyleXStyles>

const sizeStyles = {
  default: toggleStyles.sizeDefault,
  sm: toggleStyles.sizeSm,
  lg: toggleStyles.sizeLg,
} satisfies Record<Size, StyleXStyles>

type ToggleProps = Omit<
  TogglePrimitive.Props,
  "className" | "style" | "color"
> & {
  variant?: Variant
  size?: Size
  sx?: StyleXStyles
}

function Toggle({
  variant = "default",
  size = "default",
  sx,
  ...props
}: ToggleProps) {
  const isPressed = props.pressed === true

  return (
    <TogglePrimitive
      data-slot="toggle"
      data-size={size}
      data-variant={variant}
      {...stylex.props(
        toggleStyles.base,
        variantStyles[variant],
        sizeStyles[size],
        isPressed && toggleStyles.pressed,
        sx
      )}
      {...props}
    />
  )
}

export { Toggle }
export type { ToggleProps, Variant as ToggleVariant, Size as ToggleSize }
