import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  duration,
  focusRing,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"
import { Separator } from "./separator"

const u = spacing["--spacing"]

type ItemVariant = "default" | "outline" | "muted"
type ItemSize = "default" | "sm" | "xs"
type ItemMediaVariant = "default" | "icon" | "image"

type ItemProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style" | "color"
> & {
  variant?: ItemVariant
  size?: ItemSize
  sx?: StyleXStyles
}

type ItemSlotProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type ItemDescriptionProps = Omit<
  ComponentPropsWithoutRef<"p">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type ItemMediaProps = ItemSlotProps & {
  variant?: ItemMediaVariant
}

type ItemSeparatorProps = ComponentPropsWithoutRef<typeof Separator>

const Div = "div" as const
const Paragraph = "p" as const

const styles = stylex.create({
  group: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  item: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "transparent",
      ":focus-visible": colors.ring,
    },
    borderRadius: borderRadius.m,
    color: colors["text-primary"],
    fontSize: fontSize.s,
    outline: "none",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration.fast,
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
  },
  itemDefault: {
    backgroundColor: "transparent",
  },
  itemOutline: {
    borderColor: {
      default: colors["border-primary"],
      ":focus-visible": colors.ring,
    },
  },
  itemMuted: {
    backgroundColor: `color-mix(in oklch, ${colors["background-muted"]}, transparent 50%)`,
  },
  itemSizeDefault: {
    gap: spacing.l,
    padding: spacing.l,
  },
  itemSizeSm: {
    gap: `calc(${u} * 2.5)`,
    paddingInline: spacing.l,
    paddingBlock: spacing.m,
  },
  itemSizeXs: {
    gap: spacing.s,
    paddingInline: spacing.m,
    paddingBlock: spacing.s,
  },
  media: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.s,
  },
  mediaIcon: {
    width: `calc(${u} * 8)`,
    height: `calc(${u} * 8)`,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-muted"],
  },
  mediaImage: {
    width: `calc(${u} * 10)`,
    height: `calc(${u} * 10)`,
    overflow: "hidden",
    borderRadius: borderRadius.s,
  },
  content: {
    display: "flex",
    flex: {
      default: "1 1 0%",
      [stylex.when.siblingBefore('[data-slot="item-content"]')]: "none",
    },
    minWidth: 0,
    flexDirection: "column",
    gap: spacing.xs,
  },
  title: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    gap: spacing.s,
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    lineHeight: 1.375,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  description: {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    color: colors["muted-foreground"],
    fontSize: fontSize.s,
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
    textWrap: "balance",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: spacing.s,
  },
  header: {
    display: "flex",
    flexBasis: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.s,
  },
  footer: {
    display: "flex",
    flexBasis: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.s,
  },
})

const itemVariantStyles = {
  default: styles.itemDefault,
  outline: styles.itemOutline,
  muted: styles.itemMuted,
} satisfies Record<ItemVariant, StyleXStyles>

const itemSizeStyles = {
  default: styles.itemSizeDefault,
  sm: styles.itemSizeSm,
  xs: styles.itemSizeXs,
} satisfies Record<ItemSize, StyleXStyles>

const itemMediaVariantStyles = {
  default: null,
  icon: styles.mediaIcon,
  image: styles.mediaImage,
} satisfies Record<ItemMediaVariant, StyleXStyles | null>

function ItemGroup({ sx, ...props }: ItemSlotProps) {
  return (
    <Div
      role="list"
      data-slot="item-group"
      {...stylex.props(styles.group, sx)}
      {...props}
    />
  )
}

function ItemSeparator({
  orientation = "horizontal",
  sx,
  ...props
}: ItemSeparatorProps) {
  return (
    <Separator
      data-slot="item-separator"
      orientation={orientation}
      sx={sx}
      {...props}
    />
  )
}

function Item({
  variant = "default",
  size = "default",
  sx,
  render,
  ...props
}: ItemProps) {
  const ownProps = {
    "data-slot": "item",
    "data-variant": variant,
    "data-size": size,
    ...stylex.props(
      styles.item,
      itemVariantStyles[variant],
      itemSizeStyles[size],
      stylex.defaultMarker(),
      sx
    ),
  }

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(ownProps, props),
    state: {
      slot: "item",
      variant,
      size,
    },
  })
}

function ItemMedia({ variant = "default", sx, ...props }: ItemMediaProps) {
  return (
    <Div
      data-slot="item-media"
      data-variant={variant}
      {...stylex.props(
        styles.media,
        itemMediaVariantStyles[variant],
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    />
  )
}

function ItemContent({ sx, ...props }: ItemSlotProps) {
  return (
    <Div
      data-slot="item-content"
      {...stylex.props(styles.content, stylex.defaultMarker(), sx)}
      {...props}
    />
  )
}

function ItemTitle({ sx, ...props }: ItemSlotProps) {
  return (
    <Div
      data-slot="item-title"
      {...stylex.props(styles.title, sx)}
      {...props}
    />
  )
}

function ItemDescription({ sx, ...props }: ItemDescriptionProps) {
  return (
    <Paragraph
      data-slot="item-description"
      {...stylex.props(styles.description, stylex.defaultMarker(), sx)}
      {...props}
    />
  )
}

function ItemActions({ sx, ...props }: ItemSlotProps) {
  return (
    <Div
      data-slot="item-actions"
      {...stylex.props(styles.actions, sx)}
      {...props}
    />
  )
}

function ItemHeader({ sx, ...props }: ItemSlotProps) {
  return (
    <Div
      data-slot="item-header"
      {...stylex.props(styles.header, sx)}
      {...props}
    />
  )
}

function ItemFooter({ sx, ...props }: ItemSlotProps) {
  return (
    <Div
      data-slot="item-footer"
      {...stylex.props(styles.footer, sx)}
      {...props}
    />
  )
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
}

export type {
  ItemActionsProps,
  ItemContentProps,
  ItemDescriptionProps,
  ItemFooterProps,
  ItemGroupProps,
  ItemHeaderProps,
  ItemMediaProps,
  ItemMediaVariant,
  ItemProps,
  ItemSeparatorProps,
  ItemSize,
  ItemSlotProps,
  ItemTitleProps,
  ItemVariant,
}

type ItemGroupProps = ItemSlotProps
type ItemContentProps = ItemSlotProps
type ItemActionsProps = ItemSlotProps
type ItemHeaderProps = ItemSlotProps
type ItemFooterProps = ItemSlotProps
type ItemTitleProps = ItemSlotProps
