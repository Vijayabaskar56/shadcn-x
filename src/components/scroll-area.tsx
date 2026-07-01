import type { StyleXStyles } from "@stylexjs/stylex"

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  duration,
  focusRing,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

type ScrollAreaProps = Omit<
  ScrollAreaPrimitive.Root.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type ScrollBarProps = Omit<
  ScrollAreaPrimitive.Scrollbar.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

const styles = stylex.create({
  root: {
    position: "relative",
  },
  viewport: {
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    outline: "none",
    transitionProperty: "color, box-shadow",
    transitionDuration: duration.fast,
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
    outlineWidth: {
      default: 0,
      ":focus-visible": 1,
    },
    outlineStyle: {
      default: "none",
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.ring,
    },
  },
  scrollbar: {
    display: "flex",
    touchAction: "none",
    padding: "1px",
    transitionProperty: "color, background-color, border-color",
    transitionDuration: duration.fast,
    userSelect: "none",
  },
  scrollbarVertical: {
    width: `calc(${u} * 2.5)`,
    height: "100%",
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: "transparent",
  },
  scrollbarHorizontal: {
    flexDirection: "column",
    height: `calc(${u} * 2.5)`,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "transparent",
  },
  thumb: {
    position: "relative",
    flex: 1,
    borderRadius: borderRadius.full,
    backgroundColor: colors["border-primary"],
  },
})

function ScrollArea({ children, sx, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      {...stylex.props(styles.root, sx)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        {...stylex.props(styles.viewport)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({ orientation = "vertical", sx, ...props }: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      {...stylex.props(
        styles.scrollbar,
        orientation === "vertical" && styles.scrollbarVertical,
        orientation === "horizontal" && styles.scrollbarHorizontal,
        sx
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        {...stylex.props(styles.thumb)}
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
export type { ScrollAreaProps, ScrollBarProps }
