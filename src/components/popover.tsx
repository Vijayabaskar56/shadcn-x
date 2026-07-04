import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import * as stylex from "@stylexjs/stylex"

import { Box } from "@/components/box"

import {
  borderRadius,
  boxShadow,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

// Structural overlay like Dialog; no variants — closed styles via typed `sx` prop.
// Behavior/a11y from @base-ui/react/popover.
const styles = stylex.create({
  // `isolate z-50` on the positioner — matches shadcn/Base UI reference so the
  // popover stacks above page content without capturing inherited stacking.
  positioner: {
    isolation: "isolate",
    zIndex: 50,
  },

  // z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground
  // shadow-md outline-hidden origin-(--transform-origin).
  content: {
    width: "18rem", // w-72
    borderRadius: borderRadius.m, // rounded-md
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-primary"], // bg-popover
    color: colors["text-primary"], // text-popover-foreground
    padding: spacing.l, // p-4
    boxShadow: boxShadow.m, // shadow-md
    outline: "none",
    // `--transform-origin` is set by the Base UI Positioner; aligns the popup's
    // scale/transform origin with the side it appears on.
    transformOrigin: "var(--transform-origin)",
  },

  // shadcn canonical header: flex flex-col gap-1 text-sm.
  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs, // gap-1
    fontSize: fontSize.s, // text-sm
  },

  // font-medium
  title: {
    fontWeight: fontWeight.medium,
  },

  // text-muted-foreground
  description: {
    color: colors["muted-foreground"],
  },
})

const Popover = PopoverPrimitive.Root

type PopoverTriggerProps = Omit<
  PopoverPrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function PopoverTrigger({ sx, ...props }: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type PopoverContentProps = Omit<
  PopoverPrimitive.Popup.Props,
  "className" | "style"
> &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    sx?: StyleXStyles
  }

function PopoverContent({
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  sx,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

type PopoverHeaderProps = Omit<
  ComponentPropsWithoutRef<typeof Box<"div">>,
  "as"
>

function PopoverHeader({ sx, ...props }: PopoverHeaderProps) {
  return (
    <Box
      as="div"
      data-slot="popover-header"
      sx={[styles.header, sx]}
      {...props}
    />
  )
}

type PopoverTitleProps = Omit<
  PopoverPrimitive.Title.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function PopoverTitle({ sx, ...props }: PopoverTitleProps) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      {...stylex.props(styles.title, sx)}
      {...props}
    />
  )
}

type PopoverDescriptionProps = Omit<
  PopoverPrimitive.Description.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function PopoverDescription({ sx, ...props }: PopoverDescriptionProps) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      {...stylex.props(styles.description, sx)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}

export type {
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverTitleProps,
  PopoverTriggerProps,
}
