import * as stylex from "@stylexjs/stylex"
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { DirectionProvider } from "@/components/direction"
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

  it.each(["s", "m", "l"] as const)("renders with size=%s", (size) => {
    const { container } = render(
      <Icon size={size}>
        <Svg />
      </Icon>
    )
    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute("class")
  })

  it("accepts an sx prop", () => {
    const custom = stylex.create({ dim: { opacity: 0.5 } })
    const { container } = render(
      <Icon sx={custom.dim}>
        <Svg />
      </Icon>
    )
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("renders from a bound-library name and marks it decorative", () => {
    const { container } = render(<Icon name="Search" />)
    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute("data-slot", "icon")
    expect(svg).toHaveAttribute("aria-hidden", "true")
  })

  it("renders when flipRtl is set", () => {
    const { container } = render(
      <Icon flipRtl>
        <Svg />
      </Icon>
    )
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("applies the flip class only in an RTL context", () => {
    const ltr = render(
      <DirectionProvider direction="ltr">
        <Icon flipRtl>
          <Svg />
        </Icon>
      </DirectionProvider>
    )
    const rtl = render(
      <DirectionProvider direction="rtl">
        <Icon flipRtl>
          <Svg />
        </Icon>
      </DirectionProvider>
    )
    const ltrClass = ltr.container.querySelector("svg")?.getAttribute("class")
    const rtlClass = rtl.container.querySelector("svg")?.getAttribute("class")
    // The RTL icon carries an extra (flip) style class that the LTR one lacks,
    // proving the flip is gated on direction rather than always/never applied.
    expect(rtlClass).not.toEqual(ltrClass)
  })
})
