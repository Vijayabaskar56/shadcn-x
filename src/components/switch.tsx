import type { StyleXStyles } from "@stylexjs/stylex"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  focusRing,
} from "../styles/tokens.stylex"

type Size = "default" | "sm"

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
  rootDefault: {
    height: "1.15rem",
    width: "2rem",
  },
  rootSm: {
    height: "0.875rem",
    width: "1.5rem",
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
  thumbDefault: {
    width: "1rem",
    height: "1rem",
  },
  thumbSm: {
    width: "0.75rem",
    height: "0.75rem",
  },
  thumbChecked: {
    transform: "translateX(calc(100% - 2px))",
  },
})

const rootSizeStyles = {
  default: styles.rootDefault,
  sm: styles.rootSm,
} satisfies Record<Size, StyleXStyles>

const thumbSizeStyles = {
  default: styles.thumbDefault,
  sm: styles.thumbSm,
} satisfies Record<Size, StyleXStyles>

type SwitchProps = Omit<
  SwitchPrimitive.Root.Props,
  "className" | "style" | "color"
> & {
  size?: Size
  sx?: StyleXStyles
}

function Switch({ size = "default", sx, ...props }: SwitchProps) {
  const isChecked = props.checked === true

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      {...stylex.props(
        styles.root,
        rootSizeStyles[size],
        isChecked && styles.checked,
        sx
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        {...stylex.props(
          styles.thumb,
          thumbSizeStyles[size],
          isChecked && styles.thumbChecked
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
export type { SwitchProps, Size as SwitchSize }
