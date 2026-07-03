import { useCallback, useSyncExternalStore } from "react"

import type { ColorThemeName } from "../styles/themes"

const STORAGE_KEY = "shadcn-x-color-theme"
const VALID: ColorThemeName[] = ["default", "sunset", "forest"]

function normalize(value: string | null): ColorThemeName {
  return VALID.includes(value as ColorThemeName)
    ? (value as ColorThemeName)
    : "default"
}

function getStored(): ColorThemeName {
  if (typeof localStorage === "undefined") return "default"
  return normalize(localStorage.getItem(STORAGE_KEY))
}

const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  window.addEventListener("storage", callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener("storage", callback)
  }
}

function notify() {
  for (const listener of listeners) listener()
}

function getServerSnapshot(): ColorThemeName {
  return "default"
}

/** Reads/writes the selected color theme (default / sunset / forest). */
export function useColorTheme() {
  const theme = useSyncExternalStore(subscribe, getStored, getServerSnapshot)

  const setColorTheme = useCallback((next: ColorThemeName) => {
    localStorage.setItem(STORAGE_KEY, next)
    notify()
  }, [])

  return { theme, setColorTheme } as const
}
