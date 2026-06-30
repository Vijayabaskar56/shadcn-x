import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Input } from "@/components/input"
import { Label } from "@/components/label"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Label", () => {
  it("renders a <label> with its children", () => {
    render(<Label>Email</Label>)
    const label = screen.getByText("Email")
    expect(label.tagName).toBe("LABEL")
  })

  it("carries the data-slot attribute", () => {
    render(<Label>Email</Label>)
    expect(screen.getByText("Email")).toHaveAttribute("data-slot", "label")
  })

  it("associates with a control via htmlFor", () => {
    render(<Label htmlFor="email">Email</Label>)
    expect(screen.getByText("Email")).toHaveAttribute("for", "email")
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Label sx={sx.custom}>Email</Label>)
    expect(screen.getByText("Email").className).not.toBe("")
  })

  it("forwards arbitrary props to the host element", () => {
    render(<Label id="email-label">Email</Label>)
    expect(screen.getByText("Email")).toHaveAttribute("id", "email-label")
  })

  it("renders next to a disabled peer input (peer-disabled wiring)", () => {
    // The dim itself is a runtime CSS cascade (jsdom can't compute it), but this
    // locks the peer scenario: a marked, disabled <Input> sibling renders
    // alongside the <Label> without error, and both keep their data-slots.
    render(
      <>
        <Input id="x" disabled />
        <Label htmlFor="x">Email</Label>
      </>
    )
    expect(screen.getByLabelText("Email")).toBeDisabled()
    expect(screen.getByText("Email")).toHaveAttribute("data-slot", "label")
  })
})
