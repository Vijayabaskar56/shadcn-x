import { createFileRoute, redirect } from "@tanstack/react-router"

import { firstDocSlug } from "@/docs/docs-config"

export const Route = createFileRoute("/docs/")({
  beforeLoad: () => {
    throw redirect({ to: "/docs/$", params: { _splat: firstDocSlug } })
  },
})
