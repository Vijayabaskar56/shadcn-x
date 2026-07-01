"use client"

import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import {
  borderRadius,
  colors,
  duration,
  focusRing,
  spacing,
} from "../styles/tokens.stylex"
import { Icon } from "./icon"

const u = spacing["--spacing"]
const HandleHitArea = "span" as const
const HandleGrip = "span" as const

const styles = stylex.create({
  panelGroup: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  panelGroupHorizontal: {
    flexDirection: "row",
  },
  panelGroupVertical: {
    flexDirection: "column",
  },
  handle: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors["border-primary"],
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
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration.fast,
    height: {
      default: "auto",
      [stylex.when.ancestor('[data-orientation="vertical"]')]: 1,
    },
    width: {
      default: 1,
      [stylex.when.ancestor('[data-orientation="vertical"]')]: "100%",
    },
  },
  hitArea: {
    // Enlarges the 1px separator into a spacing.xs grab target; it must remain
    // pointer-interactive (like shadcn's `after:` hit area) or the widened
    // region falls through to the panels and the handle is hard to grab.
    position: "absolute",
    height: {
      default: "auto",
      [stylex.when.ancestor('[data-orientation="vertical"]')]: spacing.xs,
    },
    insetBlockStart: {
      default: 0,
      [stylex.when.ancestor('[data-orientation="vertical"]')]: "50%",
    },
    insetBlockEnd: {
      default: 0,
      [stylex.when.ancestor('[data-orientation="vertical"]')]: "auto",
    },
    insetInlineStart: {
      default: "50%",
      [stylex.when.ancestor('[data-orientation="vertical"]')]: 0,
    },
    width: {
      default: spacing.xs,
      [stylex.when.ancestor('[data-orientation="vertical"]')]: "100%",
    },
    transform: {
      default: "translateX(-50%)",
      [stylex.when.ancestor('[data-orientation="vertical"]')]:
        "translateY(-50%)",
    },
  },
  grip: {
    zIndex: 10,
    display: "flex",
    width: `calc(${u} * 3)`,
    height: spacing.l,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    borderRadius: borderRadius.s,
    backgroundColor: colors["border-primary"],
    transform: {
      default: "none",
      [stylex.when.ancestor('[data-orientation="vertical"]')]: "rotate(90deg)",
    },
  },
})

type ResizableOrientation = "horizontal" | "vertical"

type ResizablePanelGroupProps = Omit<
  ResizablePrimitive.GroupProps,
  "className" | "style" | "orientation"
> & {
  direction?: ResizableOrientation
  sx?: StyleXStyles
}

type ResizablePanelProps = Omit<
  ResizablePrimitive.PanelProps,
  "className" | "style"
>

type ResizableHandleProps = Omit<
  ResizablePrimitive.SeparatorProps,
  "className" | "style"
> & {
  withHandle?: boolean
  sx?: StyleXStyles
}

function ResizablePanelGroup({
  direction = "horizontal",
  sx,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      data-orientation={direction}
      orientation={direction}
      {...stylex.props(
        styles.panelGroup,
        direction === "horizontal" && styles.panelGroupHorizontal,
        direction === "vertical" && styles.panelGroupVertical,
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    />
  )
}

function ResizablePanel(props: ResizablePanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  sx,
  children,
  ...props
}: ResizableHandleProps) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      {...stylex.props(styles.handle, sx)}
      {...props}
    >
      <HandleHitArea
        data-slot="resizable-handle-hit-area"
        {...stylex.props(styles.hitArea)}
      />
      {withHandle ? (
        <HandleGrip
          data-slot="resizable-handle-grip"
          {...stylex.props(styles.grip)}
        >
          <Icon size="s">
            <GripVerticalIcon />
          </Icon>
        </HandleGrip>
      ) : null}
      {children}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
export type {
  ResizableHandleProps,
  ResizableOrientation,
  ResizablePanelGroupProps,
  ResizablePanelProps,
}
