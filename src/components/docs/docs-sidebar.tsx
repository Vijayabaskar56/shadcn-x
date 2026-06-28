import { Link } from "@tanstack/react-router"

import { docsNav } from "@/docs/docs-config"
import { cn } from "@/lib/utils"

export function DocsSidebar() {
  return (
    <nav className="flex flex-col gap-6" aria-label="Docs">
      {docsNav.map((section) => (
        <div key={section.label} className="flex flex-col gap-1">
          <p className="px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {section.label}
          </p>
          {section.items.map((item) => (
            <Link
              key={item.slug}
              to="/docs/$"
              params={{ _splat: item.slug }}
              className={cn(
                "rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              )}
              activeProps={{
                className: "bg-muted font-medium text-foreground",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
