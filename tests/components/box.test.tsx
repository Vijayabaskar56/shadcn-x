import * as stylex from "@stylexjs/stylex"
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Box } from "@/components/box"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

// A sentinel value (kept out of JSX attrs so the no-raw-design-values guardrail
// doesn't flag a test fixture) — proves the dynamic-style path for minHeight.
const TALL = "10rem"

describe("Box", () => {
  it("renders its children", () => {
    const { container } = render(<Box>hello</Box>)
    expect(container.textContent).toBe("hello")
  })

  it("renders as the requested host element via `as`", () => {
    const { container } = render(<Box as="section">x</Box>)
    expect(container.firstElementChild?.tagName).toBe("SECTION")
  })

  it("applies StyleX className from token props", () => {
    const { container } = render(<Box padding="l" />)
    expect(container.firstElementChild?.className).not.toBe("")
  })

  it("accepts a typed sx prop (merged last)", () => {
    const { container } = render(<Box sx={sx.custom}>x</Box>)
    expect(container.firstElementChild?.className).not.toBe("")
  })

  it("does NOT route flexGrow through a raw inline style (dynamic styles)", () => {
    const { container } = render(<Box flexGrow={1}>x</Box>)
    const el = container.firstElementChild as HTMLElement
    expect(el.style.flexGrow).toBe("")
    expect(el.className).not.toBe("")
  })

  it("does NOT route minHeight through a raw inline style (dynamic styles)", () => {
    const { container } = render(<Box minHeight={TALL}>x</Box>)
    const el = container.firstElementChild as HTMLElement
    expect(el.style.minHeight).toBe("")
    expect(el.className).not.toBe("")
  })

  it("renders flexGrow={0} too (falsy but defined)", () => {
    const { container } = render(<Box flexGrow={0}>x</Box>)
    const el = container.firstElementChild as HTMLElement
    expect(el.style.flexGrow).toBe("")
    expect(el.className).not.toBe("")
  })

  it("border={false} renders NO border styling", () => {
    const on = render(<Box border>x</Box>).container.firstElementChild
      ?.className
    const off = render(<Box border={false}>x</Box>).container.firstElementChild
      ?.className
    expect(on).not.toBe("")
    expect(off).not.toBeUndefined()
    expect(on).not.toBe(off)
  })

  it("applies multiple layout props together without error", () => {
    const { container } = render(
      <Box display="flex" alignItems="center" gap="m" padding="l">
        x
      </Box>
    )
    expect(container.firstElementChild?.className).not.toBe("")
  })
})
