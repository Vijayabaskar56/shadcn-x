import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import * as stylex from "@stylexjs/stylex"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { useDirection } from "@/components/direction"
import { Icon } from "@/components/icon"

import {
  borderRadius,
  boxShadow,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    isolation: "isolate",
    zIndex: 50,
    backgroundColor: `color-mix(in oklch, ${colors["text-primary"]}, transparent 50%)`,
  },

  content: {
    position: "fixed",
    top: "50%",
    insetInlineStart: "50%",
    zIndex: 50,
    display: "grid",
    width: "calc(100% - 2rem)",
    maxWidth: "32rem",
    transform: "translate(-50%, -50%)",
    gap: spacing.l,
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
    padding: spacing.xl,
    boxShadow: boxShadow.l,
    outline: "none",
  },

  contentRtl: {
    transform: "translate(50%, -50%)",
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

  footer: {
    display: "flex",
    flexDirection: "column-reverse",
    gap: `calc(${u} * 2)`,
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

const Dialog = DialogPrimitive.Root

type DialogTriggerProps = Omit<
  DialogPrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DialogTrigger({ sx, ...props }: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type DialogPortalProps = DialogPrimitive.Portal.Props

function DialogPortal({ ...props }: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

type DialogCloseProps = Omit<
  DialogPrimitive.Close.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DialogClose({ sx, ...props }: DialogCloseProps) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type DialogOverlayProps = Omit<
  DialogPrimitive.Backdrop.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DialogOverlay({ sx, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      {...stylex.props(styles.overlay, sx)}
      {...props}
    />
  )
}

type DialogContentProps = Omit<
  DialogPrimitive.Popup.Props,
  "className" | "style"
> & {
  showCloseButton?: boolean
  sx?: StyleXStyles
}

function DialogContent({
  children,
  showCloseButton = true,
  sx,
  ...props
}: DialogContentProps) {
  const direction = useDirection()
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        {...stylex.props(
          styles.content,
          direction === "rtl" && styles.contentRtl,
          sx
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogClose
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
          </DialogClose>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

type DialogHeaderProps = Omit<ComponentPropsWithoutRef<typeof Box<"div">>, "as">

function DialogHeader({ sx, ...props }: DialogHeaderProps) {
  return (
    <Box
      as="div"
      data-slot="dialog-header"
      sx={[styles.header, sx]}
      {...props}
    />
  )
}

type DialogFooterProps = Omit<
  ComponentPropsWithoutRef<typeof Box<"div">>,
  "as"
> & {
  showCloseButton?: boolean
}

function DialogFooter({
  children,
  showCloseButton = false,
  sx,
  ...props
}: DialogFooterProps) {
  return (
    <Box as="div" data-slot="dialog-footer" sx={[styles.footer, sx]} {...props}>
      {children}
      {showCloseButton && (
        <DialogClose render={<Button variant="outline">Close</Button>} />
      )}
    </Box>
  )
}

type DialogTitleProps = Omit<
  DialogPrimitive.Title.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DialogTitle({ sx, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      {...stylex.props(styles.title, sx)}
      {...props}
    />
  )
}

type DialogDescriptionProps = Omit<
  DialogPrimitive.Description.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DialogDescription({ sx, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      {...stylex.props(styles.description, sx)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

export type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogTitleProps,
  DialogTriggerProps,
}
