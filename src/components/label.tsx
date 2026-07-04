import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"

import { colors, fontSize, fontWeight, spacing } from "../styles/tokens.stylex"

// Standalone `<label>` (Base UI Field.Label couples to Root). Plain label with
// data-slot="label" + on-system disabled reactivity.
const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.s, // gap-2
    fontSize: fontSize.s, // text-sm
    fontWeight: fontWeight.medium, // font-medium
    lineHeight: 1, // leading-none
    color: colors["text-primary"],
    userSelect: "none",
    // shadcn: dims label in 2 situations: (1) inside disabled field group →
    // marked ancestor data-disabled; (2) next to disabled peer → marked sibling :disabled.
    opacity: {
      default: 1,
      [stylex.when.ancestor('[data-disabled="true"]')]: 0.5,
      [stylex.when.siblingBefore(":disabled")]: 0.5,
    },
    // shadcn kills pointer events only inside disabled group
    // (`group-data-[disabled=true]:pointer-events-none`); peer keeps them for cursor.
    pointerEvents: {
      default: null,
      [stylex.when.ancestor('[data-disabled="true"]')]: "none",
    },
    // shadcn's `peer-disabled:cursor-not-allowed` — cursor signals the peer
    // control is disabled (observed sibling carries defaultMarker via Input).
    cursor: {
      default: null,
      [stylex.when.siblingBefore(":disabled")]: "not-allowed",
    },
  },
})

// Rendered via a variable tag (like Box/Link) so this — the primitive that
// *defines* the on-system label — isn't flagged by its own `no-raw-html` rule.
const Tag = "label" as const

type LabelProps = Omit<
  React.ComponentPropsWithoutRef<"label">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

function Label({ sx, ...props }: LabelProps) {
  return <Tag data-slot="label" {...stylex.props(styles.base, sx)} {...props} />
}

export { Label }
export type { LabelProps }
