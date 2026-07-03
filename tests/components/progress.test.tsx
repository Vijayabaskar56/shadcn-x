import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/progress"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Progress", () => {
  it("renders a progressbar with Base UI value attributes", () => {
    render(<Progress value={40} aria-label="Upload progress" />)

    const progress = screen.getByRole("progressbar", {
      name: "Upload progress",
    })

    expect(progress).toHaveAttribute("data-slot", "progress")
    expect(progress).toHaveAttribute("aria-valuemin", "0")
    expect(progress).toHaveAttribute("aria-valuemax", "100")
    expect(progress).toHaveAttribute("aria-valuenow", "40")
  })

  it("auto-renders the shadcn track and indicator slots", () => {
    const { container } = render(
      <Progress value={25} aria-label="Sync progress" />
    )

    const track = container.querySelector(
      '[data-slot="progress-track"]'
    ) as HTMLElement
    const indicator = container.querySelector(
      '[data-slot="progress-indicator"]'
    ) as HTMLElement

    expect(track).toBeInTheDocument()
    expect(indicator).toBeInTheDocument()
    expect(track).toContainElement(indicator)
  })

  it("exports composed label, value, track, and indicator parts", () => {
    const { container } = render(
      <Progress value={65}>
        <ProgressLabel>Import</ProgressLabel>
        <ProgressValue />
        <ProgressTrack data-testid="custom-track">
          <ProgressIndicator data-testid="custom-indicator" />
        </ProgressTrack>
      </Progress>
    )

    expect(screen.getByText("Import")).toHaveAttribute(
      "data-slot",
      "progress-label"
    )
    expect(container.querySelector('[data-slot="progress-value"]')).toHaveTextContent(
      "65"
    )
    expect(screen.getByTestId("custom-track")).toHaveAttribute(
      "data-slot",
      "progress-track"
    )
    expect(screen.getByTestId("custom-indicator")).toHaveAttribute(
      "data-slot",
      "progress-indicator"
    )
  })

  it("supports indeterminate progress", () => {
    render(<Progress value={null} aria-label="Processing" />)

    const progress = screen.getByRole("progressbar", { name: "Processing" })

    expect(progress).not.toHaveAttribute("aria-valuenow")
    expect(progress).toHaveAttribute("aria-valuetext", "indeterminate progress")
  })

  it("accepts typed sx props on every public slot", () => {
    const { container } = render(
      <Progress value={50} aria-label="Styled progress" sx={sx.custom}>
        <ProgressLabel sx={sx.custom}>Styled</ProgressLabel>
        <ProgressValue sx={sx.custom} />
        <ProgressTrack sx={sx.custom}>
          <ProgressIndicator sx={sx.custom} />
        </ProgressTrack>
      </Progress>
    )

    expect(container.querySelector('[data-slot="progress"]')?.className).not.toBe(
      ""
    )
    expect(
      container.querySelector('[data-slot="progress-track"]')?.className
    ).not.toBe("")
    expect(
      container.querySelector('[data-slot="progress-indicator"]')?.className
    ).not.toBe("")
    expect(
      container.querySelector('[data-slot="progress-label"]')?.className
    ).not.toBe("")
    expect(
      container.querySelector('[data-slot="progress-value"]')?.className
    ).not.toBe("")
  })
})
