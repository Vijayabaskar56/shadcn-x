import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

function ExampleAccordion() {
  return (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. Base UI provides the behavior.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe("Accordion", () => {
  it("renders the shadcn slots with data-slot attributes", () => {
    render(<ExampleAccordion />)

    expect(
      document.querySelector('[data-slot="accordion"]')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[data-slot="accordion-item"]')
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Is it accessible?" })
    ).toHaveAttribute("data-slot", "accordion-trigger")
    expect(
      screen.getByText("Yes. Base UI provides the behavior.")
    ).toHaveAttribute("data-slot", "accordion-content-inner")
  })

  it("opens and closes an item when the trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>Hidden details</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    expect(screen.queryByText("Hidden details")).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Details" }))
    expect(screen.getByText("Hidden details")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Details" }))
    expect(screen.queryByText("Hidden details")).not.toBeInTheDocument()
  })

  it("calls onValueChange with the open item values", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Accordion onValueChange={onValueChange}>
        <AccordionItem value="item-1">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>First panel</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    await user.click(screen.getByRole("button", { name: "First" }))

    expect(onValueChange).toHaveBeenCalledWith(["item-1"], expect.anything())
  })

  it("supports multiple open items", async () => {
    const user = userEvent.setup()
    render(
      <Accordion multiple>
        <AccordionItem value="item-1">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>First panel</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second</AccordionTrigger>
          <AccordionContent>Second panel</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    await user.click(screen.getByRole("button", { name: "First" }))
    await user.click(screen.getByRole("button", { name: "Second" }))

    expect(screen.getByText("First panel")).toBeInTheDocument()
    expect(screen.getByText("Second panel")).toBeInTheDocument()
  })

  it("accepts typed sx props on public slots", () => {
    render(
      <Accordion defaultValue={["item-1"]} sx={sx.custom}>
        <AccordionItem value="item-1" sx={sx.custom}>
          <AccordionTrigger sx={sx.custom}>Details</AccordionTrigger>
          <AccordionContent sx={sx.custom}>Panel</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    expect(
      document.querySelector('[data-slot="accordion"]')?.className
    ).not.toBe("")
    expect(
      document.querySelector('[data-slot="accordion-item"]')?.className
    ).not.toBe("")
    expect(screen.getByRole("button", { name: "Details" }).className).not.toBe(
      ""
    )
    expect(
      document.querySelector('[data-slot="accordion-content"]')?.className
    ).not.toBe("")
  })
})
