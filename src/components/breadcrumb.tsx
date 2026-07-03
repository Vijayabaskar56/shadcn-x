import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import * as stylex from "@stylexjs/stylex"

import { Icon } from "./icon"
import {
  colors,
  duration,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

type SxProp = {
  sx?: StyleXStyles
}

type BreadcrumbProps = Omit<
  ComponentPropsWithoutRef<"nav">,
  "className" | "style" | "color"
> &
  SxProp
type BreadcrumbListProps = Omit<
  ComponentPropsWithoutRef<"ol">,
  "className" | "style" | "color"
> &
  SxProp
type BreadcrumbItemProps = Omit<
  ComponentPropsWithoutRef<"li">,
  "className" | "style" | "color"
> &
  SxProp
type BreadcrumbLinkProps = Omit<
  useRender.ComponentProps<"a">,
  "className" | "style" | "color"
> &
  SxProp
type BreadcrumbPageProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "className" | "style" | "color"
> &
  SxProp
type BreadcrumbSeparatorProps = Omit<
  ComponentPropsWithoutRef<"li">,
  "className" | "style" | "color"
> &
  SxProp
type BreadcrumbEllipsisProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "className" | "style" | "color"
> &
  SxProp

const Nav = "nav" as const
const OrderedList = "ol" as const
const ListItem = "li" as const
const Span = "span" as const

const styles = stylex.create({
  list: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.s,
    overflowWrap: "break-word",
    color: colors["muted-foreground"],
    fontSize: fontSize.s,
    lineHeight: 1.25,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.xs,
  },
  link: {
    color: "inherit",
    textDecorationLine: "none",
    transitionProperty: "color",
    transitionDuration: duration.fast,
    outlineColor: colors.ring,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: { default: 0, ":focus-visible": 2 },
    outlineOffset: 2,
    colorScheme: "light dark",
    ":hover": {
      color: colors["text-primary"],
    },
  },
  page: {
    color: colors["text-primary"],
    fontWeight: fontWeight.regular,
  },
  separator: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors["muted-foreground"],
    userSelect: "none",
  },
  ellipsis: {
    display: "flex",
    width: "2.25rem",
    height: "2.25rem",
    alignItems: "center",
    justifyContent: "center",
    color: colors["muted-foreground"],
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
})

function Breadcrumb({ sx, ...props }: BreadcrumbProps) {
  return (
    <Nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

function BreadcrumbList({ sx, ...props }: BreadcrumbListProps) {
  return (
    <OrderedList
      data-slot="breadcrumb-list"
      {...stylex.props(styles.list, sx)}
      {...props}
    />
  )
}

function BreadcrumbItem({ sx, ...props }: BreadcrumbItemProps) {
  return (
    <ListItem
      data-slot="breadcrumb-item"
      {...stylex.props(styles.item, sx)}
      {...props}
    />
  )
}

function BreadcrumbLink({ render, sx, ...props }: BreadcrumbLinkProps) {
  const ownProps = {
    "data-slot": "breadcrumb-link",
    ...stylex.props(styles.link, sx),
  }

  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(ownProps, props),
    state: {
      slot: "breadcrumb-link",
    },
  })
}

function BreadcrumbPage({ sx, ...props }: BreadcrumbPageProps) {
  return (
    <Span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      {...stylex.props(styles.page, sx)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  sx,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <ListItem
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      {...stylex.props(styles.separator, sx)}
      {...props}
    >
      {children ?? <Icon name="ChevronRight" size="s" flipRtl />}
    </ListItem>
  )
}

function BreadcrumbEllipsis({ sx, ...props }: BreadcrumbEllipsisProps) {
  return (
    <Span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      {...stylex.props(styles.ellipsis, sx)}
      {...props}
    >
      <Icon name="MoreHorizontal" size="m" />
      <Span data-slot="breadcrumb-ellipsis-label" {...stylex.props(styles.srOnly)}>
        More
      </Span>
    </Span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
export type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
}
