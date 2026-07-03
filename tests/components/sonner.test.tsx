import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { toast } from "sonner"

import { Toaster } from "@/components/sonner"

afterEach(() => {
  toast.dismiss()
  localStorage.clear()
  cleanup()
})

describe("Toaster", () => {
  it("renders an accessible notification region", () => {
    render(<Toaster />)

    expect(screen.getByLabelText("Notifications alt+T")).toBeInTheDocument()
  })

  it("uses the local stored theme by default", async () => {
    localStorage.setItem("vite-ui-theme", "dark")

    render(<Toaster />)
    toast("Theme synced")

    expect(await screen.findByText("Theme synced")).toBeInTheDocument()
    expect(document.querySelector("[data-sonner-toaster]")).toHaveAttribute(
      "data-sonner-theme",
      "dark"
    )
  })

  it("allows an explicit theme prop to override the local theme", async () => {
    localStorage.setItem("vite-ui-theme", "dark")

    render(<Toaster theme="light" />)
    toast("Light toast")

    expect(await screen.findByText("Light toast")).toBeInTheDocument()
    expect(document.querySelector("[data-sonner-toaster]")).toHaveAttribute(
      "data-sonner-theme",
      "light"
    )
  })

  it("uses shadcn-style default icons", async () => {
    render(<Toaster />)
    toast.success("Saved")

    expect(await screen.findByText("Saved")).toBeInTheDocument()
    expect(document.querySelector("[data-slot='icon']")).toBeInTheDocument()
  })

  it("uses the shared Spinner for loading toasts", async () => {
    render(<Toaster />)
    toast.loading("Saving")

    expect(await screen.findByText("Saving")).toBeInTheDocument()
    expect(screen.getByRole("status", { name: "Loading toast" })).toHaveAttribute(
      "data-slot",
      "spinner"
    )
  })

  it("sets token-backed Sonner CSS variables and forwards props", async () => {
    render(<Toaster containerAriaLabel="App notifications" />)
    toast("Customized")

    expect(
      screen.getByLabelText("App notifications alt+T")
    ).toBeInTheDocument()
    expect(await screen.findByText("Customized")).toBeInTheDocument()

    const toaster = document.querySelector("[data-sonner-toaster]")
    expect(
      (toaster as HTMLElement).style.getPropertyValue("--normal-bg")
    ).toMatch(/^var\(--/)
    expect(
      (toaster as HTMLElement).style.getPropertyValue("--normal-text")
    ).toMatch(/^var\(--/)
  })
})
