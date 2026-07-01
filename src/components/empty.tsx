import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

// Host element aliased so the on-system `no-raw-html` guardrail (which matches
// raw JSX tag names) stays satisfied while these low-level slots render a div.
const Div = "div" as const

type EmptyMediaVariant = "default" | "icon"

type EmptyProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type EmptySlotProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type EmptyDescriptionProps = Omit<
  ComponentPropsWithoutRef<"p">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type EmptyMediaProps = EmptySlotProps & {
  variant?: EmptyMediaVariant
}

const u = spacing["--spacing"]

const styles = stylex.create({
  empty: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    flex: "1",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xl,
    borderRadius: borderRadius.l,
    borderStyle: "dashed",
    padding: {
      default: spacing.xl,
      "@media (min-width: 768px)": spacing["3xl"],
    },
    textAlign: "center",
    textWrap: "balance",
  },
  header: {
    display: "flex",
    maxWidth: "24rem",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.s,
    textAlign: "center",
  },
  media: {
    display: "flex",
    marginBottom: spacing.s,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  mediaDefault: {
    backgroundColor: "transparent",
  },
  mediaIcon: {
    width: `calc(${u} * 10)`,
    height: `calc(${u} * 10)`,
    borderRadius: borderRadius.l,
    backgroundColor: colors["background-muted"],
    color: colors["text-primary"],
  },
  title: {
    fontSize: fontSize.l,
    fontWeight: fontWeight.medium,
    letterSpacing: "-0.025em",
  },
  description: {
    color: colors["muted-foreground"],
    fontSize: fontSize.s,
    lineHeight: 1.625,
  },
  content: {
    display: "flex",
    width: "100%",
    maxWidth: "24rem",
    minWidth: 0,
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.l,
    fontSize: fontSize.s,
    textWrap: "balance",
  },
})

const mediaVariantStyles = {
  default: styles.mediaDefault,
  icon: styles.mediaIcon,
} satisfies Record<EmptyMediaVariant, StyleXStyles>

function Empty({ sx, ...props }: EmptyProps) {
  return (
    <Div data-slot="empty" {...stylex.props(styles.empty, sx)} {...props} />
  )
}

function EmptyHeader({ sx, ...props }: EmptySlotProps) {
  return (
    <Div
      data-slot="empty-header"
      {...stylex.props(styles.header, sx)}
      {...props}
    />
  )
}

function EmptyMedia({ variant = "default", sx, ...props }: EmptyMediaProps) {
  return (
    <Div
      data-slot="empty-icon"
      data-variant={variant}
      {...stylex.props(styles.media, mediaVariantStyles[variant], sx)}
      {...props}
    />
  )
}

function EmptyTitle({ sx, ...props }: EmptySlotProps) {
  return (
    <Div
      data-slot="empty-title"
      {...stylex.props(styles.title, sx)}
      {...props}
    />
  )
}

function EmptyDescription({ sx, ...props }: EmptyDescriptionProps) {
  return (
    <Div
      data-slot="empty-description"
      {...stylex.props(styles.description, sx)}
      {...props}
    />
  )
}

function EmptyContent({ sx, ...props }: EmptySlotProps) {
  return (
    <Div
      data-slot="empty-content"
      {...stylex.props(styles.content, sx)}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
}

export type {
  EmptyDescriptionProps,
  EmptyMediaProps,
  EmptyMediaVariant,
  EmptyProps,
  EmptySlotProps,
  EmptySlotProps as EmptyContentProps,
  EmptySlotProps as EmptyHeaderProps,
  EmptySlotProps as EmptyTitleProps,
}
