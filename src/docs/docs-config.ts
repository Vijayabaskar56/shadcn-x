import { docsRegistry } from "@/docs/registry"

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
 * Sidebar structure for the docs site, derived from the docs registry
 * (`src/docs/registry.ts` — the single place a doc is registered). Registry
 * order drives both the sidebar and the prev/next navigation; entries marked
 * `navHidden` render but stay out of the sidebar.
 */
export const docsNav: Array<DocsNavSection> = docsRegistry.map((section) => ({
  label: section.label,
  items: section.entries
    .filter((entry) => !entry.navHidden)
    .map(({ label, slug }) => ({ label, slug })),
}))

/** Flattened, in-order list of nav items — used for prev/next links. */
export const docsNavFlat: Array<DocsNavItem> = docsNav.flatMap(
  (section) => section.items
)

/** The slug of the first doc, used as the `/docs` landing target. */
export const firstDocSlug = docsNavFlat[0].slug

export type DocsPager = {
  prev: DocsNavItem | undefined
  next: DocsNavItem | undefined
}

/**
 * Prev/next pager entries for a doc slug, in nav (registry) order. A slug
 * that isn't in the nav — a typo, or a `navHidden` doc like `theme-toggle` —
 * gets no pager at all (both `undefined`) rather than a bogus pair.
 */
export function docsPager(
  slug: string,
  items: ReadonlyArray<DocsNavItem> = docsNavFlat
): DocsPager {
  const index = items.findIndex((item) => item.slug === slug)
  return {
    prev: index > 0 ? items[index - 1] : undefined,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : undefined,
  }
}
