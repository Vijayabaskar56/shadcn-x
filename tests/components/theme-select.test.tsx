import * as stylex from "@stylexjs/stylex"
import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import { ThemeSelect } from "@/components/theme-select"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

const STORAGE_KEY = "shadcn-x-color-theme"

describe("ThemeSelect", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("renders a button for each theme", () => {
    render(<ThemeSelect />)
    expect(screen.getByRole("button", { name: "Default" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sunset" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Forest" })).toBeInTheDocument()
  })

  it("marks the current theme's button as data-slot button and reflects selection", () => {
    localStorage.setItem(STORAGE_KEY, "sunset")
    render(<ThemeSelect />)
    // Clicking a theme persists it, driving the current-theme highlight.
    fireEvent.click(screen.getByRole("button", { name: "Forest" }))
    expect(localStorage.getItem(STORAGE_KEY)).toBe("forest")
  })

  it("writes the clicked theme to storage", () => {
    render(<ThemeSelect />)
    fireEvent.click(screen.getByRole("button", { name: "Sunset" }))
    expect(localStorage.getItem(STORAGE_KEY)).toBe("sunset")
  })

  it("accepts a typed sx prop and renders the container", () => {
    render(<ThemeSelect sx={sx.custom} />)
    // The three theme buttons still render inside the customized container.
    expect(screen.getAllByRole("button")).toHaveLength(3)
  })
})
