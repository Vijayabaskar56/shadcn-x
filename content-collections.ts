import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import { z } from "zod"

import {
  compileDoc,
  docRehypePlugins,
  docRemarkPlugins,
  extractToc,
} from "./src/lib/markdown"

const docs = defineCollection({
  name: "docs",
  directory: "content/docs",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    content: z.string(),
  }),
  transform: async (doc, context) => {
    // `content/docs/introduction.md` -> `introduction`
    const slug = doc._meta.path
    // Headings get stable slug anchors for both render paths.
    const toc = await extractToc(doc.content)

    if (doc._meta.extension === "mdx") {
      // Compile to a runtime component bundle rendered via `useMDXComponent`.
      const mdx = await compileMDX(context, doc, {
        remarkPlugins: docRemarkPlugins,
        rehypePlugins: docRehypePlugins,
      })
      return { ...doc, slug, toc, mdx, html: "" }
    }

    // `.md` docs stay on the HTML pipeline (dangerouslySetInnerHTML).
    const { html } = await compileDoc(doc.content)
    return { ...doc, slug, toc, mdx: "", html }
  },
})

export default defineConfig({
  content: [docs],
})
