import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert-dialog"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("AlertDialog", () => {
  it("renders the trigger with data-slot", () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.getByText("Open")).toHaveAttribute(
      "data-slot",
      "alert-dialog-trigger"
    )
  })

  it("exposes the alertdialog role and content data-slot when open", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.getByRole("alertdialog")).toHaveAttribute(
      "data-slot",
      "alert-dialog-content"
    )
    expect(screen.getByText("Are you sure?")).toHaveAttribute(
      "data-slot",
      "alert-dialog-title"
    )
    expect(screen.getByText("This cannot be undone.")).toHaveAttribute(
      "data-slot",
      "alert-dialog-description"
    )
    expect(
      document.querySelector('[data-slot="alert-dialog-header"]')
    ).toBeInTheDocument()
  })

  it("renders the footer with data-slot", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(
      document.querySelector('[data-slot="alert-dialog-footer"]')
    ).toBeInTheDocument()
  })

  it("renders Action and Cancel as buttons carrying their data-slot", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
    const action = screen.getByRole("button", { name: "Continue" })
    const cancel = screen.getByRole("button", { name: "Cancel" })
    expect(action).toHaveAttribute("data-slot", "alert-dialog-action")
    expect(cancel).toHaveAttribute("data-slot", "alert-dialog-cancel")
  })

  it("Cancel closes the alert dialog when clicked", async () => {
    const user = userEvent.setup()
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.getByRole("alertdialog")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Cancel" }))
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
  })

  it("Cancel forwards Button variant/size through the render prop", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel variant="destructive" size="sm">
              Delete
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
    const cancel = screen.getByRole("button", { name: "Delete" })
    expect(cancel).toHaveAttribute("data-variant", "destructive")
    expect(cancel).toHaveAttribute("data-size", "sm")
  })

  it("opens on trigger click and calls onOpenChange", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(
      <AlertDialog onOpenChange={onOpenChange}>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
    await user.click(screen.getByText("Open"))
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything())
    expect(screen.getByRole("alertdialog")).toBeInTheDocument()
  })

  it("applies the size variant as data-size on content", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogTitle>Title</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.getByRole("alertdialog")).toHaveAttribute("data-size", "sm")
  })

  it("accepts a typed sx prop on content and renders", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent sx={sx.custom}>
          <AlertDialogTitle>Title</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.getByRole("alertdialog")).toBeInTheDocument()
  })
})
