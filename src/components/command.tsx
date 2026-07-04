import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

import * as stylex from "@stylexjs/stylex"
import { Command as CommandPrimitive } from "cmdk"

import { Box } from "@/components/box"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog"
import { useDirection } from "@/components/direction"
import { Icon } from "@/components/icon"

import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  scroll,
  spacing,
} from "../styles/tokens.stylex"

// The single spacing knob (CSS `--spacing`); command dimensions are multiples
// of it, so they re-scale with the spacing token — matching Tailwind/shadcn.
const u = spacing["--spacing"]

// Ported from shadcn Command (cmdk). Behavior from cmdk primitives; each
// style maps a Tailwind class to a token; cmdk spreads ...props → stylex.props land on elements.
const styles = stylex.create({
  root: {
    // flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: borderRadius.m,
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
  },

  // command-input-wrapper: flex h-9 items-center gap-2 border-b px-3
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    height: `calc(${u} * 9)`,
    gap: `calc(${u} * 2)`,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors["border-primary"],
    paddingInline: spacing.m,
  },
  // The search icon: size-4 shrink-0 opacity-50. Size-4 + flexShrink-0 are the
  // Icon defaults; only the transparency is added here.
  searchIcon: {
    opacity: 0.5,
  },
  // cmdk Input: flex h-10 w-full rounded-md bg-transparent py-3 text-sm
  // outline-hidden placeholder:text-muted-foreground disabled:*.
  input: {
    display: "flex",
    height: `calc(${u} * 10)`,
    width: "100%",
    borderRadius: borderRadius.m,
    backgroundColor: "transparent",
    paddingBlock: `calc(${u} * 3)`,
    fontSize: fontSize.s,
    outline: "none",
    color: colors["text-primary"],
    "::placeholder": {
      color: colors["muted-foreground"],
    },
    cursor: { default: "text", ":disabled": "not-allowed" },
    opacity: { default: 1, ":disabled": 0.5 },
  },

  // max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto
  list: {
    maxHeight: `calc(${u} * 75)`,
    minHeight: 0,
    scrollPaddingBlock: spacing.xs,
    overflowX: "hidden",
    overflowY: scroll.auto,
  },

  // py-6 text-center text-sm
  empty: {
    paddingBlock: spacing.xl,
    textAlign: "center",
    fontSize: fontSize.s,
  },

  // overflow-hidden p-1 text-foreground
  group: {
    overflow: "hidden",
    padding: spacing.xs,
    color: colors["text-primary"],
  },
  // Group heading via styled <CommandLabel>; cmdk's `heading` prop renders unstyled element unreachable by StyleX
  label: {
    paddingInline: spacing.s,
    paddingBlock: `calc(${u} * 1.5)`,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors["muted-foreground"],
  },

  // -mx-1 h-px bg-border
  separator: {
    height: 1,
    marginInline: `calc(${u} * -1)`,
    backgroundColor: colors["border-primary"],
  },

  // Item: relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm;
  // data-[selected=true]:bg-accent → StyleX drops self data-attr sel → :hover-only
  item: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: `calc(${u} * 2)`,
    borderRadius: borderRadius.s,
    paddingInline: `calc(${u} * 2)`,
    paddingBlock: `calc(${u} * 1.5)`,
    fontSize: fontSize.s,
    outline: "none",
    userSelect: "none",
    cursor: "default",
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
    color: colors["text-primary"],
  },
  // data-[disabled=true]: pointer-events-none opacity-50; StyleX drops self
  // data-attr sel → component reads `disabled` prop and applies conditionally.
  itemDisabled: {
    pointerEvents: "none",
    opacity: 0.5,
  },

  // ml-auto text-xs tracking-widest text-muted-foreground
  shortcut: {
    marginInlineStart: "auto",
    fontSize: fontSize.xs,
    letterSpacing: "0.1em",
    color: colors["muted-foreground"],
  },

  // CommandDialog: palette at top-1/3, no padding, overrides DialogContent
  // defaults. RTL flip via `useDirection` JS (not when.ancestor — <html> unreachable).
  dialogContent: {
    overflow: "hidden",
    padding: 0,
    top: "33%",
  },
  dialogTransformLtr: {
    transform: "translate(-50%, 0)",
  },
  dialogTransformRtl: {
    transform: "translate(50%, 0)",
  },

  // sr-only pattern for CommandDialog's a11y-only header; Title/Description
  // satisfy Base UI dialog-name requirement without visible chrome.
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
})

