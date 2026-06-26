import { useCallback, useEffect, useSyncExternalStore } from "react"

type Theme = "light" | "dark" | "system"
const STORAGE_KEY = "vite-ui-theme"

function getStoredTheme(): Theme {
  if (typeof localStorage === "undefined") return "system"
  return (localStorage.getItem(STORAGE_KEY) as Theme) ?? "system"
}

const storedThemeListeners = new Set<() => void>()

function notifyStoredThemeChange() {
  for (const listener of storedThemeListeners) listener()
}

function subscribeStoredTheme(callback: () => void) {
  storedThemeListeners.add(callback)
  window.addEventListener("storage", callback)
  return () => {
    storedThemeListeners.delete(callback)
    window.removeEventListener("storage", callback)
  }
}

function getStoredThemeServerSnapshot(): Theme {
  return "system"
}

function useStoredTheme(): Theme {
  return useSyncExternalStore(
    subscribeStoredTheme,
    getStoredTheme,
    getStoredThemeServerSnapshot
  )
}

function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement

  const style = document.createElement("style")
  style.textContent = "*, *::before, *::after { transition: none !important; }"
  document.head.appendChild(style)

  root.classList.remove("light", "dark")
  root.classList.add(resolved)
  root.style.colorScheme = resolved

  void root.offsetHeight

  requestAnimationFrame(() => {
    if (style.parentNode) document.head.removeChild(style)
  })
}

function getSystemTheme() {
  if (typeof matchMedia === "undefined") return "light"
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function subscribeSystemTheme(callback: () => void) {
  const mq = matchMedia("(prefers-color-scheme: dark)")
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}

function getSystemThemeSnapshot(): "light" | "dark" {
  return getSystemTheme()
}

function getSystemThemeServerSnapshot(): "light" | "dark" {
  return "light"
}

export function useResolvedTheme(): "dark" | "light" {
  const systemTheme = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemThemeSnapshot,
    getSystemThemeServerSnapshot
  )
  return systemTheme
}

export function useTheme() {
  const systemTheme = useResolvedTheme()
  const stored = useStoredTheme()
  const resolved = stored === "system" ? systemTheme : stored

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem(STORAGE_KEY, t)
    notifyStoredThemeChange()
    const r = t === "system" ? getSystemTheme() : t
    applyTheme(r)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolved === "dark" ? "light" : "dark")
  }, [resolved, setTheme])

  useEffect(() => {
    applyTheme(resolved)
  }, [resolved])

  return { theme: stored, resolved, setTheme, toggleTheme } as const
}
