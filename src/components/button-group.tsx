import type { StyleXStyles } from "@stylexjs/stylex"

import { mergeProps } from "@base-ui/react/merge-props"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { useRender } from "@base-ui/react/use-render"
import * as stylex from "@stylexjs/stylex"

import { Box } from "@/components/box"

import type { VariantKey } from "./variants"

import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"
import { groupItemEdges } from "./group-item-edges"
import { defineVariants } from "./variants"

const u = spacing["--spacing"]

const styles = stylex.create({
  // Root container. The flush look (collapsed inner corners + shared borders)
  // is NOT applied here via distance selectors — instead each on-system child
  // (Button, ButtonGroupText) reacts to this container's data-orientation via
  // stylex.when.ancestor and flattens its own adjacent edges. See `groupItem`.
  group: {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "stretch",
  },

  // ButtonGroupText — a non-interactive label/affordance that sits flush in the
  // group (e.g. "1 of 10", a unit suffix). Mirrors shadcn's bg-muted bordered
  // chip; tokens only.
  text: {
    display: "inline-flex",
    alignItems: "center",
    gap: `calc(${u} * 2)`,
    paddingInline: `calc(${u} * 4)`, // px-4
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    whiteSpace: "nowrap",
    backgroundColor: colors["background-muted"],
    color: colors["text-primary"],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    borderRadius: borderRadius.l,
  },

  // Focus-raise for the (non-focusable) text chip: lift it above neighbors when
  // a focusable descendant is focused, so the ring isn't clipped. The edge math
  // (radius flattening + inner-border collapse) is shared with Button — see
  // `groupItemEdges` (imported).
  groupFocus: {
    position: {
      default: null,
      ":focus-within": "relative",
    },
    zIndex: {
      default: null,
      ":focus-within": 1,
    },
  },

  separator: {
    alignSelf: "stretch",
    backgroundColor: colors["border-primary"],
    flexShrink: 0,
    // Base UI sets data-orientation; size the line on the cross axis.
    width: {
      default: 1,
      [stylex.when.ancestor('[data-orientation="vertical"]')]: "auto",
    },
    height: {
      default: "auto",
      [stylex.when.ancestor('[data-orientation="vertical"]')]: 1,
    },
  },
})

const orientations = defineVariants(
  stylex.create({
    horizontal: { flexDirection: "row" },
    vertical: { flexDirection: "column" },
  }),
  "horizontal"
)

type Orientation = VariantKey<typeof orientations>

type ButtonGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof Box<"div">>,
  "as" | "display" | "flexDirection" | "alignItems" | "role"
> & {
  orientation?: Orientation
  sx?: StyleXStyles
}

function ButtonGroup({ orientation, sx, ...props }: ButtonGroupProps) {
  return (
    <Box
      as="div"
      role="group"
      data-slot="button-group"
      // data-orientation is what each child observes via stylex.when.ancestor.
      data-orientation={orientations.resolve(orientation)}
      // The marker is REQUIRED: children observe the group via
      // stylex.when.ancestor, which compiles to `.x-default-marker[...] *` — so
      // the ancestor must carry both the marker class and data-orientation.
      sx={[styles.group, orientations(orientation), stylex.defaultMarker(), sx]}
      {...props}
    />
  )
}

type ButtonGroupTextProps = useRender.ComponentProps<"div"> & {
  sx?: StyleXStyles
}

// Polymorphic via Base UI's `render` prop: by default a <div>, but `render={
// <label/>}` (or any element) re-targets the host while keeping the styling,
// data-slot, and group-reactive edges. mergeProps composes our className with
// the consumer's render element.
function ButtonGroupText({ sx, render, ...props }: ButtonGroupTextProps) {
  const ownProps = {
    "data-slot": "button-group-text",
    ...stylex.props(styles.text, groupItemEdges, styles.groupFocus, sx),
  }
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(ownProps, props),
  })
}

type ButtonGroupSeparatorProps = Omit<
  SeparatorPrimitive.Props,
  "className" | "orientation"
> & {
  orientation?: Orientation
  sx?: StyleXStyles
}

function ButtonGroupSeparator({
  orientation = "vertical",
  sx,
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="button-group-separator"
      orientation={orientation}
      {...stylex.props(styles.separator, sx)}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
export type {
  ButtonGroupProps,
  ButtonGroupSeparatorProps,
  ButtonGroupTextProps,
  Orientation as ButtonGroupOrientation,
}
