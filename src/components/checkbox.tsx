"use client"

import type { StyleXStyles } from "@stylexjs/stylex"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Icon } from "@/components/icon"

import {
  boxShadow,
  colors,
  duration,
  focusRing,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

const styles = stylex.create({
  root: {
    flexShrink: 0,
    width: `calc(${u} * 4)`,
    height: `calc(${u} * 4)`,
    borderRadius: `calc(${u} * 1)`,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: {
      default: `light-dark(transparent, color-mix(in oklch, ${colors.input}, transparent 70%))`,
    },
    boxShadow: {
      default: boxShadow.s,
      ":focus-visible": `${boxShadow.s}, ${focusRing.ring}`,
    },
    borderColor: {
      default: colors.input,
      ":focus-visible": colors.ring,
    },
    color: colors["text-primary"],
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration.fast,
    outline: "none",
    cursor: { default: "pointer", ":disabled": "not-allowed" },
    opacity: { default: 1, ":disabled": 0.5 },
  },
  checked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    color: colors["primary-foreground"],
  },
  invalid: {
    borderColor: colors.destructive,
    boxShadow: {
      default: boxShadow.s,
      ":focus-visible": `${boxShadow.s}, ${focusRing.invalidRing}`,
    },
  },
  indicator: {
    display: "grid",
    placeContent: "center",
    color: "inherit",
  },
})

type CheckboxProps = Omit<
  CheckboxPrimitive.Root.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function Checkbox({
  sx,
  checked: checkedProp,
  defaultChecked,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const [checked, setChecked] = React.useState(
    checkedProp ?? defaultChecked ?? false
  )
  const isChecked = checkedProp !== undefined ? checkedProp : checked
  const ariaInvalid = props["aria-invalid"]
  const invalid = ariaInvalid === true || ariaInvalid === "true"

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checkedProp}
      defaultChecked={defaultChecked}
      onCheckedChange={(v, details) => {
        if (checkedProp === undefined) {
          setChecked(v)
        }
        onCheckedChange?.(v, details)
      }}
      {...stylex.props(
        styles.root,
        isChecked && styles.checked,
        invalid && styles.invalid,
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        {...stylex.props(styles.indicator)}
      >
        <Icon name="Check" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
export type { CheckboxProps }
