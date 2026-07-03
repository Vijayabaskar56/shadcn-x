import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination"

const sx = stylex.create({
  custom: { opacity: 0.8 },
})

describe("Pagination", () => {
  it("renders the navigation landmark with slot metadata", () => {
    render(<Pagination data-testid="pagination" />)

    const nav = screen.getByRole("navigation", { name: "pagination" })
    expect(nav).toHaveAttribute("data-slot", "pagination")
    expect(nav).toHaveAttribute("data-testid", "pagination")
  })

  it("renders content and item slots", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>Page item</PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByRole("list")).toHaveAttribute(
      "data-slot",
      "pagination-content"
    )
    expect(screen.getByText("Page item")).toHaveAttribute(
      "data-slot",
      "pagination-item"
    )
  })

  it("renders links through the button styling surface", () => {
    render(
      <PaginationLink href="/page/2" isActive>
        2
      </PaginationLink>
    )

    const link = screen.getByRole("link", { name: "2" })
    expect(link).toHaveAttribute("href", "/page/2")
    expect(link).toHaveAttribute("aria-current", "page")
    expect(link).toHaveAttribute("data-slot", "pagination-link")
    expect(link).toHaveAttribute("data-active", "true")
    expect(link).toHaveAttribute("data-variant", "outline")
  })

  it("renders previous and next links with default labels", () => {
    render(
      <Pagination>
        <PaginationPrevious href="/page/1" />
        <PaginationNext href="/page/3" />
      </Pagination>
    )

    expect(
      screen.getByRole("link", { name: "Go to previous page" })
    ).toHaveTextContent("Previous")
    expect(screen.getByRole("link", { name: "Go to next page" })).toHaveTextContent(
      "Next"
    )
  })

  it("renders the ellipsis with screen-reader text", () => {
    render(<PaginationEllipsis />)

    const ellipsis = screen.getByText("More pages").parentElement
    expect(ellipsis).toHaveAttribute("data-slot", "pagination-ellipsis")
    expect(ellipsis).toHaveAttribute("aria-hidden", "true")
  })

  it("accepts sx on public slots", () => {
    render(
      <Pagination sx={sx.custom}>
        <PaginationContent sx={sx.custom}>
          <PaginationItem sx={sx.custom}>
            <PaginationLink href="/page/1" sx={sx.custom}>
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("list").className).not.toBe("")
    expect(screen.getByRole("link", { name: "1" }).className).not.toBe("")
  })
})
