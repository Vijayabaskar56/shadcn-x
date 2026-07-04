import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"

import type { BoxAllowedTag } from "../element-coverage.ts"
import type { VariantKey } from "./variants"

import {
  spacing,
  colors,
  borderRadius,
  fontSize,
  fontWeight,
  boxShadow,
} from "../styles/tokens.stylex"
import { defineVariants } from "./variants"

const displays = defineVariants(
  stylex.create({
    flex: { display: "flex" },
    grid: { display: "grid" },
    "inline-flex": { display: "inline-flex" },
    block: { display: "block" },
    inline: { display: "inline" },
    "inline-block": { display: "inline-block" },
    none: { display: "none" },
  })
)

const flexDirections = defineVariants(
  stylex.create({
    row: { flexDirection: "row" },
    column: { flexDirection: "column" },
    "row-reverse": { flexDirection: "row-reverse" },
    "column-reverse": { flexDirection: "column-reverse" },
  })
)

const flexWraps = defineVariants(
  stylex.create({
    wrap: { flexWrap: "wrap" },
    nowrap: { flexWrap: "nowrap" },
    "wrap-reverse": { flexWrap: "wrap-reverse" },
  })
)

const alignments = defineVariants(
  stylex.create({
    start: { alignItems: "flex-start" },
    end: { alignItems: "flex-end" },
    center: { alignItems: "center" },
    stretch: { alignItems: "stretch" },
    baseline: { alignItems: "baseline" },
  })
)

const justifications = defineVariants(
  stylex.create({
    start: { justifyContent: "flex-start" },
    end: { justifyContent: "flex-end" },
    center: { justifyContent: "center" },
    between: { justifyContent: "space-between" },
    around: { justifyContent: "space-around" },
    evenly: { justifyContent: "space-evenly" },
  })
)

const gaps = defineVariants(
  stylex.create({
    none: { gap: spacing.none },
    xs: { gap: spacing.xs },
    s: { gap: spacing.s },
    m: { gap: spacing.m },
    l: { gap: spacing.l },
    xl: { gap: spacing.xl },
    "2xl": { gap: spacing["2xl"] },
    "3xl": { gap: spacing["3xl"] },
    "4xl": { gap: spacing["4xl"] },
    "5xl": { gap: spacing["5xl"] },
  })
)

const paddings = defineVariants(
  stylex.create({
    none: { padding: spacing.none },
    xs: { padding: spacing.xs },
    s: { padding: spacing.s },
    m: { padding: spacing.m },
    l: { padding: spacing.l },
    xl: { padding: spacing.xl },
    "2xl": { padding: spacing["2xl"] },
    "3xl": { padding: spacing["3xl"] },
    "4xl": { padding: spacing["4xl"] },
    "5xl": { padding: spacing["5xl"] },
  })
)

const paddingXs = defineVariants(
  stylex.create({
    none: { paddingInline: spacing.none },
    xs: { paddingInline: spacing.xs },
    s: { paddingInline: spacing.s },
    m: { paddingInline: spacing.m },
    l: { paddingInline: spacing.l },
    xl: { paddingInline: spacing.xl },
    "2xl": { paddingInline: spacing["2xl"] },
    "3xl": { paddingInline: spacing["3xl"] },
    "4xl": { paddingInline: spacing["4xl"] },
    "5xl": { paddingInline: spacing["5xl"] },
  })
)

const paddingYs = defineVariants(
  stylex.create({
    none: { paddingTop: spacing.none, paddingBottom: spacing.none },
    xs: { paddingTop: spacing.xs, paddingBottom: spacing.xs },
    s: { paddingTop: spacing.s, paddingBottom: spacing.s },
    m: { paddingTop: spacing.m, paddingBottom: spacing.m },
    l: { paddingTop: spacing.l, paddingBottom: spacing.l },
    xl: { paddingTop: spacing.xl, paddingBottom: spacing.xl },
    "2xl": { paddingTop: spacing["2xl"], paddingBottom: spacing["2xl"] },
    "3xl": { paddingTop: spacing["3xl"], paddingBottom: spacing["3xl"] },
    "4xl": { paddingTop: spacing["4xl"], paddingBottom: spacing["4xl"] },
    "5xl": { paddingTop: spacing["5xl"], paddingBottom: spacing["5xl"] },
  })
)

