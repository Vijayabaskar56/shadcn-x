import { Link, useRouterState } from "@tanstack/react-router"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/sidebar"
import { docsNav } from "@/docs/docs-config"

/**
 * Sidebar navigation for the docs. Uses the `Sidebar*` primitives so the
 * nav structure (section labels, menu items, active state) matches the
 * component library's visual language. Items render as `<a>` via
 * `SidebarMenuButton render={<Link />}` — no `Link` variant styling needed;
 * the sidebar primitives provide their own hover/active tokens.
 *
 * Scrolling is handled by the wrapping `SidebarContent` in `docs.tsx`
 * (overflow: auto, flex: 1, min-height: 0) — the sidebar scrolls
 * independently of the page.
 */
export function DocsSidebar() {
  const splat = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <>
      {docsNav.map((section) => (
        <SidebarGroup key={section.label}>
          <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => {
                const itemPath = `/docs/${item.slug}`
                const isActive = splat === itemPath

                return (
                  <SidebarMenuItem key={item.slug}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={
                        <Link to="/docs/$" params={{ _splat: item.slug }} />
                      }
                    >
                      {item.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
