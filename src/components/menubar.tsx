import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import * as stylex from "@stylexjs/stylex"

import { Icon } from "@/components/icon"

import {
  borderRadius,
  boxShadow,
  colors,
  fontSize,
  fontWeight,
  scroll,
  spacing,
} from "../styles/tokens.stylex"

// Ported from shadcn menubar on Base UI menubar + menu. Closed prop surface
// (inset/variant/sx). Shared item styling mirrors context-menu for consistency.

const u = spacing["--spacing"]

const styles = stylex.create({
  // Root: a horizontal bar of menu triggers (shadcn: flex h-9 items-center
  // gap-1 rounded-md border bg-background p-1 shadow-xs).
  root: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs, // gap-1
    height: `calc(${u} * 9)`, // h-9
    borderRadius: borderRadius.m, // rounded-md
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"], // border
    backgroundColor: colors["background-primary"], // bg-background
    padding: spacing.xs, // p-1
    boxShadow: boxShadow.s, // shadow-xs
  },

  // Trigger menuitem: flex items-center rounded-sm px-2 py-1 text-sm font-medium;
  // hover = background-muted (matches items). Self data-attr sel drop → hover-only.
  trigger: {
    display: "flex",
    alignItems: "center",
    borderRadius: borderRadius.s, // rounded-sm
    paddingInline: `calc(${u} * 2)`, // px-2
    paddingBlock: `calc(${u} * 1)`, // py-1
    fontSize: fontSize.s, // text-sm
    fontWeight: fontWeight.medium, // font-medium
    outline: "none",
    userSelect: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
    color: colors["text-primary"],
  },

  // Positioner: isolate + raise above page content (z-50), matching shadcn.
  positioner: {
    isolation: "isolate",
    zIndex: 50,
    outline: "none",
  },

  // Content popup: z-50 min-w-[12rem] rounded-md border bg-popover p-1 shadow-md
  content: {
    position: "relative",
    maxHeight: "var(--available-height)",
    minWidth: `calc(${u} * 48)`, // min-w-[12rem]
    overflowX: "hidden",
    overflowY: scroll.auto,
    borderRadius: borderRadius.m, // rounded-md
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
    padding: spacing.xs, // p-1
    boxShadow: boxShadow.m, // shadow-md
    outline: "none",
  },

  // Shared menu item: relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm; hover=background-muted
  item: {
    display: "flex",
    position: "relative",
    cursor: "default",
    alignItems: "center",
    gap: `calc(${u} * 2)`, // gap-2
    borderRadius: borderRadius.s, // rounded-sm
    paddingInline: `calc(${u} * 2)`, // px-2
    paddingBlock: `calc(${u} * 1.5)`, // py-1.5
    fontSize: fontSize.s, // text-sm
    outline: "none",
    userSelect: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
    color: colors["text-primary"],
    opacity: { default: 1, ":disabled": 0.5 },
    pointerEvents: { default: null, ":disabled": "none" },
  },
  // data-[inset]:pl-8 → StyleX drops self data-attr sel → `inset` applied conditionally
  itemInset: {
    paddingInlineStart: `calc(${u} * 8)`, // pl-8
  },
  // data-[variant=destructive]:text-destructive + focus:bg-destructive/10.
  itemDestructive: {
    color: colors.destructive,
    backgroundColor: {
      default: "transparent",
      ":hover": `color-mix(in oklch, ${colors.destructive}, transparent 90%)`, // destructive/10
    },
  },

  // Checkbox/radio items reserve a left gutter (pl-8 pr-2) for the indicator.
  itemCheckRadio: {
    paddingInlineStart: `calc(${u} * 8)`, // pl-8
    paddingInlineEnd: `calc(${u} * 2)`, // pr-2
  },
  // The absolutely positioned indicator slot (shadcn: absolute left-2 flex
  // size-3.5 pointer-events-none).
  itemIndicator: {
    position: "absolute",
    insetInlineStart: `calc(${u} * 2)`, // left-2
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: `calc(${u} * 3.5)`, // size-3.5
    height: `calc(${u} * 3.5)`,
    pointerEvents: "none",
  },

  // Submenu trigger — item-like, but a trailing chevron is pushed to the end.
  subTrigger: {
    display: "flex",
    position: "relative",
    cursor: "default",
    alignItems: "center",
    gap: `calc(${u} * 2)`,
    borderRadius: borderRadius.s,
    paddingInline: `calc(${u} * 2)`,
    paddingBlock: `calc(${u} * 1.5)`,
    fontSize: fontSize.s,
    outline: "none",
    userSelect: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
    color: colors["text-primary"],
  },
  subTriggerInset: {
    paddingInlineStart: `calc(${u} * 8)`, // pl-8
  },
  // ml-auto on the chevron pushes it to the trailing edge of the flex row.
  subTriggerIcon: {
    marginInlineStart: "auto",
  },

  // Label (shadcn: px-2 py-1.5 text-sm font-medium text-foreground).
  label: {
    paddingInline: `calc(${u} * 2)`,
    paddingBlock: `calc(${u} * 1.5)`,
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    color: colors["text-primary"],
  },
  labelInset: {
    paddingInlineStart: `calc(${u} * 8)`, // pl-8
  },

  // Separator (shadcn: -mx-1 my-1 h-px bg-border).
  separator: {
    pointerEvents: "none",
    marginInline: `calc(${u} * -1)`, // -mx-1
    marginBlock: `calc(${u} * 1)`, // my-1
    height: "1px", // h-px
    backgroundColor: colors["border-primary"], // bg-border
  },

  // Shortcut (shadcn: ml-auto text-xs tracking-widest text-muted-foreground).
  shortcut: {
    marginInlineStart: "auto", // ml-auto
    fontSize: fontSize.xs, // text-xs
    letterSpacing: "0.1em", // tracking-widest
    color: colors["muted-foreground"], // text-muted-foreground
  },
})

