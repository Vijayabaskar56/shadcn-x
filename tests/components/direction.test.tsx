import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
import { DirectionProvider, useDirection } from "@/components/direction"
import { Icon } from "@/components/icon"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/sheet"

function DirectionProbe() {
  return (
    <Box as="span" data-testid="dir">
      {useDirection()}
    </Box>
  )
}

afterEach(() => {
  document.documentElement.removeAttribute("dir")
})

describe("DirectionProvider", () => {
  it("sets the document direction and provides it through context", () => {
    render(
      <DirectionProvider dir="rtl">
        <DirectionProbe />
      </DirectionProvider>
    )

    expect(document.documentElement).toHaveAttribute("dir", "rtl")
    expect(screen.getByTestId("dir")).toHaveTextContent("rtl")
  })

  it("accepts the Base UI `direction` prop", () => {
    render(
      <DirectionProvider direction="rtl">
        <DirectionProbe />
      </DirectionProvider>
    )

    expect(document.documentElement).toHaveAttribute("dir", "rtl")
    expect(screen.getByTestId("dir")).toHaveTextContent("rtl")
  })

  it("prefers `direction` over `dir` when both are supplied", () => {
    render(
      <DirectionProvider dir="ltr" direction="rtl">
        <DirectionProbe />
      </DirectionProvider>
    )

    expect(document.documentElement).toHaveAttribute("dir", "rtl")
    expect(screen.getByTestId("dir")).toHaveTextContent("rtl")
  })

  it("renders directional icon and button patterns in RTL", () => {
    render(
      <DirectionProvider dir="rtl">
        <Button>
          <Icon name="ChevronRight" position="inline-end" flipRtl />
          Continue
        </Button>
      </DirectionProvider>
    )

    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument()
    expect(document.querySelector("[data-icon='inline-end']")).toBeInTheDocument()
  })

  it("renders centered overlays under RTL", () => {
    render(
      <DirectionProvider dir="rtl">
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>RTL dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      </DirectionProvider>
    )

    expect(screen.getByRole("dialog")).toHaveAttribute(
      "data-slot",
      "dialog-content"
    )
    expect(screen.getByText("RTL dialog")).toBeInTheDocument()
  })

  it("renders edge overlays under RTL", () => {
    render(
      <DirectionProvider dir="rtl">
        <Sheet defaultOpen>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side="right">
            <SheetTitle>RTL sheet</SheetTitle>
          </SheetContent>
        </Sheet>
      </DirectionProvider>
    )

    expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "right")
    expect(screen.getByText("RTL sheet")).toBeInTheDocument()
  })
})
