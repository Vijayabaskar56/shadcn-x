import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import * as stylex from "@stylexjs/stylex"
import { Loader2Icon } from "lucide-react"

import { spacing } from "../styles/tokens.stylex"

const u = spacing["--spacing"]

const spin = stylex.keyframes({
  to: { transform: "rotate(360deg)" },
})

const styles = stylex.create({
  base: {
    display: "inline-block",
    flexShrink: 0,
    width: `calc(${u} * 4)`,
    height: `calc(${u} * 4)`,
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
})

type SpinnerProps = Omit<
  ComponentPropsWithoutRef<typeof Loader2Icon>,
  | "absoluteStrokeWidth"
  | "children"
  | "className"
  | "color"
  | "size"
  | "style"
  | "strokeWidth"
  | "width"
  | "height"
> & {
  sx?: StyleXStyles
}

function Spinner({
  "aria-label": ariaLabel = "Loading",
  role = "status",
  sx,
  ...props
}: SpinnerProps) {
  return (
    <Loader2Icon
      {...props}
      {...stylex.props(styles.base, sx)}
      data-slot="spinner"
      role={role}
      aria-label={ariaLabel}
    />
  )
}

export { Spinner }
export type { SpinnerProps }
