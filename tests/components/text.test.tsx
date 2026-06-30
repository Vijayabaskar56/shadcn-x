import * as stylex from "@stylexjs/stylex"
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Text } from "@/components/text"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Text", () => {
  it("renders its children", () => {
    const { container } = render(<Text>Hello</Text>)
    expect(container.textContent).toBe("Hello")
  })

  it("defaults to a <p>", () => {
    const { container } = render(<Text>x</Text>)
    expect(container.firstElementChild?.tagName).toBe("P")
  })

  it("carries the data-slot + data-variant attributes", () => {
    const { container } = render(<Text variant="h1">Title</Text>)
    const el = container.firstElementChild as HTMLElement
    expect(el).toHaveAttribute("data-slot", "text")
    expect(el).toHaveAttribute("data-variant", "h1")
  })

  it("maps a variant to its default host element", () => {
    const { container } = render(<Text variant="h2">x</Text>)
    expect(container.firstElementChild?.tagName).toBe("H2")
  })

  it("lets `as` override the variant's default element", () => {
    const { container } = render(
      <Text variant="lead" as="div">
        x
      </Text>
    )
    expect(container.firstElementChild?.tagName).toBe("DIV")
  })

  it("renders every variant without error", () => {
    const variants = [
      "h1",
      "h2",
      "h3",
      "h4",
      "p",
      "blockquote",
      "lead",
      "large",
      "small",
      "muted",
    ] as const
    for (const variant of variants) {
      const { unmount } = render(<Text variant={variant}>x</Text>)
      unmount()
    }
  })

  it("accepts a typed sx prop", () => {
    const { container } = render(<Text sx={sx.custom}>x</Text>)
    expect(container.firstElementChild?.className).not.toBe("")
  })
})
