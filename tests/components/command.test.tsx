import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandLabel,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/command"
import { DirectionProvider } from "@/components/direction"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

// NOTE: these tests exercise shadcn-x Command (built on `cmdk`). If `cmdk` not installed, this file fails at import — expected in isolated-agent phase.
describe("Command", () => {
  it("renders the root with data-slot", () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
      </Command>
    )
    expect(document.querySelector('[data-slot="command"]')).toBeInTheDocument()
  })

  it("renders the search input and its wrapper with data-slots", () => {
    render(
      <Command>
        <CommandInput placeholder="Type a command" />
      </Command>
    )
    const wrapper = document.querySelector(
      '[data-slot="command-input-wrapper"]'
    )
    expect(wrapper).toBeInTheDocument()
    const input = screen.getByPlaceholderText("Type a command")
    expect(input.tagName).toBe("INPUT")
    expect(input).toHaveAttribute("data-slot", "command-input")
  })

  it("renders the list as a listbox with data-slot", () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem>One</CommandItem>
        </CommandList>
      </Command>
    )
    const list = document.querySelector('[data-slot="command-list"]')
    expect(list).toBeInTheDocument()
    expect(list).toHaveAttribute("role", "listbox")
  })

  it("renders items as options with data-slot", () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem>Item one</CommandItem>
          <CommandItem>Item two</CommandItem>
        </CommandList>
      </Command>
    )
    const items = screen.getAllByRole("option")
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveAttribute("data-slot", "command-item")
    expect(items[0]).toHaveTextContent("Item one")
  })

  it("renders a group with data-slot", () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandGroup>
            <CommandItem>Grouped</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
    expect(
      document.querySelector('[data-slot="command-group"]')
    ).toBeInTheDocument()
  })

  it("renders a styled label inside a group", () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandGroup>
            <CommandLabel>Suggestions</CommandLabel>
            <CommandItem>Suggestion</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
    const label = document.querySelector('[data-slot="command-label"]')
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent("Suggestions")
  })

  it("renders a separator with role and data-slot", () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem>Before</CommandItem>
          <CommandSeparator />
          <CommandItem>After</CommandItem>
        </CommandList>
      </Command>
    )
    const separator = document.querySelector('[data-slot="command-separator"]')
    expect(separator).toBeInTheDocument()
    expect(separator).toHaveAttribute("role", "separator")
  })

  it("renders a shortcut with data-slot", () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem>
            Run
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>
    )
    const shortcut = document.querySelector('[data-slot="command-shortcut"]')
    expect(shortcut).toBeInTheDocument()
    expect(shortcut).toHaveTextContent("⌘K")
  })

  it("renders the empty state when there are no matching items", () => {
    render(
      <Command>
        <CommandInput placeholder="Search" value="zzz" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
        </CommandList>
      </Command>
    )
    const empty = document.querySelector('[data-slot="command-empty"]')
    expect(empty).toBeInTheDocument()
    expect(empty).toHaveTextContent("No results.")
  })

  it("keeps a disabled item styled", () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem disabled>Disabled</CommandItem>
        </CommandList>
      </Command>
    )
    const item = screen.getByRole("option")
    expect(item).toHaveAttribute("data-slot", "command-item")
    // StyleX applied a class for the disabled treatment.
    expect(item.className).not.toBe("")
  })

  it("accepts a typed sx prop on the root and renders styled", () => {
    render(
      <Command sx={sx.custom}>
        <CommandInput placeholder="Search" />
      </Command>
    )
    const root = document.querySelector('[data-slot="command"]')
    expect(root).toBeInTheDocument()
    expect(root?.className).not.toBe("")
  })

  it("renders the dialog form with command content when open", () => {
    render(
      <CommandDialog defaultOpen>
        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
          </CommandList>
        </Command>
      </CommandDialog>
    )
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(document.querySelector('[data-slot="command"]')).toBeInTheDocument()
  })

  it("exposes an accessible name and description (sr-only header)", () => {
    render(
      <CommandDialog defaultOpen>
        <Command>
          <CommandInput placeholder="Search" />
        </Command>
      </CommandDialog>
    )
    // The header is visually hidden (sr-only) but present for screen readers,
    // labelling/describing the dialog (Base UI wires aria-labelledby/-describedby).
    expect(
      screen.getByRole("dialog", { name: "Command Palette" })
    ).toBeInTheDocument()
    expect(
      screen.getByText("Search for a command to run...")
    ).toBeInTheDocument()
  })

  it("flips the dialog horizontal transform for RTL via useDirection", () => {
    // `when.ancestor('[dir="rtl"]')` can't emit usable CSS (no `<html>` marker), so direction resolved in JS → different classNames on dialog content.
    const { unmount } = render(
      <DirectionProvider dir="ltr">
        <CommandDialog defaultOpen>
          <Command>
            <CommandInput placeholder="Search" />
          </Command>
        </CommandDialog>
      </DirectionProvider>
    )
    const ltrClass = document
      .querySelector('[data-slot="dialog-content"]')
      ?.getAttribute("class")
    expect(ltrClass).toBeTruthy()
    unmount()

    render(
      <DirectionProvider dir="rtl">
        <CommandDialog defaultOpen>
          <Command>
            <CommandInput placeholder="Search" />
          </Command>
        </CommandDialog>
      </DirectionProvider>
    )
    const rtlClass = document
      .querySelector('[data-slot="dialog-content"]')
      ?.getAttribute("class")
    expect(rtlClass).toBeTruthy()
    expect(rtlClass).not.toBe(ltrClass)
  })
})
