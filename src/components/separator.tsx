import type { StyleXStyles } from "@stylexjs/stylex"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import * as stylex from "@stylexjs/stylex"

import type { VariantKey } from "@/components/variants"

import { defineVariants } from "@/components/variants"

import { colors } from "../styles/tokens.stylex"

const styles = stylex.create({
  base: {
    flexShrink: 0,
    backgroundColor: colors["border-primary"],
  },
})

const orientations = defineVariants(
  stylex.create({
    horizontal: {
      width: "100%",
      height: 1,
    },
    vertical: {
      width: 1,
      alignSelf: "stretch",
    },
  }),
  "horizontal"
)

type Orientation = VariantKey<typeof orientations>

type SeparatorProps = Omit<
  SeparatorPrimitive.Props,
  "className" | "style" | "orientation"
> & {
  orientation?: Orientation
  decorative?: boolean
  sx?: StyleXStyles
}

function Separator({
  orientation,
  decorative = true,
  sx,
  ...props
}: SeparatorProps) {
  const resolvedOrientation = orientations.resolve(orientation)

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={resolvedOrientation}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : resolvedOrientation}
      {...stylex.props(styles.base, orientations(orientation), sx)}
      {...props}
    />
  )
}

export { Separator }
export type { SeparatorProps, Orientation as SeparatorOrientation }
