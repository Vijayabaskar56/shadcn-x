import type { TocEntry } from "@/lib/markdown"

import { cn } from "@/lib/utils"

export function DocToc({ toc }: { toc: Array<TocEntry> }) {
  if (toc.length === 0) return null

  return (
    <nav className="flex flex-col gap-2 text-sm" aria-label="On this page">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="flex flex-col gap-1.5">
        {toc.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cn(
                "block text-muted-foreground transition-colors hover:text-foreground",
                entry.depth === 3 && "pl-3"
              )}
            >
              {entry.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
