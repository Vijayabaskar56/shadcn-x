import type { StyleXStyles } from "@stylexjs/stylex"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import * as stylex from "@stylexjs/stylex"
import { useState } from "react"

import type { VariantKey } from "./variants"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  focusRing,
} from "../styles/tokens.stylex"
import { defineVariants } from "./variants"

const styles = stylex.create({
  root: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    backgroundColor: colors.input,
    transitionProperty:
      "color, background-color, border-color, box-shadow, transform",
    transitionDuration: duration.fast,
    outline: "none",
    cursor: "pointer",
    boxShadow: {
      default: boxShadow.s,
      ":focus-visible": focusRing.ring,
    },
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
    pointerEvents: {
      default: null,
      ":disabled": "none",
    },
  },
  checked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  thumb: {
    display: "block",
    borderRadius: borderRadius.full,
    backgroundColor: colors["background-primary"],
    transitionProperty: "transform",
    transitionDuration: duration.fast,
  },
  thumbChecked: {
    transform: "translateX(calc(100% - 2px))",
  },
})

const rootSizes = defineVariants(
  stylex.create({
    default: {
      height: "1.15rem",
      width: "2rem",
    },
    sm: {
      height: "0.875rem",
      width: "1.5rem",
    },
  }),
  "default"
)

const thumbSizes = defineVariants(
  stylex.create({
    default: {
      width: "1rem",
      height: "1rem",
    },
    sm: {
      width: "0.75rem",
      height: "0.75rem",
    },
  }),
  "default"
)

type Size = VariantKey<typeof rootSizes>

type SwitchProps = Omit<
  SwitchPrimitive.Root.Props,
  "className" | "style" | "color"
> & {
  size?: Size
  sx?: StyleXStyles
}

function Switch({
  size,
  sx,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: SwitchProps) {
  // Switch uncontrolled by default; StyleX drops self `[data-checked]`.
  // Track state in JS — controlled `checked` wins, else local mirror via onCheckedChange.
  const [internal, setInternal] = useState(defaultChecked ?? false)
  const isChecked = checked ?? internal

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={rootSizes.resolve(size)}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(nextChecked, eventDetails) => {
        setInternal(nextChecked)
        onCheckedChange?.(nextChecked, eventDetails)
      }}
      {...stylex.props(
        styles.root,
        rootSizes(size),
        isChecked && styles.checked,
        sx
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        {...stylex.props(
          styles.thumb,
          thumbSizes(size),
          isChecked && styles.thumbChecked
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
export type { SwitchProps, Size as SwitchSize }
