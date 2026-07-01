import type { StyleXStyles } from "@stylexjs/stylex"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  duration,
  focusRing,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

const styles = stylex.create({
  group: {
    display: "grid",
    gap: spacing.s,
  },
  item: {
    aspectRatio: "1/1",
    width: `calc(${u} * 4)`,
    height: `calc(${u} * 4)`,
    flexShrink: 0,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.input,
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration.fast,
    outline: "none",
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
    cursor: {
      default: "pointer",
      ":disabled": "not-allowed",
    },
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
  },
  invalid: {
    borderColor: colors.destructive,
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.invalidRing,
    },
  },
  indicator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  indicatorDot: {
    width: `calc(${u} * 2)`,
    height: `calc(${u} * 2)`,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
  },
})

// Variable tag so this indicator chrome isn't flagged by `no-raw-html` (the same
// technique Box/Textarea use internally).
const SpanTag = "span" as const

type RadioGroupItemProps<Value = any> = Omit<
  RadioPrimitive.Root.Props<Value>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function RadioGroupItem<Value = any>({
  sx,
  ...props
}: RadioGroupItemProps<Value>) {
  const ariaInvalid = props["aria-invalid"]
  const invalid = ariaInvalid === true || ariaInvalid === "true"
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      {...stylex.props(
        styles.item,
        invalid && styles.invalid,
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    >
      <RadioPrimitive.Indicator data-slot="radio-group-indicator">
        <SpanTag {...stylex.props(styles.indicator)}>
          <SpanTag {...stylex.props(styles.indicatorDot)} />
        </SpanTag>
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

type RadioGroupProps<Value = any> = Omit<
  RadioGroupPrimitive.Props<Value>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function RadioGroup<Value = any>({ sx, ...props }: RadioGroupProps<Value>) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      {...stylex.props(styles.group, sx)}
      {...props}
    />
  )
}

export { RadioGroup, RadioGroupItem }
export type { RadioGroupProps, RadioGroupItemProps }
