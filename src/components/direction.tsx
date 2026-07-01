import { createContext, useContext, useEffect, useMemo } from "react"

type Direction = "ltr" | "rtl"

const DirectionContext = createContext<Direction>("ltr")

function DirectionProvider({
  dir = "ltr",
  children,
}: {
  dir?: Direction
  children: React.ReactNode
}) {
  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  const value = useMemo(() => dir, [dir])

  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  )
}

function useDirection(): Direction {
  return useContext(DirectionContext)
}

export { DirectionProvider, useDirection }
export type { Direction }
