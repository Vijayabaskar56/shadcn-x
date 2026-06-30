import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"

import { colors, fontSize, fontWeight, spacing } from "../styles/tokens.stylex"

// shadcn's Base UI label is a standalone styled `<label>` (Base UI's own
// Field.Label couples to a Field.Root). We match that: a plain label carrying
// `data-slot="label"` for targeting, and on-system disabled reactivity.
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
    // shadcn dims + disables the label in two situations:
    //  1. inside a disabled field group (`group-data-[disabled=true]`) — react
    //     to a MARKED ancestor carrying data-disabled="true";
    //  2. next to a disabled peer control (`peer-disabled`) — react to a MARKED
    //     preceding sibling's native :disabled (Input/Textarea carry the marker).
    // No distance selectors in either case.
    opacity: {
      default: 1,
      [stylex.when.ancestor('[data-disabled="true"]')]: 0.5,
      [stylex.when.siblingBefore(":disabled")]: 0.5,
    },
    pointerEvents: {
      default: null,
      [stylex.when.ancestor('[data-disabled="true"]')]: "none",
      [stylex.when.siblingBefore(":disabled")]: "none",
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
