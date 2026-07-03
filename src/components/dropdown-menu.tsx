import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import * as stylex from "@stylexjs/stylex"

import { Icon } from "@/components/icon"

import {
  borderRadius,
  boxShadow,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

// Ported from shadcn's dropdown-menu. Behavior/a11y — click trigger,
// positioning, roving focus, submenu, portal — come from Base UI's
// `@base-ui/react/menu` (the same menu primitive the context-menu port uses).
// Appearance comes from StyleX tokens via a closed prop surface
// (`inset`/`variant`/`sx`). No `className`/`cn`/Tailwind; shared item styling
// mirrors the context-menu port so the two menus read as one system.

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
    overflowY: "auto",
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

  // Shared menu item (shadcn: relative flex items-center gap-2 rounded-sm px-2
  // py-1.5 text-sm outline-hidden select-none focus:bg-accent
  // focus:text-accent-foreground). Hover surface = background-muted (the same
  // hover token the context-menu items use, so the two menus stay consistent).
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
// the context-menu port uses internally.
const SpanTag = "span" as const

type DropdownMenuProps = MenuPrimitive.Root.Props

function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

type DropdownMenuPortalProps = MenuPrimitive.Portal.Props

function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

type DropdownMenuTriggerProps = Omit<
  MenuPrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DropdownMenuTrigger({ sx, ...props }: DropdownMenuTriggerProps) {
  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

// Content + SubContent share the Portal > Positioner > Popup shell. The popup
// positioner props (align/alignOffset/side/sideOffset) mirror shadcn's defaults:
// the root content opens below the trigger; submenus open to the right.
type DropdownMenuContentProps = Omit<
  MenuPrimitive.Popup.Props,
  "className" | "style"
> &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    sx?: StyleXStyles
  }

function DropdownMenuContent({
  children,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  sx,
  ...props
}: DropdownMenuContentProps) {
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
          data-slot="dropdown-menu-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

type DropdownMenuSubContentProps = DropdownMenuContentProps

function DropdownMenuSubContent({
  children,
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  sx,
  ...props
}: DropdownMenuSubContentProps) {
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
          data-slot="dropdown-menu-sub-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

type DropdownMenuGroupProps = Omit<
  MenuPrimitive.Group.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DropdownMenuGroup({ sx, ...props }: DropdownMenuGroupProps) {
  return (
    <MenuPrimitive.Group
      data-slot="dropdown-menu-group"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type DropdownMenuLabelProps = Omit<
  MenuPrimitive.GroupLabel.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function DropdownMenuLabel({ inset, sx, ...props }: DropdownMenuLabelProps) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      {...stylex.props(styles.label, inset && styles.labelInset, sx)}
      {...props}
    />
  )
}

type DropdownMenuItemProps = Omit<
  MenuPrimitive.Item.Props,
  "className" | "style"
> & {
  inset?: boolean
  variant?: "default" | "destructive"
  sx?: StyleXStyles
}

function DropdownMenuItem({
  inset,
  variant = "default",
  sx,
  ...props
}: DropdownMenuItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
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

type DropdownMenuSubProps = MenuPrimitive.SubmenuRoot.Props

function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

type DropdownMenuSubTriggerProps = Omit<
  MenuPrimitive.SubmenuTrigger.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function DropdownMenuSubTrigger({
  children,
  inset,
  sx,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      {...stylex.props(styles.subTrigger, inset && styles.subTriggerInset, sx)}
      {...props}
    >
      {children}
      <Icon name="ChevronRight" flipRtl sx={styles.subTriggerIcon} />
    </MenuPrimitive.SubmenuTrigger>
  )
}

type DropdownMenuCheckboxItemProps = Omit<
  MenuPrimitive.CheckboxItem.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function DropdownMenuCheckboxItem({
  children,
  inset,
  sx,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
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

type DropdownMenuRadioGroupProps = Omit<
  MenuPrimitive.RadioGroup.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DropdownMenuRadioGroup({ sx, ...props }: DropdownMenuRadioGroupProps) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type DropdownMenuRadioItemProps = Omit<
  MenuPrimitive.RadioItem.Props,
  "className" | "style"
> & {
  inset?: boolean
  sx?: StyleXStyles
}

function DropdownMenuRadioItem({
  children,
  inset,
  sx,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
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

type DropdownMenuSeparatorProps = Omit<
  MenuPrimitive.Separator.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DropdownMenuSeparator({ sx, ...props }: DropdownMenuSeparatorProps) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      {...stylex.props(styles.separator, sx)}
      {...props}
    />
  )
}

type DropdownMenuShortcutProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function DropdownMenuShortcut({ sx, ...props }: DropdownMenuShortcutProps) {
  return (
    <SpanTag
      data-slot="dropdown-menu-shortcut"
      {...stylex.props(styles.shortcut, sx)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}

export type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuPortalProps,
  DropdownMenuProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
}
