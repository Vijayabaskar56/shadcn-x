import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/item"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Item", () => {
  it("renders an item group with list semantics", () => {
    render(
      <ItemGroup>
        <Item>Inbox</Item>
      </ItemGroup>
    )

    const group = screen.getByRole("list")
    expect(group).toHaveAttribute("data-slot", "item-group")
  })

  it("carries the item data-slot, variant, and size attributes", () => {
    render(
      <Item variant="outline" size="sm">
        Settings
      </Item>
    )

    const item = screen.getByText("Settings")
    expect(item).toHaveAttribute("data-slot", "item")
    expect(item).toHaveAttribute("data-variant", "outline")
    expect(item).toHaveAttribute("data-size", "sm")
  })

  it("renders every shadcn item slot", () => {
    render(
      <Item>
        <ItemHeader>Header</ItemHeader>
        <ItemMedia variant="icon">I</ItemMedia>
        <ItemContent>
          <ItemTitle>Project Alpha</ItemTitle>
          <ItemDescription>Updated yesterday</ItemDescription>
        </ItemContent>
        <ItemActions>Open</ItemActions>
        <ItemFooter>Footer</ItemFooter>
      </Item>
    )

    expect(screen.getByText("Header")).toHaveAttribute(
      "data-slot",
      "item-header"
    )
    expect(screen.getByText("I")).toHaveAttribute("data-slot", "item-media")
    expect(screen.getByText("I")).toHaveAttribute("data-variant", "icon")
    expect(screen.getByText("Project Alpha")).toHaveAttribute(
      "data-slot",
      "item-title"
    )
    expect(screen.getByText("Updated yesterday")).toHaveAttribute(
      "data-slot",
      "item-description"
    )
    expect(screen.getByText("Open")).toHaveAttribute(
      "data-slot",
      "item-actions"
    )
    expect(screen.getByText("Footer")).toHaveAttribute(
      "data-slot",
      "item-footer"
    )
  })

  it("renders ItemSeparator with its slot", () => {
    const { container } = render(<ItemSeparator />)

    expect(
      container.querySelector('[data-slot="item-separator"]')
    ).not.toBeNull()
  })

  it("supports the image media variant", () => {
    render(<ItemMedia variant="image">Avatar</ItemMedia>)

    expect(screen.getByText("Avatar")).toHaveAttribute("data-variant", "image")
  })

  it("is polymorphic via render", () => {
    render(<Item render={<output />}>Total</Item>)

    const item = screen.getByText("Total")
    expect(item.tagName).toBe("OUTPUT")
    expect(item).toHaveAttribute("data-slot", "item")
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Item sx={sx.custom}>Styled item</Item>)

    expect(screen.getByText("Styled item").className).not.toBe("")
  })
})
