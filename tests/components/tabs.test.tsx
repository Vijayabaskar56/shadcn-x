import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

function ExampleTabs() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account panel</TabsContent>
      <TabsContent value="password">Password panel</TabsContent>
    </Tabs>
  )
}

describe("Tabs", () => {
  it("renders the shadcn slots with data-slot attributes", () => {
    render(<ExampleTabs />)

    expect(screen.getByRole("tablist")).toHaveAttribute(
      "data-slot",
      "tabs-list"
    )
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "data-slot",
      "tabs-trigger"
    )
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "data-slot",
      "tabs-content"
    )
  })

  it("switches panels when a trigger is clicked", async () => {
    const onValueChange = vi.fn()
    render(
      <Tabs defaultValue="account" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account panel</TabsContent>
        <TabsContent value="password">Password panel</TabsContent>
      </Tabs>
    )

    await userEvent.click(screen.getByRole("tab", { name: "Password" }))

    expect(onValueChange).toHaveBeenCalledOnce()
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Password panel")
  })

  it("renders both list variants without error", () => {
    for (const variant of ["default", "line"] as const) {
      const { unmount } = render(
        <Tabs defaultValue="one">
          <TabsList variant={variant}>
            <TabsTrigger value="one">{variant}</TabsTrigger>
          </TabsList>
          <TabsContent value="one">{variant} panel</TabsContent>
        </Tabs>
      )

      expect(screen.getByRole("tablist")).toHaveAttribute(
        "data-variant",
        variant
      )
      unmount()
    }
  })

  it("supports vertical orientation", () => {
    render(
      <Tabs defaultValue="one" orientation="vertical">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
        </TabsList>
        <TabsContent value="one">One panel</TabsContent>
      </Tabs>
    )

    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "vertical"
    )
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
  })

  it("accepts typed sx props on every public slot", () => {
    render(
      <Tabs defaultValue="one" sx={sx.custom}>
        <TabsList sx={sx.custom}>
          <TabsTrigger value="one" sx={sx.custom}>
            One
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one" sx={sx.custom}>
          One panel
        </TabsContent>
      </Tabs>
    )

    expect(screen.getByRole("tablist").className).not.toBe("")
    expect(screen.getByRole("tab").className).not.toBe("")
    expect(screen.getByRole("tabpanel").className).not.toBe("")
  })
})
