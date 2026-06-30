import * as stylex from "@stylexjs/stylex"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { Input } from "@/components/input"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Input", () => {
  it("renders an input with the data-slot attribute", () => {
    render(<Input aria-label="Email" />)
    const el = screen.getByRole("textbox", { name: "Email" })
    expect(el.tagName).toBe("INPUT")
    expect(el).toHaveAttribute("data-slot", "input")
  })

  it("forwards the placeholder", () => {
    render(<Input placeholder="you@example.com" />)
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument()
  })

  it('defaults to type="text" when unset', () => {
    render(<Input aria-label="Email" />)
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
      "type",
      "text"
    )
  })

  it("forwards a custom type", () => {
    render(<Input aria-label="Code" type="password" />)
    expect(screen.getByLabelText("Code")).toHaveAttribute("type", "password")
  })

  it("forwards the disabled state", () => {
    render(<Input aria-label="Email" disabled />)
    expect(screen.getByRole("textbox", { name: "Email" })).toBeDisabled()
  })

  it("fires onChange when typing", () => {
    const onChange = vi.fn()
    render(<Input aria-label="Email" onChange={onChange} />)
    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "hi" },
    })
    expect(onChange).toHaveBeenCalledOnce()
  })

  it("keeps aria-invalid and still renders styled", () => {
    render(<Input aria-label="Email" aria-invalid />)
    const el = screen.getByRole("textbox", { name: "Email" })
    expect(el).toHaveAttribute("aria-invalid", "true")
    expect(el.className).not.toBe("")
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Input aria-label="Email" sx={sx.custom} />)
    expect(screen.getByRole("textbox", { name: "Email" }).className).not.toBe(
      ""
    )
  })
})
