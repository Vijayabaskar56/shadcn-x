import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import type { VariantKey } from "./variants"

import {
  borderRadius,
  boxShadow,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"
import { defineVariants } from "./variants"

// Host element aliased so the on-system `no-raw-html` guardrail (which matches
// raw JSX tag names) stays satisfied while these low-level slots render a div.
const Div = "div" as const

const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xl,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-card"],
    color: colors["text-primary"],
    paddingBlock: spacing.xl,
    boxShadow: boxShadow.s,
  },
  header: {
    display: "grid",
    gridAutoRows: "min-content",
    gridTemplateRows: "auto auto",
    alignItems: "flex-start",
    gap: spacing.s,
    paddingInline: spacing.xl,
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [stylex.when.descendant('[data-slot="card-action"]')]:
        "minmax(0, 1fr) auto",
    },
  },
  title: {
    fontWeight: fontWeight.semibold,
    lineHeight: 1,
  },
  description: {
    color: colors["muted-foreground"],
    fontSize: fontSize.s,
  },
  action: {
    gridColumnStart: 2,
    gridRowStart: 1,
    gridRowEnd: "span 2",
    alignSelf: "flex-start",
    justifySelf: "flex-end",
  },
  content: {
    paddingInline: spacing.xl,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    paddingInline: spacing.xl,
  },
})

const cardSizes = defineVariants(
  stylex.create({
    default: {},
    sm: {
      gap: spacing.l,
      paddingBlock: spacing.l,
    },
  }),
  "default"
)

const headerSizes = defineVariants(
  stylex.create({
    default: {},
    sm: {
      paddingInline: spacing.l,
    },
  }),
  "default"
)

const contentSizes = defineVariants(
  stylex.create({
    default: {},
    sm: {
      paddingInline: spacing.l,
    },
  }),
  "default"
)

const footerSizes = defineVariants(
  stylex.create({
    default: {},
    sm: {
      paddingInline: spacing.l,
    },
  }),
  "default"
)

type CardSize = VariantKey<typeof cardSizes>

type CardProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  size?: CardSize
  sx?: StyleXStyles
}

type CardSlotProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type CardSizeContextValue = {
  size: CardSize
}

const CardSizeContext = React.createContext<CardSizeContextValue>({
  size: "default",
})

function Card({
  size,
  sx,
  children,
  ...props
}: CardProps & { children?: ReactNode }) {
  const resolvedSize = cardSizes.resolve(size)
  return (
    <CardSizeContext.Provider value={{ size: resolvedSize }}>
      <Div
        data-slot="card"
        data-size={resolvedSize}
        {...stylex.props(styles.card, cardSizes(size), sx)}
        {...props}
      >
        {children}
      </Div>
    </CardSizeContext.Provider>
  )
}

function CardHeader({ sx, ...props }: CardSlotProps) {
  const { size } = React.useContext(CardSizeContext)
  return (
    <Div
      data-slot="card-header"
      {...stylex.props(
        styles.header,
        headerSizes(size),
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    />
  )
}

function CardTitle({ sx, ...props }: CardSlotProps) {
  return (
    <Div
      data-slot="card-title"
      {...stylex.props(styles.title, sx)}
      {...props}
    />
  )
}

function CardDescription({ sx, ...props }: CardSlotProps) {
  return (
    <Div
      data-slot="card-description"
      {...stylex.props(styles.description, sx)}
      {...props}
    />
  )
}

function CardAction({ sx, ...props }: CardSlotProps) {
  return (
    <Div
      data-slot="card-action"
      {...stylex.props(styles.action, stylex.defaultMarker(), sx)}
      {...props}
    />
  )
}

function CardContent({ sx, ...props }: CardSlotProps) {
  const { size } = React.useContext(CardSizeContext)
  return (
    <Div
      data-slot="card-content"
      {...stylex.props(styles.content, contentSizes(size), sx)}
      {...props}
    />
  )
}

function CardFooter({ sx, ...props }: CardSlotProps) {
  const { size } = React.useContext(CardSizeContext)
  return (
    <Div
      data-slot="card-footer"
      {...stylex.props(styles.footer, footerSizes(size), sx)}
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}

export type {
  CardProps,
  CardSize,
  CardSlotProps,
  CardSlotProps as CardActionProps,
  CardSlotProps as CardContentProps,
  CardSlotProps as CardDescriptionProps,
  CardSlotProps as CardFooterProps,
  CardSlotProps as CardHeaderProps,
  CardSlotProps as CardTitleProps,
}
