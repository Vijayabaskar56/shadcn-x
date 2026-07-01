import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/empty"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Empty", () => {
  it("renders its children", () => {
    render(<Empty>No items yet</Empty>)

    expect(screen.getByText("No items yet")).toBeInTheDocument()
  })

  it("renders every shadcn empty slot", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyMedia>Media</EmptyMedia>
          <EmptyTitle>No projects</EmptyTitle>
          <EmptyDescription>Create a project to get started.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>Actions</EmptyContent>
      </Empty>
    )

    expect(screen.getByText("No projects")).toHaveAttribute(
      "data-slot",
      "empty-title"
    )
    expect(
      screen.getByText("Create a project to get started.")
    ).toHaveAttribute("data-slot", "empty-description")
    expect(screen.getByText("Media")).toHaveAttribute("data-slot", "empty-icon")
    expect(screen.getByText("Actions")).toHaveAttribute(
      "data-slot",
      "empty-content"
    )
  })

  it("sets EmptyMedia variant names from shadcn", () => {
    render(<EmptyMedia variant="icon">Icon</EmptyMedia>)

    expect(screen.getByText("Icon")).toHaveAttribute("data-variant", "icon")
  })

  it("defaults EmptyMedia to the default variant", () => {
    render(<EmptyMedia>Default media</EmptyMedia>)

    expect(screen.getByText("Default media")).toHaveAttribute(
      "data-variant",
      "default"
    )
  })

  it("forwards arbitrary DOM props", () => {
    render(<Empty aria-label="No results">Nothing matched</Empty>)

    expect(screen.getByLabelText("No results")).toBeInTheDocument()
  })

  it("accepts typed sx props on every public slot", () => {
    render(
      <Empty sx={sx.custom}>
        <EmptyHeader sx={sx.custom}>
          <EmptyMedia sx={sx.custom}>Media</EmptyMedia>
          <EmptyTitle sx={sx.custom}>Title</EmptyTitle>
          <EmptyDescription sx={sx.custom}>Description</EmptyDescription>
        </EmptyHeader>
        <EmptyContent sx={sx.custom}>Content</EmptyContent>
      </Empty>
    )

    expect(screen.getByText("Title").className).not.toBe("")
    expect(screen.getByText("Description").className).not.toBe("")
    expect(screen.getByText("Media").className).not.toBe("")
    expect(screen.getByText("Content").className).not.toBe("")
  })
})
