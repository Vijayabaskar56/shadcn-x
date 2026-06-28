import * as stylex from "@stylexjs/stylex"
import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import { allDocs } from "content-collections"

import { Box } from "@/components/box"
import { DocContent, DocMdxContent } from "@/components/docs/doc-content"
import { DocToc } from "@/components/docs/doc-toc"
import { docsNavFlat } from "@/docs/docs-config"

import { colors, spacing } from "../styles/tokens.stylex"

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

function DocPage() {
  const { doc, prev, next } = Route.useLoaderData()

  return (
    <Box as="div" display="flex" gap="2xl">
      <Box as="article" flex="1" sx={styles.article}>
        {doc.mdx ? (
          <DocMdxContent code={doc.mdx} />
        ) : (
          <DocContent html={doc.html} />
        )}
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
            <span />
          )}
          {next ? (
            <Box as="span" sx={styles.navLink}>
              <Link to="/docs/$" params={{ _splat: next.slug }}>
                {next.label} →
              </Link>
            </Box>
          ) : (
            <span />
          )}
        </Box>
      </Box>
      <Box as="aside" sx={styles.aside}>
        <Box as="div" sx={styles.sticky}>
          <DocToc toc={doc.toc} />
        </Box>
      </Box>
    </Box>
  )
}
