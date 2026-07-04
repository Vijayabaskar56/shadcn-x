import { defineConfig, defineDocs } from "fumadocs-mdx/config"

import { docRehypePlugins } from "./src/lib/markdown"

// One docs collection over `content/docs/**/*.{md,mdx}`. Frontmatter is the
// fumadocs default page schema (`title` required, `description` optional),
// which matches every existing doc.
export const docs = defineDocs({
  dir: "content/docs",
})

export default defineConfig({
  mdxOptions: {
    // Keep the exact pre-migration unified pipeline: GFM comes from the
    // fumadocs preset (a re-export of remark-gfm); heading ids come from the
    // preset's remark-heading (same github-slugger as rehype-slug, so anchors
    // are unchanged); everything else fumadocs would add is disabled so the
    // rendered output matches the previous content-collections build.
    remarkImageOptions: false,
    remarkCodeTabOptions: false,
    remarkNpmOptions: false,
    remarkStructureOptions: false,
    // Shiki runs via our own rehype plugin (dual github themes, defaultColor
    // off) instead of fumadocs' rehype-code, so the emitted `pre.shiki` markup
    // keeps matching the chrome in `globals.css`.
    rehypeCodeOptions: false,
    rehypePlugins: docRehypePlugins,
  },
})
