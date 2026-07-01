import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

const content = () =>
  document.querySelector('[data-slot="drawer-content"]') as HTMLElement | null
const handle = () =>
  document.querySelector('[data-slot="drawer-handle"]') as HTMLElement | null
const overlay = () =>
  document.querySelector('[data-slot="drawer-overlay"]') as HTMLElement | null

describe("Drawer", () => {
  it("renders the trigger with data-slot", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    )
    expect(screen.getByText("Open")).toHaveAttribute(
      "data-slot",
      "drawer-trigger"
    )
  })

  it("renders content, title, and description with data-slot when open", () => {
    render(
      <Drawer defaultOpen>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>My Title</DrawerTitle>
            <DrawerDescription>My description</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    expect(content()).not.toBeNull()
    expect(content()).toHaveAttribute("data-slot", "drawer-content")
    expect(screen.getByText("My Title")).toHaveAttribute(
      "data-slot",
      "drawer-title"
    )
    expect(screen.getByText("My description")).toHaveAttribute(
      "data-slot",
      "drawer-description"
    )
    expect(
      document.querySelector('[data-slot="drawer-header"]')
    ).toBeInTheDocument()
  })

  it("renders the drag handle by default for a bottom drawer", () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    )
    expect(handle()).not.toBeNull()
    expect(handle()).toHaveAttribute("data-slot", "drawer-handle")
  })

  it("omits the handle when showHandle is false", () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent showHandle={false}>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    )
    expect(handle()).toBeNull()
  })

  it("omits the handle for a top drawer even with showHandle true", () => {
    render(
      <Drawer defaultOpen direction="top">
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    )
    expect(handle()).toBeNull()
  })

  it("renders the overlay with data-slot when open", () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    )
    expect(overlay()).not.toBeNull()
    expect(overlay()).toHaveAttribute("data-slot", "drawer-overlay")
  })

  it("renders footer with data-slot and a close control", () => {
    render(
      <Drawer defaultOpen>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerFooter>
            <DrawerClose>Close it</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
    expect(
      document.querySelector('[data-slot="drawer-footer"]')
    ).toBeInTheDocument()
    expect(screen.getByText("Close it")).toHaveAttribute(
      "data-slot",
      "drawer-close"
    )
  })

  it("exposes a standalone DrawerHandle with data-slot", () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent showHandle={false}>
          <DrawerHandle />
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    )
    expect(handle()).not.toBeNull()
  })

  it("closes via a DrawerClose control", async () => {
    const user = userEvent.setup()
    render(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerFooter>
            <DrawerClose>Dismiss</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
    expect(content()).not.toBeNull()
    await user.click(screen.getByText("Dismiss"))
    expect(content()).toBeNull()
  })

  it("opens on trigger click and calls onOpenChange", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Drawer onOpenChange={onOpenChange}>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    )
    expect(content()).toBeNull()
    await user.click(screen.getByText("Open"))
    // vaul's onOpenChange is `(open: boolean) => void` (one arg, unlike Base UI's
    // `(open, event)`).
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(content()).not.toBeNull()
  })

  it("accepts a typed sx prop on content and renders", () => {
    render(
      <Drawer defaultOpen>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent sx={sx.custom}>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    )
    expect(content()).not.toBeNull()
  })
})
