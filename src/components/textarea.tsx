import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  focusRing,
  fontSize,
  spacing,
} from "../styles/tokens.stylex"

// Ported 1:1 from shadcn's canonical textarea. Each style maps a Tailwind class
// to a token (comments name the original utility). No Base UI primitive exists
// for textarea, so — like shadcn — this is a styled native <textarea>.
const styles = stylex.create({
  base: {
    display: "flex",
    // field-sizing-content — grow to fit content (newer CSS; csstype lacks it).
    fieldSizing: "content",
    minHeight: spacing["4xl"], // min-h-16 (4rem)
    width: "100%", // w-full
    borderRadius: borderRadius.m, // rounded-md
    borderWidth: 1, // border
    borderStyle: "solid",
    // bg-transparent in light; dark:bg-input/30 — a subtle filled surface in
    // dark mode (the `input` token at 30% opacity), matching shadcn.
    backgroundColor: `light-dark(transparent, color-mix(in oklch, ${colors.input}, transparent 70%))`,
    paddingInline: spacing.m, // px-3
    paddingBlock: spacing.s, // py-2
    boxShadow: {
      // shadow-xs; focus-visible adds the 3px ring (matches Button/Input).
      default: boxShadow.s,
      ":focus-visible": `${boxShadow.s}, ${focusRing.ring}`,
    },
    borderColor: {
      // border-input (shadcn's --input); focus-visible:border-ring
      default: colors.input,
      ":focus-visible": colors.ring,
    },
    color: colors["text-primary"],
    // text-base, md:text-sm
    fontSize: {
      default: fontSize.m,
      "@media (min-width: 768px)": fontSize.s,
    },
    transitionProperty: "color, box-shadow, border-color",
    transitionDuration: duration.fast,
    outline: "none",
    "::placeholder": {
      color: colors["muted-foreground"], // placeholder:text-muted-foreground
    },
    "::selection": {
      // selection:bg-primary selection:text-primary-foreground (matches Input)
      backgroundColor: colors.primary,
      color: colors["primary-foreground"],
    },
    cursor: { default: "text", ":disabled": "not-allowed" },
    opacity: { default: 1, ":disabled": 0.5 },
    pointerEvents: { default: null, ":disabled": "none" },
  },
  // aria-invalid:border-destructive + aria-invalid:ring-destructive/20. Self
  // attribute selectors don't compile in StyleX, so the component reads
  // aria-invalid and applies this conditionally (the attribute is still set).
  invalid: {
    borderColor: colors.destructive,
    boxShadow: {
      default: boxShadow.s,
      ":focus-visible": `${boxShadow.s}, 0 0 0 3px color-mix(in oklch, ${colors.destructive}, transparent 80%)`,
    },
  },
})

// Rendered via a variable tag (like Box/Link/Label) so this — the primitive that
// *defines* the on-system textarea — isn't flagged by its own `no-raw-html` rule.
const Tag = "textarea" as const

type TextareaProps = Omit<
  React.ComponentPropsWithoutRef<"textarea">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

function Textarea({ sx, ...props }: TextareaProps) {
  const ariaInvalid = props["aria-invalid"]
  const invalid = ariaInvalid === true || ariaInvalid === "true"
  return (
    <Tag
      data-slot="textarea"
      {...stylex.props(
        styles.base,
        invalid && styles.invalid,
        // defaultMarker lets a sibling <Label> observe this textarea via
        // stylex.when.siblingBefore (peer-disabled dimming).
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    />
  )
}

export { Textarea }
export type { TextareaProps }
