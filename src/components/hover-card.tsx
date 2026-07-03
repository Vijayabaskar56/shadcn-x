import type { StyleXStyles } from "@stylexjs/stylex"

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  boxShadow,
  colors,
  spacing,
} from "../styles/tokens.stylex"

// Ported from shadcn's hover-card (Base UI flavor). Behavior/a11y — hover open/
// close delay, portal rendering, anchor positioning, focus management — come
// from `@base-ui/react/preview-card` (Base UI ships hover-card as "Preview
// Card"); we expose it under the shadcn `HoverCard` name. No variants/sizes — a
// structural overlay like Popover; appearance is a closed set of styles
// customizable only via the typed `sx` prop (merged last). Never accepts
// className.
const styles = stylex.create({
  // `isolate z-50` on the positioner — matches shadcn/Base UI reference so the
  // hover card stacks above page content without capturing inherited stacking.
  positioner: {
    isolation: "isolate",
    zIndex: 50,
  },

  // w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md
  // outline-hidden origin-(--transform-origin) (canonical shadcn appearance,
  // expressed in tokens).
  content: {
    width: "16rem", // w-64
    borderRadius: borderRadius.m, // rounded-md
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-primary"], // bg-popover
    color: colors["text-primary"], // text-popover-foreground
    padding: spacing.l, // p-4
    boxShadow: boxShadow.m, // shadow-md
    outline: "none",
    // `--transform-origin` is set by the Base UI Positioner; aligns the popup's
    // scale/transform origin with the side it appears on.
    transformOrigin: "var(--transform-origin)",
  },
})

function HoverCard(props: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

type HoverCardTriggerProps = Omit<
  PreviewCardPrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function HoverCardTrigger({ sx, ...props }: HoverCardTriggerProps) {
  return (
    <PreviewCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type HoverCardContentProps = Omit<
  PreviewCardPrimitive.Popup.Props,
  "className" | "style"
> &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    sx?: StyleXStyles
  }

function HoverCardContent({
  align = "center",
  alignOffset = 4,
  side = "bottom",
  sideOffset = 4,
  sx,
  ...props
}: HoverCardContentProps) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }

export type { HoverCardContentProps, HoverCardTriggerProps }
