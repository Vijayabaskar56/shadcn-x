import { useMDXComponent } from "@content-collections/mdx/react"
import * as stylex from "@stylexjs/stylex"

import { Box } from "@/components/box"
import { mdxComponents } from "@/components/docs/mdx-components"

// Container styling for the docs prose region. Replaces Tailwind's `prose`
// classes. The per-element typography lives in `mdxComponents` (MDX path) and,
// for the compiled-HTML `.md` path, in the global `[data-prose]` rules in
// `globals.css` (heading-anchor reset + scroll-margin still apply there).
const styles = stylex.create({
  prose: {
    maxWidth: "none",
    color: "var(--foreground)",
  },
})

/** Render a compiled-to-HTML (`.md`) doc. */
export function DocContent({ html }: { html: string }) {
  return (
    <Box
      as="div"
      data-prose=""
      sx={styles.prose}
      // Content is compiled from trusted local markdown at build time.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/** Render a compiled MDX (`.mdx`) doc with live React components. */
export function DocMdxContent({ code }: { code: string }) {
  const MDXComponent = useMDXComponent(code)
  return (
    <Box as="div" data-prose="" sx={styles.prose}>
      <MDXComponent components={mdxComponents} />
    </Box>
  )
}
