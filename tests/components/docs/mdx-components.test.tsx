import type { ReactNode } from "react"

import {
  Outlet,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { mdxComponents } from "@/components/docs/mdx-components"

const MdxA = mdxComponents.a

// Internal doc links need a memory router with `/docs/$` route; hash/external links use plain-anchor form with no router.
function renderWithDocsRouter(ui: ReactNode) {
  const rootRoute = createRootRoute({ component: () => <Outlet /> })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <>{ui}</>,
  })
  const docsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/docs/$",
    component: () => null,
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, docsRoute]),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  })
  return render(<RouterProvider router={router} />)
}

describe("mdxComponents.a (MdxAnchor)", () => {
  it("renders a heading hash anchor on-system, without router context", () => {
    render(<MdxA href="#usage">Usage</MdxA>)
    const link = screen.getByText("Usage")
    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("href", "#usage")
    expect(link).toHaveAttribute("data-slot", "link")
    expect(link).toHaveAttribute("data-variant", "default")
  })

  it("renders an external URL as a plain on-system anchor", () => {
    render(<MdxA href="https://base-ui.com">Base UI</MdxA>)
    const link = screen.getByText("Base UI")
    expect(link).toHaveAttribute("href", "https://base-ui.com")
    expect(link).toHaveAttribute("data-slot", "link")
  })

  it("routes internal /docs/ links through the router Link", async () => {
    renderWithDocsRouter(<MdxA href="/docs/button">Button docs</MdxA>)
    const link = await screen.findByText("Button docs")
    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("href", "/docs/button")
    expect(link).toHaveAttribute("data-slot", "link")
  })

  it("routes nested /docs/ slugs with the full splat", async () => {
    renderWithDocsRouter(<MdxA href="/docs/guides/theming">Theming</MdxA>)
    expect(await screen.findByText("Theming")).toHaveAttribute(
      "href",
      "/docs/guides/theming"
    )
  })
})
