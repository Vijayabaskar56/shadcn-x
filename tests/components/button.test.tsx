import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button } from "@/components/button"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("carries the data-slot attribute", () => {
    render(<Button>Hi</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button")
  })

  it("forwards arbitrary DOM props", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("fires onClick when clicked", async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Tap</Button>)
    await userEvent.click(screen.getByRole("button", { name: "Tap" }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("renders every variant without error", () => {
    const variants = [
      "default",
      "secondary",
      "outline",
      "ghost",
      "destructive",
      "link",
    ] as const
    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>)
      expect(screen.getByRole("button", { name: variant })).toBeInTheDocument()
      unmount()
    }
  })

  it("renders every size without error", () => {
    const sizes = [
      "default",
      "xs",
      "sm",
      "lg",
      "icon",
      "icon-xs",
      "icon-sm",
      "icon-lg",
    ] as const
    for (const size of sizes) {
      const { unmount } = render(<Button size={size}>{size}</Button>)
      expect(screen.getByRole("button", { name: size })).toBeInTheDocument()
      unmount()
    }
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Button sx={sx.custom}>Styled</Button>)
    const button = screen.getByRole("button", { name: "Styled" })
    expect(button).toBeInTheDocument()
    expect(button.className).not.toBe("")
  })
})
