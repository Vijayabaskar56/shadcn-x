import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Table", () => {
  it("renders a container + table with their data-slots", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(
      container.querySelector('[data-slot="table-container"]')
    ).not.toBeNull()
    expect(container.querySelector('[data-slot="table"]')).not.toBeNull()
  })

  it("renders each subcomponent on its host element + data-slot", () => {
    const { container } = render(
      <Table>
        <TableCaption>Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>H</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>B</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>F</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
    expect(container.querySelector('[data-slot="table"]')?.tagName).toBe(
      "TABLE"
    )
    expect(
      container.querySelector('[data-slot="table-caption"]')?.tagName
    ).toBe("CAPTION")
    expect(container.querySelector('[data-slot="table-header"]')?.tagName).toBe(
      "THEAD"
    )
    expect(container.querySelector('[data-slot="table-body"]')?.tagName).toBe(
      "TBODY"
    )
    expect(container.querySelector('[data-slot="table-footer"]')?.tagName).toBe(
      "TFOOT"
    )
    expect(container.querySelector('[data-slot="table-row"]')?.tagName).toBe(
      "TR"
    )
    expect(container.querySelector('[data-slot="table-head"]')?.tagName).toBe(
      "TH"
    )
    expect(container.querySelector('[data-slot="table-cell"]')?.tagName).toBe(
      "TD"
    )
  })

  it("forwards cell content", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Ada Lovelace</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument()
  })

  it("Table accepts a typed sx prop (applied to the table)", () => {
    const { container } = render(
      <Table sx={sx.custom}>
        <TableBody>
          <TableRow>
            <TableCell>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(container.querySelector('[data-slot="table"]')?.className).not.toBe(
      ""
    )
  })

  it("subcomponents accept sx", () => {
    const { container } = render(
      <Table>
        <TableBody sx={sx.custom}>
          <TableRow sx={sx.custom}>
            <TableCell sx={sx.custom}>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(
      container.querySelector('[data-slot="table-body"]')?.className
    ).not.toBe("")
    expect(
      container.querySelector('[data-slot="table-row"]')?.className
    ).not.toBe("")
    expect(
      container.querySelector('[data-slot="table-cell"]')?.className
    ).not.toBe("")
  })
})
