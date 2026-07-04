import { readFileSync, readdirSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

import { mdxComponents } from "@/components/docs/mdx-components"
import { docsNav } from "@/docs/docs-config"
import { docsRegistryFlat } from "@/docs/registry"

// Vitest runs with the repo root as cwd (vitest.config.ts lives there).
const contentDir = path.resolve(process.cwd(), "content/docs")

const docFiles = readdirSync(contentDir).filter(
  (file) => file.endsWith(".md") || file.endsWith(".mdx")
)

const fileSlugs = docFiles.map((file) => file.replace(/\.mdx?$/, ""))

describe("docs registry ↔ content/docs parity", () => {
  it("has no duplicate slugs", () => {
    const slugs = docsRegistryFlat.map((entry) => entry.slug)
    expect(slugs).toEqual([...new Set(slugs)])
  })

  it("every content/docs file has a registry entry", () => {
    const registrySlugs = new Set(docsRegistryFlat.map((entry) => entry.slug))
    const missing = fileSlugs.filter((slug) => !registrySlugs.has(slug))
    expect(
      missing,
      "docs without a registry entry (src/docs/registry.ts)"
    ).toEqual([])
  })

  it("every registry entry resolves to a real content/docs file", () => {
    const fileSet = new Set(fileSlugs)
    const orphaned = docsRegistryFlat
      .map((entry) => entry.slug)
      .filter((slug) => !fileSet.has(slug))
    expect(orphaned, "registry entries with no content/docs file").toEqual([])
  })

  it("derived docsNav only contains non-hidden entries, in registry order", () => {
    const navSlugs = docsNav.flatMap((section) =>
      section.items.map((item) => item.slug)
    )
    const expected = docsRegistryFlat
      .filter((entry) => !entry.navHidden)
      .map((entry) => entry.slug)
    expect(navSlugs).toEqual(expected)
  })
})

/**
 * Strip the parts of an MDX source that can legitimately contain `<Name`
 * without referring to a live MDX component: fenced code blocks, inline code,
 * and MDX comments.
 */
function stripNonJsx(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
}

/** Capitalized JSX tag names used in an MDX body, e.g. `<Button` -> Button. */
function jsxComponentNames(source: string): Array<string> {
  const names = new Set<string>()
  for (const match of stripNonJsx(source).matchAll(
    /<([A-Z][A-Za-z0-9]*)[\s/>]/g
  )) {
    names.add(match[1])
  }
  return [...names].sort()
}

describe("every JSX component used in content/docs/*.mdx is registered", () => {
  // A missing entry in the MDX component map fails silently at doc-render
  // time (or throws deep inside the compiled doc). This turns it into a test
  // failure: add the component to its doc's entry in src/docs/registry.ts.
  const mdxFiles = docFiles.filter((file) => file.endsWith(".mdx"))

  it.each(mdxFiles)("%s", (file) => {
    const source = readFileSync(path.join(contentDir, file), "utf8")
    const unresolved = jsxComponentNames(source).filter(
      (name) => !(name in mdxComponents)
    )
    expect(
      unresolved,
      `components used in ${file} but missing from the docs registry`
    ).toEqual([])
  })
})
