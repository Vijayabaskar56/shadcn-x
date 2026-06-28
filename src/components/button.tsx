import type { StyleXStyles } from "@stylexjs/stylex"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

// The single spacing knob (CSS `--spacing`); button dimensions are multiples of
// it, so they re-scale with the spacing token — matching Tailwind/shadcn sizing.
const u = spacing["--spacing"]

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

  // sizes — dimensions are multiples of `--spacing` (re-scale with the spacing
  // knob, like shadcn's Tailwind utilities). Radius uses the `--radius` scale;
  // compact sizes CAP it via min(..., Npx) — shadcn's rounded-[min(--radius-md,Npx)]
  // — so small buttons stay harmonious even when --radius is large.
  sizeDefault: {
    height: `calc(${u} * 8)`, // h-8 (2rem)
    gap: `calc(${u} * 1.5)`, // gap-1.5
    // px-2.5, tightened to px-2 on the side that holds an icon (has-data-[icon])
    paddingInlineStart: {
      default: `calc(${u} * 2.5)`,
      [stylex.when.descendant('[data-icon="inline-start"]')]: `calc(${u} * 2)`,
    },
    paddingInlineEnd: {
      default: `calc(${u} * 2.5)`,
      [stylex.when.descendant('[data-icon="inline-end"]')]: `calc(${u} * 2)`,
    },
    borderRadius: borderRadius.l, // rounded-lg = var(--radius)
  },
  sizeXs: {
    height: `calc(${u} * 6)`, // h-6
    gap: `calc(${u} * 1)`, // gap-1
    paddingInlineStart: {
      default: `calc(${u} * 2)`,
      [stylex.when.descendant('[data-icon="inline-start"]')]:
        `calc(${u} * 1.5)`,
    },
    paddingInlineEnd: {
      default: `calc(${u} * 2)`,
      [stylex.when.descendant('[data-icon="inline-end"]')]: `calc(${u} * 1.5)`,
    },
    fontSize: fontSize.xs, // text-xs
    borderRadius: `min(${borderRadius.m}, 10px)`, // rounded-[min(--radius-md,10px)]
  },
  sizeSm: {
    height: `calc(${u} * 7)`, // h-7
    gap: `calc(${u} * 1)`, // gap-1
    paddingInlineStart: {
      default: `calc(${u} * 2.5)`,
      [stylex.when.descendant('[data-icon="inline-start"]')]:
        `calc(${u} * 1.5)`,
    },
    paddingInlineEnd: {
      default: `calc(${u} * 2.5)`,
      [stylex.when.descendant('[data-icon="inline-end"]')]: `calc(${u} * 1.5)`,
    },
    fontSize: "0.8rem", // text-[0.8rem] — off the type scale, per shadcn
    borderRadius: `min(${borderRadius.m}, 12px)`, // rounded-[min(--radius-md,12px)]
  },
  sizeLg: {
    height: `calc(${u} * 9)`, // h-9
    gap: `calc(${u} * 1.5)`, // gap-1.5
    paddingInlineStart: {
      default: `calc(${u} * 2.5)`,
      [stylex.when.descendant('[data-icon="inline-start"]')]: `calc(${u} * 2)`,
    },
    paddingInlineEnd: {
      default: `calc(${u} * 2.5)`,
      [stylex.when.descendant('[data-icon="inline-end"]')]: `calc(${u} * 2)`,
    },
    borderRadius: borderRadius.l, // rounded-lg = var(--radius)
  },
  sizeIcon: {
    width: `calc(${u} * 8)`,
    height: `calc(${u} * 8)`,
    borderRadius: borderRadius.l,
  },
  sizeIconXs: {
    width: `calc(${u} * 6)`,
    height: `calc(${u} * 6)`,
    borderRadius: `min(${borderRadius.m}, 10px)`,
  },
  sizeIconSm: {
    width: `calc(${u} * 7)`,
    height: `calc(${u} * 7)`,
    borderRadius: `min(${borderRadius.m}, 12px)`,
  },
  sizeIconLg: {
    width: `calc(${u} * 9)`,
    height: `calc(${u} * 9)`,
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
