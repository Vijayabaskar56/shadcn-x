import * as stylex from "@stylexjs/stylex"
import { render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/avatar"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

class LoadedImage {
  complete = true
  naturalWidth = 1
  crossOrigin: string | null = null
  onerror: (() => void) | null = null
  onload: (() => void) | null = null
  referrerPolicy = ""
  sizes = ""
  srcset = ""

  set src(_value: string) {
    this.onload?.()
  }
}

describe("Avatar", () => {
  it("renders the root with the default size", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>VB</AvatarFallback>
      </Avatar>
    )

    expect(screen.getByTestId("avatar")).toHaveAttribute("data-slot", "avatar")
    expect(screen.getByTestId("avatar")).toHaveAttribute(
      "data-size",
      "default"
    )
  })

  it("supports every shadcn size", () => {
    for (const size of ["default", "sm", "lg"] as const) {
      const { unmount } = render(
        <Avatar size={size} data-testid={`avatar-${size}`}>
          <AvatarFallback>{size}</AvatarFallback>
        </Avatar>
      )

      expect(screen.getByTestId(`avatar-${size}`)).toHaveAttribute(
        "data-size",
        size
      )
      unmount()
    }
  })

  it("renders image and fallback slots with Base UI behavior", async () => {
    const OriginalImage = window.Image
    vi.stubGlobal("Image", LoadedImage)

    render(
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="Vijay" />
        <AvatarFallback>VB</AvatarFallback>
      </Avatar>
    )

    await waitFor(() =>
      expect(screen.getByAltText("Vijay")).toHaveAttribute(
        "data-slot",
        "avatar-image"
      )
    )

    vi.stubGlobal("Image", OriginalImage)
  })

  it("forwards image loading status changes", async () => {
    const OriginalImage = window.Image
    vi.stubGlobal("Image", LoadedImage)
    const onLoadingStatusChange = vi.fn()

    render(
      <Avatar>
        <AvatarImage
          src="/avatar.jpg"
          alt="Vijay"
          onLoadingStatusChange={onLoadingStatusChange}
        />
        <AvatarFallback>VB</AvatarFallback>
      </Avatar>
    )

    await waitFor(() => expect(onLoadingStatusChange).toHaveBeenCalled())
    vi.stubGlobal("Image", OriginalImage)
  })

  it("renders badge, group, and count slots", () => {
    render(
      <AvatarGroup data-testid="group">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
          <AvatarBadge data-testid="badge" />
        </Avatar>
        <AvatarGroupCount data-testid="count">+3</AvatarGroupCount>
      </AvatarGroup>
    )

    expect(screen.getByTestId("group")).toHaveAttribute(
      "data-slot",
      "avatar-group"
    )
    expect(screen.getByTestId("badge")).toHaveAttribute(
      "data-slot",
      "avatar-badge"
    )
    expect(screen.getByTestId("count")).toHaveAttribute(
      "data-slot",
      "avatar-group-count"
    )
  })

  it("forwards arbitrary root props", () => {
    render(
      <Avatar aria-label="Account owner">
        <AvatarFallback>AO</AvatarFallback>
      </Avatar>
    )

    expect(screen.getByLabelText("Account owner")).toBeInTheDocument()
  })

  it("accepts typed sx on every public slot", async () => {
    const OriginalImage = window.Image
    vi.stubGlobal("Image", LoadedImage)

    render(
      <AvatarGroup sx={sx.custom} data-testid="group">
        <Avatar sx={sx.custom} data-testid="avatar">
          <AvatarImage
            sx={sx.custom}
            src="/avatar.jpg"
            alt="Vijay"
            data-testid="image"
          />
          <AvatarBadge sx={sx.custom} data-testid="badge" />
        </Avatar>
        <Avatar sx={sx.custom}>
          <AvatarFallback sx={sx.custom} data-testid="fallback">
            VB
          </AvatarFallback>
        </Avatar>
        <AvatarGroupCount sx={sx.custom} data-testid="count">
          +3
        </AvatarGroupCount>
      </AvatarGroup>
    )

    for (const testId of [
      "group",
      "avatar",
      "fallback",
      "badge",
      "count",
    ]) {
      expect(screen.getByTestId(testId).className).not.toBe("")
    }

    await waitFor(() =>
      expect(screen.getByTestId("image").className).not.toBe("")
    )

    vi.stubGlobal("Image", OriginalImage)
  })
})
