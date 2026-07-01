import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Separator } from "@/components/separator"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Separator", () => {
  it("renders with its data-slot", () => {
    const { container } = render(<Separator />)

    expect(container.querySelector('[data-slot="separator"]')).not.toBeNull()
  })

  it("defaults to a horizontal decorative separator", () => {
    const { container } = render(<Separator />)
    const separator = container.querySelector('[data-slot="separator"]')

    expect(separator).toHaveAttribute("data-orientation", "horizontal")
    expect(separator).toHaveAttribute("role", "none")
    expect(separator).not.toHaveAttribute("aria-orientation")
  })

  it("supports vertical orientation", () => {
    const { container } = render(<Separator orientation="vertical" />)

    expect(container.querySelector('[data-slot="separator"]')).toHaveAttribute(
      "data-orientation",
      "vertical"
    )
  })

  it("can render as an accessible separator", () => {
    render(<Separator decorative={false} />)

    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "horizontal"
    )
  })

  it("forwards arbitrary DOM props", () => {
    const { container } = render(<Separator id="profile-section" />)

    expect(container.querySelector('[data-slot="separator"]')).toHaveAttribute(
      "id",
      "profile-section"
    )
  })

  it("accepts a typed sx prop and renders", () => {
    const { container } = render(<Separator sx={sx.custom} />)
    const separator = container.querySelector('[data-slot="separator"]')

    expect(separator?.className).not.toBe("")
  })
})
