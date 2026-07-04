import type { StyleXStyles } from "@stylexjs/stylex"

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import * as stylex from "@stylexjs/stylex"

import { Icon } from "@/components/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/input-group"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  focusRing,
  fontSize,
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
    height: `calc(${u} * 9)`,
    userSelect: "none",
  },
  inputTrigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: {
      default: colors["text-secondary"],
      ":hover": colors["text-primary"],
    },
    padding: 0,
    width: `calc(${u} * 6)`,
    height: `calc(${u} * 6)`,
    borderRadius: borderRadius.s,
    transitionProperty: "color",
    transitionDuration: duration.fast,
  },

  inputClear: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: {
      default: colors["text-secondary"],
      ":hover": colors["text-primary"],
    },
    padding: 0,
    width: `calc(${u} * 6)`,
    height: `calc(${u} * 6)`,
    borderRadius: borderRadius.s,
    transitionProperty: "color",
    transitionDuration: duration.fast,
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
    overflowY: "auto",
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
    boxShadow: boxShadow.l,
  },

  list: {
    overflowY: "auto",
    overscrollBehavior: "contain",
    padding: spacing.xs,
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

  label: {
    paddingInline: spacing.s,
    paddingBlock: `calc(${u} * 1.5)`,
    fontSize: fontSize.xs,
    color: colors["muted-foreground"],
  },

  empty: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    padding: spacing.m,
    fontSize: fontSize.s,
    color: colors["muted-foreground"],
    textAlign: "center",
  },

  separator: {
    pointerEvents: "none",
    marginInline: `calc(${u} * -1)`,
    marginBlock: `calc(${u} * 1)`,
    height: 1,
    backgroundColor: colors["border-primary"],
  },

  chips: {
    display: "flex",
    minHeight: `calc(${u} * 9)`,
    flexWrap: "wrap",
    alignItems: "center",
    gap: `calc(${u} * 1.5)`,
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: colors.input,
      ":focus-within": colors.ring,
    },
    backgroundColor: colors["background-input"],
    paddingInline: spacing.s,
    paddingBlock: `calc(${u} * 1.5)`,
    fontSize: fontSize.s,
    boxShadow: {
      default: boxShadow.s,
      ":focus-within": `${boxShadow.s}, ${focusRing.ring}`,
    },
    outline: "none",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration.fast,
  },

  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: `calc(${u} * 1)`,
    borderRadius: borderRadius.s,
    backgroundColor: colors["background-muted"],
    paddingInlineStart: spacing.s,
    paddingInlineEnd: 0,
    paddingBlock: 0,
    height: `calc(${u} * 5.5)`,
    fontSize: fontSize.xs,
    fontWeight: "medium",
    lineHeight: 1,
    userSelect: "none",
  },
  chipRemove: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: {
      default: colors["text-secondary"],
      ":hover": colors["text-primary"],
    },
    padding: 0,
    width: `calc(${u} * 4)`,
    height: `calc(${u} * 4)`,
    borderRadius: borderRadius.full,
    transitionProperty: "color",
    transitionDuration: duration.fast,
  },

  chipsInput: {
    minWidth: `calc(${u} * 16)`,
    flex: 1,
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    fontSize: fontSize.s,
    color: colors["text-primary"],
    "::placeholder": {
      color: colors["muted-foreground"],
    },
  },

  value: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: `calc(${u} * 2)`,
  },
})

const Combobox = ComboboxPrimitive.Root

type ComboboxValueProps = Omit<
  ComboboxPrimitive.Value.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxValue({ sx, ...props }: ComboboxValueProps) {
  return (
    <ComboboxPrimitive.Value
      data-slot="combobox-value"
      {...stylex.props(styles.value, sx)}
      {...props}
    />
  )
}

type ComboboxTriggerProps = Omit<
  ComboboxPrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxTrigger({ sx, children, ...props }: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      {...stylex.props(styles.trigger, sx)}
      {...props}
    >
      {children}
      <Icon name="ChevronDown" flipRtl />
    </ComboboxPrimitive.Trigger>
  )
}

