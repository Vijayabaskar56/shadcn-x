import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"

import type { VariantKey } from "./variants"

import { colors, fontSize, fontWeight, spacing } from "../styles/tokens.stylex"
import { defineVariants } from "./variants"

// shadcn ships typography as utility classes, not a component. Text is the
// on-system primitive that carries those same decisions as a closed `variant`
// menu — semantic name in, tokens out — so an agent lands on-system by default.
// `as` may retarget the host element (Box already retires this tag set, so the
// guardrail is unchanged). The default per variant is the semantic element.
type AsElement =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "small"
  | "strong"
  | "em"
  | "label"
  | "blockquote"

const variants = defineVariants(
  stylex.create({
    // line-height / letter-spacing / font-style are typographic measurements (the
    // per-variant decision), not cross-cutting theme knobs — literals here, the
    // same way Button hardcodes per-size height/gap. Color, font-size and
    // font-weight are theme tokens and MUST come from tokens.stylex.
    h1: {
      fontSize: fontSize["4xl"], // text-4xl
      fontWeight: fontWeight.extrabold, // font-extrabold
      letterSpacing: "-0.025em", // tracking-tight
      textWrap: "balance", // text-balance
    },
    h2: {
      fontSize: fontSize["3xl"], // text-3xl
      fontWeight: fontWeight.semibold,
      letterSpacing: "-0.025em",
      paddingBottom: spacing.s, // pb-2
      borderBottomWidth: 1, // border-b
      borderBottomStyle: "solid",
      borderColor: colors["border-primary"],
    },
    h3: {
      fontSize: fontSize["2xl"], // text-2xl
      fontWeight: fontWeight.semibold,
      letterSpacing: "-0.025em",
    },
    h4: {
      fontSize: fontSize.xl, // text-xl
      fontWeight: fontWeight.semibold,
      letterSpacing: "-0.025em",
    },
    p: {
      lineHeight: 1.75, // leading-7
      // [&:not(:first-child)]:mt-6 — first-child is a self pseudo, which StyleX
      // supports; mt-6 (1.5rem) maps to spacing.xl.
      marginTop: { default: spacing.xl, ":first-child": spacing.none },
    },
    blockquote: {
      marginTop: spacing.xl, // mt-6
      paddingInlineStart: spacing.xl, // pl-6 → pis-6
      borderInlineStartWidth: 2, // border-l-2 → border-is-2
      borderInlineStartStyle: "solid",
      borderColor: colors["border-primary"],
      fontStyle: "italic",
    },
    lead: {
      fontSize: fontSize.xl, // text-xl
      color: colors["muted-foreground"],
    },
    large: {
      fontSize: fontSize.l, // text-lg
      fontWeight: fontWeight.semibold,
    },
    small: {
      fontSize: fontSize.s, // text-sm
      fontWeight: fontWeight.medium,
      lineHeight: 1, // leading-none
    },
    muted: {
      fontSize: fontSize.s, // text-sm
      color: colors["muted-foreground"],
    },
  }),
  "p"
)

type Variant = VariantKey<typeof variants>

const defaultElement = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  blockquote: "blockquote",
  lead: "p",
  large: "p",
  small: "small",
  muted: "p",
} satisfies Record<VariantKey<typeof variants>, AsElement>

type TextProps<E extends AsElement = "p"> = {
  variant?: Variant
  as?: E
  sx?: StyleXStyles
} & Omit<
  React.ComponentPropsWithoutRef<E>,
  "as" | "className" | "style" | "color"
>

function Text<E extends AsElement = "p">({
  variant,
  as,
  sx,
  ...props
}: TextProps<E>) {
  const resolvedVariant = variants.resolve(variant)
  const Tag = (as ?? defaultElement[resolvedVariant]) as React.ElementType
  return (
    <Tag
      data-slot="text"
      data-variant={resolvedVariant}
      {...stylex.props(variants(variant), sx)}
      {...props}
    />
  )
}

export { Text }
export type { TextProps, Variant as TextVariant }
