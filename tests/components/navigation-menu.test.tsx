import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Box } from "@/components/box"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/navigation-menu"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("NavigationMenu", () => {
  it("renders the root as a navigation landmark with data-slot", () => {
    render(
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    const nav = screen.getByRole("navigation")
    expect(nav).toHaveAttribute("data-slot", "navigation-menu")
  })

  it("renders the list and item with data-slots", () => {
    render(
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    expect(screen.getByRole("list")).toHaveAttribute(
      "data-slot",
      "navigation-menu-list"
    )
    expect(screen.getByRole("listitem")).toHaveAttribute(
      "data-slot",
      "navigation-menu-item"
    )
  })

  it("renders the trigger as a button with data-slot and a chevron icon", () => {
    render(
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    const trigger = screen.getByRole("button", { name: /Products/ })
    expect(trigger).toHaveAttribute("data-slot", "navigation-menu-trigger")
    // The chevron icon is a decorative child of the trigger.
    expect(trigger.querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("reveals the item content in the viewport when the trigger is opened", async () => {
    const user = userEvent.setup()
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/shoes">Shoes</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    // Closed: content is not present.
    expect(screen.queryByText("Shoes")).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /Products/ }))

    // Open: the content and viewport render (in a portal).
    expect(screen.getByText("Shoes")).toBeInTheDocument()
    expect(
      document.querySelector('[data-slot="navigation-menu-content"]')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[data-slot="navigation-menu-viewport"]')
    ).toBeInTheDocument()
  })

  it("renders a link with data-slot and reflects the active state", async () => {
    const user = userEvent.setup()
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/shoes" active>
                Shoes
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    // The link lives in the content, which Base UI mounts into the shared
    // viewport portal only when the item is open — so open it first.
    await user.click(screen.getByRole("button", { name: /Products/ }))

    const link = screen.getByRole("link", { name: "Shoes" })
    expect(link).toHaveAttribute("data-slot", "navigation-menu-link")
    expect(link).toHaveAttribute("data-active", "true")
  })

  it("renders an indicator and viewport subcomponent directly", () => {
    render(
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Box>Body</Box>
            </NavigationMenuContent>
            <NavigationMenuIndicator />
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    )
    expect(
      screen
        .getByText("Products")
        .closest("li")
        ?.querySelector('[data-slot="navigation-menu-indicator"]')
    ).toBeInTheDocument()
  })

  it("accepts a typed sx prop on each subcomponent and renders", () => {
    render(
      <NavigationMenu viewport={false} sx={sx.custom}>
        <NavigationMenuList sx={sx.custom}>
          <NavigationMenuItem sx={sx.custom}>
            <NavigationMenuTrigger sx={sx.custom}>Home</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "data-slot",
      "navigation-menu-trigger"
    )
  })
})
