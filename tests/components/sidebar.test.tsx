import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/sidebar"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

function SidebarStateProbe() {
  const { state } = useSidebar()
  return <output aria-label="state">{state}</output>
}

function ExampleSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarInput aria-label="Search" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupAction aria-label="Add group">+</SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Dashboard">
                    Dashboard
                  </SidebarMenuButton>
                  <SidebarMenuAction aria-label="More">...</SidebarMenuAction>
                  <SidebarMenuBadge>3</SidebarMenuBadge>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="/docs">
                        Docs
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>Footer</SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>Main</SidebarInset>
    </SidebarProvider>
  )
}

describe("Sidebar", () => {
  it("renders the provider, sidebar, and all shadcn slots", () => {
    render(<ExampleSidebar />)

    expect(
      document.querySelector('[data-slot="sidebar-wrapper"]')
    ).toHaveAttribute("data-state", "expanded")
    expect(document.querySelector('[data-slot="sidebar"]')).toBeInTheDocument()
    expect(
      document.querySelector('[data-slot="sidebar-header"]')
    ).toHaveAttribute("data-sidebar", "header")
    expect(screen.getByLabelText("Search")).toHaveAttribute(
      "data-slot",
      "sidebar-input"
    )
    expect(
      document.querySelector('[data-slot="sidebar-content"]')
    ).toHaveAttribute("data-sidebar", "content")
    expect(screen.getByText("Platform")).toHaveAttribute(
      "data-slot",
      "sidebar-group-label"
    )
    expect(screen.getByLabelText("Add group")).toHaveAttribute(
      "data-slot",
      "sidebar-group-action"
    )
    expect(
      document.querySelector('[data-slot="sidebar-menu"]')
    ).toHaveAttribute("data-slot", "sidebar-menu")
    expect(
      document.querySelector('[data-slot="sidebar-menu-item"]')
    ).toHaveAttribute("data-slot", "sidebar-menu-item")
    expect(screen.getByRole("button", { name: "Dashboard" })).toHaveAttribute(
      "data-active",
      "true"
    )
    expect(screen.getByLabelText("More")).toHaveAttribute(
      "data-slot",
      "sidebar-menu-action"
    )
    expect(screen.getByText("3")).toHaveAttribute(
      "data-slot",
      "sidebar-menu-badge"
    )
    expect(screen.getByText("Docs")).toHaveAttribute(
      "data-slot",
      "sidebar-menu-sub-button"
    )
    expect(
      document.querySelector('[data-slot="sidebar-separator"]')
    ).toHaveAttribute("data-sidebar", "separator")
    expect(
      document.querySelector('[data-slot="sidebar-inset"]')
    ).toBeInTheDocument()
  })

  it("toggles desktop state from the trigger and keyboard shortcut", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()

    render(
      <SidebarProvider defaultOpen onOpenChange={onOpenChange}>
        <SidebarTrigger />
        <SidebarStateProbe />
      </SidebarProvider>
    )

    expect(screen.getByLabelText("state")).toHaveTextContent("expanded")

    await user.click(screen.getByRole("button", { name: "Toggle Sidebar" }))
    expect(onOpenChange).toHaveBeenLastCalledWith(false)

    await user.keyboard("{Meta>}b{/Meta}")
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })

  it("supports controlled collapsed state and sidebar variants", () => {
    render(
      <SidebarProvider open={false}>
        <Sidebar side="right" variant="floating" collapsible="icon">
          <SidebarContent>Collapsed</SidebarContent>
        </Sidebar>
      </SidebarProvider>
    )

    const sidebar = document.querySelector('[data-slot="sidebar"]')
    expect(sidebar).toHaveAttribute("data-state", "collapsed")
    expect(sidebar).toHaveAttribute("data-side", "right")
    expect(sidebar).toHaveAttribute("data-variant", "floating")
    expect(sidebar).toHaveAttribute("data-collapsible", "icon")
  })

  it("renders menu button variants and sizes", () => {
    render(
      <SidebarProvider>
        <SidebarMenuButton variant="outline" size="lg">
          Settings
        </SidebarMenuButton>
      </SidebarProvider>
    )

    expect(screen.getByRole("button", { name: "Settings" })).toHaveAttribute(
      "data-size",
      "lg"
    )
  })

  it("renders a private menu skeleton without requiring the public Skeleton component", () => {
    render(
      <SidebarProvider>
        <SidebarMenuSkeleton showIcon />
      </SidebarProvider>
    )

    expect(
      document.querySelector('[data-slot="sidebar-menu-skeleton"]')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[data-sidebar="menu-skeleton-icon"]')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[data-sidebar="menu-skeleton-text"]')
    ).toBeInTheDocument()
  })

  it("accepts sx props on public styleable slots", () => {
    render(
      <SidebarProvider sx={sx.custom}>
        <Sidebar collapsible="none" sx={sx.custom}>
          <SidebarHeader sx={sx.custom}>
            <SidebarInput sx={sx.custom} />
          </SidebarHeader>
          <SidebarContent sx={sx.custom}>
            <SidebarGroup sx={sx.custom}>
              <SidebarGroupLabel sx={sx.custom}>Label</SidebarGroupLabel>
              <SidebarGroupAction sx={sx.custom}>Action</SidebarGroupAction>
              <SidebarGroupContent sx={sx.custom}>
                <SidebarMenu sx={sx.custom}>
                  <SidebarMenuItem sx={sx.custom}>
                    <SidebarMenuButton sx={sx.custom}>Item</SidebarMenuButton>
                    <SidebarMenuAction sx={sx.custom}>Action</SidebarMenuAction>
                    <SidebarMenuBadge sx={sx.custom}>1</SidebarMenuBadge>
                    <SidebarMenuSub sx={sx.custom}>
                      <SidebarMenuSubItem sx={sx.custom}>
                        <SidebarMenuSubButton sx={sx.custom} href="#">
                          Sub
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator sx={sx.custom} />
          <SidebarFooter sx={sx.custom}>Footer</SidebarFooter>
        </Sidebar>
        <SidebarInset sx={sx.custom}>Inset</SidebarInset>
      </SidebarProvider>
    )

    expect(screen.getByText("Item").className).not.toBe("")
    expect(screen.getByText("Sub").className).not.toBe("")
  })

  it("throws when useSidebar is used outside the provider", () => {
    const ConsoleError = vi.spyOn(console, "error").mockImplementation(() => {})

    expect(() => render(<SidebarStateProbe />)).toThrow(
      "useSidebar must be used within a SidebarProvider."
    )

    ConsoleError.mockRestore()
  })
})
