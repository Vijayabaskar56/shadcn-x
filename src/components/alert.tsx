import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

const Div = "div" as const
const u = spacing["--spacing"]

type AlertVariant = "default" | "destructive"

type AlertProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  variant?: AlertVariant
  sx?: StyleXStyles
}

type AlertSlotProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

const styles = stylex.create({
  alert: {
    position: "relative",
    display: "grid",
    width: "100%",
    gridTemplateColumns: {
      default: "0 minmax(0, 1fr)",
      [stylex.when.descendant('[data-slot="icon"]')]:
        "calc(var(--spacing) * 4) minmax(0, 1fr)",
    },
    alignItems: "flex-start",
    columnGap: {
      default: spacing.none,
      [stylex.when.descendant('[data-slot="icon"]')]:
        `calc(${u} * 2.5)`,
    },
    rowGap: `calc(${u} * 0.5)`,
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-card"],
    paddingBlock: spacing.m,
    paddingInlineStart: spacing.l,
    paddingInlineEnd: {
      default: spacing.l,
      [stylex.when.descendant('[data-slot="alert-action"]')]:
        `calc(${u} * 18)`,
    },
    textAlign: "start",
    fontSize: fontSize.s,
    color: colors["text-primary"],
  },
  default: {},
  destructive: {
    color: colors.destructive,
  },
  title: {
    gridColumnStart: 2,
    minHeight: spacing.l,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
    letterSpacing: "-0.025em",
  },
  description: {
    gridColumnStart: 2,
    display: "grid",
    justifyItems: "flex-start",
    gap: spacing.xs,
    color: colors["muted-foreground"],
    fontSize: fontSize.s,
    textWrap: "balance",
  },
  descriptionDestructive: {
    color: `color-mix(in oklch, ${colors.destructive}, transparent 10%)`,
  },
  action: {
    position: "absolute",
    insetBlockStart: `calc(${u} * 2.5)`,
    insetInlineEnd: spacing.m,
  },
})

const variantStyles = {
  default: styles.default,
  destructive: styles.destructive,
} satisfies Record<AlertVariant, StyleXStyles>

type AlertVariantContextValue = {
  variant: AlertVariant
}

const AlertVariantContext = React.createContext<AlertVariantContextValue>({
  variant: "default",
})

function Alert({
  variant = "default",
  sx,
  children,
  role = "alert",
  ...props
}: AlertProps) {
  return (
    <AlertVariantContext.Provider value={{ variant }}>
      <Div
        data-slot="alert"
        data-variant={variant}
        role={role}
        {...stylex.props(styles.alert, variantStyles[variant], sx)}
        {...props}
      >
        {children}
      </Div>
    </AlertVariantContext.Provider>
  )
}

function AlertTitle({ sx, ...props }: AlertSlotProps) {
  return (
    <Div
      data-slot="alert-title"
      {...stylex.props(styles.title, sx)}
      {...props}
    />
  )
}

function AlertDescription({ sx, ...props }: AlertSlotProps) {
  const { variant } = React.useContext(AlertVariantContext)
  return (
    <Div
      data-slot="alert-description"
      {...stylex.props(
        styles.description,
        variant === "destructive" && styles.descriptionDestructive,
        sx
      )}
      {...props}
    />
  )
}

function AlertAction({ sx, ...props }: AlertSlotProps) {
  return (
    <Div
      data-slot="alert-action"
      {...stylex.props(styles.action, stylex.defaultMarker(), sx)}
      {...props}
    />
  )
}

export { Alert, AlertAction, AlertDescription, AlertTitle }

export type {
  AlertProps,
  AlertSlotProps,
  AlertSlotProps as AlertActionProps,
  AlertSlotProps as AlertDescriptionProps,
  AlertSlotProps as AlertTitleProps,
  AlertVariant,
}
