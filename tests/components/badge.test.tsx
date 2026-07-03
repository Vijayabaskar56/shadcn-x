import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import type { ComponentPropsWithoutRef } from "react"
import { createElement } from "react"
import { describe, expect, it } from "vitest"

import { Badge } from "@/components/badge"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

function TestAnchor(props: ComponentPropsWithoutRef<"a">) {
  return createElement("a", props)
}

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("carries slot and variant metadata", () => {
    render(<Badge variant="secondary">Synced</Badge>)
    const badge = screen.getByText("Synced")

    expect(badge).toHaveAttribute("data-slot", "badge")
    expect(badge).toHaveAttribute("data-variant", "secondary")
  })

  it("renders every shadcn variant without error", () => {
    const variants = [
      "default",
      "secondary",
      "destructive",
      "outline",
      "ghost",
      "link",
    ] as const

    for (const variant of variants) {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>)
      expect(screen.getByText(variant)).toBeInTheDocument()
      unmount()
    }
  })

  it("forwards arbitrary DOM props", () => {
    render(<Badge aria-label="Status">Beta</Badge>)
    expect(screen.getByLabelText("Status")).toHaveTextContent("Beta")
  })

  it("supports Base UI render parity", () => {
    render(
      <Badge render={<TestAnchor href="/docs" />}>
        Documentation
      </Badge>
    )

    expect(screen.getByRole("link", { name: "Documentation" })).toHaveAttribute(
      "href",
      "/docs"
    )
  })

  it("accepts a typed sx prop and renders", () => {
    render(<Badge sx={sx.custom}>Styled</Badge>)
    const badge = screen.getByText("Styled")

    expect(badge).toBeInTheDocument()
    expect(badge.className).not.toBe("")
  })
})
