import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"

import { Box } from "@/components/box"
import { Icon } from "@/components/icon"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  focusRing,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

type Size = "default" | "sm"

const styles = stylex.create({
  wrapper: {
    position: "relative",
    width: "fit-content",
  },
  select: {
    display: "flex",
    width: "100%",
    minWidth: `calc(${u} * 20)`,
    appearance: "none",
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: colors.input,
      ":focus-visible": colors.ring,
    },
    backgroundColor: colors["background-input"],
    color: colors["text-primary"],
    fontSize: {
      default: fontSize.m,
      "@media (min-width: 768px)": fontSize.s,
    },
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
    boxShadow: {
      default: boxShadow.s,
      ":focus-visible": `${boxShadow.s}, ${focusRing.ring}`,
    },
    transitionProperty: "color, box-shadow, border-color",
    transitionDuration: duration.fast,
    outline: "none",
    cursor: "pointer",
    "::placeholder": {
      color: colors["muted-foreground"],
    },
    "::selection": {
      backgroundColor: colors.primary,
      color: colors["primary-foreground"],
    },
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
    pointerEvents: {
      default: null,
      ":disabled": "none",
    },
    // Native arrow is hidden by appearance: none; custom chevron fills in.
  },
  selectDefault: {
    height: `calc(${u} * 9)`,
    paddingInline: spacing.m,
    paddingInlineEnd: `calc(${u} * 10)`,
    paddingBlock: spacing.xs,
  },
  selectSm: {
    height: `calc(${u} * 8)`,
    paddingInline: spacing.s,
    paddingInlineEnd: `calc(${u} * 8)`,
    paddingBlock: spacing.xs,
  },
  icon: {
    position: "absolute",
    insetInlineEnd: spacing.m,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    flexShrink: 0,
    width: "1rem",
    height: "1rem",
    color: colors["text-primary"],
  },
  iconSm: {
    width: "0.75rem",
    height: "0.75rem",
  },
  option: {
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
  },
  optgroup: {
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
  },
})

const selectSizeStyles = {
  default: styles.selectDefault,
  sm: styles.selectSm,
} satisfies Record<Size, StyleXStyles>

const iconSizeStyles = {
  default: styles.icon,
  sm: [styles.icon, styles.iconSm],
} satisfies Record<Size, StyleXStyles | StyleXStyles[]>

// Variable tags so these defining primitives aren't flagged by their own
// `no-raw-html` rule (the same technique Box/Textarea use internally).
const SelectTag = "select" as const
const OptionTag = "option" as const
const OptGroupTag = "optgroup" as const

type NativeSelectProps = Omit<
  React.ComponentPropsWithoutRef<"select">,
  "className" | "style" | "color" | "size"
> & {
  size?: Size
  sx?: StyleXStyles
}

function NativeSelect({
  size = "default",
  sx,
  children,
  ...props
}: NativeSelectProps) {
  return (
    <Box
      as="div"
      data-slot="native-select-wrapper"
      data-size={size}
      sx={styles.wrapper}
    >
      <SelectTag
        data-slot="native-select"
        data-size={size}
        {...stylex.props(
          styles.select,
          selectSizeStyles[size],
          sx,
          stylex.defaultMarker()
        )}
        {...props}
      >
        {children}
      </SelectTag>
      <Icon
        name="ChevronDown"
        data-slot="native-select-icon"
        sx={iconSizeStyles[size]}
      />
    </Box>
  )
}

function NativeSelectOption({
  ...props
}: React.ComponentPropsWithoutRef<"option">) {
  return (
    <OptionTag
      data-slot="native-select-option"
      {...stylex.props(styles.option)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  ...props
}: React.ComponentPropsWithoutRef<"optgroup">) {
  return (
    <OptGroupTag
      data-slot="native-select-optgroup"
      {...stylex.props(styles.optgroup)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOption, NativeSelectOptGroup }
export type { NativeSelectProps, Size as NativeSelectSize }
