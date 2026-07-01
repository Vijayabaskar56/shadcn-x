import * as stylex from "@stylexjs/stylex"
import { fireEvent, render, screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/menubar"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

// Base UI's menubar trigger opens its menu on click. This helper centralizes
// that interaction (defaults to the first menu's trigger).
function openMenu(label = "File") {
  fireEvent.click(screen.getByText(label))
}

describe("Menubar", () => {
  it("renders the root with the menubar role and data-slot", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    const menubar = screen.getByRole("menubar")
    expect(menubar).toHaveAttribute("data-slot", "menubar")
  })

  it("renders the trigger with menuitem role and data-slot", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    const trigger = screen.getByText("File")
    expect(trigger).toHaveAttribute("data-slot", "menubar-trigger")
    expect(trigger).toHaveAttribute("role", "menuitem")
  })

  it("opens a menu on click and renders items with menuitem roles", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New File</MenubarItem>
            <MenubarItem>Open…</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    openMenu()
    const menu = screen.getByRole("menu")
    expect(menu).toHaveAttribute("data-slot", "menubar-content")
    // The menubar trigger also carries role="menuitem", so scope to the popup
    // to count only its items.
    const items = within(menu).getAllByRole("menuitem")
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveAttribute("data-slot", "menubar-item")
  })

  it("renders a group and label with data-slot", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>History</MenubarLabel>
              <MenubarItem>Undo</MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    openMenu("Edit")
    expect(
      document.querySelector('[data-slot="menubar-group"]')
    ).toBeInTheDocument()
    const label = screen.getByText("History")
    expect(label).toHaveAttribute("data-slot", "menubar-label")
  })

  it("renders a separator with data-slot", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Open…</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    openMenu()
    expect(
      document.querySelector('[data-slot="menubar-separator"]')
    ).toBeInTheDocument()
  })

  it("renders a checkbox item with check indicator and menuitemcheckbox role", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>Show grid</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    openMenu("View")
    const checkbox = screen.getByRole("menuitemcheckbox")
    expect(checkbox).toHaveAttribute("data-slot", "menubar-checkbox-item")
    // A checked checkbox item shows the indicator's check icon.
    expect(checkbox.querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("calls onCheckedChange when a checkbox item is toggled", () => {
    const onCheckedChange = vi.fn()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={false}
              onCheckedChange={onCheckedChange}
            >
              Show grid
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    openMenu("View")
    fireEvent.click(screen.getByRole("menuitemcheckbox"))
    expect(onCheckedChange).toHaveBeenCalled()
  })

  it("renders a radio group with radio items and menuitemradio role", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup defaultValue="a">
              <MenubarRadioItem value="a">A</MenubarRadioItem>
              <MenubarRadioItem value="b">B</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    openMenu("View")
    const radios = screen.getAllByRole("menuitemradio")
    expect(radios).toHaveLength(2)
    expect(radios[0]).toHaveAttribute("data-slot", "menubar-radio-item")
    // The selected radio item shows its indicator icon.
    expect(radios[0].querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("renders a submenu trigger with a chevron and sub-content data-slot", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Open in</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>New tab</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    openMenu()
    const subTrigger = screen.getByText("Open in")
    expect(subTrigger).toHaveAttribute("data-slot", "menubar-sub-trigger")
    expect(subTrigger.querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("renders a shortcut with data-slot", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Save
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    openMenu()
    const shortcut = screen.getByText("⌘S")
    expect(shortcut).toHaveAttribute("data-slot", "menubar-shortcut")
  })

  it("reflects inset and variant on the item via data attributes", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem inset>New</MenubarItem>
            <MenubarItem variant="destructive">Delete</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    openMenu()
    // The menubar trigger also carries role="menuitem"; scope to the popup so
    // we assert on its items, not the bar's trigger.
    const [back, del] = within(screen.getByRole("menu")).getAllByRole(
      "menuitem"
    )
    expect(back).toHaveAttribute("data-inset", "true")
    expect(back).toHaveAttribute("data-variant", "default")
    expect(del).toHaveAttribute("data-variant", "destructive")
  })

  it("renders multiple menus side by side in one menubar", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    const triggers = screen.getAllByRole("menuitem")
    expect(triggers).toHaveLength(2)
  })

  it("accepts a typed sx prop on the root and content and renders", () => {
    render(
      <Menubar sx={sx.custom}>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent sx={sx.custom}>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    expect(screen.getByRole("menubar")).toBeInTheDocument()
    openMenu()
    expect(screen.getByRole("menu")).toBeInTheDocument()
  })
})
