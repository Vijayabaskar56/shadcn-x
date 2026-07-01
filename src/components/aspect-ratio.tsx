import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"

const styles = stylex.create({
  root: {
    position: "relative",
    width: "100%",
    aspectRatio: "1",
  },
  ratio: (ratio) => ({
    aspectRatio: ratio,
  }),
})

const Tag = "div" as const

type AspectRatioProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  ratio?: number
  sx?: StyleXStyles
}

function AspectRatio({ ratio = 1, sx, ...props }: AspectRatioProps) {
  return (
    <Tag
      data-slot="aspect-ratio"
      {...stylex.props(styles.root, styles.ratio(ratio), sx)}
      {...props}
    />
  )
}

export { AspectRatio }
export type { AspectRatioProps }
