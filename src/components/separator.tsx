import type { StyleXStyles } from "@stylexjs/stylex"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import * as stylex from "@stylexjs/stylex"

import { colors } from "../styles/tokens.stylex"

type Orientation = "horizontal" | "vertical"

const styles = stylex.create({
  base: {
    flexShrink: 0,
    backgroundColor: colors["border-primary"],
  },
  horizontal: {
    width: "100%",
    height: 1,
  },
  vertical: {
    width: 1,
    alignSelf: "stretch",
  },
})

const orientationStyles = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
} satisfies Record<Orientation, StyleXStyles>

type SeparatorProps = Omit<
  SeparatorPrimitive.Props,
  "className" | "style" | "orientation"
> & {
  orientation?: Orientation
  decorative?: boolean
  sx?: StyleXStyles
}

function Separator({
  orientation = "horizontal",
  decorative = true,
  sx,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      {...stylex.props(styles.base, orientationStyles[orientation], sx)}
      {...props}
    />
  )
}

export { Separator }
export type { SeparatorProps, Orientation as SeparatorOrientation }