type CommandProps = Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function Command({ sx, ...props }: CommandProps) {
  return (
    <CommandPrimitive
      data-slot="command"
      {...stylex.props(styles.root, sx)}
      {...props}
    />
  )
}

type CommandInputProps = Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function CommandInput({ sx, ...props }: CommandInputProps) {
  return (
    <Box as="div" data-slot="command-input-wrapper" sx={styles.inputWrapper}>
      <Icon name="Search" sx={styles.searchIcon} />
      <CommandPrimitive.Input
        data-slot="command-input"
        {...stylex.props(styles.input, sx)}
        {...props}
      />
    </Box>
  )
}

type CommandListProps = Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function CommandList({ sx, ...props }: CommandListProps) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      {...stylex.props(styles.list, sx)}
      {...props}
    />
  )
}

type CommandEmptyProps = Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function CommandEmpty({ sx, ...props }: CommandEmptyProps) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      {...stylex.props(styles.empty, sx)}
      {...props}
    />
  )
}

type CommandGroupProps = Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function CommandGroup({ sx, ...props }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      {...stylex.props(styles.group, sx)}
      {...props}
    />
  )
}

type CommandLabelProps = Omit<ComponentPropsWithoutRef<typeof Box<"div">>, "as">

function CommandLabel({ sx, ...props }: CommandLabelProps) {
  return (
    <Box
      as="div"
      data-slot="command-label"
      sx={[styles.label, sx]}
      {...props}
    />
  )
}

type CommandSeparatorProps = Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function CommandSeparator({ sx, ...props }: CommandSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      {...stylex.props(styles.separator, sx)}
      {...props}
    />
  )
}

type CommandItemProps = Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function CommandItem({ sx, ...props }: CommandItemProps) {
  const disabled = props.disabled === true
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      {...stylex.props(styles.item, disabled && styles.itemDisabled, sx)}
      {...props}
    />
  )
}

type CommandShortcutProps = Omit<
  ComponentPropsWithoutRef<typeof Box<"span">>,
  "as"
>

function CommandShortcut({ sx, ...props }: CommandShortcutProps) {
  return (
    <Box
      as="span"
      data-slot="command-shortcut"
      sx={[styles.shortcut, sx]}
      {...props}
    />
  )
}

type CommandDialogProps = Omit<
  ComponentPropsWithoutRef<typeof Dialog>,
  "children"
> & {
  title?: string
  description?: string
  showCloseButton?: boolean
  children?: ReactNode
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  showCloseButton = false,
  children,
  ...props
}: CommandDialogProps) {
  const dir = useDirection()
  const dialogTransform =
    dir === "rtl" ? styles.dialogTransformRtl : styles.dialogTransformLtr
  return (
    <Dialog {...props}>
      {/* The header is a11y-only (sr-only): it satisfies Base UI's dialog-name
          requirement without visible chrome, matching shadcn's CommandDialog.
          Rendered within Dialog.Root so the Title/Description register on the
          popup via context (aria-labelledby / aria-describedby). */}
      <DialogHeader sx={styles.srOnly}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        showCloseButton={showCloseButton}
        sx={[styles.dialogContent, dialogTransform]}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandLabel,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}

export type {
  CommandDialogProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandLabelProps,
  CommandListProps,
  CommandProps,
  CommandSeparatorProps,
  CommandShortcutProps,
}
