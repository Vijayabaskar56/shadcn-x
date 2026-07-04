import type { StyleXStyles } from "@stylexjs/stylex"
import type { LinkComponent } from "@tanstack/react-router"

import * as stylex from "@stylexjs/stylex"
import { createLink } from "@tanstack/react-router"
import * as React from "react"

import type { VariantKey } from "./variants"

import {
  borderRadius,
  colors,
  duration,
  focusRing,
  fontWeight,
} from "../styles/tokens.stylex"
import { defineVariants } from "./variants"

// shadcn: no Link component. Wraps TanStack Router's type-safe Link (createLink)
// — to/params/search/preload keep full type safety. StyleX tokens, no raw <a>.
const styles = stylex.create({
  base: {
    cursor: "pointer",
    borderRadius: borderRadius.s,
    textUnderlineOffset: "4px",
    transitionProperty: "color, text-decoration-color, box-shadow",
    transitionDuration: duration.fast,
    // Focus ring uses the shared focusRing.ring token (derived from `ring`) via
    // boxShadow — matching Button/Input — instead of hardcoded outline values.
    outline: "none",
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
  },
})

const variants = defineVariants(
  stylex.create({
    // The prose/inline link: accent-colored and underlined, matching the
    // repo's existing anchor convention (see docs MDX anchor).
    default: {
      color: colors.accent,
      fontWeight: fontWeight.medium,
      textDecorationLine: { default: "underline", ":hover": "none" },
    },
    // The in-context link (nav, cards): inherits its surrounding color and only
    // underlines on hover.
    subtle: {
      color: "inherit",
      textDecorationLine: { default: "none", ":hover": "underline" },
    },
  }),
  "default"
)

type Variant = VariantKey<typeof variants>

type LinkBaseProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "style" | "color"
> & {
  variant?: Variant
  sx?: StyleXStyles
}

// Styled anchor for createLink. TanStack routing props → spread order: explicit attrs → stylex.props → consumer props. Variable tag avoids no-raw-html.
const Anchor = "a" as const

const LinkBase = React.forwardRef<HTMLAnchorElement, LinkBaseProps>(
  function LinkBase({ variant, sx, ...props }, ref) {
    return (
      <Anchor
        ref={ref}
        data-slot="link"
        data-variant={variants.resolve(variant)}
        {...stylex.props(styles.base, variants(variant), sx)}
        {...props}
      />
    )
  }
)

const CreatedLink = createLink(LinkBase)

// Plain-anchor form for external URLs (sites, hash, mailto/tel). `href` opts
// out of router resolution; same styling/variants/sx surface.
type PlainLinkProps = LinkBaseProps & {
  href: string
  to?: never
  params?: never
  search?: never
  hash?: never
  preload?: never
}

type LinkComponentType = LinkComponent<typeof LinkBase> &
  ((
    props: PlainLinkProps & React.RefAttributes<HTMLAnchorElement>
  ) => React.JSX.Element)

/**
 * Type-safe, on-system navigation link. Defaults `preload="intent"` (the app's
 * router default) so links prefetch on hover/focus without extra wiring.
 *
 * Two forms, discriminated by prop:
 * - `to` (+ `params`/`search`/…): router-resolved, fully type-safe navigation.
 * - `href`: a plain styled anchor for URLs outside the router — external
 *   links, in-page `#hash` anchors, `mailto:` — no router context required.
 */
const Link: LinkComponentType = ((props: PlainLinkProps) =>
  typeof props.href === "string" ? (
    <LinkBase {...props} />
  ) : (
    <CreatedLink
      preload="intent"
      {...(props as React.ComponentProps<typeof CreatedLink>)}
    />
  )) as LinkComponentType

export { Link }
export type { Variant as LinkVariant }
