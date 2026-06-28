import { defineCollection, defineConfig } from "@content-collections/core"
import { z } from "zod"

import { compileDoc } from "./src/lib/markdown"

const docs = defineCollection({
  name: "docs",
  directory: "content/docs",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    content: z.string(),
  }),
  transform: async (doc) => {
    const { html, toc } = await compileDoc(doc.content)
    return {
      ...doc,
      // `content/docs/introduction.md` -> `introduction`
      slug: doc._meta.path,
      html,
      toc,
    }
  },
})

export default defineConfig({
  content: [docs],
})
