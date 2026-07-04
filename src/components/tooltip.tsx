import type { StyleXStyles } from "@stylexjs/stylex"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  fontSize,
  spacing,
} from "../styles/tokens.stylex"

// Single spacing knob; arrow size + vertical padding re-scale with `--spacing`
const u = spacing["--spacing"]

// Ported from shadcn tooltip on Base UI. Structural overlay, no variants;
// inverted surface via light-dark() text/background tokens.
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

  // Arrow: size-2.5 rotate-45 rounded-[2px] bg-foreground; CSS `rotate` composes with Base UI `transform`
  arrow: {
    width: `calc(${u} * 2.5)`, // size-2.5 (10px)
    height: `calc(${u} * 2.5)`,
    rotate: "45deg", // rotate-45
    borderRadius: borderRadius.s, // rounded-[2px]
    backgroundColor: colors["text-primary"], // bg-foreground
    zIndex: 50, // z-50
  },
})

function Tooltip(props: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

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
  // Arrow lives under Positioner (not Popup) so it anchors to positioned
  // element; shares Popup's inverted surface so they read as one shape.
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
