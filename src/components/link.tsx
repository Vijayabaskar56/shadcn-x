import type { StyleXStyles } from "@stylexjs/stylex"
import type { LinkComponent } from "@tanstack/react-router"

import * as stylex from "@stylexjs/stylex"
import { createLink } from "@tanstack/react-router"
import * as React from "react"

import {
  borderRadius,
  colors,
  duration,
  focusRing,
  fontWeight,
} from "../styles/tokens.stylex"

// shadcn has no Link component — its examples drop to a raw `<a>` or the
// framework's link. This is the on-system primitive: it wraps TanStack Router's
// type-safe Link (via createLink, so `to`/`params`/`search`/`preload` keep their
// full type safety) and styles it with StyleX tokens. No className, no raw <a>.
type Variant = "default" | "subtle"

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
})

const variantStyles = {
  default: styles.default,
  subtle: styles.subtle,
} satisfies Record<Variant, StyleXStyles>

type LinkBaseProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "style" | "color"
> & {
  variant?: Variant
  sx?: StyleXStyles
}

// The styled anchor handed to createLink. TanStack injects the resolved routing
// props (href, onClick, data-status, …); we add our token styling. Spread order
// matches every sibling primitive: explicit attrs → stylex.props → consumer
// props (className/style are omitted, so styling can't be clobbered).
// Rendered via a variable tag (like Box) so this — the primitive that *defines*
// the on-system anchor — isn't flagged by its own `no-raw-html` rule.
const Anchor = "a" as const

const LinkBase = React.forwardRef<HTMLAnchorElement, LinkBaseProps>(
  function LinkBase({ variant = "default", sx, ...props }, ref) {
    return (
      <Anchor
        ref={ref}
        data-slot="link"
        data-variant={variant}
        {...stylex.props(styles.base, variantStyles[variant], sx)}
        {...props}
      />
    )
  }
)

const CreatedLink = createLink(LinkBase)

/**
 * Type-safe, on-system navigation link. Defaults `preload="intent"` (the app's
 * router default) so links prefetch on hover/focus without extra wiring.
 */
const Link: LinkComponent<typeof LinkBase> = (props) => {
  return <CreatedLink preload="intent" {...props} />
}

export { Link }
export type { Variant as LinkVariant }
