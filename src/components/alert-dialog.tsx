import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import * as stylex from "@stylexjs/stylex"

import type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "@/components/button"
import type { VariantKey } from "@/components/variants"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { defineVariants } from "@/components/variants"

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
    transform: {
      default: "translate(-50%, -50%)",
      [stylex.when.ancestor('[dir="rtl"]')]: "translate(50%, -50%)",
    },
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

  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.s,
  },

  // size-16 muted square that centers an icon/media in the header. Icons are
  // sized on-system via the `Icon` component (which sizes itself), so no
  // descendant svg selector is needed here.
  media: {
    marginBottom: `calc(${u} * 2)`, // mb-2
    display: "inline-flex",
    width: "4rem", // size-16
    height: "4rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.m, // rounded-md
    backgroundColor: colors["background-muted"], // bg-muted
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

const sizes = defineVariants(
  stylex.create({
    // Per-size maxWidth — a component dimension decision (shadcn's max-w-lg /
    // max-w-xs), not a cross-cutting theme token. The closed `size` prop is the
    // menu; these literals are the size *decision*.
    default: {
      maxWidth: "32rem", // max-w-lg
    },
    sm: {
      maxWidth: "20rem", // max-w-xs
    },
  }),
  "default"
)

type Size = VariantKey<typeof sizes>

const AlertDialog = AlertDialogPrimitive.Root

type AlertDialogTriggerProps = Omit<
  AlertDialogPrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function AlertDialogTrigger({ sx, ...props }: AlertDialogTriggerProps) {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type AlertDialogPortalProps = AlertDialogPrimitive.Portal.Props

function AlertDialogPortal({ ...props }: AlertDialogPortalProps) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

type AlertDialogOverlayProps = Omit<
  AlertDialogPrimitive.Backdrop.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function AlertDialogOverlay({ sx, ...props }: AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      {...stylex.props(styles.overlay, sx)}
      {...props}
    />
  )
}

type AlertDialogContentProps = Omit<
  AlertDialogPrimitive.Popup.Props,
  "className" | "style"
> & {
  size?: Size
  sx?: StyleXStyles
}

function AlertDialogContent({ size, sx, ...props }: AlertDialogContentProps) {
  const resolvedSize = sizes.resolve(size)

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={resolvedSize}
        {...stylex.props(styles.content, sizes(size), sx)}
        {...props}
      />
    </AlertDialogPortal>
  )
}

type AlertDialogHeaderProps = Omit<
  ComponentPropsWithoutRef<typeof Box<"div">>,
  "as"
>

function AlertDialogHeader({ sx, ...props }: AlertDialogHeaderProps) {
  return (
    <Box
      as="div"
      data-slot="alert-dialog-header"
      sx={[styles.header, sx]}
      {...props}
    />
  )
}

type AlertDialogFooterProps = Omit<
  ComponentPropsWithoutRef<typeof Box<"div">>,
  "as"
>

function AlertDialogFooter({ sx, ...props }: AlertDialogFooterProps) {
  return (
    <Box
      as="div"
      data-slot="alert-dialog-footer"
      sx={[styles.footer, sx]}
      {...props}
    />
  )
}

type AlertDialogMediaProps = Omit<
  ComponentPropsWithoutRef<typeof Box<"div">>,
  "as"
>

function AlertDialogMedia({ sx, ...props }: AlertDialogMediaProps) {
  return (
    <Box
      as="div"
      data-slot="alert-dialog-media"
      sx={[styles.media, sx]}
      {...props}
    />
  )
}

type AlertDialogTitleProps = Omit<
  AlertDialogPrimitive.Title.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function AlertDialogTitle({ sx, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      {...stylex.props(styles.title, sx)}
      {...props}
    />
  )
}

type AlertDialogDescriptionProps = Omit<
  AlertDialogPrimitive.Description.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function AlertDialogDescription({ sx, ...props }: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      {...stylex.props(styles.description, sx)}
      {...props}
    />
  )
}

type AlertDialogActionProps = ButtonProps

function AlertDialogAction({ ...props }: AlertDialogActionProps) {
  return <Button data-slot="alert-dialog-action" {...props} />
}

type AlertDialogCancelProps = Omit<
  AlertDialogPrimitive.Close.Props,
  "className" | "style"
> & {
  variant?: ButtonVariant
  size?: ButtonSize
  sx?: StyleXStyles
}

function AlertDialogCancel({
  variant = "outline",
  size = "default",
  sx,
  ...props
}: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      render={<Button variant={variant} size={size} sx={sx} />}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}

export type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogMediaProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
}
