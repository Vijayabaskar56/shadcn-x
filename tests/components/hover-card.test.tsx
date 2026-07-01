import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

const contentSlot = () =>
  document.querySelector('[data-slot="hover-card-content"]')

describe("HoverCard", () => {
  it("renders the trigger with data-slot", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Card body</HoverCardContent>
      </HoverCard>
    )
    expect(screen.getByText("Hover me")).toHaveAttribute(
      "data-slot",
      "hover-card-trigger"
    )
  })

  it("does not render content when closed", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Hidden body</HoverCardContent>
      </HoverCard>
    )
    expect(screen.queryByText("Hidden body")).not.toBeInTheDocument()
    expect(contentSlot()).not.toBeInTheDocument()
  })

  it("renders content with data-slot when defaultOpen", () => {
    render(
      <HoverCard defaultOpen>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Visible body</HoverCardContent>
      </HoverCard>
    )
    expect(screen.getByText("Visible body")).toBeInTheDocument()
    expect(contentSlot()).toHaveAttribute("data-slot", "hover-card-content")
  })

  it("opens on hover and calls onOpenChange", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(
      <HoverCard onOpenChange={onOpenChange}>
        {/* delay={0} makes the hover open immediate + deterministic. */}
        <HoverCardTrigger delay={0}>Hover me</HoverCardTrigger>
        <HoverCardContent>Revealed</HoverCardContent>
      </HoverCard>
    )
    expect(screen.queryByText("Revealed")).not.toBeInTheDocument()

    await user.hover(screen.getByText("Hover me"))

    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything())
    expect(screen.getByText("Revealed")).toBeInTheDocument()
  })

  it("accepts a typed sx prop on content and renders", () => {
    render(
      <HoverCard defaultOpen>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent sx={sx.custom}>Styled</HoverCardContent>
      </HoverCard>
    )
    expect(screen.getByText("Styled")).toBeInTheDocument()
    expect(contentSlot()).toBeInTheDocument()
  })
})
