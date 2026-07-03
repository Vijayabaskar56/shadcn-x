import type { ButtonProps } from "./button"
import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import * as stylex from "@stylexjs/stylex"

import { spacing } from "../styles/tokens.stylex"
import { Button } from "./button"
import { Icon } from "./icon"

const Nav = "nav" as const
const Ul = "ul" as const
const Li = "li" as const
const Anchor = "a" as const
const Span = "span" as const

type PaginationProps = Omit<
  ComponentPropsWithoutRef<"nav">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type PaginationContentProps = Omit<
  ComponentPropsWithoutRef<"ul">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type PaginationItemProps = Omit<
  ComponentPropsWithoutRef<"li">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type PaginationLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "className" | "style" | "color"
> &
  Pick<ButtonProps, "size"> & {
    isActive?: boolean
    sx?: StyleXStyles
  }

type PaginationDirectionalProps = PaginationLinkProps & {
  text?: string
}

type PaginationEllipsisProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

const u = spacing["--spacing"]

const styles = stylex.create({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginInline: "auto",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  previous: {
    gap: spacing.xs,
    paddingInlineStart: `calc(${u} * 2.5)`,
    paddingInlineEnd: `calc(${u} * 2.5)`,
  },
  next: {
    gap: spacing.xs,
    paddingInlineStart: `calc(${u} * 2.5)`,
    paddingInlineEnd: `calc(${u} * 2.5)`,
  },
  directionalText: {
    display: {
      default: "none",
      "@media (min-width: 640px)": "block",
    },
  },
  ellipsis: {
    display: "flex",
    width: `calc(${u} * 9)`,
    height: `calc(${u} * 9)`,
    alignItems: "center",
    justifyContent: "center",
  },
  visuallyHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
})

function Pagination({
  sx,
  role = "navigation",
  "aria-label": ariaLabel = "pagination",
  ...props
}: PaginationProps) {
  return (
    <Nav
      role={role}
      aria-label={ariaLabel}
      data-slot="pagination"
      {...stylex.props(styles.root, sx)}
      {...props}
    />
  )
}

function PaginationContent({ sx, ...props }: PaginationContentProps) {
  return (
    <Ul
      data-slot="pagination-content"
      {...stylex.props(styles.content, sx)}
      {...props}
    />
  )
}

function PaginationItem({ sx, ...props }: PaginationItemProps) {
  return <Li data-slot="pagination-item" {...stylex.props(sx)} {...props} />
}

function PaginationLink({
  isActive,
  size = "icon",
  sx,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      data-slot="pagination-link"
      data-active={isActive}
      aria-current={isActive ? "page" : undefined}
      sx={sx}
      render={<Anchor {...props} />}
    >
      {children}
    </Button>
  )
}

function PaginationPrevious({
  text = "Previous",
  sx,
  ...props
}: PaginationDirectionalProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      sx={[styles.previous, sx]}
      {...props}
    >
      <Icon name="ChevronLeft" position="inline-start" flipRtl />
      <Span
        data-slot="pagination-previous-text"
        {...stylex.props(styles.directionalText)}
      >
        {text}
      </Span>
    </PaginationLink>
  )
}

function PaginationNext({
  text = "Next",
  sx,
  ...props
}: PaginationDirectionalProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      sx={[styles.next, sx]}
      {...props}
    >
      <Span
        data-slot="pagination-next-text"
        {...stylex.props(styles.directionalText)}
      >
        {text}
      </Span>
      <Icon name="ChevronRight" position="inline-end" flipRtl />
    </PaginationLink>
  )
}

function PaginationEllipsis({ sx, ...props }: PaginationEllipsisProps) {
  return (
    <Span
      aria-hidden
      data-slot="pagination-ellipsis"
      {...stylex.props(styles.ellipsis, sx)}
      {...props}
    >
      <Icon name="MoreHorizontal" />
      <Span {...stylex.props(styles.visuallyHidden)}>More pages</Span>
    </Span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

export type {
  PaginationContentProps,
  PaginationDirectionalProps,
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationProps,
}
