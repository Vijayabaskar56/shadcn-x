import type { StyleXStyles } from "@stylexjs/stylex"

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import * as stylex from "@stylexjs/stylex"

import {
  borderRadius,
  colors,
  duration,
  focusRing,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

type ScrollAreaProps = Omit<
  ScrollAreaPrimitive.Root.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
  /**
   * Fade the scroll edges into transparency to hint at more content. The fade is
   * scroll-aware — driven by Base UI's `--scroll-area-overflow-*` CSS vars, it
   * appears only on edges with scrollable content and shrinks as you reach them.
   */
  scrollFade?: boolean
  /**
   * Reserve a gutter for the scrollbar (only when the axis overflows) so content
   * — e.g. an active sidebar item — clears the overlay scrollbar instead of
   * sitting under it. Applied via `data-scrollbar-gutter` in globals.css because
   * the padding is gated on Base UI's `data-has-overflow-*` attributes.
   */
  scrollbarGutter?: boolean
}

type ScrollBarProps = Omit<
  ScrollAreaPrimitive.Scrollbar.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

// Fade depth at each edge; `min(FADE, overflow)` tracks scroll position: no
// fade at an edge when parked, full fade when content past it exceeds FADE.
const FADE = "1.5rem"
const fadeMask =
  `linear-gradient(to bottom, transparent 0, black min(${FADE}, var(--scroll-area-overflow-y-start, 0px)), black calc(100% - min(${FADE}, var(--scroll-area-overflow-y-end, 0px))), transparent 100%), ` +
  `linear-gradient(to right, transparent 0, black min(${FADE}, var(--scroll-area-overflow-x-start, 0px)), black calc(100% - min(${FADE}, var(--scroll-area-overflow-x-end, 0px))), transparent 100%)`

const styles = stylex.create({
  root: {
    position: "relative",
    minHeight: 0,
  },
  viewport: {
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    outline: "none",
    transitionProperty: "color, box-shadow",
    transitionDuration: duration.fast,
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
    outlineWidth: {
      default: 0,
      ":focus-visible": 1,
    },
    outlineStyle: {
      default: "none",
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.ring,
    },
  },
  // Intersect a vertical and horizontal edge-fade so each axis fades
  // independently; an axis with no overflow contributes a fully-opaque mask.
  scrollFade: {
    maskImage: fadeMask,
    maskComposite: "intersect",
    maskRepeat: "no-repeat",
    WebkitMaskImage: fadeMask,
    WebkitMaskComposite: "source-in",
    WebkitMaskRepeat: "no-repeat",
  },
  scrollbar: {
    display: "flex",
    touchAction: "none",
    userSelect: "none",
    margin: `calc(${u} * 1)`,
    transitionProperty: "opacity",
    transitionDuration: duration.fast,
  },
  scrollbarVertical: {
    width: `calc(${u} * 1.5)`,
    height: "100%",
  },
  scrollbarHorizontal: {
    flexDirection: "column",
    height: `calc(${u} * 1.5)`,
  },
  thumb: {
    position: "relative",
    flex: 1,
    borderRadius: borderRadius.full,
    backgroundColor: colors["border-primary"],
  },
})

function ScrollArea({
  children,
  sx,
  scrollFade = false,
  scrollbarGutter = false,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      {...stylex.props(styles.root, sx)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        data-scrollbar-gutter={scrollbarGutter ? "" : undefined}
        {...stylex.props(styles.viewport, scrollFade && styles.scrollFade)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      {/* Base UI only reveals a scrollbar when its axis overflows, so rendering
          both keeps horizontal-scrolling content (wide tables) covered without
          showing a bar where there's nothing to scroll. */}
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({ orientation = "vertical", sx, ...props }: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      {...stylex.props(
        styles.scrollbar,
        orientation === "vertical" && styles.scrollbarVertical,
        orientation === "horizontal" && styles.scrollbarHorizontal,
        sx
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        {...stylex.props(styles.thumb)}
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
export type { ScrollAreaProps, ScrollBarProps }
