import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Skeleton } from "@/components/skeleton"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Skeleton", () => {
  it("renders a div with the skeleton data-slot", () => {
    const { container } = render(<Skeleton aria-label="Loading profile" />)
    const skeleton = container.firstElementChild as HTMLDivElement

    expect(skeleton.tagName).toBe("DIV")
    expect(skeleton).toHaveAttribute("data-slot", "skeleton")
    expect(screen.getByLabelText("Loading profile")).toBe(skeleton)
  })

  it("forwards arbitrary DOM props", () => {
    render(<Skeleton data-testid="loading-card" aria-hidden="true" />)

    expect(screen.getByTestId("loading-card")).toHaveAttribute(
      "aria-hidden",
      "true"
    )
  })

  it("applies StyleX classes for the default shape and pulse animation", () => {
    const { container } = render(<Skeleton />)

    expect(container.firstElementChild?.className).not.toBe("")
  })

  it("accepts a typed sx prop", () => {
    const { container } = render(<Skeleton sx={sx.custom} />)

    expect(container.firstElementChild?.className).not.toBe("")
  })
})
