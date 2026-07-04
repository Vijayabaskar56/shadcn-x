import type { TextDirection } from "@base-ui/react/direction-provider"

import {
  DirectionProvider as BaseDirectionProvider,
  useDirection,
} from "@base-ui/react/direction-provider"
import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Box } from "@/components/box"

type Direction = TextDirection

const styles = stylex.create({
  // Boxless wrapper: carries `dir` via display:contents → no layout box,
  // provider sits transparently inside flex/grid parents.
  scope: {
    display: "contents",
  },
})

function DirectionProvider({
  dir,
  direction,
  global = false,
  children,
}: {
  /** Reading direction. Alias of `direction`, kept for parity with shadcn's API. */
  dir?: Direction
  /** Reading direction (Base UI's canonical prop name). Takes precedence over `dir`. */
  direction?: Direction
  /**
   * When true, also sets `dir` on `<html>` so portaled overlays
   * (DialogContent, SheetContent) — which mount outside this subtree at the
   * end of `<body>` — inherit the direction. Intended for the app-root
   * provider only; docs previews and other scoped usages MUST leave this off
   * so they don't flip the whole page.
   */
  global?: boolean
  children: React.ReactNode
}) {
  const resolved = direction ?? dir ?? "ltr"

  // Base UI's DirectionProvider feeds context only; CSS logical props resolve against DOM `dir`. Reaches DOM via Boxless wrapper with `dir` or global `<html>` for portaled overlays.
  React.useEffect(() => {
    if (!global) return
    const root = document.documentElement
    const previous = root.getAttribute("dir")
    root.setAttribute("dir", resolved)
    return () => {
      if (previous === null) root.removeAttribute("dir")
      else root.setAttribute("dir", previous)
    }
  }, [resolved, global])

  return (
    <BaseDirectionProvider direction={resolved}>
      <Box as="span" dir={resolved} sx={styles.scope}>
        {children}
      </Box>
    </BaseDirectionProvider>
  )
}

export { DirectionProvider, useDirection }
export type { Direction }
