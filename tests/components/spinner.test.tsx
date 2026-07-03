import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Spinner } from "@/components/spinner"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Spinner", () => {
  it("renders an accessible loading status", () => {
    render(<Spinner />)

    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument()
  })

  it("carries the data-slot attribute", () => {
    render(<Spinner />)

    expect(screen.getByRole("status")).toHaveAttribute("data-slot", "spinner")
  })

  it("forwards SVG props", () => {
    render(<Spinner aria-label="Saving" data-testid="spinner" />)

    expect(screen.getByTestId("spinner")).toHaveAccessibleName("Saving")
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Spinner sx={sx.custom} />)

    expect(screen.getByRole("status").getAttribute("class")).not.toBe("")
  })
})
