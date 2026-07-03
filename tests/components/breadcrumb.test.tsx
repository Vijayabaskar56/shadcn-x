import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import type { ComponentPropsWithoutRef } from "react"
import { createElement } from "react"
import { describe, expect, it } from "vitest"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

function TestAnchor(props: ComponentPropsWithoutRef<"a">) {
  return createElement("a", props)
}

describe("Breadcrumb", () => {
  it("renders an accessible breadcrumb navigation landmark", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Docs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toHaveAttribute(
      "data-slot",
      "breadcrumb"
    )
    expect(screen.getByRole("list")).toHaveAttribute(
      "data-slot",
      "breadcrumb-list"
    )
  })

  it("carries shadcn data slots on every public slot", () => {
    render(
      <Breadcrumb aria-label="Trail">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Components</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("navigation", { name: "Trail" })).toHaveAttribute(
      "data-slot",
      "breadcrumb"
    )
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "data-slot",
      "breadcrumb-link"
    )
    expect(screen.getByRole("link", { name: "Components" })).toHaveAttribute(
      "data-slot",
      "breadcrumb-page"
    )
    expect(screen.getByText("/")).toHaveAttribute(
      "data-slot",
      "breadcrumb-separator"
    )
    expect(screen.getByText("More")).toHaveAttribute(
      "data-slot",
      "breadcrumb-ellipsis-label"
    )
  })

  it("marks the current page as disabled and current", () => {
    render(<BreadcrumbPage>Current</BreadcrumbPage>)

    expect(screen.getByRole("link", { name: "Current" })).toHaveAttribute(
      "aria-current",
      "page"
    )
    expect(screen.getByRole("link", { name: "Current" })).toHaveAttribute(
      "aria-disabled",
      "true"
    )
  })

  it("supports Base UI render parity for links", () => {
    render(
      <BreadcrumbLink render={<TestAnchor href="/docs/components" />}>
        Components
      </BreadcrumbLink>
    )

    expect(
      screen.getByRole("link", { name: "Components" })
    ).toHaveAttribute("href", "/docs/components")
  })

  it("renders default separator and ellipsis icons as decorative", () => {
    render(
      <Breadcrumb aria-label="Trail">
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbEllipsis />
        </BreadcrumbList>
      </Breadcrumb>
    )

    const nav = screen.getByRole("navigation", { name: "Trail" })
    const icons = nav.querySelectorAll('[data-slot="icon"]')

    expect(icons).toHaveLength(2)
    expect(screen.getByText("More")).toBeInTheDocument()
  })

  it("accepts typed sx on each public slot", () => {
    render(
      <Breadcrumb sx={sx.custom} aria-label="Styled">
        <BreadcrumbList sx={sx.custom}>
          <BreadcrumbItem sx={sx.custom}>
            <BreadcrumbLink sx={sx.custom} href="/docs">
              Docs
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator sx={sx.custom} />
          <BreadcrumbItem>
            <BreadcrumbPage sx={sx.custom}>Current</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbEllipsis sx={sx.custom} />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("navigation", { name: "Styled" }).className).not.toBe(
      ""
    )
    expect(screen.getByRole("link", { name: "Docs" }).className).not.toBe("")
    expect(screen.getByRole("link", { name: "Current" }).className).not.toBe("")
  })
})
