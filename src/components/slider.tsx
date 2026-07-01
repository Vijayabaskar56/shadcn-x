import type { StyleXStyles } from "@stylexjs/stylex"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import * as stylex from "@stylexjs/stylex"
import { useMemo } from "react"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    width: "100%",
    touchAction: "none",
    userSelect: "none",
    alignItems: "center",
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
  },
  control: {
    position: "relative",
    display: "flex",
    width: "100%",
    touchAction: "none",
    userSelect: "none",
    alignItems: "center",
  },
  track: {
    position: "relative",
    flexGrow: 1,
    overflow: "hidden",
    borderRadius: borderRadius.full,
    height: `calc(${u} * 1.5)`,
    backgroundColor: colors["background-muted"],
  },
  range: {
    position: "absolute",
    height: "100%",
    backgroundColor: colors.primary,
  },
  thumb: {
    display: "block",
    width: `calc(${u} * 4)`,
    height: `calc(${u} * 4)`,
    flexShrink: 0,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.primary,
    backgroundColor: `light-dark(white, ${colors["background-primary"]})`,
    boxShadow: {
      default: boxShadow.s,
      ":hover": `0 0 0 4px color-mix(in oklch, ${colors.ring}, transparent 50%)`,
      ":focus-visible": `${boxShadow.s}, 0 0 0 4px color-mix(in oklch, ${colors.ring}, transparent 50%)`,
    },
    transitionProperty: "color, background-color, box-shadow",
    transitionDuration: duration.fast,
    outline: "none",
    cursor: {
      default: "pointer",
      ":disabled": "not-allowed",
    },
    pointerEvents: {
      default: "auto",
      ":disabled": "none",
    },
  },
})

type SliderProps = Omit<SliderPrimitive.Root.Props, "className" | "style"> & {
  sx?: StyleXStyles
}

function Slider({
  defaultValue,
  value,
  min = 0,
  max = 100,
  sx,
  ...props
}: SliderProps) {
  const _values = useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...stylex.props(styles.root, sx)}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="slider-control"
        {...stylex.props(styles.control)}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          {...stylex.props(styles.track)}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            {...stylex.props(styles.range)}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            {...stylex.props(styles.thumb)}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
export type { SliderProps }
