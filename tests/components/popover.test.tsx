import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/popover"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Popover", () => {
  it("renders the trigger with data-slot", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Title</PopoverTitle>
        </PopoverContent>
      </Popover>
    )
    expect(screen.getByText("Open")).toHaveAttribute(
      "data-slot",
      "popover-trigger"
    )
  })

  it("renders content, title, and description with data-slot when open", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>My Title</PopoverTitle>
            <PopoverDescription>My description</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    )
    expect(screen.getByText("My Title")).toHaveAttribute(
      "data-slot",
      "popover-title"
    )
    expect(screen.getByText("My description")).toHaveAttribute(
      "data-slot",
      "popover-description"
    )
    expect(
      document.querySelector('[data-slot="popover-content"]')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[data-slot="popover-header"]')
    ).toBeInTheDocument()
  })

  it("does not render content when closed", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Hidden Title</PopoverTitle>
        </PopoverContent>
      </Popover>
    )
    expect(screen.queryByText("Hidden Title")).not.toBeInTheDocument()
  })

  it("opens on trigger click and calls onOpenChange", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Revealed</PopoverTitle>
        </PopoverContent>
      </Popover>
    )
    expect(screen.queryByText("Revealed")).not.toBeInTheDocument()
    await user.click(screen.getByText("Open"))
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything())
    expect(screen.getByText("Revealed")).toBeInTheDocument()
  })

  it("closes on escape when open", async () => {
    const user = userEvent.setup()
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Dismissable</PopoverTitle>
        </PopoverContent>
      </Popover>
    )
    expect(screen.getByText("Dismissable")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    expect(screen.queryByText("Dismissable")).not.toBeInTheDocument()
  })

  it("accepts a typed sx prop on content and renders", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent sx={sx.custom}>
          <PopoverTitle>Styled</PopoverTitle>
        </PopoverContent>
      </Popover>
    )
    expect(screen.getByText("Styled")).toBeInTheDocument()
  })
})
