import * as stylex from "@stylexjs/stylex"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { Textarea } from "@/components/textarea"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Textarea", () => {
  it("renders a textarea with the data-slot attribute", () => {
    render(<Textarea aria-label="Message" />)
    const el = screen.getByRole("textbox", { name: "Message" })
    expect(el.tagName).toBe("TEXTAREA")
    expect(el).toHaveAttribute("data-slot", "textarea")
  })

  it("forwards the placeholder", () => {
    render(<Textarea placeholder="Type here…" />)
    expect(screen.getByPlaceholderText("Type here…")).toBeInTheDocument()
  })

  it("forwards the disabled state", () => {
    render(<Textarea aria-label="Message" disabled />)
    expect(screen.getByRole("textbox", { name: "Message" })).toBeDisabled()
  })

  it("fires onChange when typing", () => {
    const onChange = vi.fn()
    render(<Textarea aria-label="Message" onChange={onChange} />)
    fireEvent.change(screen.getByRole("textbox", { name: "Message" }), {
      target: { value: "hi" },
    })
    expect(onChange).toHaveBeenCalledOnce()
  })

  it("keeps aria-invalid and still renders styled", () => {
    render(<Textarea aria-label="Message" aria-invalid />)
    const el = screen.getByRole("textbox", { name: "Message" })
    expect(el).toHaveAttribute("aria-invalid", "true")
    expect(el.className).not.toBe("")
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Textarea aria-label="Message" sx={sx.custom} />)
    expect(screen.getByRole("textbox", { name: "Message" }).className).not.toBe(
      ""
    )
  })
})
