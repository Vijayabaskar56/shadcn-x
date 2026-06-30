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

// Link is a TanStack Router LinkComponent — it needs router context to resolve
// `to` into an href/onClick. Render it as the index route's component inside a
// throwaway memory router (initial entry "/"). TanStack resolves the match
// async, so callers must `await screen.findByText(...)`.
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
})
