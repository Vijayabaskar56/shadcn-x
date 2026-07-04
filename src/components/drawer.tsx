import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import * as stylex from "@stylexjs/stylex"
import { createContext, useContext } from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { Box } from "@/components/box"

import type { VariantKey } from "./variants"

import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"
import { defineVariants } from "./variants"

// The single spacing knob (CSS `--spacing`); drawer margins/dimensions are
// multiples of it, so they re-scale with the spacing token — matching shadcn.
const u = spacing["--spacing"]

// vaul's Root takes `direction` ("top" | "bottom" | "left" | "right"); it
// reflects it onto the content DOM as `data-vaul-drawer-direction`. StyleX
// can't react to a self attribute selector (it silently drops those keys), so
// direction-aware positioning is selected in JS. The Root reads `direction`
// and publishes it through context; Content/Header/Handle consume it. This
// keeps the public API identical to shadcn (direction on Root) and stays
// on-system (JS conditional, not a distance/attribute selector).
const styles = stylex.create({
  // Mirrors DialogOverlay: a fixed, isolated scrim derived from the text
  // token (shadcn's bg-black/50, expressed through our themable surface).
  overlay: {
    position: "fixed",
    inset: 0,
    isolation: "isolate",
    zIndex: 50,
    backgroundColor: `color-mix(in oklch, ${colors["text-primary"]}, transparent 50%)`,
  },

  contentBase: {
    position: "fixed",
    zIndex: 50,
    display: "flex",
    height: "auto",
    flexDirection: "column",
    backgroundColor: colors["background-primary"],
    outline: "none",
  },

  // The drag grip (vaul's Handle primitive). shadcn shows it only for the
  // bottom direction; Content honors that by rendering Handle conditionally.
  handle: {
    marginInline: "auto", // mx-auto
    marginTop: spacing.l, // mt-4
    height: spacing.s, // h-2
    width: "100px", // w-[100px] (per-component dimension)
    flexShrink: 0, // shrink-0
    borderRadius: borderRadius.full, // rounded-full
    backgroundColor: colors["background-muted"], // bg-muted
  },

  headerBase: {
    display: "flex",
    flexDirection: "column",
    gap: `calc(${u} * 0.5)`, // gap-0.5
    padding: spacing.l, // p-4
    "@media (min-width: 768px)": {
      gap: `calc(${u} * 1.5)`, // md:gap-1.5
    },
  },
  // shadcn centers header text for vertical (top/bottom) drawers.
  headerCentered: {
    textAlign: "center",
  },

  footer: {
    marginTop: "auto", // mt-auto
    display: "flex",
    flexDirection: "column",
    gap: spacing.s, // gap-2
    padding: spacing.l, // p-4
  },

  title: {
    fontSize: fontSize.l,
    lineHeight: 1,
    fontWeight: fontWeight.semibold, // font-semibold
    color: colors["text-primary"], // text-foreground
    margin: 0,
  },

  description: {
    fontSize: fontSize.s, // text-sm
    color: colors["muted-foreground"], // text-muted-foreground
    margin: 0,
  },
})

const directions = defineVariants(
  stylex.create({
    // Direction-specific anchoring, radius, and border (shadcn's
    // data-[vaul-drawer-direction=*] utilities, ported token-by-token).
    top: {
      insetInline: 0,
      top: 0,
      marginBottom: spacing["5xl"], // mb-24
      maxHeight: "80vh",
      borderEndStartRadius: borderRadius.l, // rounded-b-lg
      borderEndEndRadius: borderRadius.l,
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderColor: colors["border-primary"],
    },
    bottom: {
      insetInline: 0,
      bottom: 0,
      marginTop: spacing["5xl"], // mt-24
      maxHeight: "80vh",
      borderStartStartRadius: borderRadius.l, // rounded-t-lg
      borderStartEndRadius: borderRadius.l,
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderColor: colors["border-primary"],
    },
    left: {
      insetBlock: 0,
      insetInlineStart: 0,
      width: "75%",
      borderInlineEndWidth: 1, // border-r
      borderInlineEndStyle: "solid",
      borderColor: colors["border-primary"],
      "@media (min-width: 640px)": {
        maxWidth: "24rem",
      },
    },
    right: {
      insetBlock: 0,
      insetInlineEnd: 0,
      width: "75%", // w-3/4
      borderInlineStartWidth: 1, // border-l
      borderInlineStartStyle: "solid",
      borderColor: colors["border-primary"],
      "@media (min-width: 640px)": {
        maxWidth: "24rem", // sm:max-w-sm
      },
    },
  }),
  "bottom"
)

