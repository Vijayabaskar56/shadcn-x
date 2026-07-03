import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Calendar } from "@/components/calendar"

const sx = stylex.create({
  custom: { backgroundColor: "red" },
})

describe("Calendar", () => {
  it("renders the calendar slot", () => {
    const { container } = render(<Calendar />)

    expect(container.querySelector('[data-slot="calendar"]')).not.toBeNull()
  })

  it("shows the current month by default", () => {
    render(<Calendar month={new Date(2026, 0, 1)} />)

    expect(screen.getByText("January 2026")).toBeInTheDocument()
  })

  it("renders outside days by default", () => {
    const { container } = render(<Calendar month={new Date(2026, 0, 1)} />)

    expect(container.querySelector('[data-slot="calendar"]')).not.toBeNull()
  })

  it("accepts a typed sx prop and applies it to the root", () => {
    const expected = stylex.props(sx.custom).className ?? ""
    const { container } = render(<Calendar sx={sx.custom} />)
    const root = container.querySelector('[data-slot="calendar"]')

    expect(root).not.toBeNull()
    expect(root?.className).toContain(expected)
  })

  it("passes buttonVariant through to the day buttons", () => {
    const { container } = render(
      <Calendar
        mode="single"
        buttonVariant="outline"
        month={new Date(2026, 0, 1)}
      />
    )
    const dayButton = container.querySelector(
      '[role="gridcell"] [data-slot="button"]'
    )

    expect(dayButton).not.toBeNull()
    expect(dayButton).toHaveAttribute("data-variant", "outline")
  })

  it("renders month navigation buttons using the button variant", () => {
    const { container } = render(
      <Calendar buttonVariant="outline" month={new Date(2026, 0, 1)} />
    )
    const navButtons = container.querySelectorAll(
      'nav [data-slot="button"][data-variant="outline"]'
    )

    expect(navButtons.length).toBeGreaterThanOrEqual(2)
  })
})
