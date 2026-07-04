import type { ComponentPropsWithoutRef } from "react"

import * as stylex from "@stylexjs/stylex"

import { Box } from "@/components/box"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Separator } from "@/components/separator"
import { Text } from "@/components/text"
import { registryMdxComponents } from "@/docs/registry"

import { borderRadius, colors } from "../../styles/tokens.stylex"

/**
 * Component map handed to compiled MDX docs. The live primitives come from the
 * docs registry (`src/docs/registry.ts` — register a component there once and
 * it becomes usable in every doc's previews); this file owns only the prose
 * renderers that override the intrinsic HTML elements to match the look of the
 * `.md` (prose) pipeline.
 *
 * Every renderer maps to a shadcn-x primitive, styled via token props + `sx`.
 * No raw HTML, no `className`.
 */

// `Box` exposes typed `color`/`width`/`height` props, so we drop the matching
// HTML attributes from the spread props to avoid type clashes.
type Without<E extends keyof React.JSX.IntrinsicElements> = Omit<
  ComponentPropsWithoutRef<E>,
  "color" | "width" | "height" | "border"
>

// `Link` owns anchor styling and closes off `className`/`style` entirely.
type AnchorProps = Omit<Without<"a">, "className" | "style">
type HeadingProps = Without<"h1">
type CodeProps = Without<"code">

// Literal values are fine here: this is docs/library infrastructure, and `sx`
// is the sanctioned escape valve for anything the Box token props don't expose
// (line-height, letter-spacing, em-based padding, list markers, anchors, etc.).
const styles = stylex.create({
  inlineCode: {
    paddingInline: "0.4em",
    paddingTop: "0.2em",
    paddingBottom: "0.2em",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
    fontSize: "0.875em",
  },
  h1: {
    marginTop: "0.5rem",
    marginBottom: "1rem",
    scrollMarginTop: "5rem",
    letterSpacing: "-0.025em",
    lineHeight: 1.1,
  },
  h2: {
    marginTop: "2.5rem",
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
    scrollMarginTop: "5rem",
    letterSpacing: "-0.025em",
    lineHeight: 1.2,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors["border-primary"],
  },
  h3: {
    marginTop: "2rem",
    marginBottom: "0.75rem",
    scrollMarginTop: "5rem",
    letterSpacing: "-0.025em",
    lineHeight: 1.3,
  },
  p: {
    lineHeight: 1.75,
    marginTop: { default: "1.25rem", ":first-child": "0" },
    marginBottom: "0",
  },
  ul: {
    marginTop: "1.25rem",
    marginBottom: "1.25rem",
    paddingInlineStart: "1.5rem",
    listStyleType: "disc",
  },
  ol: {
    marginTop: "1.25rem",
    marginBottom: "1.25rem",
    paddingInlineStart: "1.5rem",
    listStyleType: "decimal",
  },
  li: {
    lineHeight: 1.75,
    marginTop: { default: "0.5rem", ":first-child": "0" },
  },
  blockquote: {
    marginTop: "1.5rem",
    paddingInlineStart: "1.5rem",
    borderInlineStartWidth: "2px",
    borderInlineStartStyle: "solid",
    fontStyle: "italic",
  },
  // Keep `pre` minimal: shiki emits `<pre class="shiki">` and globals.css owns
  // its background/border/padding/radius. We only add vertical rhythm so we
  // don't fight shiki's own styling.
  pre: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
  tableWrap: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.875rem",
  },
  th: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    paddingInline: "1rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    textAlign: "start",
    fontWeight: 600,
  },
  td: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    paddingInline: "1rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },
  hr: {
    // Separator already draws the 1px rule via its own base styles; only
    // contribute the prose spacing here so the line isn't rendered twice.
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  img: {
    borderRadius: borderRadius.m,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors["border-primary"],
  },
})

function MdxAnchor({ href = "", ...props }: AnchorProps) {
  // Internal doc links go through the router (SPA navigation + intent
  // preload); hash anchors and external URLs use Link's plain-anchor form.
  // Both render the same on-system `Link` styling (default variant).
  if (href.startsWith("/docs/")) {
    return (
      <Link
        to="/docs/$"
        params={{ _splat: href.slice("/docs/".length) }}
        {...props}
      />
    )
  }
  return <Link href={href} {...props} />
}

function MdxCode(props: CodeProps) {
  // shiki-highlighted blocks live inside <pre>; only style inline code.
  return (
    <Box
      as="code"
      backgroundColor="background-muted"
      borderRadius="s"
      sx={styles.inlineCode}
      {...props}
    />
  )
}

function MdxHr(props: Without<"hr">) {
  return (
    <Separator
      {...(props as ComponentPropsWithoutRef<typeof Separator>)}
      sx={styles.hr}
    />
  )
}

export const mdxComponents = {
  // Live primitives usable directly in MDX — derived from the docs registry.
  ...registryMdxComponents,

  // Headings — ids/anchors are added by rehype-slug + autolink at compile time.
  h1: (props: HeadingProps) => (
    <Text variant="h1" as="h1" sx={styles.h1} {...props} />
  ),
  h2: (props: HeadingProps) => (
    <Text variant="h2" as="h2" sx={styles.h2} {...props} />
  ),
  h3: (props: HeadingProps) => (
    <Text variant="h3" as="h3" sx={styles.h3} {...props} />
  ),
  p: (props: Without<"p">) => <Text variant="p" sx={styles.p} {...props} />,
  a: MdxAnchor,
  ul: (props: Without<"ul">) => <Box as="ul" sx={styles.ul} {...props} />,
  ol: (props: Without<"ol">) => <Box as="ol" sx={styles.ol} {...props} />,
  li: (props: Without<"li">) => <Box as="li" sx={styles.li} {...props} />,
  blockquote: (props: Without<"blockquote">) => (
    <Box
      as="blockquote"
      color="text-secondary"
      borderColor="border-primary"
      sx={styles.blockquote}
      {...props}
    />
  ),
  code: MdxCode,
  pre: (props: Without<"pre">) => <Box as="pre" sx={styles.pre} {...props} />,
  table: (props: Without<"table">) => (
    <Box as="div" sx={styles.tableWrap}>
      <Box as="table" sx={styles.table} {...props} />
    </Box>
  ),
  th: (props: Without<"th">) => <Box as="th" sx={styles.th} {...props} />,
  td: (props: Without<"td">) => <Box as="td" sx={styles.td} {...props} />,
  hr: MdxHr,
  img: ({ alt, ...props }: Without<"img">) => (
    <Image alt={alt ?? ""} sx={styles.img} {...props} />
  ),
}
