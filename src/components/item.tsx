import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
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
import { Separator } from "./separator"
import { defineVariants } from "./variants"

const u = spacing["--spacing"]

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
  media: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.s,
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

const itemVariants = defineVariants(
  stylex.create({
    default: {
      backgroundColor: "transparent",
    },
    outline: {
      borderColor: {
        default: colors["border-primary"],
        ":focus-visible": colors.ring,
      },
    },
    muted: {
      backgroundColor: `color-mix(in oklch, ${colors["background-muted"]}, transparent 50%)`,
    },
  }),
  "default"
)

const itemSizes = defineVariants(
  stylex.create({
    default: {
      gap: spacing.l,
      padding: spacing.l,
    },
    sm: {
      gap: `calc(${u} * 2.5)`,
      paddingInline: spacing.l,
      paddingBlock: spacing.m,
    },
    xs: {
      gap: spacing.s,
      paddingInline: spacing.m,
      paddingBlock: spacing.s,
    },
  }),
  "default"
)

const itemMediaVariants = defineVariants(
  stylex.create({
    default: {},
    icon: {
      width: `calc(${u} * 8)`,
      height: `calc(${u} * 8)`,
      borderRadius: borderRadius.s,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: colors["border-primary"],
      backgroundColor: colors["background-muted"],
    },
    image: {
      width: `calc(${u} * 10)`,
      height: `calc(${u} * 10)`,
      overflow: "hidden",
      borderRadius: borderRadius.s,
    },
  }),
  "default"
)

type ItemVariant = VariantKey<typeof itemVariants>
type ItemSize = VariantKey<typeof itemSizes>
type ItemMediaVariant = VariantKey<typeof itemMediaVariants>

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

function Item({ variant, size, sx, render, ...props }: ItemProps) {
  const resolvedVariant = itemVariants.resolve(variant)
  const resolvedSize = itemSizes.resolve(size)
  const ownProps = {
    "data-slot": "item",
    "data-variant": resolvedVariant,
    "data-size": resolvedSize,
    ...stylex.props(
      styles.item,
      itemVariants(variant),
      itemSizes(size),
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
      variant: resolvedVariant,
      size: resolvedSize,
    },
  })
}

function ItemMedia({ variant, sx, ...props }: ItemMediaProps) {
  return (
    <Div
      data-slot="item-media"
      data-variant={itemMediaVariants.resolve(variant)}
      {...stylex.props(
        styles.media,
        itemMediaVariants(variant),
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