const margins = defineVariants(
  stylex.create({
    none: { margin: spacing.none },
    xs: { margin: spacing.xs },
    s: { margin: spacing.s },
    m: { margin: spacing.m },
    l: { margin: spacing.l },
    xl: { margin: spacing.xl },
    "2xl": { margin: spacing["2xl"] },
    "3xl": { margin: spacing["3xl"] },
    "4xl": { margin: spacing["4xl"] },
    "5xl": { margin: spacing["5xl"] },
  })
)

const backgroundColors = defineVariants(
  stylex.create({
    "background-primary": { backgroundColor: colors["background-primary"] },
    "background-card": { backgroundColor: colors["background-card"] },
    "background-muted": { backgroundColor: colors["background-muted"] },
    accent: { backgroundColor: colors.accent },
    danger: { backgroundColor: colors.danger },
    success: { backgroundColor: colors.success },
    transparent: { backgroundColor: "transparent" },
  })
)

const textColors = defineVariants(
  stylex.create({
    "text-primary": { color: colors["text-primary"] },
    "text-secondary": { color: colors["text-secondary"] },
    "text-disabled": { color: colors["text-disabled"] },
    accent: { color: colors.accent },
    danger: { color: colors.danger },
    success: { color: colors.success },
  })
)

const borderColors = defineVariants(
  stylex.create({
    "border-primary": { borderColor: colors["border-primary"] },
    accent: { borderColor: colors.accent },
    danger: { borderColor: colors.danger },
    success: { borderColor: colors.success },
    transparent: { borderColor: "transparent" },
  })
)

const radii = defineVariants(
  stylex.create({
    none: { borderRadius: borderRadius.none },
    s: { borderRadius: borderRadius.s },
    m: { borderRadius: borderRadius.m },
    l: { borderRadius: borderRadius.l },
    xl: { borderRadius: borderRadius.xl },
    full: { borderRadius: borderRadius.full },
  })
)

const shadows = defineVariants(
  stylex.create({
    none: { boxShadow: boxShadow.none },
    s: { boxShadow: boxShadow.s },
    m: { boxShadow: boxShadow.m },
    l: { boxShadow: boxShadow.l },
    xl: { boxShadow: boxShadow.xl },
  })
)

const fontSizes = defineVariants(
  stylex.create({
    xs: { fontSize: fontSize.xs },
    s: { fontSize: fontSize.s },
    m: { fontSize: fontSize.m },
    l: { fontSize: fontSize.l },
    xl: { fontSize: fontSize.xl },
    "2xl": { fontSize: fontSize["2xl"] },
    "3xl": { fontSize: fontSize["3xl"] },
  })
)

const fontWeights = defineVariants(
  stylex.create({
    regular: { fontWeight: fontWeight.regular },
    medium: { fontWeight: fontWeight.medium },
    semibold: { fontWeight: fontWeight.semibold },
    bold: { fontWeight: fontWeight.bold },
  })
)

const positions = defineVariants(
  stylex.create({
    static: { position: "static" },
    relative: { position: "relative" },
    absolute: { position: "absolute" },
    fixed: { position: "fixed" },
    sticky: { position: "sticky" },
  })
)

const overflows = defineVariants(
  stylex.create({
    visible: { overflow: "visible" },
    hidden: { overflow: "hidden" },
    scroll: { overflow: "scroll" },
    auto: { overflow: "auto" },
    clip: { overflow: "clip" },
  })
)

const textAlignments = defineVariants(
  stylex.create({
    start: { textAlign: "start" },
    center: { textAlign: "center" },
    end: { textAlign: "end" },
  })
)

const flexes = defineVariants(
  stylex.create({
    none: { flex: "none" },
    "1": { flex: "1" },
    auto: { flex: "auto" },
  })
)

const sizings = defineVariants(
  stylex.create({
    full: { width: "100%" },
    auto: { width: "auto" },
  })
)

const heightSizings = defineVariants(
  stylex.create({
    full: { height: "100%" },
    auto: { height: "auto" },
  })
)

const styles = stylex.create({
  border: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderColor: colors["border-primary"],
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: colors["border-primary"],
  },
  borderInlineStart: {
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderColor: colors["border-primary"],
  },
  borderInlineEnd: {
    borderInlineEndWidth: 1,
    borderInlineEndStyle: "solid",
    borderColor: colors["border-primary"],
  },

  // Dynamic numeric/string values via StyleX pipeline (CSS-var atomic class +
  // var inline) so `sx` merged last can still override — preserves "sx wins".
  flexGrow: (value) => ({ flexGrow: value }),
  flexShrink: (value) => ({ flexShrink: value }),
  order: (value) => ({ order: value }),
  minHeight: (value) => ({ minHeight: value }),
})

