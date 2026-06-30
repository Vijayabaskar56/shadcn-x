import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/button-group"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("ButtonGroup", () => {
  it("renders a group with the data-slot + role", () => {
    render(<ButtonGroup>kids</ButtonGroup>)
    const group = screen.getByRole("group")
    expect(group).toHaveAttribute("data-slot", "button-group")
  })

  it("defaults to horizontal orientation", () => {
    render(<ButtonGroup>x</ButtonGroup>)
    expect(screen.getByRole("group")).toHaveAttribute(
      "data-orientation",
      "horizontal"
    )
  })

  it("supports vertical orientation", () => {
    render(<ButtonGroup orientation="vertical">x</ButtonGroup>)
    expect(screen.getByRole("group")).toHaveAttribute(
      "data-orientation",
      "vertical"
    )
  })

  it("accepts a typed sx prop", () => {
    render(<ButtonGroup sx={sx.custom}>x</ButtonGroup>)
    expect(screen.getByRole("group").className).not.toBe("")
  })

  it("renders ButtonGroupText with its data-slot", () => {
    render(
      <ButtonGroup>
        <ButtonGroupText>1 of 10</ButtonGroupText>
      </ButtonGroup>
    )
    expect(screen.getByText("1 of 10")).toHaveAttribute(
      "data-slot",
      "button-group-text"
    )
  })

  it("ButtonGroupText is polymorphic via render", () => {
    // `render` re-targets the host element while keeping the styling + slot.
    // `<output>` is an unbanned host, so this stays off the no-raw-html radar.
    render(<ButtonGroupText render={<output />}>Suffix</ButtonGroupText>)
    const el = screen.getByText("Suffix")
    expect(el.tagName).toBe("OUTPUT")
    expect(el).toHaveAttribute("data-slot", "button-group-text")
  })

  it("renders ButtonGroupSeparator with its data-slot", () => {
    const { container } = render(
      <ButtonGroup>
        <ButtonGroupSeparator />
      </ButtonGroup>
    )
    expect(
      container.querySelector('[data-slot="button-group-separator"]')
    ).not.toBeNull()
  })
})