type Direction = VariantKey<typeof directions>

const DrawerContext = createContext<Direction>(directions.resolve())

// vaul's DialogProps is `Base & (WithFadeFromProps | WithoutFadeFromProps)` — a
// discriminated union keyed on `fadeFromIndex`. A plain Omit collapses that
// union, so the result no longer assigns back to Root. Distribute the Omit
// across the union branches instead.
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never

type DrawerProps = DistributiveOmit<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>,
  "className" | "style" | "direction"
> & {
  direction?: Direction
}

function Drawer({ direction, ...props }: DrawerProps) {
  const resolvedDirection = directions.resolve(direction)
  return (
    <DrawerContext.Provider value={resolvedDirection}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        direction={resolvedDirection}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

type DrawerTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DrawerTrigger({ sx, ...props }: DrawerTriggerProps) {
  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type DrawerPortalProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>

function DrawerPortal({ ...props }: DrawerPortalProps) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

type DrawerCloseProps = Omit<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DrawerClose({ sx, ...props }: DrawerCloseProps) {
  return (
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type DrawerOverlayProps = Omit<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DrawerOverlay({ sx, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      {...stylex.props(styles.overlay, sx)}
      {...props}
    />
  )
}

type DrawerHandleProps = Omit<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Handle>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DrawerHandle({ sx, ...props }: DrawerHandleProps) {
  return (
    <DrawerPrimitive.Handle
      data-slot="drawer-handle"
      {...stylex.props(styles.handle, sx)}
      {...props}
    />
  )
}

type DrawerContentProps = Omit<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
  "className" | "style"
> & {
  showHandle?: boolean
  sx?: StyleXStyles
}

function DrawerContent({
  children,
  showHandle = true,
  sx,
  ...props
}: DrawerContentProps) {
  const direction = useContext(DrawerContext)
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        data-direction={direction}
        {...stylex.props(styles.contentBase, directions(direction), sx)}
        {...props}
      >
        {showHandle && direction === "bottom" && <DrawerHandle />}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

type DrawerHeaderProps = Omit<ComponentPropsWithoutRef<typeof Box<"div">>, "as">

function DrawerHeader({ sx, ...props }: DrawerHeaderProps) {
  const direction = useContext(DrawerContext)
  const centered = direction === "top" || direction === "bottom"
  return (
    <Box
      as="div"
      data-slot="drawer-header"
      sx={[styles.headerBase, centered && styles.headerCentered, sx]}
      {...props}
    />
  )
}

type DrawerFooterProps = Omit<ComponentPropsWithoutRef<typeof Box<"div">>, "as">

function DrawerFooter({ sx, ...props }: DrawerFooterProps) {
  return (
    <Box
      as="div"
      data-slot="drawer-footer"
      sx={[styles.footer, sx]}
      {...props}
    />
  )
}

type DrawerTitleProps = Omit<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DrawerTitle({ sx, ...props }: DrawerTitleProps) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      {...stylex.props(styles.title, sx)}
      {...props}
    />
  )
}

type DrawerDescriptionProps = Omit<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DrawerDescription({ sx, ...props }: DrawerDescriptionProps) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      {...stylex.props(styles.description, sx)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}

export type {
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHandleProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerPortalProps,
  DrawerProps,
  DrawerTitleProps,
  DrawerTriggerProps,
  Direction as DrawerDirection,
}
