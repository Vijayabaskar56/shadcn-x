import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import * as stylex from "@stylexjs/stylex"

import type { VariantKey } from "@/components/variants"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Icon } from "@/components/icon"
import { defineVariants } from "@/components/variants"

import {
  boxShadow,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

// Sheet: slide-in Dialog reusing @base-ui/react/dialog behavior, Popup pinned
// to screen edge via `side` prop instead of centered; same Portal/Backdrop/etc.
const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    isolation: "isolate",
    zIndex: 50,
    backgroundColor: `color-mix(in oklch, ${colors["text-primary"]}, transparent 50%)`,
  },

  // Fixed full-flex column pinned to edge via `side` styles; left/right 75% max-w-sm,
  // top/bottom full-width; physical edges match shadcn `side` semantics.
  content: {
    position: "fixed",
    zIndex: 50,
    display: "flex",
    flexDirection: "column",
    gap: spacing.l,
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
    boxShadow: boxShadow.l,
    padding: spacing.xl,
    outline: "none",
  },

  close: {
    position: "absolute",
    top: spacing.l,
    insetInlineEnd: spacing.l,
  },

  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.s,
  },

  // mt-auto pins the footer to the bottom of a full-height side sheet.
  footer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",
    gap: spacing.s,
  },

  title: {
    fontSize: fontSize.l,
    lineHeight: 1,
    fontWeight: fontWeight.semibold,
    margin: 0,
  },

  description: {
    fontSize: fontSize.s,
    color: colors["muted-foreground"],
    margin: 0,
  },
})

const sides = defineVariants(
  stylex.create({
    top: {
      top: 0,
      insetInline: 0,
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: colors["border-primary"],
    },
    right: {
      top: 0,
      insetInlineEnd: 0,
      bottom: 0,
      height: "100%",
      width: "75%",
      maxWidth: "24rem",
      borderInlineStartWidth: 1,
      borderInlineStartStyle: "solid",
      borderInlineStartColor: colors["border-primary"],
    },
    bottom: {
      bottom: 0,
      insetInline: 0,
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderTopColor: colors["border-primary"],
    },
    left: {
      top: 0,
      insetInlineStart: 0,
      bottom: 0,
      height: "100%",
      width: "75%",
      maxWidth: "24rem",
      borderInlineEndWidth: 1,
      borderInlineEndStyle: "solid",
      borderInlineEndColor: colors["border-primary"],
    },
  }),
  "right"
)

type Side = VariantKey<typeof sides>

const Sheet = DialogPrimitive.Root

type SheetTriggerProps = Omit<
  DialogPrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SheetTrigger({ sx, ...props }: SheetTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      data-slot="sheet-trigger"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type SheetPortalProps = DialogPrimitive.Portal.Props

function SheetPortal({ ...props }: SheetPortalProps) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

type SheetCloseProps = Omit<
  DialogPrimitive.Close.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SheetClose({ sx, ...props }: SheetCloseProps) {
  return (
    <DialogPrimitive.Close
      data-slot="sheet-close"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type SheetOverlayProps = Omit<
  DialogPrimitive.Backdrop.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SheetOverlay({ sx, ...props }: SheetOverlayProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="sheet-overlay"
      {...stylex.props(styles.overlay, sx)}
      {...props}
    />
  )
}

type SheetContentProps = Omit<
  DialogPrimitive.Popup.Props,
  "className" | "style"
> & {
  side?: Side
  showCloseButton?: boolean
  sx?: StyleXStyles
}

function SheetContent({
  children,
  side,
  showCloseButton = true,
  sx,
  ...props
}: SheetContentProps) {
  const resolvedSide = sides.resolve(side)

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Popup
        data-slot="sheet-content"
        data-side={resolvedSide}
        {...stylex.props(styles.content, sides(side), sx)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetClose
            render={
              <Button
                aria-label="Close"
                variant="ghost"
                size="icon-sm"
                sx={styles.close}
              />
            }
          >
            <Icon name="X" />
          </SheetClose>
        )}
      </DialogPrimitive.Popup>
    </SheetPortal>
  )
}

type SheetHeaderProps = Omit<ComponentPropsWithoutRef<typeof Box<"div">>, "as">

function SheetHeader({ sx, ...props }: SheetHeaderProps) {
  return (
    <Box
      as="div"
      data-slot="sheet-header"
      sx={[styles.header, sx]}
      {...props}
    />
  )
}

type SheetFooterProps = Omit<ComponentPropsWithoutRef<typeof Box<"div">>, "as">

function SheetFooter({ sx, ...props }: SheetFooterProps) {
  return (
    <Box
      as="div"
      data-slot="sheet-footer"
      sx={[styles.footer, sx]}
      {...props}
    />
  )
}

type SheetTitleProps = Omit<
  DialogPrimitive.Title.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SheetTitle({ sx, ...props }: SheetTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      {...stylex.props(styles.title, sx)}
      {...props}
    />
  )
}

type SheetDescriptionProps = Omit<
  DialogPrimitive.Description.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SheetDescription({ sx, ...props }: SheetDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      {...stylex.props(styles.description, sx)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}

export type {
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetOverlayProps,
  SheetPortalProps,
  Side as SheetSide,
  SheetTitleProps,
  SheetTriggerProps,
}
