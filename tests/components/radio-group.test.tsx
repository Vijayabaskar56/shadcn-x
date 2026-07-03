import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { RadioGroup, RadioGroupItem } from "@/components/radio-group"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("RadioGroup", () => {
  it("renders with the data-slot attribute", () => {
    render(
      <RadioGroup aria-label="Fruit">
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    expect(screen.getByRole("radiogroup")).toHaveAttribute(
      "data-slot",
      "radio-group"
    )
  })

  it("renders radio items with the data-slot attribute", () => {
    render(
      <RadioGroup aria-label="Fruit">
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    expect(screen.getByRole("radio")).toHaveAttribute(
      "data-slot",
      "radio-group-item"
    )
  })

  it("forwards defaultValue and selects the right item", () => {
    render(
      <RadioGroup aria-label="Fruit" defaultValue="b">
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    )
    const radios = screen.getAllByRole("radio")
    expect(radios[0]).not.toBeChecked()
    expect(radios[1]).toBeChecked()
  })

  it("calls onValueChange when a different item is clicked", async () => {
    const onValueChange = vi.fn()
    render(
      <RadioGroup aria-label="Fruit" onValueChange={onValueChange}>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    )
    await userEvent.click(screen.getAllByRole("radio")[1])
    expect(onValueChange).toHaveBeenCalledWith("b", expect.any(Object))
  })

  it("renders without error", () => {
    render(
      <RadioGroup aria-label="Fruit">
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    expect(screen.getByRole("radio")).toBeInTheDocument()
  })

  it("forwards disabled state on items via aria-disabled", () => {
    render(
      <RadioGroup aria-label="Fruit">
        <RadioGroupItem value="a" disabled />
      </RadioGroup>
    )
    expect(screen.getByRole("radio")).toHaveAttribute("aria-disabled", "true")
  })

  it("accepts a typed sx prop on the group and renders", () => {
    render(
      <RadioGroup aria-label="Fruit" sx={sx.custom}>
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    const group = screen.getByRole("radiogroup")
    expect(group).toBeInTheDocument()
    expect(group.className).not.toBe("")
  })

  it("accepts a typed sx prop on the item and renders", () => {
    render(
      <RadioGroup aria-label="Fruit">
        <RadioGroupItem value="a" sx={sx.custom} />
      </RadioGroup>
    )
    const radio = screen.getByRole("radio")
    expect(radio).toBeInTheDocument()
    expect(radio.className).not.toBe("")
  })
})
