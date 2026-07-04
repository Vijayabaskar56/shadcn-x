import type { StyleXStyles } from "@stylexjs/stylex"
import type { CSSProperties } from "react"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import * as stylex from "@stylexjs/stylex"
import { createContext, useContext, useState } from "react"

import type { VariantKey } from "./variants"

import { borderRadius } from "../styles/tokens.stylex"
import { groupItemEdges } from "./group-item-edges"
import { toggleSizes, toggleStyles, toggleVariants } from "./toggle"

type Variant = VariantKey<typeof toggleVariants>
type Size = VariantKey<typeof toggleSizes>

type ToggleGroupContextValue = {
  variant?: Variant
  size?: Size
  spacing: number
  orientation: "horizontal" | "vertical"
  // The group's current value, so each item can derive its pressed state. StyleX
  // can't key off the self `[data-pressed]` attribute, and per-item local state
  // would desync when the group deselects an item, so items derive from this.
  value: readonly string[]
}

const EMPTY: readonly string[] = []

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: toggleSizes.defaultKey,
  variant: toggleVariants.defaultKey,
  spacing: 0,
  orientation: "horizontal",
  value: EMPTY,
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
  value,
  defaultValue,
  onValueChange,
  children,
  sx,
  ...props
}: ToggleGroupProps) {
  // Mirror the group value so items can derive pressed state. Controlled `value`
  // wins; otherwise the local mirror is updated via onValueChange.
  const [internalValue, setInternalValue] = useState<readonly string[]>(
    defaultValue ?? EMPTY
  )
  const groupValue = value ?? internalValue

  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={toggleVariants.resolve(variant)}
      data-size={toggleSizes.resolve(size)}
      data-spacing={gap}
      data-orientation={orientation}
      style={{ "--gap": gap } as CSSProperties}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(nextValue, eventDetails) => {
        setInternalValue(nextValue)
        onValueChange?.(nextValue, eventDetails)
      }}
      {...stylex.props(
        styles.group,
        orientationStyles[orientation],
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{
          variant,
          size,
          spacing: gap,
          orientation,
          value: groupValue,
        }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

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
  const variant = toggleVariants.resolve(context.variant ?? itemVariant)
  const size = toggleSizes.resolve(context.size ?? itemSize)
  // Pressed is derived from the group value (Base UI only fires the item's
  // onPressedChange on user clicks, not on group-driven deselection).
  const isPressed =
    props.value != null && context.value.includes(String(props.value))

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={variant}
      data-size={size}
      {...stylex.props(
        toggleStyles.base,
        toggleVariants(variant),
        toggleSizes(size),
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
