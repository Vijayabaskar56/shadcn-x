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
  // Boxless wrapper: carries the `dir` attribute (CSS `direction` inherits
  // through `display: contents`) without adding a layout box, so the provider
  // can sit inside flex/grid parents transparently.
  scope: {
    display: "contents",
  },
})

function DirectionProvider({
  dir,
  direction,
  children,
}: {
  /** Reading direction. Alias of `direction`, kept for parity with shadcn's API. */
  dir?: Direction
  /** Reading direction (Base UI's canonical prop name). Takes precedence over `dir`. */
  direction?: Direction
  children: React.ReactNode
}) {
  const resolved = direction ?? dir ?? "ltr"

  // shadcn-x enhancement: Base UI's DirectionProvider only feeds context to
  // Base UI components. Our styles flip via CSS logical properties, which
  // resolve against the DOM `dir` an element inherits — not React context — so
  // the direction has to reach the actual DOM. We do that in two places:
  //
  // 1. A boxless wrapper (`display: contents`) carrying `dir` scopes the flip to
  //    this subtree and, since it renders on the server too, gives correct SSR
  //    output before the effect below runs.
  // 2. Portaled overlays (DialogContent, SheetContent) mount OUTSIDE this
  //    subtree — at the end of <body> — so the wrapper can't reach them. The
  //    effect sets `dir` on <html> so portaled content (and the page scrollbar)
  //    inherit the direction. Restored on unmount.
  React.useEffect(() => {
    const root = document.documentElement
    const previous = root.getAttribute("dir")
    root.setAttribute("dir", resolved)
    return () => {
      if (previous === null) root.removeAttribute("dir")
      else root.setAttribute("dir", previous)
    }
  }, [resolved])

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
