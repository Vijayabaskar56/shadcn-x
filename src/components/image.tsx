import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"

import { borderRadius } from "../styles/tokens.stylex"

// shadcn-x native — neither shadcn nor Base UI ships an Image component. The
// thesis (LLM-safe) is the reason to have one: a plain `<Box as="img">` can't
// REQUIRE `alt`, can't default aspect/fit/lazy. This primitive makes accessible,
// well-sized images the path of least resistance. (No next/image — no blur
// placeholder or optimization; this is a TanStack stack.)
type Aspect = "square" | "video" | "wide" | "portrait"
type Fit = "cover" | "contain" | "fill" | "none"

const styles = stylex.create({
  base: {
    display: "block",
    maxWidth: "100%", // don't overflow the parent
    height: "auto",
    borderRadius: borderRadius.m, // rounded-md
    // Default object-fit; only has effect once the image is boxed (aspect/width).
    objectFit: "cover",
  },
  // aspect ratios — width:100% so the ratio derives the height, giving
  // object-fit a box to fill (Tailwind's aspect-* + object-cover pattern).
  square: { width: "100%", aspectRatio: "1 / 1" },
  video: { width: "100%", aspectRatio: "16 / 9" },
  wide: { width: "100%", aspectRatio: "3 / 2" },
  portrait: { width: "100%", aspectRatio: "3 / 4" },
  // object-fit overrides (cover is the base default).
  contain: { objectFit: "contain" },
  fill: { objectFit: "fill" },
  none: { objectFit: "none" },
})

const aspectStyles = {
  square: styles.square,
  video: styles.video,
  wide: styles.wide,
  portrait: styles.portrait,
} satisfies Record<Aspect, StyleXStyles>

// `cover` is the base default, so it maps to null (nothing to merge).
const fitStyles = {
  cover: null,
  contain: styles.contain,
  fill: styles.fill,
  none: styles.none,
} satisfies Record<Fit, StyleXStyles | null>

// Rendered via a variable tag (like Box/Label/Textarea) so this — the primitive
// that *defines* the on-system image — isn't flagged by its own `no-raw-html`.
const Tag = "img" as const

type ImageProps = Omit<
  React.ComponentPropsWithoutRef<"img">,
  "className" | "style" | "color"
> & {
  /**
   * Accessible description. REQUIRED — leaving this off is a type error. Pass an
   * empty string (`alt=""`) for a purely decorative image.
   */
  alt: string
  /** Box aspect ratio. When set, the image fills the width and crops to fit. */
  aspect?: Aspect
  /** How the image content fits its box. Defaults to `cover`. */
  fit?: Fit
  sx?: StyleXStyles
}

function Image({
  alt,
  aspect,
  fit = "cover",
  loading = "lazy",
  sx,
  ...props
}: ImageProps) {
  return (
    <Tag
      data-slot="image"
      alt={alt}
      loading={loading}
      {...stylex.props(
        styles.base,
        aspect && aspectStyles[aspect],
        fitStyles[fit],
        sx
      )}
      {...props}
    />
  )
}

export { Image }
export type { ImageProps, Aspect as ImageAspect, Fit as ImageFit }
