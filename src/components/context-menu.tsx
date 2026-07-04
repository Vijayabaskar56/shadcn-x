import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
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

// Ported from shadcn's context-menu. Behavior/a11y — right-click trigger,
// positioning, roving focus, submenu, portal — come from Base UI's
// `@base-ui/react/context-menu` (a menu primitive). Appearance comes from
// StyleX tokens via a closed prop surface (`inset`/`variant`/`sx`). No
// `className`/`cn`/Tailwind; shared item styling mirrors the dropdown-menu port
// so the two menus read as one system.

const u = spacing["--spacing"]

const styles = stylex.create({
  // Positioner: isolate + raise above page content (z-50), matching shadcn.
  positioner: {
    isolation: "isolate",
    zIndex: 50,
    outline: "none",
  },

  // Content / SubContent popup (shadcn: z-50 max-h-(--available) min-w-[8rem]
  // rounded-md border bg-popover p-1 text-popover-foreground shadow-md).
  content: {
    position: "relative",
    maxHeight: "var(--available-height)",
    minWidth: `calc(${u} * 32)`, // min-w-[8rem]
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

  // Trigger wraps the right-click area; shadcn's base flavor adds select-none.
  trigger: {
    userSelect: "none",
  },

  // Shared menu item (shadcn: relative flex items-center gap-2 rounded-sm px-2
  // py-1.5 text-sm outline-hidden select-none focus:bg-accent
  // focus:text-accent-foreground). Hover surface = background-muted (the same
  // hover token Combobox items use, so the two menus stay consistent).
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
  // data-[inset]:pl-8 — self attribute selectors don't compile in StyleX, so
  // `inset` is applied conditionally here (the data-inset attr is still set for
  // consumers/devtools/tests).
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

// Variable tag so the Shortcut primitive (a plain <span>, no Base UI
// counterpart) isn't flagged by its own `no-raw-html` rule — the same technique
// Field/Textarea/Label use internally.
const SpanTag = "span" as const

const ContextMenu = ContextMenuPrimitive.Root

type ContextMenuPortalProps = ContextMenuPrimitive.Portal.Props

function ContextMenuPortal({ ...props }: ContextMenuPortalProps) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

type ContextMenuTriggerProps = Omit<
  ContextMenuPrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ContextMenuTrigger({ sx, ...props }: ContextMenuTriggerProps) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      {...stylex.props(styles.trigger, sx)}
      {...props}
    />
  )
}

// Content + SubContent share the Portal > Positioner > Popup shell. The popup
// positioner props (align/alignOffset/side/sideOffset) mirror shadcn's defaults:
// the root content opens to the right of the click point; submenus open right.
type ContextMenuContentProps = Omit<
  ContextMenuPrimitive.Popup.Props,
  "className" | "style"
> &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    sx?: StyleXStyles
  }

function ContextMenuContent({
  children,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  sx,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        >
          {children}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

type ContextMenuSubContentProps = ContextMenuContentProps

function ContextMenuSubContent({
  children,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  sx,
  ...props
}: ContextMenuSubContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-sub-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        >
          {children}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

type ContextMenuGroupProps = Omit<
  ContextMenuPrimitive.Group.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ContextMenuGroup({ sx, ...props }: ContextMenuGroupProps) {
  return (
    <ContextMenuPrimitive.Group
      data-slot="context-menu-group"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type ContextMenuLabelProps = Omit<
  ContextMenuPrimitive.GroupLabel.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function ContextMenuLabel({ inset, sx, ...props }: ContextMenuLabelProps) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      {...stylex.props(styles.label, inset && styles.labelInset, sx)}
      {...props}
    />
  )
}

type ContextMenuItemProps = Omit<
  ContextMenuPrimitive.Item.Props,
  "className" | "style"
> & {
  inset?: boolean
  variant?: "default" | "destructive"
  sx?: StyleXStyles
}

function ContextMenuItem({
  inset,
  variant = "default",
  sx,
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
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

type ContextMenuSubProps = ContextMenuPrimitive.SubmenuRoot.Props

function ContextMenuSub({ ...props }: ContextMenuSubProps) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  )
}

type ContextMenuSubTriggerProps = Omit<
  ContextMenuPrimitive.SubmenuTrigger.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function ContextMenuSubTrigger({
  children,
  inset,
  sx,
  ...props
}: ContextMenuSubTriggerProps) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      {...stylex.props(styles.subTrigger, inset && styles.subTriggerInset, sx)}
      {...props}
    >
      {children}
      <Icon name="ChevronRight" flipRtl sx={styles.subTriggerIcon} />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

type ContextMenuCheckboxItemProps = Omit<
  ContextMenuPrimitive.CheckboxItem.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function ContextMenuCheckboxItem({
  children,
  inset,
  sx,
  ...props
}: ContextMenuCheckboxItemProps) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      {...stylex.props(styles.item, styles.itemCheckRadio, sx)}
      {...props}
    >
      <SpanTag {...stylex.props(styles.itemIndicator)}>
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <Icon name="Check" />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </SpanTag>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

type ContextMenuRadioGroupProps = Omit<
  ContextMenuPrimitive.RadioGroup.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ContextMenuRadioGroup({ sx, ...props }: ContextMenuRadioGroupProps) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type ContextMenuRadioItemProps = Omit<
  ContextMenuPrimitive.RadioItem.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function ContextMenuRadioItem({
  children,
  inset,
  sx,
  ...props
}: ContextMenuRadioItemProps) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      {...stylex.props(styles.item, styles.itemCheckRadio, sx)}
      {...props}
    >
      <SpanTag {...stylex.props(styles.itemIndicator)}>
        <ContextMenuPrimitive.RadioItemIndicator>
          <Icon name="Check" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </SpanTag>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

type ContextMenuSeparatorProps = Omit<
  ContextMenuPrimitive.Separator.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ContextMenuSeparator({ sx, ...props }: ContextMenuSeparatorProps) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      {...stylex.props(styles.separator, sx)}
      {...props}
    />
  )
}

type ContextMenuShortcutProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ContextMenuShortcut({ sx, ...props }: ContextMenuShortcutProps) {
  return (
    <SpanTag
      data-slot="context-menu-shortcut"
      {...stylex.props(styles.shortcut, sx)}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
}

export type {
  ContextMenuCheckboxItemProps,
  ContextMenuContentProps,
  ContextMenuGroupProps,
  ContextMenuItemProps,
  ContextMenuLabelProps,
  ContextMenuPortalProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuSeparatorProps,
  ContextMenuShortcutProps,
  ContextMenuSubContentProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuTriggerProps,
}
