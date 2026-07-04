import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"

import type { VariantKey } from "@/components/variants"

import { Box } from "@/components/box"
import { Icon } from "@/components/icon"
import { defineVariants } from "@/components/variants"

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
  option: {
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
  },
  optgroup: {
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
  },
})

const selectSizes = defineVariants(
  stylex.create({
    default: {
      height: `calc(${u} * 9)`,
      paddingInline: spacing.m,
      paddingInlineEnd: `calc(${u} * 10)`,
      paddingBlock: spacing.xs,
    },
    sm: {
      height: `calc(${u} * 8)`,
      paddingInline: spacing.s,
      paddingInlineEnd: `calc(${u} * 8)`,
      paddingBlock: spacing.xs,
    },
  }),
  "default"
)

const iconSizes = defineVariants(
  stylex.create({
    default: {},
    sm: {
      width: "0.75rem",
      height: "0.75rem",
    },
  }),
  "default"
)

type Size = VariantKey<typeof selectSizes>

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

function NativeSelect({ size, sx, children, ...props }: NativeSelectProps) {
  const resolvedSize = selectSizes.resolve(size)

  return (
    <Box
      as="div"
      data-slot="native-select-wrapper"
      data-size={resolvedSize}
      sx={styles.wrapper}
    >
      <SelectTag
        data-slot="native-select"
        data-size={resolvedSize}
        {...stylex.props(
          styles.select,
          selectSizes(size),
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
        sx={[styles.icon, iconSizes(size)]}
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
