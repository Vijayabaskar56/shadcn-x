import type { StyleXStyles } from "@stylexjs/stylex"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import * as stylex from "@stylexjs/stylex"

import { colors, fontSize, fontWeight, spacing } from "../styles/tokens.stylex"

type Variant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link"

type Size =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"

const styles = stylex.create({
  base: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: "150ms",
    outline: "none",
    userSelect: "none",
    cursor: "pointer",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 3px ${colors.ring}`,
    },
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
    pointerEvents: {
      default: null,
      ":disabled": "none",
    },
  },

  // variants
  default: {
    backgroundColor: {
      default: colors.primary,
      ":hover": `color-mix(in oklch, ${colors.primary}, transparent 20%)`,
    },
    color: colors["primary-foreground"],
  },
  secondary: {
    backgroundColor: {
      default: colors.secondary,
      ":hover": `color-mix(in oklch, ${colors.secondary}, ${colors["text-primary"]} 5%)`,
    },
    color: colors["secondary-foreground"],
  },
  outline: {
    backgroundColor: {
      default: colors["background-primary"],
      ":hover": colors["background-muted"],
    },
    borderColor: colors["border-primary"],
    color: colors["text-primary"],
  },
  ghost: {
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
    color: colors["text-primary"],
  },
  destructive: {
    backgroundColor: {
      default: colors.destructive,
      ":hover": `color-mix(in oklch, ${colors.destructive}, transparent 15%)`,
    },
    color: colors["destructive-foreground"],
  },
  link: {
    backgroundColor: "transparent",
    color: colors.primary,
    textUnderlineOffset: "4px",
    textDecorationLine: {
      default: "none",
      ":hover": "underline",
    },
  },

  // sizes
  sizeDefault: {
    height: "2rem",
    gap: spacing.xs,
    paddingInline: spacing.m,
    fontSize: fontSize.s,
    borderRadius: "1rem",
  },
  sizeXs: {
    height: "1.5rem",
    gap: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSize.xs,
    borderRadius: "1rem",
  },
  sizeSm: {
    height: "1.75rem",
    gap: spacing.xs,
    paddingInline: spacing.m,
    fontSize: fontSize.s,
    borderRadius: "1rem",
  },
  sizeLg: {
    height: "2.25rem",
    gap: spacing.xs,
    paddingInline: spacing.l,
    fontSize: fontSize.s,
    borderRadius: "1rem",
  },
  sizeIcon: {
    width: "2rem",
    height: "2rem",
    borderRadius: "1rem",
  },
  sizeIconXs: {
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "1rem",
  },
  sizeIconSm: {
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "1rem",
  },
  sizeIconLg: {
    width: "2.25rem",
    height: "2.25rem",
    borderRadius: "1rem",
  },
})

const variantStyles = {
  default: styles.default,
  secondary: styles.secondary,
  outline: styles.outline,
  ghost: styles.ghost,
  destructive: styles.destructive,
  link: styles.link,
} satisfies Record<Variant, unknown>

const sizeStyles = {
  default: styles.sizeDefault,
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
  "icon-xs": styles.sizeIconXs,
  "icon-sm": styles.sizeIconSm,
  "icon-lg": styles.sizeIconLg,
} satisfies Record<Size, unknown>

type ButtonProps = Omit<ButtonPrimitive.Props, "className"> & {
  variant?: Variant
  size?: Size
  sx?: StyleXStyles
}

function Button({
  variant = "default",
  size = "default",
  sx,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      {...stylex.props(
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        sx
      )}
      {...props}
    />
  )
}

export { Button }
export type { ButtonProps, Variant as ButtonVariant, Size as ButtonSize }
