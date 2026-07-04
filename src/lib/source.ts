import { docs } from "collections/server"
import { loader } from "fumadocs-core/source"

// Server-only: accessed from docs route's createServerFn, never in client bundle. Flat filenames.
export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: "/docs",
})