// SpanTag so Shortcut (<span>) isn't flagged by `no-raw-html`;
// same technique Field/Textarea/Label/context-menu use.
const SpanTag = "span" as const

type MenubarProps = Omit<MenubarPrimitive.Props, "className" | "style"> & {
  sx?: StyleXStyles
}

function Menubar({ sx, ...props }: MenubarProps) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      {...stylex.props(styles.root, sx)}
      {...props}
    />
  )
}

type MenubarMenuProps = MenuPrimitive.Root.Props

function MenubarMenu({ ...props }: MenubarMenuProps) {
  return <MenuPrimitive.Root data-slot="menubar-menu" {...props} />
}

type MenubarPortalProps = MenuPrimitive.Portal.Props

function MenubarPortal({ ...props }: MenubarPortalProps) {
  return <MenuPrimitive.Portal data-slot="menubar-portal" {...props} />
}

type MenubarTriggerProps = Omit<
  MenuPrimitive.Trigger.Props<unknown>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function MenubarTrigger({ sx, ...props }: MenubarTriggerProps) {
  return (
    <MenuPrimitive.Trigger
      data-slot="menubar-trigger"
      {...stylex.props(styles.trigger, sx)}
      {...props}
    />
  )
}

// Content + SubContent share Portal > Positioner > Popup; root below trigger (alignOffset=-4), submenus side
type MenubarContentProps = Omit<
  MenuPrimitive.Popup.Props,
  "className" | "style"
> &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    sx?: StyleXStyles
  }

