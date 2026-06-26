import * as stylex from "@stylexjs/stylex"

import {
  spacing,
  colors,
  borderRadius,
  fontSize,
  fontWeight,
  boxShadow,
} from "../styles/tokens.stylex"

type SpacingKey =
  | "none"
  | "xs"
  | "s"
  | "m"
  | "l"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
type ColorKey =
  | "background-primary"
  | "background-card"
  | "background-muted"
  | "text-primary"
  | "text-secondary"
  | "text-disabled"
  | "border-primary"
  | "accent"
  | "danger"
  | "success"
type RadiusKey = "none" | "s" | "m" | "l" | "xl" | "full"
type FontSizeKey = "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl"
type FontWeightKey = "regular" | "medium" | "semibold" | "bold"
type ShadowKey = "none" | "s" | "m" | "l" | "xl"

const styles = stylex.create({
  displayFlex: { display: "flex" },
  displayGrid: { display: "grid" },
  displayInlineFlex: { display: "inline-flex" },
  displayBlock: { display: "block" },
  displayInline: { display: "inline" },
  displayInlineBlock: { display: "inline-block" },
  displayNone: { display: "none" },

  flexDirectionRow: { flexDirection: "row" },
  flexDirectionColumn: { flexDirection: "column" },
  flexDirectionRowReverse: { flexDirection: "row-reverse" },
  flexDirectionColumnReverse: { flexDirection: "column-reverse" },

  flexWrapWrap: { flexWrap: "wrap" },
  flexWrapNowrap: { flexWrap: "nowrap" },
  flexWrapWrapReverse: { flexWrap: "wrap-reverse" },

  alignItemsStart: { alignItems: "flex-start" },
  alignItemsEnd: { alignItems: "flex-end" },
  alignItemsCenter: { alignItems: "center" },
  alignItemsStretch: { alignItems: "stretch" },
  alignItemsBaseline: { alignItems: "baseline" },

  justifyContentStart: { justifyContent: "flex-start" },
  justifyContentEnd: { justifyContent: "flex-end" },
  justifyContentCenter: { justifyContent: "center" },
  justifyContentBetween: { justifyContent: "space-between" },
  justifyContentAround: { justifyContent: "space-around" },
  justifyContentEvenly: { justifyContent: "space-evenly" },

  gapNone: { gap: spacing.none },
  gapXs: { gap: spacing.xs },
  gapS: { gap: spacing.s },
  gapM: { gap: spacing.m },
  gapL: { gap: spacing.l },
  gapXl: { gap: spacing.xl },
  gap2xl: { gap: spacing["2xl"] },
  gap3xl: { gap: spacing["3xl"] },
  gap4xl: { gap: spacing["4xl"] },
  gap5xl: { gap: spacing["5xl"] },

  paddingNone: { padding: spacing.none },
  paddingXs: { padding: spacing.xs },
  paddingS: { padding: spacing.s },
  paddingM: { padding: spacing.m },
  paddingL: { padding: spacing.l },
  paddingXl: { padding: spacing.xl },
  padding2xl: { padding: spacing["2xl"] },
  padding3xl: { padding: spacing["3xl"] },
  padding4xl: { padding: spacing["4xl"] },
  padding5xl: { padding: spacing["5xl"] },

  paddingXNone: { paddingLeft: spacing.none, paddingRight: spacing.none },
  paddingXXs: { paddingLeft: spacing.xs, paddingRight: spacing.xs },
  paddingXS: { paddingLeft: spacing.s, paddingRight: spacing.s },
  paddingXM: { paddingLeft: spacing.m, paddingRight: spacing.m },
  paddingXL: { paddingLeft: spacing.l, paddingRight: spacing.l },
  paddingXXl: { paddingLeft: spacing.xl, paddingRight: spacing.xl },
  paddingX2xl: { paddingLeft: spacing["2xl"], paddingRight: spacing["2xl"] },
  paddingX3xl: { paddingLeft: spacing["3xl"], paddingRight: spacing["3xl"] },
  paddingX4xl: { paddingLeft: spacing["4xl"], paddingRight: spacing["4xl"] },
  paddingX5xl: { paddingLeft: spacing["5xl"], paddingRight: spacing["5xl"] },

  paddingYNone: { paddingTop: spacing.none, paddingBottom: spacing.none },
  paddingYXs: { paddingTop: spacing.xs, paddingBottom: spacing.xs },
  paddingYS: { paddingTop: spacing.s, paddingBottom: spacing.s },
  paddingYM: { paddingTop: spacing.m, paddingBottom: spacing.m },
  paddingYL: { paddingTop: spacing.l, paddingBottom: spacing.l },
  paddingYXl: { paddingTop: spacing.xl, paddingBottom: spacing.xl },
  paddingY2xl: { paddingTop: spacing["2xl"], paddingBottom: spacing["2xl"] },
  paddingY3xl: { paddingTop: spacing["3xl"], paddingBottom: spacing["3xl"] },
  paddingY4xl: { paddingTop: spacing["4xl"], paddingBottom: spacing["4xl"] },
  paddingY5xl: { paddingTop: spacing["5xl"], paddingBottom: spacing["5xl"] },

  marginNone: { margin: spacing.none },
  marginXs: { margin: spacing.xs },
  marginS: { margin: spacing.s },
  marginM: { margin: spacing.m },
  marginL: { margin: spacing.l },
  marginXl: { margin: spacing.xl },
  margin2xl: { margin: spacing["2xl"] },
  margin3xl: { margin: spacing["3xl"] },
  margin4xl: { margin: spacing["4xl"] },
  margin5xl: { margin: spacing["5xl"] },

  bgBackgroundPrimary: { backgroundColor: colors["background-primary"] },
  bgBackgroundCard: { backgroundColor: colors["background-card"] },
  bgBackgroundMuted: { backgroundColor: colors["background-muted"] },
  bgAccent: { backgroundColor: colors.accent },
  bgDanger: { backgroundColor: colors.danger },
  bgSuccess: { backgroundColor: colors.success },
  bgTransparent: { backgroundColor: "transparent" },

  colorTextPrimary: { color: colors["text-primary"] },
  colorTextSecondary: { color: colors["text-secondary"] },
  colorTextDisabled: { color: colors["text-disabled"] },
  colorAccent: { color: colors.accent },
  colorDanger: { color: colors.danger },
  colorSuccess: { color: colors.success },

  borderColorBorderPrimary: { borderColor: colors["border-primary"] },
  borderColorAccent: { borderColor: colors.accent },
  borderColorDanger: { borderColor: colors.danger },
  borderColorSuccess: { borderColor: colors.success },
  borderColorTransparent: { borderColor: "transparent" },

  borderRadiusNone: { borderRadius: borderRadius.none },
  borderRadiusS: { borderRadius: borderRadius.s },
  borderRadiusM: { borderRadius: borderRadius.m },
  borderRadiusL: { borderRadius: borderRadius.l },
  borderRadiusXl: { borderRadius: borderRadius.xl },
  borderRadiusFull: { borderRadius: borderRadius.full },

  boxShadowNone: { boxShadow: boxShadow.none },
  boxShadowS: { boxShadow: boxShadow.s },
  boxShadowM: { boxShadow: boxShadow.m },
  boxShadowL: { boxShadow: boxShadow.l },
  boxShadowXl: { boxShadow: boxShadow.xl },

  fontSizeXs: { fontSize: fontSize.xs },
  fontSizeS: { fontSize: fontSize.s },
  fontSizeM: { fontSize: fontSize.m },
  fontSizeL: { fontSize: fontSize.l },
  fontSizeXl: { fontSize: fontSize.xl },
  fontSize2xl: { fontSize: fontSize["2xl"] },
  fontSize3xl: { fontSize: fontSize["3xl"] },

  fontWeightRegular: { fontWeight: fontWeight.regular },
  fontWeightMedium: { fontWeight: fontWeight.medium },
  fontWeightSemibold: { fontWeight: fontWeight.semibold },
  fontWeightBold: { fontWeight: fontWeight.bold },

  positionStatic: { position: "static" },
  positionRelative: { position: "relative" },
  positionAbsolute: { position: "absolute" },
  positionFixed: { position: "fixed" },
  positionSticky: { position: "sticky" },

  overflowVisible: { overflow: "visible" },
  overflowHidden: { overflow: "hidden" },
  overflowScroll: { overflow: "scroll" },
  overflowAuto: { overflow: "auto" },
  overflowClip: { overflow: "clip" },

  textAlignLeft: { textAlign: "left" },
  textAlignCenter: { textAlign: "center" },
  textAlignRight: { textAlign: "right" },

  flexNone: { flex: "none" },
  flex1: { flex: "1" },
  flexAuto: { flex: "auto" },

  widthFull: { width: "100%" },
  widthAuto: { width: "auto" },
  heightFull: { height: "100%" },
  heightAuto: { height: "auto" },

  border: { borderWidth: 1, borderStyle: "solid" },
  borderTop: { borderTopWidth: 1, borderTopStyle: "solid" },
  borderBottom: { borderBottomWidth: 1, borderBottomStyle: "solid" },
  borderLeft: { borderLeftWidth: 1, borderLeftStyle: "solid" },
  borderRight: { borderRightWidth: 1, borderRightStyle: "solid" },
})

