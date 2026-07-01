import * as stylex from "@stylexjs/stylex"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

// Base UI's menu trigger opens the popup on click. This helper centralizes that
// interaction.
function openMenu(label = "Open") {
  fireEvent.click(screen.getByText(label))
}

describe("DropdownMenu", () => {
  it("renders the trigger with data-slot", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Back</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    expect(screen.getByText("Open")).toHaveAttribute(
      "data-slot",
      "dropdown-menu-trigger"
    )
  })

  it("opens the menu on click and renders a menu with menuitem roles", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Back</DropdownMenuItem>
          <DropdownMenuItem>Forward</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    openMenu()
    const menu = screen.getByRole("menu")
    expect(menu).toHaveAttribute("data-slot", "dropdown-menu-content")
    const items = screen.getAllByRole("menuitem")
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveAttribute("data-slot", "dropdown-menu-item")
  })

  it("renders a group and label with data-slot", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Navigation</DropdownMenuLabel>
            <DropdownMenuItem>Back</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    openMenu()
    expect(
      document.querySelector('[data-slot="dropdown-menu-group"]')
    ).toBeInTheDocument()
    const label = screen.getByText("Navigation")
    expect(label).toHaveAttribute("data-slot", "dropdown-menu-label")
  })

  it("renders a separator with data-slot", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Back</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Forward</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    openMenu()
    expect(
      document.querySelector('[data-slot="dropdown-menu-separator"]')
    ).toBeInTheDocument()
  })

  it("renders a checkbox item with check indicator and menuitemcheckbox role", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Show grid</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    openMenu()
    const checkbox = screen.getByRole("menuitemcheckbox")
    expect(checkbox).toHaveAttribute("data-slot", "dropdown-menu-checkbox-item")
    // A checked checkbox item shows the indicator's check icon.
    expect(checkbox.querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("calls onCheckedChange when a checkbox item is toggled", () => {
    const onCheckedChange = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Show grid
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    openMenu()
    fireEvent.click(screen.getByRole("menuitemcheckbox"))
    expect(onCheckedChange).toHaveBeenCalled()
  })

  it("renders a radio group with radio items and menuitemradio role", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup defaultValue="a">
            <DropdownMenuRadioItem value="a">A</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="b">B</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    openMenu()
    const radios = screen.getAllByRole("menuitemradio")
    expect(radios).toHaveLength(2)
    expect(radios[0]).toHaveAttribute("data-slot", "dropdown-menu-radio-item")
    // The selected radio item shows its indicator icon.
    expect(radios[0].querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("renders a submenu trigger with a chevron and sub-content data-slot", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Open in</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>New tab</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    openMenu()
    const subTrigger = screen.getByText("Open in")
    expect(subTrigger).toHaveAttribute("data-slot", "dropdown-menu-sub-trigger")
    expect(subTrigger.querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("renders a shortcut with data-slot", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Back
            <DropdownMenuShortcut>⌘[</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    openMenu()
    const shortcut = screen.getByText("⌘[")
    expect(shortcut).toHaveAttribute("data-slot", "dropdown-menu-shortcut")
  })

  it("reflects inset and variant on the item via data attributes", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset>Back</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    openMenu()
    const [back, del] = screen.getAllByRole("menuitem")
    expect(back).toHaveAttribute("data-inset", "true")
    expect(back).toHaveAttribute("data-variant", "default")
    expect(del).toHaveAttribute("data-variant", "destructive")
  })

  it("accepts a typed sx prop on content and renders", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent sx={sx.custom}>
          <DropdownMenuItem>Back</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    openMenu()
    expect(screen.getByRole("menu")).toBeInTheDocument()
  })
})
