import * as stylex from "@stylexjs/stylex"
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { AspectRatio } from "@/components/aspect-ratio"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("AspectRatio", () => {
  it("renders a div with the data-slot attribute", () => {
    const { container } = render(<AspectRatio ratio={16 / 9} />)
    const el = container.firstElementChild as HTMLDivElement

    expect(el.tagName).toBe("DIV")
    expect(el).toHaveAttribute("data-slot", "aspect-ratio")
  })

  it("defaults to a square ratio", () => {
    const { container } = render(<AspectRatio />)

    expect(container.firstElementChild?.className).not.toBe("")
  })

  it("accepts a custom ratio", () => {
    const { container } = render(<AspectRatio ratio={4 / 3} />)

    expect(container.firstElementChild?.className).not.toBe("")
  })

  it("forwards arbitrary DOM props", () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9} aria-label="Preview" />
    )

    expect(container.firstElementChild).toHaveAttribute("aria-label", "Preview")
  })

  it("accepts a typed sx prop", () => {
    const { container } = render(<AspectRatio ratio={16 / 9} sx={sx.custom} />)

    expect(container.firstElementChild?.className).not.toBe("")
  })
})
