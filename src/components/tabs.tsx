"use client"

import type { StyleXStyles } from "@stylexjs/stylex"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import * as stylex from "@stylexjs/stylex"
import { createContext, useContext, useState } from "react"

import type { VariantKey } from "./variants"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  focusRing,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"
import { defineVariants } from "./variants"

const u = spacing["--spacing"]
const Indicator = "span" as const

type TabsValue = unknown
type TabsOrientation = "horizontal" | "vertical"

type TabsContextValue = {
  value: TabsValue
  orientation: TabsOrientation
}

type TabsListContextValue = {
  variant: TabsListVariant
}

const TabsContext = createContext<TabsContextValue>({
  value: 0,
  orientation: "horizontal",
})

const TabsListContext = createContext<TabsListContextValue>({
  variant: "default",
})

const styles = stylex.create({
  root: {
    display: "flex",
    gap: spacing.s,
  },
  horizontal: {
    flexDirection: "column",
  },
  vertical: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  list: {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    color: colors["muted-foreground"],
  },
  listHorizontal: {
    height: `calc(${u} * 9)`,
  },
  listVertical: {
    height: "fit-content",
    flexDirection: "column",
  },
  trigger: {
    position: "relative",
    display: "inline-flex",
    height: "calc(100% - 1px)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: `calc(${u} * 1.5)`,
    whiteSpace: "nowrap",
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    paddingInline: `calc(${u} * 2)`,
    paddingBlock: `calc(${u} * 1)`,
    color: {
      default: colors["muted-foreground"],
      ":hover": colors["text-primary"],
    },
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration.fast,
    outlineWidth: 1,
    outlineStyle: {
      default: "solid",
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.ring,
    },
    boxShadow: {
      default: null,
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
  triggerVertical: {
    width: "100%",
    justifyContent: "flex-start",
  },
  triggerDefaultActive: {
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
    borderColor: `light-dark(transparent, ${colors.input})`,
    boxShadow: boxShadow.s,
  },
  triggerLine: {
    backgroundColor: "transparent",
  },
  triggerLineActive: {
    backgroundColor: "transparent",
    color: colors["text-primary"],
    borderColor: "transparent",
    boxShadow: boxShadow.none,
  },
  indicator: {
    position: "absolute",
    backgroundColor: colors["text-primary"],
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: duration.fast,
    pointerEvents: "none",
  },
  indicatorActive: {
    opacity: 1,
  },
  indicatorHorizontal: {
    insetInline: 0,
    bottom: `calc(${u} * -1.25)`,
    height: `calc(${u} * 0.5)`,
  },
  indicatorVertical: {
    insetBlock: 0,
    insetInlineEnd: `calc(${u} * -1)`,
    width: `calc(${u} * 0.5)`,
  },
  content: {
    flex: 1,
    outline: "none",
  },
})

const orientationStyles = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
} satisfies Record<TabsOrientation, StyleXStyles>

const listOrientationStyles = {
  horizontal: styles.listHorizontal,
  vertical: styles.listVertical,
} satisfies Record<TabsOrientation, StyleXStyles>

export const tabsListVariants = defineVariants(
  stylex.create({
    default: {
      borderRadius: borderRadius.l,
      backgroundColor: colors["background-muted"],
      padding: `calc(${u} * 0.75)`,
    },
    line: {
      gap: spacing.xs,
      borderRadius: borderRadius.none,
      backgroundColor: "transparent",
      padding: 0,
    },
  }),
  "default"
)

type TabsListVariant = VariantKey<typeof tabsListVariants>

type TabsProps = Omit<
  TabsPrimitive.Root.Props,
  "className" | "style" | "color"
> & {
  orientation?: TabsOrientation
  sx?: StyleXStyles
}

function Tabs({
  orientation = "horizontal",
  value,
  defaultValue,
  onValueChange,
  children,
  sx,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState<TabsValue>(
    value ?? defaultValue ?? 0
  )
  const currentValue = value ?? internalValue

  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(nextValue, eventDetails) => {
        if (value === undefined) {
          setInternalValue(nextValue)
        }
        onValueChange?.(nextValue, eventDetails)
      }}
      {...stylex.props(
        styles.root,
        orientationStyles[orientation],
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    >
      <TabsContext.Provider value={{ value: currentValue, orientation }}>
        {children}
      </TabsContext.Provider>
    </TabsPrimitive.Root>
  )
}

type TabsListProps = Omit<
  TabsPrimitive.List.Props,
  "className" | "style" | "color"
> & {
  variant?: TabsListVariant
  sx?: StyleXStyles
}

function TabsList({ variant, children, sx, ...props }: TabsListProps) {
  const { orientation } = useContext(TabsContext)
  const resolvedVariant = tabsListVariants.resolve(variant)

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={resolvedVariant}
      {...stylex.props(
        styles.list,
        listOrientationStyles[orientation],
        tabsListVariants(variant),
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    >
      <TabsListContext.Provider value={{ variant: resolvedVariant }}>
        {children}
      </TabsListContext.Provider>
    </TabsPrimitive.List>
  )
}

type TabsTriggerProps = Omit<
  TabsPrimitive.Tab.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

function TabsTrigger({ value, children, sx, ...props }: TabsTriggerProps) {
  const tabs = useContext(TabsContext)
  const list = useContext(TabsListContext)
  const active = tabs.value === value
  const lineVariant = list.variant === "line"

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      value={value}
      {...stylex.props(
        styles.trigger,
        tabs.orientation === "vertical" && styles.triggerVertical,
        lineVariant && styles.triggerLine,
        active && !lineVariant && styles.triggerDefaultActive,
        active && lineVariant && styles.triggerLineActive,
        sx
      )}
      {...props}
    >
      {children}
      {lineVariant ? (
        <Indicator
          data-slot="tabs-trigger-indicator"
          {...stylex.props(
            styles.indicator,
            tabs.orientation === "horizontal"
              ? styles.indicatorHorizontal
              : styles.indicatorVertical,
            active && styles.indicatorActive
          )}
        />
      ) : null}
    </TabsPrimitive.Tab>
  )
}

type TabsContentProps = Omit<
  TabsPrimitive.Panel.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

function TabsContent({ sx, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      {...stylex.props(styles.content, sx)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsListVariant,
}
