import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ToggleGroup, ToggleGroupItem } from "@/components/toggle-group"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("ToggleGroup", () => {
  it("renders with the group role and data-slot", () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )
    const group = screen.getByRole("group")
    expect(group).toHaveAttribute("data-slot", "toggle-group")
  })

  it("renders items with data-slot toggle-group-item", () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-slot",
      "toggle-group-item"
    )
  })

  it("forwards pressed state per item", async () => {
    const onPressedChange = vi.fn()
    render(
      <ToggleGroup>
        <ToggleGroupItem value="a" onPressedChange={onPressedChange}>
          A
        </ToggleGroupItem>
      </ToggleGroup>
    )
    await userEvent.click(screen.getByRole("button", { name: "A" }))
    expect(onPressedChange).toHaveBeenCalledOnce()
    expect(onPressedChange.mock.calls[0][0]).toBe(true)
  })

  it("renders items without error", () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getAllByRole("button")).toHaveLength(3)
  })

  it("accepts sx on the group", () => {
    render(
      <ToggleGroup sx={sx.custom}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByRole("group").className).not.toBe("")
  })

  it("accepts sx on an item", () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="a" sx={sx.custom}>
          A
        </ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByRole("button").className).not.toBe("")
  })

  it("reflects a default-selected item as pressed", () => {
    render(
      <ToggleGroup multiple defaultValue={["b"]}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )
    // The selected item must carry the pressed style vs an unselected one.
    expect(screen.getByRole("button", { name: "B" }).className).not.toBe(
      screen.getByRole("button", { name: "A" }).className
    )
  })

  it("reflects the outline variant on the group and its items", () => {
    render(
      <ToggleGroup variant="outline">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByRole("group")).toHaveAttribute("data-variant", "outline")
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-variant",
      "outline"
    )
  })

  it("reflects the sm size on the group and its items", () => {
    render(
      <ToggleGroup size="sm">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByRole("group")).toHaveAttribute("data-size", "sm")
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "sm")
  })

  it("reflects the lg size on the group and its items", () => {
    render(
      <ToggleGroup size="lg">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByRole("group")).toHaveAttribute("data-size", "lg")
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "lg")
  })

  it("applies the pressed style when an item is selected (uncontrolled)", async () => {
    render(
      <ToggleGroup multiple>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    )
    const item = screen.getByRole("button", { name: "A" })
    const unpressedClass = item.className
    await userEvent.click(item)
    expect(item).toHaveAttribute("aria-pressed", "true")
    // Selecting must restyle the item, not merely flip aria-pressed.
    expect(item.className).not.toBe(unpressedClass)
  })
})
