import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button } from "@/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Collapsible", () => {
  it("renders public slots with data-slot attributes", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Details</CollapsibleContent>
      </Collapsible>
    )

    expect(screen.getByText("Toggle")).toHaveAttribute(
      "data-slot",
      "collapsible-trigger"
    )
    expect(screen.getByText("Details")).toHaveAttribute(
      "data-slot",
      "collapsible-content"
    )
    expect(
      document.querySelector('[data-slot="collapsible"]')
    ).toBeInTheDocument()
  })

  it("opens and closes when the trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Details</CollapsibleContent>
      </Collapsible>
    )

    expect(screen.queryByText("Details")).not.toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Toggle" }))
    expect(screen.getByText("Details")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Toggle" }))
    expect(screen.queryByText("Details")).not.toBeInTheDocument()
  })

  it("calls onOpenChange when toggled", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Details</CollapsibleContent>
      </Collapsible>
    )

    await user.click(screen.getByRole("button", { name: "Toggle" }))
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it("supports rendering the trigger as another component", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger
          render={<Button aria-label="Toggle" variant="outline" />}
        >
          Toggle
        </CollapsibleTrigger>
        <CollapsibleContent>Details</CollapsibleContent>
      </Collapsible>
    )

    expect(screen.getByRole("button", { name: "Toggle" })).toHaveAttribute(
      "data-slot",
      "collapsible-trigger"
    )
  })

  it("accepts typed sx props on public slots and renders", () => {
    render(
      <Collapsible defaultOpen sx={sx.custom}>
        <CollapsibleTrigger sx={sx.custom}>Toggle</CollapsibleTrigger>
        <CollapsibleContent sx={sx.custom}>Details</CollapsibleContent>
      </Collapsible>
    )

    expect(
      document.querySelector('[data-slot="collapsible"]')?.className
    ).not.toBe("")
    expect(screen.getByRole("button", { name: "Toggle" }).className).not.toBe(
      ""
    )
    expect(screen.getByText("Details").className).not.toBe("")
  })
})
