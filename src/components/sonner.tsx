import type { CSSProperties } from "react"
import type { ToasterProps as SonnerToasterProps } from "sonner"

import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner } from "sonner"

import { useTheme } from "@/hooks/use-theme"

import { Spinner } from "./spinner"
import { borderRadius, colors } from "../styles/tokens.stylex"

type ToasterProps = SonnerToasterProps

type SonnerStyle = CSSProperties & {
  "--normal-bg"?: string
  "--normal-text"?: string
  "--normal-border"?: string
  "--border-radius"?: string
  "--success-bg"?: string
  "--success-border"?: string
  "--success-text"?: string
  "--info-bg"?: string
  "--info-border"?: string
  "--info-text"?: string
  "--warning-bg"?: string
  "--warning-border"?: string
  "--warning-text"?: string
  "--error-bg"?: string
  "--error-border"?: string
  "--error-text"?: string
}

const toastStyle = {
  "--normal-bg": colors["background-card"],
  "--normal-text": colors["text-primary"],
  "--normal-border": colors["border-primary"],
  "--border-radius": borderRadius.l,
  "--success-bg": colors["background-card"],
  "--success-border": colors.success,
  "--success-text": colors.success,
  "--info-bg": colors["background-card"],
  "--info-border": colors.accent,
  "--info-text": colors.accent,
  "--warning-bg": colors["background-card"],
  "--warning-border": colors.accent,
  "--warning-text": colors.accent,
  "--error-bg": colors["background-card"],
  "--error-border": colors.destructive,
  "--error-text": colors.destructive,
} satisfies SonnerStyle

const iconProps = {
  "data-slot": "icon",
  "aria-hidden": true,
  width: 16,
  height: 16,
} as const

const defaultIcons = {
  success: <CircleCheckIcon {...iconProps} />,
  info: <InfoIcon {...iconProps} />,
  warning: <TriangleAlertIcon {...iconProps} />,
  error: <OctagonXIcon {...iconProps} />,
  loading: <Spinner aria-label="Loading toast" />,
} satisfies NonNullable<SonnerToasterProps["icons"]>

function mergeIcons(
  icons: SonnerToasterProps["icons"]
): SonnerToasterProps["icons"] {
  if (!icons) return defaultIcons
  return { ...defaultIcons, ...icons }
}

function Toaster({
  theme,
  icons,
  style,
  toastOptions,
  ...props
}: ToasterProps) {
  const { theme: currentTheme } = useTheme()

  return (
    <Sonner
      theme={theme ?? currentTheme}
      icons={mergeIcons(icons)}
      style={{ ...toastStyle, ...style }}
      toastOptions={toastOptions}
      {...props}
    />
  )
}

export { Toaster }
export type { ToasterProps }
