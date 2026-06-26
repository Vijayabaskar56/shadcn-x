import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button } from "@/components/button"

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("carries the data-slot attribute", () => {
    render(<Button>Hi</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button")
  })

  it("forwards arbitrary props and merges class names", () => {
    render(
      <Button className="custom-class" disabled>
        Disabled
      </Button>
    )
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    expect(button).toHaveClass("custom-class")
  })

  it("fires onClick when clicked", async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Tap</Button>)
    await userEvent.click(screen.getByRole("button", { name: "Tap" }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