type Display =
  | "flex"
  | "grid"
  | "inline-flex"
  | "block"
  | "inline"
  | "inline-block"
  | "none"
type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse"
type FlexWrap = "wrap" | "nowrap" | "wrap-reverse"
type AlignItems = "start" | "end" | "center" | "stretch" | "baseline"
type JustifyContent =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly"
type Position = "static" | "relative" | "absolute" | "fixed" | "sticky"
type Overflow = "visible" | "hidden" | "scroll" | "auto" | "clip"
type TextAlign = "left" | "center" | "right"
type FlexValue = "none" | "1" | "auto"
type Sizing = "full" | "auto"

type AllowedElement =
  | "div"
  | "span"
  | "section"
  | "nav"
  | "article"
  | "main"
  | "aside"
  | "header"
  | "footer"
  | "ul"
  | "ol"
  | "li"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "form"
  | "label"
  | "fieldset"
  | "a"
  | "button"
  | "time"
  | "figure"
  | "figcaption"
  | "blockquote"
  | "pre"
  | "code"

type BoxProps<E extends AllowedElement = "div"> = {
  as?: E
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties & Record<string, string | number>
  display?: Display
  flexDirection?: FlexDirection
  flexWrap?: FlexWrap
  alignItems?: AlignItems
  justifyContent?: JustifyContent
  gap?: SpacingKey
  padding?: SpacingKey
  paddingX?: SpacingKey
  paddingY?: SpacingKey
  margin?: SpacingKey
  marginX?: SpacingKey
  marginY?: SpacingKey
  backgroundColor?: ColorKey | "transparent"
  color?: ColorKey
  borderColor?: ColorKey | "transparent"
  borderRadius?: RadiusKey
  boxShadow?: ShadowKey
  fontSize?: FontSizeKey
  fontWeight?: FontWeightKey
  width?: Sizing
  height?: Sizing
  minHeight?: string
  position?: Position
  overflow?: Overflow
  textAlign?: TextAlign
  flex?: FlexValue
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

const displayMap = {
  flex: styles.displayFlex,
  grid: styles.displayGrid,
  "inline-flex": styles.displayInlineFlex,
  block: styles.displayBlock,
  inline: styles.displayInline,
  "inline-block": styles.displayInlineBlock,
  none: styles.displayNone,
}

const flexDirectionMap = {
  row: styles.flexDirectionRow,
  column: styles.flexDirectionColumn,
  "row-reverse": styles.flexDirectionRowReverse,
  "column-reverse": styles.flexDirectionColumnReverse,
}

const flexWrapMap = {
  wrap: styles.flexWrapWrap,
  nowrap: styles.flexWrapNowrap,
  "wrap-reverse": styles.flexWrapWrapReverse,
}

const alignItemsMap = {
  start: styles.alignItemsStart,
  end: styles.alignItemsEnd,
  center: styles.alignItemsCenter,
  stretch: styles.alignItemsStretch,
  baseline: styles.alignItemsBaseline,
}

const justifyContentMap = {
  start: styles.justifyContentStart,
  end: styles.justifyContentEnd,
  center: styles.justifyContentCenter,
  between: styles.justifyContentBetween,
  around: styles.justifyContentAround,
  evenly: styles.justifyContentEvenly,
}

const gapMap = {
  none: styles.gapNone,
  xs: styles.gapXs,
  s: styles.gapS,
  m: styles.gapM,
  l: styles.gapL,
  xl: styles.gapXl,
  "2xl": styles.gap2xl,
  "3xl": styles.gap3xl,
  "4xl": styles.gap4xl,
  "5xl": styles.gap5xl,
}

const paddingMap = {
  none: styles.paddingNone,
  xs: styles.paddingXs,
  s: styles.paddingS,
  m: styles.paddingM,
  l: styles.paddingL,
  xl: styles.paddingXl,
  "2xl": styles.padding2xl,
  "3xl": styles.padding3xl,
  "4xl": styles.padding4xl,
  "5xl": styles.padding5xl,
}

const paddingXMap = {
  none: styles.paddingXNone,
  xs: styles.paddingXXs,
  s: styles.paddingXS,
  m: styles.paddingXM,
  l: styles.paddingXL,
  xl: styles.paddingXXl,
  "2xl": styles.paddingX2xl,
  "3xl": styles.paddingX3xl,
  "4xl": styles.paddingX4xl,
  "5xl": styles.paddingX5xl,
}

const paddingYMap = {
  none: styles.paddingYNone,
  xs: styles.paddingYXs,
  s: styles.paddingYS,
  m: styles.paddingYM,
  l: styles.paddingYL,
  xl: styles.paddingYXl,
  "2xl": styles.paddingY2xl,
  "3xl": styles.paddingY3xl,
  "4xl": styles.paddingY4xl,
  "5xl": styles.paddingY5xl,
}

const marginMap = {
  none: styles.marginNone,
  xs: styles.marginXs,
  s: styles.marginS,
  m: styles.marginM,
  l: styles.marginL,
  xl: styles.marginXl,
  "2xl": styles.margin2xl,
  "3xl": styles.margin3xl,
  "4xl": styles.margin4xl,
  "5xl": styles.margin5xl,
}

const bgMap = {
  "background-primary": styles.bgBackgroundPrimary,
  "background-card": styles.bgBackgroundCard,
  "background-muted": styles.bgBackgroundMuted,
  accent: styles.bgAccent,
  danger: styles.bgDanger,
  success: styles.bgSuccess,
  transparent: styles.bgTransparent,
  "text-primary": styles.colorTextPrimary,
  "text-secondary": styles.colorTextSecondary,
  "text-disabled": styles.colorTextDisabled,
  "border-primary": styles.borderColorBorderPrimary,
}

const colorMap = {
  "text-primary": styles.colorTextPrimary,
  "text-secondary": styles.colorTextSecondary,
  "text-disabled": styles.colorTextDisabled,
  accent: styles.colorAccent,
  danger: styles.colorDanger,
  success: styles.colorSuccess,
  "background-primary": styles.colorTextPrimary,
  "background-card": styles.colorTextPrimary,
  "background-muted": styles.colorTextPrimary,
  "border-primary": styles.colorTextPrimary,
}

const borderColorMap = {
  "border-primary": styles.borderColorBorderPrimary,
  accent: styles.borderColorAccent,
  danger: styles.borderColorDanger,
  success: styles.borderColorSuccess,
  transparent: styles.borderColorTransparent,
  "text-primary": styles.borderColorBorderPrimary,
  "text-secondary": styles.borderColorBorderPrimary,
  "text-disabled": styles.borderColorBorderPrimary,
  "background-primary": styles.borderColorBorderPrimary,
  "background-card": styles.borderColorBorderPrimary,
  "background-muted": styles.borderColorBorderPrimary,
}

const radiusMap = {
  none: styles.borderRadiusNone,
  s: styles.borderRadiusS,
  m: styles.borderRadiusM,
  l: styles.borderRadiusL,
  xl: styles.borderRadiusXl,
  full: styles.borderRadiusFull,
}

const shadowMap = {
  none: styles.boxShadowNone,
  s: styles.boxShadowS,
  m: styles.boxShadowM,
  l: styles.boxShadowL,
  xl: styles.boxShadowXl,
}

const fontSizeMap = {
  xs: styles.fontSizeXs,
  s: styles.fontSizeS,
  m: styles.fontSizeM,
  l: styles.fontSizeL,
  xl: styles.fontSizeXl,
  "2xl": styles.fontSize2xl,
  "3xl": styles.fontSize3xl,
}

const fontWeightMap = {
  regular: styles.fontWeightRegular,
  medium: styles.fontWeightMedium,
  semibold: styles.fontWeightSemibold,
  bold: styles.fontWeightBold,
}

const positionMap = {
  static: styles.positionStatic,
  relative: styles.positionRelative,
  absolute: styles.positionAbsolute,
  fixed: styles.positionFixed,
  sticky: styles.positionSticky,
}

const overflowMap = {
  visible: styles.overflowVisible,
  hidden: styles.overflowHidden,
  scroll: styles.overflowScroll,
  auto: styles.overflowAuto,
  clip: styles.overflowClip,
}

const textAlignMap = {
  left: styles.textAlignLeft,
  center: styles.textAlignCenter,
  right: styles.textAlignRight,
}

const flexMap = {
  none: styles.flexNone,
  "1": styles.flex1,
  auto: styles.flexAuto,
}

const sizingMap = {
  full: styles.widthFull,
  auto: styles.widthAuto,
}

const heightSizingMap = {
  full: styles.heightFull,
  auto: styles.heightAuto,
}

export function Box<E extends AllowedElement = "div">({
  as,
  children,
  className,
  style,
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
    display && displayMap[display],
    flexDirection && flexDirectionMap[flexDirection],
    flexWrap && flexWrapMap[flexWrap],
    alignItems && alignItemsMap[alignItems],
    justifyContent && justifyContentMap[justifyContent],
    gap && gapMap[gap],
    padding && paddingMap[padding],
    paddingX && paddingXMap[paddingX],
    paddingY && paddingYMap[paddingY],
    margin && marginMap[margin],
    backgroundColor && bgMap[backgroundColor],
    color && colorMap[color],
    borderColor && borderColorMap[borderColor],
    borderRadius && radiusMap[borderRadius],
    boxShadow && shadowMap[boxShadow],
    fontSize && fontSizeMap[fontSize],
    fontWeight && fontWeightMap[fontWeight],
    width && sizingMap[width],
    height && heightSizingMap[height],
    position && positionMap[position],
    overflow && overflowMap[overflow],
    textAlign && textAlignMap[textAlign],
    flex && flexMap[flex],
    border !== undefined && styles.border,
    borderTop !== undefined && styles.borderTop,
    borderBottom !== undefined && styles.borderBottom,
    borderLeft !== undefined && styles.borderLeft,
    borderRight !== undefined && styles.borderRight
  )

  const combinedStyle: React.CSSProperties &
    Record<string, string | number | undefined> = {
    ...style,
    ...(flexGrow !== undefined ? { flexGrow } : {}),
    ...(flexShrink !== undefined ? { flexShrink } : {}),
    ...(order !== undefined ? { order } : {}),
    ...(minHeight !== undefined ? { minHeight } : {}),
  }

  return (
    <Tag
      className={className}
      style={Object.keys(combinedStyle).length > 0 ? combinedStyle : undefined}
      {...xstyle}
      {...rest}
    >
      {children}
    </Tag>
  )
}

Box.displayName = "Box"
