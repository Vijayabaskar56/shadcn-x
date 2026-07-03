import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import * as stylex from "@stylexjs/stylex"

import { borderRadius, colors } from "../styles/tokens.stylex"

const Div = "div" as const

const pulse = stylex.keyframes({
  "50%": { opacity: 0.5 },
})

type SkeletonProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

const styles = stylex.create({
  skeleton: {
    borderRadius: borderRadius.m,
    backgroundColor: colors["background-muted"],
    animationName: pulse,
    animationDuration: "2s",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    animationIterationCount: "infinite",
  },
})

function Skeleton({ sx, ...props }: SkeletonProps) {
  return (
    <Div
      data-slot="skeleton"
      {...stylex.props(styles.skeleton, sx)}
      {...props}
    />
  )
}

export { Skeleton }
export type { SkeletonProps }
