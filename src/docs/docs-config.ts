export type DocsNavItem = {
  label: string
  /** Slug matching a doc's `slug` (its path under content/docs without extension) */
  slug: string
}

export type DocsNavSection = {
  label: string
  items: Array<DocsNavItem>
}

/**
 * Sidebar structure for the docs site. Order here drives both the sidebar and
 * the prev/next navigation. Each `slug` must match a file in `content/docs`.
 */
export const docsNav: Array<DocsNavSection> = [
  {
    label: "Getting Started",
    items: [
      { label: "Introduction", slug: "introduction" },
      { label: "Installation", slug: "installation" },
      { label: "Theming", slug: "theming" },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Button", slug: "button" },
      { label: "Box", slug: "box" },
    ],
  },
]

/** Flattened, in-order list of nav items — used for prev/next links. */
export const docsNavFlat: Array<DocsNavItem> = docsNav.flatMap(
  (section) => section.items
)

/** The slug of the first doc, used as the `/docs` landing target. */
export const firstDocSlug = docsNavFlat[0].slug
