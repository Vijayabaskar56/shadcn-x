import * as stylex from "@stylexjs/stylex"
import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import browserCollections from "collections/browser"
import { Suspense } from "react"

import type { DocsNavItem } from "@/docs/docs-config"

import { Box } from "@/components/box"
import { DocMdxContent } from "@/components/docs/doc-content"
import { DocToc } from "@/components/docs/doc-toc"
import { docsPager } from "@/docs/docs-config"

import { colors, spacing } from "../styles/tokens.stylex"

// Resolves a slug to its compiled-doc path + head metadata on the server only
// (`@/lib/source` reaches `collections/server`, which is node-only). The
// TanStack Start compiler strips this handler — and the source import — from
// the client bundle, leaving an RPC stub for client-side navigations.
const serverLoader = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { source } = await import("@/lib/source")
    const page = source.getPage(slug === "" ? [] : slug.split("/"))
    if (!page) throw notFound()
    return {
      path: page.path,
      title: page.data.title,
      description: page.data.description,
    }
  })

export const Route = createFileRoute("/docs/$")({
  loader: async ({ params }) => {
    const slug = params._splat ?? ""
    const data = await serverLoader({ data: slug })
    // Warm the compiled-MDX module cache so SSR renders the doc synchronously.
    await clientLoader.preload(data.path)

    return { ...data, ...docsPager(slug) }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — shadcn-x` },
          ...(loaderData.description
            ? [{ name: "description", content: loaderData.description }]
            : []),
        ]
      : [],
  }),
  component: DocPage,
})

const styles = stylex.create({
  article: {
    minWidth: 0,
  },
  nav: {
    marginTop: spacing["3xl"],
    paddingTop: spacing.xl,
  },
  navLink: {
    color: {
      default: colors["muted-foreground"],
      ":hover": colors["text-primary"],
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  aside: {
    display: "none",
    width: "12rem",
    flexShrink: 0,
    "@media (min-width: 1024px)": {
      display: "block",
    },
  },
  sticky: {
    position: "sticky",
    top: "2rem",
  },
})

type DocPageProps = {
  prev: DocsNavItem | undefined
  next: DocsNavItem | undefined
}

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, default: Mdx }, { prev, next }: DocPageProps) {
    return (
      <Box as="div" display="flex" gap="2xl">
        <Box as="article" flex="1" sx={styles.article}>
          <DocMdxContent Mdx={Mdx} />
          <Box
            as="nav"
            display="flex"
            justifyContent="between"
            borderTop
            borderColor="border-primary"
            fontSize="s"
            sx={styles.nav}
          >
            {prev ? (
              <Box as="span" sx={styles.navLink}>
                <Link to="/docs/$" params={{ _splat: prev.slug }}>
                  ← {prev.label}
                </Link>
              </Box>
            ) : (
              <Box as="span" />
            )}
            {next ? (
              <Box as="span" sx={styles.navLink}>
                <Link to="/docs/$" params={{ _splat: next.slug }}>
                  {next.label} →
                </Link>
              </Box>
            ) : (
              <Box as="span" />
            )}
          </Box>
        </Box>
        <Box as="aside" sx={styles.aside}>
          <Box as="div" sx={styles.sticky}>
            <DocToc toc={toc} />
          </Box>
        </Box>
      </Box>
    )
  },
})

function DocPage() {
  const { path, prev, next } = Route.useLoaderData()
  return <Suspense>{clientLoader.useContent(path, { prev, next })}</Suspense>
}
