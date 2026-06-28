import { Link, Outlet, createFileRoute } from "@tanstack/react-router"

import { DocsSidebar } from "@/components/docs/docs-sidebar"

export const Route = createFileRoute("/docs")({ component: DocsLayout })

function DocsLayout() {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col px-4">
      <header className="flex h-14 items-center border-b border-border">
        <Link to="/" className="text-sm font-semibold">
          shadcn-x
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link
          to="/docs/$"
          params={{ _splat: "introduction" }}
          className="text-sm"
        >
          docs
        </Link>
      </header>
      <div className="flex flex-1 gap-10 py-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-8">
            <DocsSidebar />
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
