import type { ComponentPropsWithoutRef } from "react"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { cn } from "@/lib/utils"

/**
 * Component map handed to compiled MDX docs. It exposes our primitives so docs
 * can render live previews (e.g. `<Button variant="secondary">`) and overrides
 * the intrinsic HTML elements with styled renderers that match the look of the
 * `.md` (prose) pipeline.
 *
 * This file is docs/library infrastructure, so raw HTML elements are expected.
 */

type AnchorProps = ComponentPropsWithoutRef<"a">
type HeadingProps = ComponentPropsWithoutRef<"h1">
type CodeProps = ComponentPropsWithoutRef<"code">

function MdxAnchor({ className, ...props }: AnchorProps) {
  return (
    <a
      className={cn(
        "font-medium text-primary underline underline-offset-4 hover:no-underline",
        className
      )}
      {...props}
    />
  )
}

function MdxCode({ className, ...props }: CodeProps) {
  return (
    <code
      className={cn(
        // shiki-highlighted blocks live inside <pre>; only style inline code.
        "rounded bg-muted px-[0.4em] py-[0.2em] font-mono text-[0.875em]",
        className
      )}
      {...props}
    />
  )
}

export const mdxComponents = {
  // Live primitives usable directly in MDX.
  Box,
  Button,

  // Headings — ids/anchors are added by rehype-slug + autolink at compile time.
  h1: ({ className, ...props }: HeadingProps) => (
    <h1
      className={cn(
        "mt-2 mb-4 scroll-m-20 text-3xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: HeadingProps) => (
    <h2
      className={cn(
        "mt-10 mb-4 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HeadingProps) => (
    <h3
      className={cn(
        "mt-8 mb-3 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn("leading-7 not-first:mt-5", className)} {...props} />
  ),
  a: MdxAnchor,
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cn("my-5 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cn("my-5 ml-6 list-decimal [&>li]:mt-2", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("leading-7", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-border pl-6 text-muted-foreground italic",
        className
      )}
      {...props}
    />
  ),
  code: MdxCode,
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg border border-border p-4 text-sm",
        className
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 w-full overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={cn(
        "border border-border px-4 py-2 text-left font-semibold",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={cn("border border-border px-4 py-2", className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={cn("my-8 border-border", className)} {...props} />
  ),
  img: ({ className, ...props }: ComponentPropsWithoutRef<"img">) => (
    <img
      className={cn("rounded-lg border border-border", className)}
      {...props}
    />
  ),
}
