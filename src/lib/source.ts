import { docs } from "collections/server"
import { loader } from "fumadocs-core/source"

// Server-only (`collections/server` pulls node:path): accessed exclusively from
// the docs route's createServerFn handler, so it never reaches the client
// bundle. Slugs stay flat filenames — `content/docs/button.mdx` -> ["button"].
export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: "/docs",
})
