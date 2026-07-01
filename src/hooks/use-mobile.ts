import * as React from "react"

const MOBILE_BREAKPOINT = 768

function getIsMobile() {
  if (typeof window === "undefined") {
    return false
  }

  return window.innerWidth < MOBILE_BREAKPOINT
}

function useIsMobile() {
  // Start from a stable value so the server render and the first client render
  // agree (avoids a hydration mismatch on mobile viewports); the effect below
  // corrects it right after mount.
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const update = () => setIsMobile(getIsMobile())

    if (!window.matchMedia) {
      window.addEventListener("resize", update)
      update()

      return () => window.removeEventListener("resize", update)
    }

    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    update()
    query.addEventListener("change", update)

    return () => query.removeEventListener("change", update)
  }, [])

  return isMobile
}

export { useIsMobile }
