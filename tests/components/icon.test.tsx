import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Icon } from "@/components/icon"

function Svg(props: Record<string, unknown>) {
  return <svg {...props} />
}

describe("Icon", () => {
  it("clones the icon element and marks it decorative by default", () => {
    const { container } = render(
      <Icon>
        <Svg />
      </Icon>
    )
    const svg = container.querySelector("svg")
    expect(svg).toHaveAttribute("aria-hidden", "true")
    expect(svg).toHaveAttribute("data-slot", "icon")
  })

  it("sets data-icon from position for button spacing", () => {
    const { container } = render(
      <Icon position="inline-start">
        <Svg />
      </Icon>
    )
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-icon",
      "inline-start"
    )
  })

  it("exposes an accessible label when provided", () => {
    const { getByLabelText } = render(
      <Icon label="Search">
        <Svg />
      </Icon>
    )
    expect(getByLabelText("Search")).toBeInTheDocument()
  })
})
