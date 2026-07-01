import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Card body</Card>)
    expect(screen.getByText("Card body")).toBeInTheDocument()
  })

  it("carries the card data-slot and size attributes", () => {
    render(<Card size="sm">Compact</Card>)
    const card = screen.getByText("Compact")
    expect(card).toHaveAttribute("data-slot", "card")
    expect(card).toHaveAttribute("data-size", "sm")
  })

  it("renders every shadcn card slot", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
          <CardAction>Export</CardAction>
        </CardHeader>
        <CardContent>Total</CardContent>
        <CardFooter>Updated now</CardFooter>
      </Card>
    )

    expect(screen.getByText("Revenue")).toHaveAttribute(
      "data-slot",
      "card-title"
    )
    expect(screen.getByText("Last 30 days")).toHaveAttribute(
      "data-slot",
      "card-description"
    )
    expect(screen.getByText("Export")).toHaveAttribute(
      "data-slot",
      "card-action"
    )
    expect(screen.getByText("Total")).toHaveAttribute(
      "data-slot",
      "card-content"
    )
    expect(screen.getByText("Updated now")).toHaveAttribute(
      "data-slot",
      "card-footer"
    )
  })

  it("forwards arbitrary DOM props", () => {
    render(<Card aria-label="Account summary">Summary</Card>)
    expect(screen.getByLabelText("Account summary")).toBeInTheDocument()
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Card sx={sx.custom}>Styled card</Card>)
    const card = screen.getByText("Styled card")
    expect(card).toBeInTheDocument()
    expect(card.className).not.toBe("")
  })
})
