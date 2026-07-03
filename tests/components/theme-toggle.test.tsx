import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { ThemeToggle } from "@/components/theme-toggle"

const STORAGE_KEY = "vite-ui-theme"

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it("renders a button", () => {
    render(<ThemeToggle />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("shows the current (default: system) theme label", () => {
    render(<ThemeToggle />)
    expect(
      screen.getByRole("button", { name: /system/i })
    ).toBeInTheDocument()
  })

  it("reflects a stored theme", () => {
    localStorage.setItem(STORAGE_KEY, "dark")
    render(<ThemeToggle />)
    expect(screen.getByRole("button", { name: /dark/i })).toBeInTheDocument()
  })

  it("cycles system → light → dark → system on repeated clicks", async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    const button = screen.getByRole("button")

    // default stored theme is "system"
    expect(button).toHaveAccessibleName(/system/i)

    await user.click(button)
    expect(button).toHaveAccessibleName(/light/i)
    expect(localStorage.getItem(STORAGE_KEY)).toBe("light")

    await user.click(button)
    expect(button).toHaveAccessibleName(/dark/i)
    expect(localStorage.getItem(STORAGE_KEY)).toBe("dark")

    await user.click(button)
    expect(button).toHaveAccessibleName(/system/i)
    expect(localStorage.getItem(STORAGE_KEY)).toBe("system")
  })
})
