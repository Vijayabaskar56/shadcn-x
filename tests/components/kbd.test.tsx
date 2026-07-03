import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Kbd, KbdGroup } from "@/components/kbd"

const sx = stylex.create({
  custom: {
    opacity: 0.5,
  },
})

describe("Kbd", () => {
  it("renders a kbd element with its data-slot", () => {
    render(<Kbd>⌘</Kbd>)

    const kbd = screen.getByText("⌘")
    expect(kbd.tagName).toBe("KBD")
    expect(kbd).toHaveAttribute("data-slot", "kbd")
  })

  it("forwards keyboard host props", () => {
    render(<Kbd aria-label="Command key">⌘</Kbd>)

    expect(screen.getByLabelText("Command key")).toHaveAttribute(
      "data-slot",
      "kbd"
    )
  })

  it("accepts a typed sx prop", () => {
    render(<Kbd sx={sx.custom}>Shift</Kbd>)

    expect(screen.getByText("Shift").className).not.toBe("")
  })

  it("renders KbdGroup with its data-slot", () => {
    render(
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    )

    const group = screen.getByText("⌘").parentElement
    expect(group?.tagName).toBe("KBD")
    expect(group).toHaveAttribute("data-slot", "kbd-group")
  })

  it("accepts sx on KbdGroup", () => {
    render(
      <KbdGroup sx={sx.custom}>
        <Kbd>Ctrl</Kbd>
        <Kbd>C</Kbd>
      </KbdGroup>
    )

    expect(screen.getByText("Ctrl").parentElement?.className).not.toBe("")
  })
})
