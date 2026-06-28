import { useMDXComponent } from "@content-collections/mdx/react"

import { mdxComponents } from "@/components/docs/mdx-components"

const proseClassName =
  "prose max-w-none prose-neutral dark:prose-invert prose-pre:bg-transparent prose-pre:p-0"

/** Render a compiled-to-HTML (`.md`) doc. */
export function DocContent({ html }: { html: string }) {
  return (
    <div
      className={proseClassName}
      // Content is compiled from trusted local markdown at build time.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/** Render a compiled MDX (`.mdx`) doc with live React components. */
export function DocMdxContent({ code }: { code: string }) {
  const MDXComponent = useMDXComponent(code)
  return (
    <div className={proseClassName}>
      <MDXComponent components={mdxComponents} />
    </div>
  )
}
