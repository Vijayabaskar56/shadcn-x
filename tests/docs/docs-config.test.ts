import { describe, expect, it } from "vitest"

import type { DocsNavItem } from "@/docs/docs-config"

import { docsNavFlat, docsPager, firstDocSlug } from "@/docs/docs-config"

const items: Array<DocsNavItem> = [
  { label: "Introduction", slug: "introduction" },
  { label: "Button", slug: "button" },
  { label: "Card", slug: "card" },
]

describe("docsPager", () => {
  it("first page: no prev, next is the second item", () => {
    expect(docsPager("introduction", items)).toEqual({
      prev: undefined,
      next: { label: "Button", slug: "button" },
    })
  })

  it("middle page: both neighbors", () => {
    expect(docsPager("button", items)).toEqual({
      prev: { label: "Introduction", slug: "introduction" },
      next: { label: "Card", slug: "card" },
    })
  })

  it("last page: prev is the second-to-last item, no next", () => {
    expect(docsPager("card", items)).toEqual({
      prev: { label: "Button", slug: "button" },
      next: undefined,
    })
  })

  it("unknown slug (typo / hidden doc): no pager at all", () => {
    // The old inline logic silently produced this; the test pins it down so a
    // future rewrite can't start pointing `next` at the first item (index -1).
    expect(docsPager("buton", items)).toEqual({
      prev: undefined,
      next: undefined,
    })
  })

  it("single-item nav: no pager", () => {
    expect(docsPager("only", [{ label: "Only", slug: "only" }])).toEqual({
      prev: undefined,
      next: undefined,
    })
  })

  it("empty nav: no pager", () => {
    expect(docsPager("anything", [])).toEqual({
      prev: undefined,
      next: undefined,
    })
  })

  describe("against the real docs nav", () => {
    it("the first doc has no prev and a next", () => {
      const pager = docsPager(firstDocSlug)
      expect(pager.prev).toBeUndefined()
      expect(pager.next).toBeDefined()
    })

    it("the last doc has a prev and no next", () => {
      const last = docsNavFlat[docsNavFlat.length - 1]
      const pager = docsPager(last.slug)
      expect(pager.prev).toBeDefined()
      expect(pager.next).toBeUndefined()
    })

    it("a nav-hidden doc (theme-toggle) gets no pager", () => {
      // theme-toggle renders at /docs/theme-toggle but is navHidden, so it
      // must not claim neighbors in a sidebar it doesn't appear in.
      expect(docsNavFlat.some((item) => item.slug === "theme-toggle")).toBe(
        false
      )
      expect(docsPager("theme-toggle")).toEqual({
        prev: undefined,
        next: undefined,
      })
    })
  })
})
