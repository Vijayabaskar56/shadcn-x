import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Switch } from "@/components/switch"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Switch", () => {
  it("renders with the switch role", () => {
    render(<Switch aria-label="Notifications" />)
    expect(
      screen.getByRole("switch", { name: "Notifications" })
    ).toBeInTheDocument()
  })

  it("carries the data-slot on root and thumb", () => {
    render(<Switch aria-label="Notifications" />)
    const root = screen.getByRole("switch")
    expect(root).toHaveAttribute("data-slot", "switch")
    // Thumb is not its own role; check it exists in the DOM
    const thumb = root.querySelector('[data-slot="switch-thumb"]')
    expect(thumb).toBeInTheDocument()
  })

  it("forwards the disabled state", () => {
    render(<Switch aria-label="Notifications" disabled />)
    expect(screen.getByRole("switch")).toHaveAttribute("aria-disabled", "true")
  })

  it("fires onCheckedChange when clicked", async () => {
    const onCheckedChange = vi.fn()
    render(
      <Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />
    )
    await userEvent.click(screen.getByRole("switch"))
    expect(onCheckedChange).toHaveBeenCalledOnce()
    expect(onCheckedChange.mock.calls[0][0]).toBe(true)
  })

  it("renders controlled checked state", () => {
    render(<Switch aria-label="Notifications" checked />)
    expect(screen.getByRole("switch")).toBeChecked()
  })

  it("renders every size without error", () => {
    const sizes = ["default", "sm"] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Switch aria-label={`Size ${size}`} size={size} />
      )
      expect(
        screen.getByRole("switch", { name: `Size ${size}` })
      ).toBeInTheDocument()
      unmount()
    }
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Switch aria-label="Styled" sx={sx.custom} />)
    expect(screen.getByRole("switch").className).not.toBe("")
  })
})
