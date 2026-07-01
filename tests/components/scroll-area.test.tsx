import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ScrollArea, ScrollBar } from "@/components/scroll-area"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("ScrollArea", () => {
  it("renders children inside the viewport", () => {
    const { container } = render(<ScrollArea>Scrollable content</ScrollArea>)

    expect(screen.getByText("Scrollable content")).toBeInTheDocument()
    expect(
      container.querySelector('[data-slot="scroll-area-viewport"]')
    ).toHaveTextContent("Scrollable content")
  })

  it("carries the root data-slot attribute", () => {
    render(<ScrollArea data-testid="scroll-area">Content</ScrollArea>)

    expect(screen.getByTestId("scroll-area")).toHaveAttribute(
      "data-slot",
      "scroll-area"
    )
  })

  it("forwards arbitrary root props", () => {
    render(
      <ScrollArea data-testid="scroll-area" aria-label="Transactions">
        Content
      </ScrollArea>
    )

    expect(screen.getByTestId("scroll-area")).toHaveAttribute(
      "aria-label",
      "Transactions"
    )
  })

  it("accepts a typed sx prop and renders styled", () => {
    render(
      <ScrollArea data-testid="scroll-area" sx={sx.custom}>
        Content
      </ScrollArea>
    )

    expect(screen.getByTestId("scroll-area").className).not.toBe("")
  })

  it("renders a horizontal scrollbar when requested", () => {
    render(
      <ScrollArea>
        <ScrollBar orientation="horizontal" keepMounted data-testid="bar" />
        Content
      </ScrollArea>
    )

    expect(screen.getByTestId("bar")).toHaveAttribute(
      "data-slot",
      "scroll-area-scrollbar"
    )
    expect(screen.getByTestId("bar")).toHaveAttribute(
      "data-orientation",
      "horizontal"
    )
  })

  it("accepts sx on ScrollBar", () => {
    render(
      <ScrollArea>
        <ScrollBar keepMounted data-testid="bar" sx={sx.custom} />
        Content
      </ScrollArea>
    )

    expect(screen.getByTestId("bar").className).not.toBe("")
  })
})
