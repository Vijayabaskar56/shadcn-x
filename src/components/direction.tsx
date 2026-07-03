import type { TextDirection } from "@base-ui/react/direction-provider"

import {
  DirectionProvider as BaseDirectionProvider,
  useDirection,
} from "@base-ui/react/direction-provider"
import { useEffect } from "react"

type Direction = TextDirection

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
  // Base UI components and does NOT touch the DOM. Our styles flip via CSS
  // logical properties, which key off the document's `dir` attribute, so we
  // also mirror the resolved direction onto <html>. (Documented divergence.)
  useEffect(() => {
    document.documentElement.dir = resolved
  }, [resolved])

  return (
    <BaseDirectionProvider direction={resolved}>
      {children}
    </BaseDirectionProvider>
  )
}

export { DirectionProvider, useDirection }
export type { Direction }
