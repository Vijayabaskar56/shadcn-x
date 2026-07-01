import type { StyleXStyles } from "@stylexjs/stylex"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  fontSize,
  spacing,
} from "../styles/tokens.stylex"

// The single spacing knob (CSS `--spacing`); the arrow size and vertical
// padding are multiples of it, so they re-scale with the spacing token —
// matching Tailwind/shadcn sizing.
const u = spacing["--spacing"]

// Ported from shadcn's tooltip (Base UI flavor). Like Popover, this is a
// structural overlay — no visual variants/sizes; appearance is a closed set of
// styles customizable only via the typed `sx` prop (merged last). Behavior/a11y
// (portal, anchor positioning, hover/focus delay, dismiss) come from
// `@base-ui/react/tooltip`. The inverted surface (`bg-foreground text-background`)
// matches shadcn: solid dark in light mode, solid light in dark mode, via the
// `light-dark()` text/background tokens.
const styles = stylex.create({
  // `isolate z-50` on the positioner — matches shadcn/Base UI reference so the
  // tooltip stacks above page content without capturing inherited stacking.
  positioner: {
    isolation: "isolate",
    zIndex: 50,
  },

  // z-50 w-fit max-w-xs rounded-md bg-foreground px-3 py-1.5 text-xs
  // text-balance text-background origin-(--transform-origin).
  content: {
    width: "fit-content", // w-fit
    maxWidth: "20rem", // max-w-xs
    borderRadius: borderRadius.m, // rounded-md
    backgroundColor: colors["text-primary"], // bg-foreground
    color: colors["background-primary"], // text-background
    paddingInline: spacing.m, // px-3
    paddingBlock: `calc(${u} * 1.5)`, // py-1.5 (6px)
    fontSize: fontSize.xs, // text-xs
    textWrap: "balance", // text-balance
    zIndex: 50, // z-50
    // `--transform-origin` is set by the Base UI Positioner; aligns the popup's
    // transform origin with the side it appears on.
    transformOrigin: "var(--transform-origin)",
  },

  // shadcn canonical arrow: size-2.5 rotate-45 rounded-[2px] bg-foreground. The
  // CSS `rotate` property (not `transform`) is used so it composes with Base
  // UI's inline positioning `transform` on the same element. Base UI positions
  // and `aria-hidden`s the arrow; we only style its appearance.
  arrow: {
    width: `calc(${u} * 2.5)`, // size-2.5 (10px)
    height: `calc(${u} * 2.5)`,
    rotate: "45deg", // rotate-45
    borderRadius: borderRadius.s, // rounded-[2px]
    backgroundColor: colors["text-primary"], // bg-foreground
    zIndex: 50, // z-50
  },
})

const Tooltip = TooltipPrimitive.Root

type TooltipProviderProps = Omit<
  TooltipPrimitive.Provider.Props,
  "className" | "style"
>

function TooltipProvider({ delay = 0, ...props }: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

type TooltipTriggerProps = Omit<
  TooltipPrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function TooltipTrigger({ sx, ...props }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type TooltipContentProps = Omit<
  TooltipPrimitive.Popup.Props,
  "className" | "style"
> &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    showArrow?: boolean
    sx?: StyleXStyles
  }

function TooltipContent({
  align = "center",
  alignOffset = 0,
  side = "top",
  sideOffset = 4,
  showArrow = true,
  sx,
  ...props
}: TooltipContentProps) {
  // The Arrow is a child of the Positioner (Base UI's Floating UI floating
  // element), not the Popup, so its absolute `arrowStyles` anchor to the
  // positioned positioner and `children` flows through `...props` to the Popup
  // untouched. It shares the Popup's inverted surface color, so they read as one
  // shape.
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          {...stylex.props(styles.content, sx)}
          {...props}
        />
        {showArrow && (
          <TooltipPrimitive.Arrow
            data-slot="tooltip-arrow"
            {...stylex.props(styles.arrow)}
          />
        )}
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }

export type { TooltipContentProps, TooltipProviderProps, TooltipTriggerProps }
