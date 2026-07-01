import * as stylex from "@stylexjs/stylex"
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Slider } from "@/components/slider"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Slider", () => {
  it("renders with the data-slot attribute", () => {
    const { container } = render(<Slider />)
    const root = container.querySelector('[data-slot="slider"]')
    expect(root).toBeInTheDocument()
  })

  it("renders the track with data-slot", () => {
    const { container } = render(<Slider />)
    expect(
      container.querySelector('[data-slot="slider-track"]')
    ).toBeInTheDocument()
  })

  it("renders the range with data-slot", () => {
    const { container } = render(<Slider />)
    expect(
      container.querySelector('[data-slot="slider-range"]')
    ).toBeInTheDocument()
  })

  it("renders thumbs with data-slot", () => {
    const { container } = render(<Slider />)
    const thumbs = container.querySelectorAll('[data-slot="slider-thumb"]')
    expect(thumbs.length).toBeGreaterThanOrEqual(1)
  })

  it("renders a slider with a given defaultValue", () => {
    const { container } = render(<Slider defaultValue={50} />)
    const inputs = container.querySelectorAll('input[type="range"]')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
    expect(inputs[0]).toHaveAttribute("value", "50")
  })

  it("forwards min and max props", () => {
    const { container } = render(<Slider min={10} max={200} />)
    const inputs = container.querySelectorAll('input[type="range"]')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
    expect(inputs[0]).toHaveAttribute("min", "10")
    expect(inputs[0]).toHaveAttribute("max", "200")
  })

  it("renders without error", () => {
    const { container } = render(<Slider />)
    expect(container.querySelector('[data-slot="slider"]')).toBeInTheDocument()
  })

  it("accepts a typed sx prop and renders", () => {
    const { container } = render(<Slider sx={sx.custom} />)
    const root = container.querySelector('[data-slot="slider"]')
    expect(root).toBeInTheDocument()
    expect(root!.className).not.toBe("")
  })
})
