import type { StyleXStyles } from "@stylexjs/stylex"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import * as stylex from "@stylexjs/stylex"

import type { VariantKey } from "@/components/variants"

import { defineVariants } from "@/components/variants"

import {
  borderRadius,
  colors,
  duration,
  focusRing,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

const styles = stylex.create({
  base: {
    display: "inline-flex",
    width: "fit-content",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    overflow: "hidden",
    whiteSpace: "nowrap",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "transparent",
      ":focus-visible": colors.ring,
    },
    borderRadius: borderRadius.full,
    paddingInline: spacing.s,
    paddingBlock: `calc(${u} * 0.5)`,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: 1,
    outline: "none",
    transitionProperty: "color, box-shadow",
    transitionDuration: duration.fast,
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
  },
  invalid: {
    borderColor: colors.destructive,
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.invalidRing,
    },
  },
})

const variants = defineVariants(
  stylex.create({
    default: {
      backgroundColor: {
        default: colors.primary,
        ":hover": `color-mix(in oklch, ${colors.primary}, transparent 10%)`,
      },
      color: colors["primary-foreground"],
    },
    secondary: {
      backgroundColor: {
        default: colors.secondary,
        ":hover": `color-mix(in oklch, ${colors.secondary}, ${colors["text-primary"]} 10%)`,
      },
      color: colors["secondary-foreground"],
    },
    destructive: {
      backgroundColor: {
        default: colors.destructive,
        ":hover": `color-mix(in oklch, ${colors.destructive}, transparent 10%)`,
      },
      color: colors["destructive-foreground"],
    },
    outline: {
      borderColor: {
        default: colors["border-primary"],
        ":focus-visible": colors.ring,
      },
      color: colors["text-primary"],
      backgroundColor: {
        default: "transparent",
        ":hover": colors["background-muted"],
      },
    },
    ghost: {
      color: colors["text-primary"],
      backgroundColor: {
        default: "transparent",
        ":hover": colors["background-muted"],
      },
    },
    link: {
      color: colors.primary,
      backgroundColor: "transparent",
      textUnderlineOffset: spacing.xs,
      textDecorationLine: {
        default: "none",
        ":hover": "underline",
      },
    },
  }),
  "default"
)

type BadgeVariant = VariantKey<typeof variants>

type BadgeProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style" | "color"
> & {
  variant?: BadgeVariant
  sx?: StyleXStyles
}

function Badge({ variant, render, sx, ...props }: BadgeProps) {
  const ariaInvalid = props["aria-invalid"]
  const invalid = ariaInvalid === true || ariaInvalid === "true"
  const resolvedVariant = variants.resolve(variant)
  const ownProps = {
    "data-slot": "badge",
    "data-variant": resolvedVariant,
    ...stylex.props(
      styles.base,
      variants(variant),
      invalid && styles.invalid,
      sx
    ),
  }

  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(ownProps, props),
    state: {
      slot: "badge",
      variant: resolvedVariant,
    },
  })
}

export { Badge }
export type { BadgeProps, BadgeVariant }
