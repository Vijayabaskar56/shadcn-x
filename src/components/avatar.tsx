"use client"

import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

type AvatarSize = "default" | "sm" | "lg"

type AvatarProps = Omit<
  AvatarPrimitive.Root.Props,
  "className" | "style" | "color"
> & {
  size?: AvatarSize
  sx?: StyleXStyles
}

type AvatarImageProps = Omit<
  AvatarPrimitive.Image.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type AvatarFallbackProps = Omit<
  AvatarPrimitive.Fallback.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type AvatarSlotProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type AvatarGroupProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type AvatarContextValue = {
  size: AvatarSize
}

const AvatarContext = React.createContext<AvatarContextValue>({
  size: "default",
})

const Span = "span" as const
const Div = "div" as const

const u = spacing["--spacing"]

const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.full,
    color: colors["text-primary"],
    userSelect: "none",
    boxShadow: {
      default: `inset 0 0 0 1px ${colors["border-primary"]}`,
      [stylex.when.ancestor('[data-slot="avatar-group"]')]:
        `0 0 0 2px ${colors["background-primary"]}, inset 0 0 0 1px ${colors["border-primary"]}`,
    },
  },
  rootDefault: {
    width: `calc(${u} * 8)`,
    height: `calc(${u} * 8)`,
  },
  rootSm: {
    width: `calc(${u} * 6)`,
    height: `calc(${u} * 6)`,
  },
  rootLg: {
    width: `calc(${u} * 10)`,
    height: `calc(${u} * 10)`,
  },
  image: {
    display: "block",
    width: "100%",
    height: "100%",
    aspectRatio: "1 / 1",
    borderRadius: borderRadius.full,
    objectFit: "cover",
  },
  fallback: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.full,
    backgroundColor: colors["background-muted"],
    color: colors["muted-foreground"],
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    lineHeight: 1,
  },
  fallbackSm: {
    fontSize: fontSize.xs,
  },
  badge: {
    position: "absolute",
    insetInlineEnd: 0,
    bottom: 0,
    zIndex: 10,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    color: colors["primary-foreground"],
    boxShadow: `0 0 0 2px ${colors["background-primary"]}`,
    userSelect: "none",
  },
  badgeDefault: {
    width: `calc(${u} * 2.5)`,
    height: `calc(${u} * 2.5)`,
  },
  badgeSm: {
    width: spacing.s,
    height: spacing.s,
  },
  badgeLg: {
    width: spacing.m,
    height: spacing.m,
  },
  group: {
    display: "flex",
    alignItems: "center",
  },
  count: {
    position: "relative",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: {
      default: `calc(${u} * 8)`,
      [stylex.when.siblingBefore('[data-size="sm"]')]: `calc(${u} * 6)`,
      [stylex.when.siblingBefore('[data-size="lg"]')]: `calc(${u} * 10)`,
    },
    height: {
      default: `calc(${u} * 8)`,
      [stylex.when.siblingBefore('[data-size="sm"]')]: `calc(${u} * 6)`,
      [stylex.when.siblingBefore('[data-size="lg"]')]: `calc(${u} * 10)`,
    },
    borderRadius: borderRadius.full,
    backgroundColor: colors["background-muted"],
    color: colors["muted-foreground"],
    fontSize: {
      default: fontSize.s,
      [stylex.when.siblingBefore('[data-size="sm"]')]: fontSize.xs,
    },
    fontWeight: fontWeight.medium,
    lineHeight: 1,
    boxShadow: `0 0 0 2px ${colors["background-primary"]}`,
  },
})

const avatarSizeStyles = {
  default: styles.rootDefault,
  sm: styles.rootSm,
  lg: styles.rootLg,
} satisfies Record<AvatarSize, StyleXStyles>

const fallbackSizeStyles = {
  default: null,
  sm: styles.fallbackSm,
  lg: null,
} satisfies Record<AvatarSize, StyleXStyles | null>

const badgeSizeStyles = {
  default: styles.badgeDefault,
  sm: styles.badgeSm,
  lg: styles.badgeLg,
} satisfies Record<AvatarSize, StyleXStyles>

function Avatar({
  size = "default",
  children,
  sx,
  ...props
}: AvatarProps & { children?: ReactNode }) {
  return (
    <AvatarContext.Provider value={{ size }}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        data-size={size}
        {...stylex.props(
          styles.root,
          avatarSizeStyles[size],
          stylex.defaultMarker(),
          sx
        )}
        {...props}
      >
        {children}
      </AvatarPrimitive.Root>
    </AvatarContext.Provider>
  )
}

function AvatarImage({ sx, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      {...stylex.props(styles.image, sx)}
      {...props}
    />
  )
}

function AvatarFallback({ sx, ...props }: AvatarFallbackProps) {
  const { size } = React.useContext(AvatarContext)

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      {...stylex.props(styles.fallback, fallbackSizeStyles[size], sx)}
      {...props}
    />
  )
}

function AvatarBadge({ sx, ...props }: AvatarSlotProps) {
  const { size } = React.useContext(AvatarContext)

  return (
    <Span
      data-slot="avatar-badge"
      {...stylex.props(styles.badge, badgeSizeStyles[size], sx)}
      {...props}
    />
  )
}

function AvatarGroup({ sx, ...props }: AvatarGroupProps) {
  return (
    <Div
      data-slot="avatar-group"
      {...stylex.props(styles.group, stylex.defaultMarker(), sx)}
      {...props}
    />
  )
}

function AvatarGroupCount({ sx, ...props }: AvatarSlotProps) {
  return (
    <Span
      data-slot="avatar-group-count"
      {...stylex.props(styles.count, sx)}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
}

export type {
  AvatarFallbackProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarProps,
  AvatarSize,
  AvatarSlotProps,
  AvatarSlotProps as AvatarBadgeProps,
  AvatarSlotProps as AvatarGroupCountProps,
}
