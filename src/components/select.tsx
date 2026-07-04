import type { StyleXStyles } from "@stylexjs/stylex"

import { Select as SelectPrimitive } from "@base-ui/react/select"
import * as stylex from "@stylexjs/stylex"

import { Icon } from "@/components/icon"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  focusRing,
  fontSize,
  scroll,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

const styles = stylex.create({
  trigger: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    whiteSpace: "nowrap",
    gap: `calc(${u} * 2)`,
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: colors.input,
      ":focus-visible": colors.ring,
    },
    backgroundColor: colors["background-input"],
    paddingInline: spacing.m,
    paddingBlock: `calc(${u} * 2)`,
    fontSize: fontSize.s,
    boxShadow: {
      default: boxShadow.s,
      ":focus-visible": `${boxShadow.s}, ${focusRing.ring}`,
    },
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration.fast,
    outline: "none",
    cursor: {
      default: "pointer",
      ":disabled": "not-allowed",
    },
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
    pointerEvents: {
      default: null,
      ":disabled": "none",
    },
    width: "fit-content",
    minWidth: 0,
    userSelect: "none",
  },
  triggerSizeDefault: {
    height: `calc(${u} * 9)`,
  },
  triggerSizeSm: {
    height: `calc(${u} * 8)`,
  },
  // Style SelectValue directly (not via when.descendant on trigger) —
  // marker-free; when.descendant would need SelectValue to carry defaultMarker().
  selectValue: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: `calc(${u} * 2)`,
  },
  positioner: {
    isolation: "isolate",
    zIndex: 50,
  },

  content: {
    position: "relative",
    maxHeight: "var(--available-height)",
    width: "var(--anchor-width)",
    overflowX: "hidden",
    overflowY: scroll.auto,
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
    boxShadow: boxShadow.l,
  },

  label: {
    paddingInline: spacing.s,
    paddingBlock: `calc(${u} * 1.5)`,
    fontSize: fontSize.xs,
    color: colors["muted-foreground"],
  },

  item: {
    display: "flex",
    width: "100%",
    cursor: "default",
    alignItems: "center",
    gap: `calc(${u} * 2)`,
    borderRadius: borderRadius.s,
    paddingBlock: `calc(${u} * 1.5)`,
    paddingInlineStart: `calc(${u} * 2)`,
    paddingInlineEnd: `calc(${u} * 8)`,
    fontSize: fontSize.s,
    outline: "none",
    userSelect: "none",
    position: "relative",
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
    color: colors["text-primary"],
  },
  itemIndicator: {
    position: "absolute",
    insetInlineEnd: `calc(${u} * 2)`,
    display: "flex",
    height: `calc(${u} * 3.5)`,
    width: `calc(${u} * 3.5)`,
    alignItems: "center",
    justifyContent: "center",
  },

  separator: {
    pointerEvents: "none",
    marginInline: `calc(${u} * -1)`,
    marginBlock: `calc(${u} * 1)`,
    height: 1,
    backgroundColor: colors["border-primary"],
  },

  scrollButton: {
    display: "flex",
    cursor: "default",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: spacing.xs,
  },
})

const Select = SelectPrimitive.Root

type SelectGroupProps = Omit<
  SelectPrimitive.Group.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SelectGroup({ sx, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type SelectValueProps = Omit<
  SelectPrimitive.Value.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SelectValue({ sx, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      {...stylex.props(styles.selectValue, sx)}
      {...props}
    />
  )
}

type SelectTriggerProps = Omit<
  SelectPrimitive.Trigger.Props,
  "className" | "style"
> & {
  size?: "sm" | "default"
  sx?: StyleXStyles
}

function SelectTrigger({
  size = "default",
  sx,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      {...stylex.props(
        styles.trigger,
        size === "default" && styles.triggerSizeDefault,
        size === "sm" && styles.triggerSizeSm,
        sx
      )}
      {...props}
    >
      {children}
      <Icon name="ChevronDown" flipRtl />
    </SelectPrimitive.Trigger>
  )
}

type SelectContentProps = Omit<
  SelectPrimitive.Popup.Props,
  "className" | "style"
> &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  > & {
    sx?: StyleXStyles
  }

function SelectContent({
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  sx,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        {...stylex.props(styles.positioner)}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

type SelectLabelProps = Omit<
  SelectPrimitive.GroupLabel.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SelectLabel({ sx, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      {...stylex.props(styles.label, sx)}
      {...props}
    />
  )
}

type SelectItemProps = Omit<
  SelectPrimitive.Item.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SelectItem({ sx, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      {...stylex.props(styles.item, sx)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator {...stylex.props(styles.itemIndicator)}>
        <Icon name="Check" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

type SelectSeparatorProps = Omit<
  SelectPrimitive.Separator.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SelectSeparator({ sx, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      {...stylex.props(styles.separator, sx)}
      {...props}
    />
  )
}

type SelectScrollUpButtonProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SelectScrollUpButton({ sx, ...props }: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      {...stylex.props(styles.scrollButton, sx)}
      {...props}
    >
      <Icon name="ChevronUp" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

type SelectScrollDownButtonProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function SelectScrollDownButton({ sx, ...props }: SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      {...stylex.props(styles.scrollButton, sx)}
      {...props}
    >
      <Icon name="ChevronDown" flipRtl />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

export type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
}
