import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

afterEach(() => {
  vi.useRealTimers()
})

describe("Tooltip", () => {
  it("renders the trigger with data-slot", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tip</TooltipContent>
      </Tooltip>
    )
    expect(screen.getByText("Hover me")).toHaveAttribute(
      "data-slot",
      "tooltip-trigger"
    )
  })

  it("renders content and arrow with data-slot when open", () => {
    render(
      <Tooltip defaultOpen>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    )
    expect(screen.getByText("Add to library")).toHaveAttribute(
      "data-slot",
      "tooltip-content"
    )
    expect(
      document.querySelector('[data-slot="tooltip-arrow"]')
    ).toBeInTheDocument()
  })

  it("omits the arrow when showArrow is false", () => {
    render(
      <Tooltip defaultOpen>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent showArrow={false}>No arrow</TooltipContent>
      </Tooltip>
    )
    expect(
      document.querySelector('[data-slot="tooltip-arrow"]')
    ).not.toBeInTheDocument()
  })

  it("does not render content when closed", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Hidden tip</TooltipContent>
      </Tooltip>
    )
    expect(screen.queryByText("Hidden tip")).not.toBeInTheDocument()
  })

  it("renders within a Provider that accepts a delay", () => {
    render(
      <TooltipProvider delay={0}>
        <Tooltip>
          <TooltipTrigger>Grouped</TooltipTrigger>
          <TooltipContent>Grouped tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByText("Grouped")).toHaveAttribute(
      "data-slot",
      "tooltip-trigger"
    )
  })

  it("accepts a typed sx prop on content and renders", () => {
    render(
      <Tooltip defaultOpen>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent sx={sx.custom}>Styled</TooltipContent>
      </Tooltip>
    )
    expect(screen.getByText("Styled")).toBeInTheDocument()
  })

  it("opens on hover and calls onOpenChange", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const onOpenChange = vi.fn()
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(
      <Tooltip onOpenChange={onOpenChange}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Revealed</TooltipContent>
      </Tooltip>
    )
    expect(screen.queryByText("Revealed")).not.toBeInTheDocument()
    await user.hover(screen.getByText("Hover me"))
    // Base UI opens after the trigger's hover delay (default 600ms).
    await vi.advanceTimersByTimeAsync(700)
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything())
    expect(screen.getByText("Revealed")).toBeInTheDocument()
  })
})
