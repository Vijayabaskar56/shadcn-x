"use client"

import type { StyleXStyles } from "@stylexjs/stylex"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  duration,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

type ProgressProps = Omit<
  ProgressPrimitive.Root.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type ProgressTrackProps = Omit<
  ProgressPrimitive.Track.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type ProgressIndicatorProps = Omit<
  ProgressPrimitive.Indicator.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type ProgressLabelProps = Omit<
  ProgressPrimitive.Label.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type ProgressValueProps = Omit<
  ProgressPrimitive.Value.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.m,
    width: "100%",
  },
  track: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: `calc(${u} * 2)`,
    alignItems: "center",
    overflowX: "hidden",
    borderRadius: borderRadius.full,
    backgroundColor: `color-mix(in oklch, ${colors.primary}, transparent 80%)`,
  },
  indicator: {
    height: "100%",
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    transitionProperty: "width",
    transitionDuration: duration.fast,
    transitionTimingFunction: "ease-out",
  },
  label: {
    color: colors["text-primary"],
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    lineHeight: 1,
  },
  value: {
    marginInlineStart: "auto",
    color: colors["muted-foreground"],
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    lineHeight: 1,
  },
})

function Progress({ children, sx, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      {...stylex.props(styles.root, sx)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ sx, ...props }: ProgressTrackProps) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      {...stylex.props(styles.track, sx)}
      {...props}
    />
  )
}

function ProgressIndicator({ sx, ...props }: ProgressIndicatorProps) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      {...stylex.props(styles.indicator, sx)}
      {...props}
    />
  )
}

function ProgressLabel({ sx, ...props }: ProgressLabelProps) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      {...stylex.props(styles.label, sx)}
      {...props}
    />
  )
}

function ProgressValue({ sx, ...props }: ProgressValueProps) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      {...stylex.props(styles.value, sx)}
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
export type {
  ProgressProps,
  ProgressTrackProps,
  ProgressIndicatorProps,
  ProgressLabelProps,
  ProgressValueProps,
}
