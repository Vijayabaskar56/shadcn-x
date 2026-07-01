import type { StyleXStyles } from "@stylexjs/stylex"
import type { CSSProperties } from "react"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import * as stylex from "@stylexjs/stylex"
import { createContext, useContext } from "react"

import { borderRadius } from "../styles/tokens.stylex"
import { groupItemEdges } from "./group-item-edges"
import { toggleStyles } from "./toggle"

type Variant = "default" | "outline"
type Size = "default" | "sm" | "lg"

type ToggleGroupContextValue = {
  variant?: Variant
  size?: Size
  spacing: number
  orientation: "horizontal" | "vertical"
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal",
})

const styles = stylex.create({
  group: {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "center",
    borderRadius: borderRadius.m,
  },
  horizontal: {
    flexDirection: "row",
  },
  vertical: {
    flexDirection: "column",
    alignItems: "stretch",
  },
})

const orientationStyles = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
} satisfies Record<"horizontal" | "vertical", StyleXStyles>

type ToggleGroupProps = Omit<
  ToggleGroupPrimitive.Props,
  "className" | "style" | "color"
> & {
  variant?: Variant
  size?: Size
  spacing?: number
  orientation?: "horizontal" | "vertical"
  sx?: StyleXStyles
}

function ToggleGroup({
  variant,
  size,
  spacing: gap = 0,
  orientation = "horizontal",
  children,
  sx,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={gap}
      data-orientation={orientation}
      style={{ "--gap": gap } as CSSProperties}
      {...stylex.props(
        styles.group,
        orientationStyles[orientation],
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing: gap, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

const groupItemVariantStyles = {
  default: toggleStyles.defaultVariant,
  outline: toggleStyles.outline,
} satisfies Record<Variant, StyleXStyles>

const groupItemSizeStyles = {
  default: toggleStyles.sizeDefault,
  sm: toggleStyles.sizeSm,
  lg: toggleStyles.sizeLg,
} satisfies Record<Size, StyleXStyles>

type ToggleGroupItemProps = Omit<
  TogglePrimitive.Props,
  "className" | "style" | "color"
> & {
  variant?: Variant
  size?: Size
  sx?: StyleXStyles
}

function ToggleGroupItem({
  children,
  variant: itemVariant,
  size: itemSize,
  sx,
  ...props
}: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext)
  const variant = context.variant ?? itemVariant ?? "default"
  const size = context.size ?? itemSize ?? "default"
  const isPressed = props.pressed === true

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={variant}
      data-size={size}
      {...stylex.props(
        toggleStyles.base,
        groupItemVariantStyles[variant],
        groupItemSizeStyles[size],
        isPressed && toggleStyles.pressed,
        context.spacing === 0 && groupItemEdges,
        sx
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
export type { ToggleGroupProps, ToggleGroupItemProps }
