import * as stylex from "@stylexjs/stylex"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "@/components/native-select"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("NativeSelect", () => {
  it("renders a select element with data-slot", () => {
    render(
      <NativeSelect aria-label="Fruit">
        <NativeSelectOption value="a">Apple</NativeSelectOption>
      </NativeSelect>
    )
    const select = screen.getByRole("combobox", { name: "Fruit" })
    expect(select.tagName).toBe("SELECT")
    expect(select).toHaveAttribute("data-slot", "native-select")
  })

  it("renders the wrapper with data-slot", () => {
    render(
      <NativeSelect aria-label="Fruit">
        <NativeSelectOption value="a">Apple</NativeSelectOption>
      </NativeSelect>
    )
    const select = screen.getByRole("combobox")
    const wrapper = select.parentElement
    expect(wrapper).toHaveAttribute("data-slot", "native-select-wrapper")
  })

  it("renders the icon with data-slot and aria-hidden", () => {
    render(
      <NativeSelect aria-label="Fruit">
        <NativeSelectOption value="a">Apple</NativeSelectOption>
      </NativeSelect>
    )
    const icon = document.querySelector('[data-slot="icon"]')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute("aria-hidden", "true")
  })

  it("renders option children", () => {
    render(
      <NativeSelect aria-label="Fruit">
        <NativeSelectOption value="a">Apple</NativeSelectOption>
        <NativeSelectOption value="b">Banana</NativeSelectOption>
      </NativeSelect>
    )
    const options = screen.getAllByRole("option")
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveTextContent("Apple")
    expect(options[1]).toHaveTextContent("Banana")
  })

  it("renders optgroup with options", () => {
    render(
      <NativeSelect aria-label="Food">
        <NativeSelectOptGroup label="Fruits">
          <NativeSelectOption value="a">Apple</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    )
    expect(screen.getByRole("group")).toHaveAttribute(
      "data-slot",
      "native-select-optgroup"
    )
    expect(screen.getByRole("option")).toHaveTextContent("Apple")
  })

  it("fires onChange when selection changes", () => {
    const onChange = vi.fn()
    render(
      <NativeSelect aria-label="Fruit" onChange={onChange}>
        <NativeSelectOption value="a">Apple</NativeSelectOption>
        <NativeSelectOption value="b">Banana</NativeSelectOption>
      </NativeSelect>
    )
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "b" },
    })
    expect(onChange).toHaveBeenCalledOnce()
  })

  it("forwards the disabled state", () => {
    render(
      <NativeSelect aria-label="Fruit" disabled>
        <NativeSelectOption value="a">Apple</NativeSelectOption>
      </NativeSelect>
    )
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("renders every size without error", () => {
    const sizes = ["default", "sm"] as const
    for (const size of sizes) {
      const { unmount } = render(
        <NativeSelect aria-label={`Size ${size}`} size={size}>
          <NativeSelectOption value="a">A</NativeSelectOption>
        </NativeSelect>
      )
      expect(
        screen.getByRole("combobox", { name: `Size ${size}` })
      ).toBeInTheDocument()
      unmount()
    }
  })

  it("accepts a typed sx prop and renders", () => {
    render(
      <NativeSelect aria-label="Styled" sx={sx.custom}>
        <NativeSelectOption value="a">A</NativeSelectOption>
      </NativeSelect>
    )
    expect(screen.getByRole("combobox").parentElement?.className).not.toBe("")
  })
})
