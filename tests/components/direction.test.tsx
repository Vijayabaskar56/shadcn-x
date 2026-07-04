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
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet"

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
  it("provides the direction through context and applies it to the DOM", () => {
    render(
      <DirectionProvider dir="rtl">
        <DirectionProbe />
      </DirectionProvider>
    )

    const probe = screen.getByTestId("dir")
    expect(probe).toHaveTextContent("rtl")
    // The subtree wrapper carries `dir` (scopes the flip, correct under SSR).
    expect(probe.closest("[dir='rtl']")).not.toBeNull()
    // Without `global`, the provider MUST NOT touch <html> — otherwise docs
    // previews would flip the whole page. Portaled overlays opt in via `global`.
    expect(document.documentElement).not.toHaveAttribute("dir")
  })

  it("sets <html dir> only when `global` is opted in (app-root provider)", () => {
    render(
      <DirectionProvider dir="rtl" global>
        <DirectionProbe />
      </DirectionProvider>
    )

    // With `global`, <html> gets `dir` so portaled overlays — which mount
    // outside this subtree — inherit the direction too.
    expect(document.documentElement).toHaveAttribute("dir", "rtl")
  })

  it("accepts the Base UI `direction` prop", () => {
    render(
      <DirectionProvider direction="rtl">
        <DirectionProbe />
      </DirectionProvider>
    )

    const probe = screen.getByTestId("dir")
    expect(probe).toHaveTextContent("rtl")
    expect(probe.closest("[dir='rtl']")).not.toBeNull()
  })

  it("prefers `direction` over `dir` when both are supplied", () => {
    render(
      <DirectionProvider dir="ltr" direction="rtl">
        <DirectionProbe />
      </DirectionProvider>
    )

    const probe = screen.getByTestId("dir")
    expect(probe).toHaveTextContent("rtl")
    expect(probe.closest("[dir='rtl']")).not.toBeNull()
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
    expect(
      document.querySelector("[data-icon='inline-end']")
    ).toBeInTheDocument()
  })

  it("renders centered overlays under RTL", () => {
    render(
      <DirectionProvider dir="rtl" global>
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>RTL dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      </DirectionProvider>
    )

    const content = screen.getByRole("dialog")
    expect(content).toHaveAttribute("data-slot", "dialog-content")
    expect(screen.getByText("RTL dialog")).toBeInTheDocument()
    // Dialog portaled to <body>, outside provider's subtree — must inherit RTL from ancestor <html dir="rtl">.
    expect(content.closest("[dir='rtl']")).not.toBeNull()
  })

  it("renders edge overlays under RTL", () => {
    render(
      <DirectionProvider dir="rtl" global>
        <Sheet defaultOpen>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side="right">
            <SheetTitle>RTL sheet</SheetTitle>
          </SheetContent>
        </Sheet>
      </DirectionProvider>
    )

    const content = screen.getByRole("dialog")
    expect(content).toHaveAttribute("data-side", "right")
    expect(screen.getByText("RTL sheet")).toBeInTheDocument()
    // Portaled to <body>: must inherit RTL from <html dir="rtl">.
    expect(content.closest("[dir='rtl']")).not.toBeNull()
  })
})
