import type { StyleXStyles } from "@stylexjs/stylex"

import { Input as InputPrimitive } from "@base-ui/react/input"
import * as stylex from "@stylexjs/stylex"

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

// The single spacing knob (CSS `--spacing`); input dimensions are multiples of
// it, so they re-scale with the spacing token — matching Tailwind/shadcn sizing.
const u = spacing["--spacing"]

// Ported 1:1 from shadcn's canonical input. Behavior/a11y (incl. Field
// integration + a typed `onValueChange`) come from Base UI's Input primitive;
// each style maps a Tailwind class to a token (comments name the original
// utility). (Textarea stays a native element — Base UI ships no textarea.)
const styles = stylex.create({
  base: {
    display: "flex",
    width: "100%", // w-full
    minWidth: 0, // min-w-0
    height: `calc(${u} * 9)`, // h-9 (2.25rem)
    borderRadius: borderRadius.m, // rounded-md
    borderWidth: 1, // border
    borderStyle: "solid",
    // bg-transparent in light; dark:bg-input/30 — a subtle filled surface in
    // dark mode (the shared `background-input` surface token), matching shadcn.
    backgroundColor: colors["background-input"],
    paddingInline: spacing.m, // px-3
    paddingBlock: spacing.xs, // py-1
    boxShadow: {
      // shadow-xs; focus-visible adds the 3px ring (matches Textarea).
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
      // selection:bg-primary selection:text-primary-foreground
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
      ":focus-visible": `${boxShadow.s}, ${focusRing.invalidRing}`,
    },
  },
  // Hide the native up/down spinners Chrome/Safari render on <input type="number">
  // (`appearance: textfield` covers Firefox; the ::-webkit-*-spin-button rules
  // cover WebKit). Applied only when type="number" — a no-op on every other type.
  number: {
    appearance: "textfield",
    "::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },
  // <input type="file">: style the native file-picker button (shadcn's file:*
  // utilities) so it isn't the browser-default chunky control — inline-flex,
  // transparent, sized to match the field. Applied only when type="file".
  file: {
    "::file-selector-button": {
      display: "inline-flex", // file:inline-flex
      height: `calc(${u} * 7)`, // file:h-7
      marginInlineEnd: spacing.s, // file:mr-2
      borderWidth: 0, // file:border-0
      backgroundColor: "transparent", // file:bg-transparent
      fontSize: fontSize.s, // file:text-sm
      fontWeight: fontWeight.medium, // file:font-medium
      color: colors["text-primary"], // file:text-foreground
    },
  },
})

// Rendered via the Base UI Input primitive (a component identifier, not a raw
// `<input>` tag) so this — the primitive that *defines* the on-system input —
// isn't flagged by its own `no-raw-html` rule.
type InputProps = Omit<
  InputPrimitive.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

function Input({ type = "text", sx, ...props }: InputProps) {
  const ariaInvalid = props["aria-invalid"]
  const invalid = ariaInvalid === true || ariaInvalid === "true"
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      {...stylex.props(
        styles.base,
        invalid && styles.invalid,
        type === "number" && styles.number,
        type === "file" && styles.file,
        // defaultMarker lets a sibling <Label> observe this input via
        // stylex.when.siblingBefore (peer-disabled dimming).
        stylex.defaultMarker(),
        sx
      )}
      {...props}
    />
  )
}

export { Input }
export type { InputProps }
