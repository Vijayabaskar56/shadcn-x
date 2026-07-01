import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Sheet", () => {
  it("renders the trigger with data-slot", () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByText("Open")).toHaveAttribute(
      "data-slot",
      "sheet-trigger"
    )
  })

  it("defaults to the right side and exposes it via data-side", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "data-slot",
      "sheet-content"
    )
    expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "right")
  })

  it.each(["top", "right", "bottom", "left"] as const)(
    "renders the %s side with data-side",
    (side) => {
      render(
        <Sheet defaultOpen>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side={side}>
            <SheetTitle>{side} sheet</SheetTitle>
          </SheetContent>
        </Sheet>
      )
      expect(screen.getByRole("dialog")).toHaveAttribute("data-side", side)
    }
  )

  it("renders content, title, description, and header with data-slot when open", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My Title</SheetTitle>
            <SheetDescription>My description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "data-slot",
      "sheet-content"
    )
    expect(screen.getByText("My Title")).toHaveAttribute(
      "data-slot",
      "sheet-title"
    )
    expect(screen.getByText("My description")).toHaveAttribute(
      "data-slot",
      "sheet-description"
    )
    expect(
      document.querySelector('[data-slot="sheet-header"]')
    ).toBeInTheDocument()
  })

  it("renders a close button by default that closes the sheet", async () => {
    const user = userEvent.setup()
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Close" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("omits the close button when showCloseButton is false", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent showCloseButton={false}>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )
    expect(
      screen.queryByRole("button", { name: "Close" })
    ).not.toBeInTheDocument()
  })

  it("renders footer with data-slot and a sheet close child", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <SheetFooter>
            <SheetClose>Close it</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
    expect(
      document.querySelector('[data-slot="sheet-footer"]')
    ).toBeInTheDocument()
    expect(screen.getByText("Close it")).toHaveAttribute(
      "data-slot",
      "sheet-close"
    )
  })

  it("opens on trigger click and calls onOpenChange", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Sheet onOpenChange={onOpenChange}>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    await user.click(screen.getByText("Open"))
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything())
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("accepts a typed sx prop on content and renders", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent sx={sx.custom}>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })
})
