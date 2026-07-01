import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/input-group"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("InputGroup", () => {
  it("renders with data-slot and role group", () => {
    render(<InputGroup data-testid="ig" />)
    const el = screen.getByTestId("ig")
    expect(el).toHaveAttribute("data-slot", "input-group")
    expect(el).toHaveAttribute("role", "group")
  })
})

describe("InputGroupAddon", () => {
  it("renders with data-slot", () => {
    render(<InputGroupAddon data-testid="addon">$</InputGroupAddon>)
    expect(screen.getByTestId("addon")).toHaveAttribute(
      "data-slot",
      "input-group-addon"
    )
  })

  it("defaults to inline-start align", () => {
    render(<InputGroupAddon data-testid="addon">$</InputGroupAddon>)
    expect(screen.getByTestId("addon")).toHaveAttribute(
      "data-align",
      "inline-start"
    )
  })

  it("renders children", () => {
    render(<InputGroupAddon>$</InputGroupAddon>)
    expect(screen.getByText("$")).toBeInTheDocument()
  })

  it("accepts a typed sx prop", () => {
    render(
      <InputGroupAddon data-testid="addon" sx={sx.custom}>
        $
      </InputGroupAddon>
    )
    expect(screen.getByTestId("addon").className).not.toBe("")
  })
})

describe("InputGroupButton", () => {
  it("renders a button", () => {
    render(<InputGroupButton>Click</InputGroupButton>)
    const el = screen.getByRole("button", { name: "Click" })
    expect(el).toBeInTheDocument()
  })

  it("defaults to type button and ghost variant", () => {
    render(<InputGroupButton data-testid="btn">Go</InputGroupButton>)
    const el = screen.getByTestId("btn")
    expect(el).toHaveAttribute("type", "button")
  })

  it("forwards onClick", () => {
    const onClick = vi.fn()
    render(<InputGroupButton onClick={onClick}>Click</InputGroupButton>)
    screen.getByRole("button", { name: "Click" }).click()
    expect(onClick).toHaveBeenCalledOnce()
  })
})

describe("InputGroupText", () => {
  it("renders a span with data-slot", () => {
    render(<InputGroupText data-testid="text">$</InputGroupText>)
    const el = screen.getByTestId("text")
    expect(el.tagName).toBe("SPAN")
    expect(el).toHaveAttribute("data-slot", "input-group-text")
  })
})

describe("InputGroupInput", () => {
  it("renders an input with data-slot", () => {
    render(<InputGroupInput aria-label="Name" />)
    const el = screen.getByRole("textbox", { name: "Name" })
    expect(el.tagName).toBe("INPUT")
    expect(el).toHaveAttribute("data-slot", "input-group-control")
  })

  it("forwards placeholder", () => {
    render(<InputGroupInput placeholder="Enter name" />)
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument()
  })
})

describe("InputGroupTextarea", () => {
  it("renders a textarea with data-slot", () => {
    render(<InputGroupTextarea aria-label="Bio" />)
    const el = screen.getByRole("textbox", { name: "Bio" })
    expect(el.tagName).toBe("TEXTAREA")
    expect(el).toHaveAttribute("data-slot", "input-group-control")
  })
})
