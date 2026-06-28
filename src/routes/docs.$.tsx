import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import { allDocs } from "content-collections"

import { DocContent } from "@/components/docs/doc-content"
import { DocToc } from "@/components/docs/doc-toc"
import { docsNavFlat } from "@/docs/docs-config"

export const Route = createFileRoute("/docs/$")({
  loader: ({ params }) => {
    const slug = params._splat ?? ""
    const doc = allDocs.find((d) => d.slug === slug)
    if (!doc) throw notFound()

    const index = docsNavFlat.findIndex((item) => item.slug === slug)
    return {
      doc,
      prev: index > 0 ? docsNavFlat[index - 1] : undefined,
      next:
        index >= 0 && index < docsNavFlat.length - 1
          ? docsNavFlat[index + 1]
          : undefined,
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.doc.title} — shadcn-x` },
          ...(loaderData.doc.description
            ? [{ name: "description", content: loaderData.doc.description }]
            : []),
        ]
      : [],
  }),
  component: DocPage,
})

function DocPage() {
  const { doc, prev, next } = Route.useLoaderData()

  return (
    <div className="flex gap-10">
      <article className="min-w-0 flex-1">
        <DocContent html={doc.html} />
        <nav className="mt-12 flex justify-between border-t border-border pt-6 text-sm">
          {prev ? (
            <Link
              to="/docs/$"
              params={{ _splat: prev.slug }}
              className="text-muted-foreground hover:text-foreground"
            >
              ← {prev.label}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/docs/$"
              params={{ _splat: next.slug }}
              className="text-muted-foreground hover:text-foreground"
            >
              {next.label} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
      <aside className="hidden w-48 shrink-0 lg:block">
        <div className="sticky top-8">
          <DocToc toc={doc.toc} />
        </div>
      </aside>
    </div>
  )
}
