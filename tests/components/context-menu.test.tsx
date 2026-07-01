import * as stylex from "@stylexjs/stylex"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/context-menu"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

// Base UI's context menu trigger opens the popup on a `contextmenu` (right
// click) event. This helper centralizes that interaction.
function openMenu(label = "Target") {
  fireEvent.contextMenu(screen.getByText(label))
}

describe("ContextMenu", () => {
  it("renders the trigger with data-slot", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Back</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    expect(screen.getByText("Target")).toHaveAttribute(
      "data-slot",
      "context-menu-trigger"
    )
  })

  it("opens the menu on right-click and renders a menu with menuitem roles", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem>Forward</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    openMenu()
    const menu = screen.getByRole("menu")
    expect(menu).toHaveAttribute("data-slot", "context-menu-content")
    const items = screen.getAllByRole("menuitem")
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveAttribute("data-slot", "context-menu-item")
  })

  it("renders a group and label with data-slot", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>Navigation</ContextMenuLabel>
            <ContextMenuItem>Back</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    )
    openMenu()
    expect(
      document.querySelector('[data-slot="context-menu-group"]')
    ).toBeInTheDocument()
    const label = screen.getByText("Navigation")
    expect(label).toHaveAttribute("data-slot", "context-menu-label")
  })

  it("renders a separator with data-slot", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Forward</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    openMenu()
    expect(
      document.querySelector('[data-slot="context-menu-separator"]')
    ).toBeInTheDocument()
  })

  it("renders a checkbox item with check indicator and menuitemcheckbox role", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>Show grid</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    openMenu()
    const checkbox = screen.getByRole("menuitemcheckbox")
    expect(checkbox).toHaveAttribute("data-slot", "context-menu-checkbox-item")
    // A checked checkbox item shows the indicator's check icon.
    expect(checkbox.querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("calls onCheckedChange when a checkbox item is toggled", () => {
    const onCheckedChange = vi.fn()
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Show grid
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    openMenu()
    fireEvent.click(screen.getByRole("menuitemcheckbox"))
    expect(onCheckedChange).toHaveBeenCalled()
  })

  it("renders a radio group with radio items and menuitemradio role", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuRadioGroup defaultValue="a">
            <ContextMenuRadioItem value="a">A</ContextMenuRadioItem>
            <ContextMenuRadioItem value="b">B</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    )
    openMenu()
    const radios = screen.getAllByRole("menuitemradio")
    expect(radios).toHaveLength(2)
    expect(radios[0]).toHaveAttribute("data-slot", "context-menu-radio-item")
    // The selected radio item shows its indicator icon.
    expect(radios[0].querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("renders a submenu trigger with a chevron and sub-content data-slot", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Open in</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>New tab</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    )
    openMenu()
    const subTrigger = screen.getByText("Open in")
    expect(subTrigger).toHaveAttribute("data-slot", "context-menu-sub-trigger")
    expect(subTrigger.querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("renders a shortcut with data-slot", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    openMenu()
    const shortcut = screen.getByText("⌘[")
    expect(shortcut).toHaveAttribute("data-slot", "context-menu-shortcut")
  })

  it("reflects inset and variant on the item via data attributes", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset>Back</ContextMenuItem>
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    openMenu()
    const [back, del] = screen.getAllByRole("menuitem")
    expect(back).toHaveAttribute("data-inset", "true")
    expect(back).toHaveAttribute("data-variant", "default")
    expect(del).toHaveAttribute("data-variant", "destructive")
  })

  it("accepts a typed sx prop on content and renders", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent sx={sx.custom}>
          <ContextMenuItem>Back</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    openMenu()
    expect(screen.getByRole("menu")).toBeInTheDocument()
  })
})
