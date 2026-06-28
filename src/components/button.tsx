import type { StyleXStyles } from "@stylexjs/stylex"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
} from "../styles/tokens.stylex"

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
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: "150ms",
    outline: "none",
    userSelect: "none",
    cursor: "pointer",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    // Subtle press feedback, matching shadcn's active:translate-y-px.
    transform: { default: null, ":active": "translateY(1px)" },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 3px color-mix(in oklch, ${colors.ring}, transparent 50%)`,
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
  // shadcn's Base UI flavor uses a subtle destructive: tinted surface + colored
  // text (bg-destructive/10, text-destructive, hover bg-destructive/20).
  destructive: {
    backgroundColor: {
      default: `color-mix(in oklch, ${colors.destructive}, transparent 90%)`,
      ":hover": `color-mix(in oklch, ${colors.destructive}, transparent 80%)`,
    },
    color: colors.destructive,
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

  // sizes — pixel-exact to shadcn's Base UI "nova" style. These concrete values
  // live in the primitive (the decision lives here, like shadcn's own button.tsx);
  // the public variant/size props stay the closed surface.
  // base radius is rounded-lg (0.625rem); compact xs/sm use rounded-md (0.5rem).
  sizeDefault: {
    height: "2rem", // h-8
    gap: "0.375rem", // gap-1.5
    // px-2.5, tightened to px-2 on the side that holds an icon (has-data-[icon])
    paddingInlineStart: {
      default: "0.625rem",
      [stylex.when.descendant('[data-icon="inline-start"]')]: "0.5rem",
    },
    paddingInlineEnd: {
      default: "0.625rem",
      [stylex.when.descendant('[data-icon="inline-end"]')]: "0.5rem",
    },
    borderRadius: borderRadius.l, // rounded-lg (var(--radius))
  },
  sizeXs: {
    height: "1.5rem", // h-6
    gap: "0.25rem", // gap-1
    paddingInlineStart: {
      default: "0.5rem",
      [stylex.when.descendant('[data-icon="inline-start"]')]: "0.375rem",
    },
    paddingInlineEnd: {
      default: "0.5rem",
      [stylex.when.descendant('[data-icon="inline-end"]')]: "0.375rem",
    },
    fontSize: "0.75rem", // text-xs
    borderRadius: borderRadius.m, // rounded-md
  },
  sizeSm: {
    height: "1.75rem", // h-7
    gap: "0.25rem", // gap-1
    paddingInlineStart: {
      default: "0.625rem",
      [stylex.when.descendant('[data-icon="inline-start"]')]: "0.375rem",
    },
    paddingInlineEnd: {
      default: "0.625rem",
      [stylex.when.descendant('[data-icon="inline-end"]')]: "0.375rem",
    },
    fontSize: "0.8rem", // text-[0.8rem]
    borderRadius: borderRadius.m, // rounded-md
  },
  sizeLg: {
    height: "2.25rem", // h-9
    gap: "0.375rem", // gap-1.5
    paddingInlineStart: {
      default: "0.625rem",
      [stylex.when.descendant('[data-icon="inline-start"]')]: "0.5rem",
    },
    paddingInlineEnd: {
      default: "0.625rem",
      [stylex.when.descendant('[data-icon="inline-end"]')]: "0.5rem",
    },
    borderRadius: borderRadius.l, // rounded-lg (var(--radius))
  },
  sizeIcon: {
    width: "2rem",
    height: "2rem",
    borderRadius: borderRadius.l,
  },
  sizeIconXs: {
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: borderRadius.m,
  },
  sizeIconSm: {
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: borderRadius.m,
  },
  sizeIconLg: {
    width: "2.25rem",
    height: "2.25rem",
    borderRadius: borderRadius.l,
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
      // data-size + the marker let an <Icon> child observe the button via
      // stylex.when.ancestor (auto-shrink in xs); the marker also lets the
      // button observe an <Icon> descendant via stylex.when.descendant (padding).
      data-size={size}
      {...stylex.props(
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    />
  )
}

export { Button }
export type { ButtonProps, Variant as ButtonVariant, Size as ButtonSize }
