import type { ReactNode } from "react"

import * as stylex from "@stylexjs/stylex"
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

import { Link } from "@/components/link"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

// Link needs router context; render as index route component inside throwaway memory router. TanStack resolves match async → use `screen.findByText(...)`.
function renderWithRouter(ui: ReactNode) {
  const rootRoute = createRootRoute({ component: () => <Outlet /> })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <>{ui}</>,
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  })
  return render(<RouterProvider router={router} />)
}

describe("Link", async () => {
  it("renders an anchor carrying the data-slot attribute", async () => {
    renderWithRouter(<Link to="/">Home</Link>)
    const link = await screen.findByText("Home")
    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("data-slot", "link")
  })

  it("resolves `to` to an href", async () => {
    renderWithRouter(<Link to="/">Home</Link>)
    expect(await screen.findByText("Home")).toHaveAttribute("href", "/")
  })

  it("renders the default variant underlined", async () => {
    renderWithRouter(<Link to="/">Home</Link>)
    expect(await screen.findByText("Home")).toHaveAttribute(
      "data-variant",
      "default"
    )
  })

  it("renders the subtle variant", async () => {
    renderWithRouter(
      <Link to="/" variant="subtle">
        More
      </Link>
    )
    expect(await screen.findByText("More")).toHaveAttribute(
      "data-variant",
      "subtle"
    )
  })

  it("accepts a typed sx prop", async () => {
    renderWithRouter(
      <Link to="/" sx={sx.custom}>
        Docs
      </Link>
    )
    expect((await screen.findByText("Docs")).className).not.toBe("")
  })

  // Plain-anchor form (`href`): external URLs, hash anchors, mailto. Bypasses router → renders without router context.
  describe("plain-anchor form (href)", () => {
    it("renders an external URL as a styled anchor without router context", () => {
      render(<Link href="https://base-ui.com">Base UI</Link>)
      const link = screen.getByText("Base UI")
      expect(link.tagName).toBe("A")
      expect(link).toHaveAttribute("href", "https://base-ui.com")
      expect(link).toHaveAttribute("data-slot", "link")
      expect(link).toHaveAttribute("data-variant", "default")
    })

    it("renders a same-page hash anchor", () => {
      render(<Link href="#usage">Usage</Link>)
      expect(screen.getByText("Usage")).toHaveAttribute("href", "#usage")
    })

    it("supports variant and sx like the router form", () => {
      render(
        <Link href="#top" variant="subtle" sx={sx.custom}>
          Top
        </Link>
      )
      const link = screen.getByText("Top")
      expect(link).toHaveAttribute("data-variant", "subtle")
      expect(link.className).not.toBe("")
    })

    it("passes through anchor attributes (target/rel)", () => {
      render(
        <Link href="https://stylexjs.com" target="_blank" rel="noreferrer">
          StyleX
        </Link>
      )
      const link = screen.getByText("StyleX")
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", "noreferrer")
    })
  })
})
