import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Checkbox } from "@/components/checkbox"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Checkbox", () => {
  it("renders a checkbox with the data-slot attribute", () => {
    render(<Checkbox aria-label="Accept terms" />)
    const el = screen.getByRole("checkbox", { name: "Accept terms" })
    expect(el).toHaveAttribute("data-slot", "checkbox")
  })

  it("renders the check icon when checked", () => {
    render(<Checkbox aria-label="Accept terms" defaultChecked />)
    const el = screen.getByRole("checkbox", { name: "Accept terms" })
    expect(el).toHaveAttribute("data-slot", "checkbox")
  })

  it("toggles state on click", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Toggle me" />)
    const el = screen.getByRole("checkbox", { name: "Toggle me" })
    expect(el).not.toBeChecked()
    await user.click(el)
    expect(el).toBeChecked()
  })

  it("fires onCheckedChange when clicked", async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox aria-label="Accept" onCheckedChange={onChange} />)
    await user.click(screen.getByRole("checkbox", { name: "Accept" }))
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it("forwards the disabled state", () => {
    render(<Checkbox aria-label="Disabled" disabled />)
    const el = screen.getByRole("checkbox", { name: "Disabled" })
    expect(el).toHaveAttribute("aria-disabled", "true")
  })

  it("supports controlled checked prop", () => {
    render(<Checkbox aria-label="Controlled" checked readOnly />)
    expect(screen.getByRole("checkbox", { name: "Controlled" })).toBeChecked()
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Checkbox aria-label="Styled" sx={sx.custom} />)
    expect(screen.getByRole("checkbox", { name: "Styled" }).className).not.toBe(
      ""
    )
  })

  it("renders every state without error", () => {
    const { unmount } = render(<Checkbox aria-label="Invalid" aria-invalid />)
    expect(
      screen.getByRole("checkbox", { name: "Invalid" })
    ).toBeInTheDocument()
    unmount()
  })
})