// Derived from element-coverage table; edit src/element-coverage.ts to
// allow/retire a tag (table/th/td/hr are MDX prose infra only).
type AllowedElement = BoxAllowedTag

type BoxProps<E extends AllowedElement = "div"> = {
  as?: E
  children?: React.ReactNode
  sx?: StyleXStyles
  display?: VariantKey<typeof displays>
  flexDirection?: VariantKey<typeof flexDirections>
  flexWrap?: VariantKey<typeof flexWraps>
  alignItems?: VariantKey<typeof alignments>
  justifyContent?: VariantKey<typeof justifications>
  gap?: VariantKey<typeof gaps>
  padding?: VariantKey<typeof paddings>
  paddingX?: VariantKey<typeof paddingXs>
  paddingY?: VariantKey<typeof paddingYs>
  margin?: VariantKey<typeof margins>
  marginX?: VariantKey<typeof margins>
  marginY?: VariantKey<typeof margins>
  backgroundColor?: VariantKey<typeof backgroundColors>
  color?: VariantKey<typeof textColors>
  borderColor?: VariantKey<typeof borderColors>
  borderRadius?: VariantKey<typeof radii>
  boxShadow?: VariantKey<typeof shadows>
  fontSize?: VariantKey<typeof fontSizes>
  fontWeight?: VariantKey<typeof fontWeights>
  width?: VariantKey<typeof sizings>
  height?: VariantKey<typeof heightSizings>
  minHeight?: string
  position?: VariantKey<typeof positions>
  overflow?: VariantKey<typeof overflows>
  textAlign?: VariantKey<typeof textAlignments>
  flex?: VariantKey<typeof flexes>
  flexGrow?: number
  flexShrink?: number
  order?: number
  border?: boolean
  borderTop?: boolean
  borderBottom?: boolean
  borderLeft?: boolean
  borderRight?: boolean
} & Omit<
  React.ComponentPropsWithoutRef<E>,
  | "as"
  | "children"
  | "className"
  | "style"
  | "color"
  | "width"
  | "height"
  | "display"
  | "flex"
  | "order"
  | "overflow"
>

export function Box<E extends AllowedElement = "div">({
  as,
  children,
  sx,
  display,
  flexDirection,
  flexWrap,
  alignItems,
  justifyContent,
  gap,
  padding,
  paddingX,
  paddingY,
  margin,
  backgroundColor,
  color,
  borderColor,
  borderRadius,
  boxShadow,
  fontSize,
  fontWeight,
  width,
  height,
  minHeight,
  position,
  overflow,
  textAlign,
  flex,
  flexGrow,
  flexShrink,
  order,
  border,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
  ...rest
}: BoxProps<E>) {
  const Tag = (as ?? "div") as React.ElementType

  const xstyle = stylex.props(
    display && displays(display),
    flexDirection && flexDirections(flexDirection),
    flexWrap && flexWraps(flexWrap),
    alignItems && alignments(alignItems),
    justifyContent && justifications(justifyContent),
    gap && gaps(gap),
    padding && paddings(padding),
    paddingX && paddingXs(paddingX),
    paddingY && paddingYs(paddingY),
    margin && margins(margin),
    backgroundColor && backgroundColors(backgroundColor),
    color && textColors(color),
    borderColor && borderColors(borderColor),
    borderRadius && radii(borderRadius),
    boxShadow && shadows(boxShadow),
    fontSize && fontSizes(fontSize),
    fontWeight && fontWeights(fontWeight),
    width && sizings(width),
    height && heightSizings(height),
    position && positions(position),
    overflow && overflows(overflow),
    textAlign && textAlignments(textAlign),
    flex && flexes(flex),
    border && styles.border,
    borderTop && styles.borderTop,
    borderBottom && styles.borderBottom,
    borderLeft && styles.borderInlineStart,
    borderRight && styles.borderInlineEnd,
    flexGrow !== undefined && styles.flexGrow(flexGrow),
    flexShrink !== undefined && styles.flexShrink(flexShrink),
    order !== undefined && styles.order(order),
    minHeight !== undefined && styles.minHeight(minHeight),
    // sx is merged last so per-instance overrides win (StyleX atomic last-wins).
    sx
  )

  return (
    <Tag className={xstyle.className} style={xstyle.style} {...rest}>
      {children}
    </Tag>
  )
}

Box.displayName = "Box"