function MenubarContent({
  children,
  align = "start",
  alignOffset = -4,
  side = "bottom",
  sideOffset = 8,
  sx,
  ...props
}: MenubarContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <MenuPrimitive.Popup
          data-slot="menubar-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

type MenubarSubContentProps = MenubarContentProps

function MenubarSubContent({
  children,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  sx,
  ...props
}: MenubarSubContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <MenuPrimitive.Popup
          data-slot="menubar-sub-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

type MenubarGroupProps = Omit<
  MenuPrimitive.Group.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function MenubarGroup({ sx, ...props }: MenubarGroupProps) {
  return (
    <MenuPrimitive.Group
      data-slot="menubar-group"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type MenubarLabelProps = Omit<
  MenuPrimitive.GroupLabel.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function MenubarLabel({ inset, sx, ...props }: MenubarLabelProps) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menubar-label"
      data-inset={inset}
      {...stylex.props(styles.label, inset && styles.labelInset, sx)}
      {...props}
    />
  )
}

type MenubarItemProps = Omit<
  MenuPrimitive.Item.Props,
  "className" | "style"
> & {
  inset?: boolean
  variant?: "default" | "destructive"
  sx?: StyleXStyles
}

function MenubarItem({
  inset,
  variant = "default",
  sx,
  ...props
}: MenubarItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      {...stylex.props(
        styles.item,
        inset && styles.itemInset,
        variant === "destructive" && styles.itemDestructive,
        sx
      )}
      {...props}
    />
  )
}

type MenubarSubProps = MenuPrimitive.SubmenuRoot.Props

function MenubarSub({ ...props }: MenubarSubProps) {
  return <MenuPrimitive.SubmenuRoot data-slot="menubar-sub" {...props} />
}

type MenubarSubTriggerProps = Omit<
  MenuPrimitive.SubmenuTrigger.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function MenubarSubTrigger({
  children,
  inset,
  sx,
  ...props
}: MenubarSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      {...stylex.props(styles.subTrigger, inset && styles.subTriggerInset, sx)}
      {...props}
    >
      {children}
      <Icon name="ChevronRight" flipRtl sx={styles.subTriggerIcon} />
    </MenuPrimitive.SubmenuTrigger>
  )
}

type MenubarCheckboxItemProps = Omit<
  MenuPrimitive.CheckboxItem.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function MenubarCheckboxItem({
  children,
  inset,
  sx,
  ...props
}: MenubarCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      data-inset={inset}
      {...stylex.props(styles.item, styles.itemCheckRadio, sx)}
      {...props}
    >
      <SpanTag {...stylex.props(styles.itemIndicator)}>
        <MenuPrimitive.CheckboxItemIndicator>
          <Icon name="Check" />
        </MenuPrimitive.CheckboxItemIndicator>
      </SpanTag>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

type MenubarRadioGroupProps = Omit<
  MenuPrimitive.RadioGroup.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function MenubarRadioGroup({ sx, ...props }: MenubarRadioGroupProps) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="menubar-radio-group"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type MenubarRadioItemProps = Omit<
  MenuPrimitive.RadioItem.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function MenubarRadioItem({
  children,
  inset,
  sx,
  ...props
}: MenubarRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menubar-radio-item"
      data-inset={inset}
      {...stylex.props(styles.item, styles.itemCheckRadio, sx)}
      {...props}
    >
      <SpanTag {...stylex.props(styles.itemIndicator)}>
        <MenuPrimitive.RadioItemIndicator>
          <Icon name="Check" />
        </MenuPrimitive.RadioItemIndicator>
      </SpanTag>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

type MenubarSeparatorProps = Omit<
  MenuPrimitive.Separator.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function MenubarSeparator({ sx, ...props }: MenubarSeparatorProps) {
  return (
    <MenuPrimitive.Separator
      data-slot="menubar-separator"
      {...stylex.props(styles.separator, sx)}
      {...props}
    />
  )
}

type MenubarShortcutProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function MenubarShortcut({ sx, ...props }: MenubarShortcutProps) {
  return (
    <SpanTag
      data-slot="menubar-shortcut"
      {...stylex.props(styles.shortcut, sx)}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}

export type {
  MenubarCheckboxItemProps,
  MenubarContentProps,
  MenubarGroupProps,
  MenubarItemProps,
  MenubarLabelProps,
  MenubarMenuProps,
  MenubarPortalProps,
  MenubarProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarSeparatorProps,
  MenubarShortcutProps,
  MenubarSubContentProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
  MenubarTriggerProps,
}
