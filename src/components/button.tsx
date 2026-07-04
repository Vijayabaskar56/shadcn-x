import type { StyleXStyles } from "@stylexjs/stylex"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import * as stylex from "@stylexjs/stylex"

import type { VariantKey } from "./variants"

import {
  borderRadius,
  colors,
  duration,
  focusRing,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"
import { groupItemEdges } from "./group-item-edges"
import { defineVariants } from "./variants"

// The single spacing knob (CSS `--spacing`); button dimensions are multiples of
// it, so they re-scale with the spacing token — matching Tailwind/shadcn sizing.
const u = spacing["--spacing"]

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
    transitionDuration: duration.fast,
    outline: "none",
    userSelect: "none",
    cursor: "pointer",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    // shadcn's base carries gap-2 + rounded-md; sizes only override what differs.
    gap: `calc(${u} * 2)`, // gap-2
    borderRadius: borderRadius.m, // rounded-md
    // Subtle press feedback, matching shadcn's active:translate-y-px.
    transform: { default: null, ":active": "translateY(1px)" },
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
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

  // Group focus-raise: lift a focused button above its neighbors so its focus
  // ring isn't clipped by the adjacent (overlapping) borders. The edge math
  // (radius flattening + inner-border collapse) is shared with ButtonGroupText —
  // see `groupItemEdges` (imported). A Button raises on `:focus-visible`
  // (it is itself focusable); a non-focusable text chip raises on `:focus-within`.
  groupFocus: {
    position: {
      default: null,
      ":focus-visible": "relative",
    },
    zIndex: {
      default: null,
      ":focus-visible": 1,
    },
  },

  // aria-invalid:border-destructive + aria-invalid:ring-destructive/20. Self
  // attribute selectors don't compile in StyleX, so the component reads
  // aria-invalid and applies this conditionally (the attribute is still set).
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
  }),
  "default"
)

const sizes = defineVariants(
  stylex.create({
    // Sizes ported from shadcn new-york-v4. Heights/paddings/gap are multiples of
    // `--spacing` (re-scale with the spacing knob, like shadcn's utilities). The
    // side holding an icon tightens its padding (has-[>svg]:px-N) via
    // stylex.when.descendant on [data-icon]. Radius + gap come from `base`
    // (shadcn base = rounded-md gap-2); a size only overrides what differs. Icon
    // auto-shrink in xs/icon-xs is handled by <Icon> reacting to data-size="xs".
    default: {
      height: `calc(${u} * 9)`, // h-9
      // px-4, tightened to px-3 on the side that holds an icon (has-[>svg]:px-3)
      paddingInlineStart: {
        default: `calc(${u} * 4)`,
        [stylex.when.descendant('[data-icon="inline-start"]')]:
          `calc(${u} * 3)`,
      },
      paddingInlineEnd: {
        default: `calc(${u} * 4)`,
        [stylex.when.descendant('[data-icon="inline-end"]')]: `calc(${u} * 3)`,
      },
    },
    xs: {
      height: `calc(${u} * 6)`, // h-6
      gap: `calc(${u} * 1)`, // gap-1
      paddingInlineStart: {
        default: `calc(${u} * 2)`, // px-2
        [stylex.when.descendant('[data-icon="inline-start"]')]:
          `calc(${u} * 1.5)`, // has-[>svg]:px-1.5
      },
      paddingInlineEnd: {
        default: `calc(${u} * 2)`,
        [stylex.when.descendant('[data-icon="inline-end"]')]:
          `calc(${u} * 1.5)`,
      },
      fontSize: fontSize.xs, // text-xs
    },
    sm: {
      height: `calc(${u} * 8)`, // h-8
      gap: `calc(${u} * 1.5)`, // gap-1.5
      paddingInlineStart: {
        default: `calc(${u} * 3)`, // px-3
        [stylex.when.descendant('[data-icon="inline-start"]')]:
          `calc(${u} * 2.5)`, // has-[>svg]:px-2.5
      },
      paddingInlineEnd: {
        default: `calc(${u} * 3)`,
        [stylex.when.descendant('[data-icon="inline-end"]')]:
          `calc(${u} * 2.5)`,
      },
    },
    lg: {
      height: `calc(${u} * 10)`, // h-10
      paddingInlineStart: {
        default: `calc(${u} * 6)`, // px-6
        [stylex.when.descendant('[data-icon="inline-start"]')]:
          `calc(${u} * 4)`, // has-[>svg]:px-4
      },
      paddingInlineEnd: {
        default: `calc(${u} * 6)`,
        [stylex.when.descendant('[data-icon="inline-end"]')]: `calc(${u} * 4)`,
      },
    },
    icon: {
      width: `calc(${u} * 9)`, // size-9
      height: `calc(${u} * 9)`,
    },
    "icon-xs": {
      width: `calc(${u} * 6)`, // size-6
      height: `calc(${u} * 6)`,
    },
    "icon-sm": {
      width: `calc(${u} * 8)`, // size-8
      height: `calc(${u} * 8)`,
    },
    "icon-lg": {
      width: `calc(${u} * 10)`, // size-10
      height: `calc(${u} * 10)`,
    },
  }),
  "default"
)

type Variant = VariantKey<typeof variants>
type Size = VariantKey<typeof sizes>

type ButtonProps = Omit<
  ButtonPrimitive.Props,
  "className" | "style" | "color"
> & {
  variant?: Variant
  size?: Size
  sx?: StyleXStyles
}

function Button({ variant, size, sx, ...props }: ButtonProps) {
  const ariaInvalid = props["aria-invalid"]
  const invalid = ariaInvalid === true || ariaInvalid === "true"
  return (
    <ButtonPrimitive
      data-slot="button"
      // data-size + data-variant let consumers/tests target a button's state,
      // and let an <Icon> child observe the button via stylex.when.ancestor
      // (auto-shrink in xs); the marker lets the button observe an <Icon>
      // descendant via stylex.when.descendant (padding).
      data-size={sizes.resolve(size)}
      data-variant={variants.resolve(variant)}
      {...stylex.props(
        styles.base,
        variants(variant),
        sizes(size),
        groupItemEdges,
        styles.groupFocus,
        stylex.defaultMarker(),
        invalid && styles.invalid,
        sx
      )}
      {...props}
    />
  )
}

export { Button }
export type { ButtonProps, Variant as ButtonVariant, Size as ButtonSize }
