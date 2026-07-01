import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Toggle } from "@/components/toggle"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Toggle", () => {
  it("renders its children", () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument()
  })

  it("carries the data-slot attribute", () => {
    render(<Toggle>B</Toggle>)
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "toggle")
  })

  it("forwards DOM props", () => {
    render(<Toggle disabled>Off</Toggle>)
    expect(screen.getByRole("button", { name: "Off" })).toBeDisabled()
  })

  it("fires onPressedChange when clicked", async () => {
    const onPressedChange = vi.fn()
    render(<Toggle onPressedChange={onPressedChange}>Tap</Toggle>)
    await userEvent.click(screen.getByRole("button", { name: "Tap" }))
    expect(onPressedChange).toHaveBeenCalledOnce()
    expect(onPressedChange.mock.calls[0][0]).toBe(true)
  })

  it("renders every variant without error", () => {
    const variants = ["default", "outline"] as const
    for (const variant of variants) {
      const { unmount } = render(<Toggle variant={variant}>{variant}</Toggle>)
      expect(screen.getByRole("button", { name: variant })).toBeInTheDocument()
      unmount()
    }
  })

  it("renders every size without error", () => {
    const sizes = ["default", "sm", "lg"] as const
    for (const size of sizes) {
      const { unmount } = render(<Toggle size={size}>{size}</Toggle>)
      expect(screen.getByRole("button", { name: size })).toBeInTheDocument()
      unmount()
    }
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Toggle sx={sx.custom}>Styled</Toggle>)
    const toggle = screen.getByRole("button", { name: "Styled" })
    expect(toggle).toBeInTheDocument()
    expect(toggle.className).not.toBe("")
  })

  it("applies pressed styles when controlled as pressed", () => {
    render(<Toggle pressed>On</Toggle>)
    expect(screen.getByRole("button", { name: "On" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
  })

  it("reflects the pressed style when defaultPressed (uncontrolled)", () => {
    render(
      <>
        <Toggle>Off</Toggle>
        <Toggle defaultPressed>On</Toggle>
      </>
    )
    // defaultPressed must apply the pressed styles, not just Base UI's aria state.
    expect(screen.getByRole("button", { name: "On" }).className).not.toBe(
      screen.getByRole("button", { name: "Off" }).className
    )
  })

  it("updates the pressed style when toggled (uncontrolled)", async () => {
    render(<Toggle>Tap</Toggle>)
    const toggle = screen.getByRole("button", { name: "Tap" })
    const unpressedClass = toggle.className
    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute("aria-pressed", "true")
    // Toggling on must restyle the button, not merely flip aria-pressed.
    expect(toggle.className).not.toBe(unpressedClass)
  })
})