type ComboboxClearProps = Omit<
  ComboboxPrimitive.Clear.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxClear({ sx, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      {...stylex.props(sx)}
      {...props}
    >
      <Icon name="X" />
    </ComboboxPrimitive.Clear>
  )
}

type ComboboxInputProps = Omit<
  ComboboxPrimitive.Input.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
  showTrigger?: boolean
  showClear?: boolean
}

function ComboboxInput({
  sx,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxInputProps) {
  return (
    <InputGroup sx={sx}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <ComboboxPrimitive.Trigger
            disabled={disabled}
            {...stylex.props(styles.inputTrigger)}
          >
            <Icon name="ChevronDown" flipRtl />
          </ComboboxPrimitive.Trigger>
        )}
        {showClear && (
          <ComboboxPrimitive.Clear
            disabled={disabled}
            {...stylex.props(styles.inputClear)}
          >
            <Icon name="X" />
          </ComboboxPrimitive.Clear>
        )}
      </InputGroupAddon>
    </InputGroup>
  )
}

type ComboboxContentProps = Omit<
  ComboboxPrimitive.Popup.Props,
  "className" | "style"
> &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "anchor"
  > & {
    sx?: StyleXStyles
  }

function ComboboxContent({
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  sx,
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        {...stylex.props(styles.positioner)}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

type ComboboxListProps = Omit<
  ComboboxPrimitive.List.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxList({ sx, ...props }: ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      {...stylex.props(styles.list, sx)}
      {...props}
    />
  )
}

type ComboboxItemProps = Omit<
  ComboboxPrimitive.Item.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxItem({ sx, children, ...props }: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      {...stylex.props(styles.item, sx)}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator {...stylex.props(styles.itemIndicator)}>
        <Icon name="Check" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

type ComboboxGroupProps = Omit<
  ComboboxPrimitive.Group.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxGroup({ sx, ...props }: ComboboxGroupProps) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type ComboboxLabelProps = Omit<
  ComboboxPrimitive.GroupLabel.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxLabel({ sx, ...props }: ComboboxLabelProps) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      {...stylex.props(styles.label, sx)}
      {...props}
    />
  )
}

type ComboboxCollectionProps = Omit<
  ComboboxPrimitive.Collection.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxCollection({ sx, ...props }: ComboboxCollectionProps) {
  return (
    <ComboboxPrimitive.Collection
      data-slot="combobox-collection"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type ComboboxEmptyProps = Omit<
  ComboboxPrimitive.Empty.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxEmpty({ sx, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      {...stylex.props(styles.empty, sx)}
      {...props}
    />
  )
}

type ComboboxSeparatorProps = Omit<
  ComboboxPrimitive.Separator.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxSeparator({ sx, ...props }: ComboboxSeparatorProps) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      {...stylex.props(styles.separator, sx)}
      {...props}
    />
  )
}

type ComboboxChipsProps = Omit<
  ComboboxPrimitive.Chips.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxChips({ sx, ...props }: ComboboxChipsProps) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      {...stylex.props(styles.chips, sx)}
      {...props}
    />
  )
}

type ComboboxChipProps = Omit<
  ComboboxPrimitive.Chip.Props,
  "className" | "style"
> & {
  value: string
  sx?: StyleXStyles
  showRemove?: boolean
}

function ComboboxChip({
  sx,
  children,
  showRemove = true,
  ...props
}: ComboboxChipProps) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      {...stylex.props(styles.chip, sx)}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          {...stylex.props(styles.chipRemove)}
          data-slot="combobox-chip-remove"
        >
          <Icon name="X" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

type ComboboxChipsInputProps = Omit<
  ComboboxPrimitive.Input.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function ComboboxChipsInput({ sx, ...props }: ComboboxChipsInputProps) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      {...stylex.props(styles.chipsInput, sx)}
      {...props}
    />
  )
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
}

export type {
  ComboboxChipProps,
  ComboboxChipsInputProps,
  ComboboxChipsProps,
  ComboboxClearProps,
  ComboboxCollectionProps,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxListProps,
  ComboboxSeparatorProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
}
