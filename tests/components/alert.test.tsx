import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/alert"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Alert", () => {
  it("renders alert content with the alert role", () => {
    render(<Alert>System notice</Alert>)

    expect(screen.getByRole("alert")).toHaveTextContent("System notice")
  })

  it("defaults to the default variant", () => {
    render(<Alert>Default notice</Alert>)

    expect(screen.getByRole("alert")).toHaveAttribute(
      "data-variant",
      "default"
    )
  })

  it("sets the destructive variant name from shadcn", () => {
    render(<Alert variant="destructive">Destructive notice</Alert>)

    expect(screen.getByRole("alert")).toHaveAttribute(
      "data-variant",
      "destructive"
    )
  })

  it("renders every shadcn alert slot", () => {
    render(
      <Alert>
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Update your card to continue.</AlertDescription>
        <AlertAction>Retry</AlertAction>
      </Alert>
    )

    expect(screen.getByText("Payment failed")).toHaveAttribute(
      "data-slot",
      "alert-title"
    )
    expect(screen.getByText("Update your card to continue.")).toHaveAttribute(
      "data-slot",
      "alert-description"
    )
    expect(screen.getByText("Retry")).toHaveAttribute(
      "data-slot",
      "alert-action"
    )
  })

  it("forwards arbitrary DOM props", () => {
    render(<Alert aria-label="Upload status">Upload complete</Alert>)

    expect(screen.getByLabelText("Upload status")).toBeInTheDocument()
  })

  it("accepts typed sx props on every public slot", () => {
    render(
      <Alert sx={sx.custom}>
        <AlertTitle sx={sx.custom}>Title</AlertTitle>
        <AlertDescription sx={sx.custom}>Description</AlertDescription>
        <AlertAction sx={sx.custom}>Action</AlertAction>
      </Alert>
    )

    expect(screen.getByRole("alert").className).not.toBe("")
    expect(screen.getByText("Title").className).not.toBe("")
    expect(screen.getByText("Description").className).not.toBe("")
    expect(screen.getByText("Action").className).not.toBe("")
  })
})
