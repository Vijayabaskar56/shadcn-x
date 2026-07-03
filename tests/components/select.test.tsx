import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/select"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

function renderSelect() {
  return render(
    <Select defaultValue="apple" defaultOpen>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
  )
}

describe("Select", () => {
  it("renders the trigger with data-slot", () => {
    renderSelect()
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "data-slot",
      "select-trigger"
    )
  })

  it("renders select-value with data-slot", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue data-testid="value" placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByTestId("value")).toHaveAttribute(
      "data-slot",
      "select-value"
    )
    // The truncation/flex styling lives on the SelectValue element itself
    // (matching shadcn's *:data-[slot=select-value]:… rules), so it carries a
    // StyleX class rather than relying on a when.descendant selector.
    expect(screen.getByTestId("value").className).not.toBe("")
  })

  it("renders the chevron icon in trigger", () => {
    renderSelect()
    const trigger = screen.getByRole("combobox")
    const icon = trigger.querySelector('[data-slot="icon"]')
    expect(icon).toBeInTheDocument()
  })

  it("renders the check icon on selected item", () => {
    renderSelect()
    const item = screen.getByRole("option", { name: "Apple" })
    const check = item.querySelector('[data-slot="icon"]')
    expect(check).toBeInTheDocument()
  })

  it("fires onValueChange when an item is selected", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Select defaultOpen onValueChange={onValueChange}>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    )
    await user.click(screen.getByRole("option", { name: "Apple" }))
    expect(onValueChange).toHaveBeenCalledWith("apple", expect.anything())
  })

  it("renders the label with data-slot", () => {
    renderSelect()
    expect(
      document.querySelector('[data-slot="select-label"]')
    ).toBeInTheDocument()
  })

  it("renders the separator with data-slot", () => {
    renderSelect()
    expect(
      document.querySelector('[data-slot="select-separator"]')
    ).toBeInTheDocument()
  })

  it("renders every size without error", () => {
    const sizes = ["default", "sm"] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Select>
          <SelectTrigger aria-label={`Size ${size}`} size={size}>
            <SelectValue placeholder="Pick" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">A</SelectItem>
          </SelectContent>
        </Select>
      )
      expect(
        screen.getByRole("combobox", { name: `Size ${size}` })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("combobox", { name: `Size ${size}` })
      ).toHaveAttribute("data-size", size)
      unmount()
    }
  })

  it("renders items with data-slot", () => {
    renderSelect()
    expect(
      document.querySelector('[data-slot="select-item"]')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[data-slot="select-group"]')
    ).toBeInTheDocument()
  })

  it("accepts a typed sx prop on trigger and renders", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Styled" sx={sx.custom}>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByRole("combobox", { name: "Styled" })).toBeInTheDocument()
  })
})
