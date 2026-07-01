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
})
