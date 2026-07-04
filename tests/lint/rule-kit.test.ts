import { describe, expect, it } from "vitest"

import { findAncestor, matchesSource, perFileOption } from "@/lint/rule-kit"

describe("matchesSource", () => {
  it("matches an exact source", () => {
    expect(matchesSource("@/components", ["@/components"])).toBe(true)
  })

  it("matches a subpath of a source", () => {
    expect(matchesSource("@/components/box", ["@/components"])).toBe(true)
    expect(matchesSource("shadcn-x/button", ["shadcn-x", "@/components"])).toBe(
      true
    )
  })

  it("does NOT match a sibling package sharing a prefix", () => {
    // "pkg-other" starts with "pkg" but is a different package.
    expect(matchesSource("shadcn-xtra", ["shadcn-x"])).toBe(false)
  })

  it("does not match unrelated sources or an empty list", () => {
    expect(matchesSource("other-lib", ["@/components"])).toBe(false)
    expect(matchesSource("@/components", [])).toBe(false)
  })
})

describe("findAncestor", () => {
  // Build a tiny parent-linked chain the way ESLint/oxlint ASTs expose it.
  type FakeNode = { type: string; parent?: FakeNode }
  function chain(...types: string[]): FakeNode {
    let parent: FakeNode | undefined = undefined
    for (const type of types) {
      parent = { type, parent }
    }
    return parent as FakeNode // deepest node last — walk starts at its .parent
  }

  it("returns the first matching ancestor", () => {
    const literal = chain("JSXAttribute", "JSXExpressionContainer", "Literal")
    const hit = findAncestor(literal, (n) => n.type === "JSXAttribute")
    expect(hit?.type).toBe("JSXAttribute")
  })

  it("returns null when no ancestor matches", () => {
    const literal = chain("Program", "CallExpression", "Literal")
    expect(findAncestor(literal, (n) => n.type === "JSXAttribute")).toBeNull()
  })

  it("never matches the starting node itself", () => {
    const node = chain("Literal")
    expect(findAncestor(node, (n) => n.type === "Literal")).toBeNull()
  })

  it("stops early (returns null) when stopWhen matches first", () => {
    // A Literal inside JSX children: the JSXElement boundary must cut the
    // walk before the outer JSXAttribute is reached.
    const literal = chain(
      "JSXAttribute",
      "JSXElement",
      "JSXExpressionContainer",
      "Literal"
    )
    expect(
      findAncestor(
        literal,
        (n) => n.type === "JSXAttribute",
        (n) => n.type === "JSXElement" || n.type === "JSXFragment"
      )
    ).toBeNull()
  })

  it("tests predicate before stopWhen — a node matching both is found", () => {
    const literal = chain("CallExpression", "Literal")
    const hit = findAncestor(
      literal,
      (n) => n.type === "CallExpression",
      (n) => n.type === "CallExpression"
    )
    expect(hit?.type).toBe("CallExpression")
  })
})

describe("perFileOption", () => {
  type Opt = { sources: string[] }
  const DEFAULTS: Opt = { sources: ["shadcn-x"] }

  // Minimal stand-in for the runtime context: `options` is null at
  // createOnce/setup time and (re)assigned per file before `before()` runs.
  function fakeContext(): { options: unknown[] | null } {
    return { options: null }
  }

  it("exposes the defaults before before() runs (options is null at setup)", () => {
    const option = perFileOption(fakeContext() as never, DEFAULTS)
    expect(option.current).toEqual(DEFAULTS)
  })

  it("resolves the file's first options object in before()", () => {
    const context = fakeContext()
    const option = perFileOption(context as never, DEFAULTS)
    context.options = [{ sources: ["@/components"] }]
    option.before()
    expect(option.current.sources).toEqual(["@/components"])
  })

  it("falls back to defaults when options are absent or empty", () => {
    const context = fakeContext()
    const option = perFileOption(context as never, DEFAULTS)

    context.options = null
    option.before()
    expect(option.current).toEqual(DEFAULTS)

    context.options = []
    option.before()
    expect(option.current).toEqual(DEFAULTS)

    context.options = [{}]
    option.before()
    expect(option.current).toEqual(DEFAULTS)
  })

  it("uses ?? semantics per key — an explicit undefined keeps the default", () => {
    const context = fakeContext()
    const option = perFileOption(context as never, DEFAULTS)
    context.options = [{ sources: undefined }]
    option.before()
    expect(option.current.sources).toEqual(["shadcn-x"])
  })

  it("resets between files — a later file without options is NOT polluted by an earlier file's options", () => {
    const context = fakeContext()
    const option = perFileOption(context as never, DEFAULTS)

    context.options = [{ sources: ["@/components"] }]
    option.before()
    expect(option.current.sources).toEqual(["@/components"])

    context.options = null
    option.before()
    expect(option.current.sources).toEqual(["shadcn-x"])
  })

  it("does not mutate the defaults object", () => {
    const defaults: Opt = { sources: ["shadcn-x"] }
    const context = fakeContext()
    const option = perFileOption(context as never, defaults)
    context.options = [{ sources: ["@/components"] }]
    option.before()
    expect(defaults.sources).toEqual(["shadcn-x"])
  })
})
