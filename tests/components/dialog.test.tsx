import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Dialog", () => {
  it("renders the trigger with data-slot", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText("Open")).toHaveAttribute(
      "data-slot",
      "dialog-trigger"
    )
  })

  it("renders content, title, and description with data-slot when open", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My Title</DialogTitle>
            <DialogDescription>My description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "data-slot",
      "dialog-content"
    )
    expect(screen.getByText("My Title")).toHaveAttribute(
      "data-slot",
      "dialog-title"
    )
    expect(screen.getByText("My description")).toHaveAttribute(
      "data-slot",
      "dialog-description"
    )
    expect(
      document.querySelector('[data-slot="dialog-header"]')
    ).toBeInTheDocument()
  })

  it("renders a close button by default that closes the dialog", async () => {
    const user = userEvent.setup()
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Close" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("omits the close button when showCloseButton is false", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(
      screen.queryByRole("button", { name: "Close" })
    ).not.toBeInTheDocument()
  })

  it("renders footer with data-slot", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogFooter>
            <DialogClose>Close it</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    expect(
      document.querySelector('[data-slot="dialog-footer"]')
    ).toBeInTheDocument()
    expect(screen.getByText("Close it")).toHaveAttribute(
      "data-slot",
      "dialog-close"
    )
  })

  it("renders a footer close button when showCloseButton is set", async () => {
    const user = userEvent.setup()
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Title</DialogTitle>
          <DialogFooter showCloseButton>
            <button type="button">Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText("Save")).toBeInTheDocument()
    const close = screen.getByRole("button", { name: "Close" })
    expect(close).toHaveAttribute("data-slot", "dialog-close")
    await user.click(close)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("does not render a footer close button by default", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Title</DialogTitle>
          <DialogFooter>
            <button type="button">Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    expect(
      screen.queryByRole("button", { name: "Close" })
    ).not.toBeInTheDocument()
  })

  it("opens on trigger click and calls onOpenChange", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    await user.click(screen.getByText("Open"))
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything())
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("accepts a typed sx prop on content and renders", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent sx={sx.custom}>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })
})
