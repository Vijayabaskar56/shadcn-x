import * as stylex from "@stylexjs/stylex"
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Image } from "@/components/image"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Image", () => {
  it("renders an <img> with the data-slot attribute", () => {
    const { container } = render(<Image src="/photo.jpg" alt="A photo" />)
    const el = container.firstElementChild as HTMLImageElement
    expect(el.tagName).toBe("IMG")
    expect(el).toHaveAttribute("data-slot", "image")
  })

  it("forwards src + alt", () => {
    const { container } = render(<Image src="/logo.png" alt="Logo" />)
    const el = container.firstElementChild as HTMLImageElement
    expect(el).toHaveAttribute("src", "/logo.png")
    expect(el).toHaveAttribute("alt", "Logo")
  })

  it('defaults to loading="lazy"', () => {
    const { container } = render(<Image src="/a.jpg" alt="x" />)
    expect(container.firstElementChild).toHaveAttribute("loading", "lazy")
  })

  it('forwards an explicit loading="eager"', () => {
    const { container } = render(<Image src="/a.jpg" alt="x" loading="eager" />)
    expect(container.firstElementChild).toHaveAttribute("loading", "eager")
  })

  it("renders every aspect without error", () => {
    const aspects = ["square", "video", "wide", "portrait"] as const
    for (const aspect of aspects) {
      const { container, unmount } = render(
        <Image src="/a.jpg" alt="x" aspect={aspect} />
      )
      expect(container.firstElementChild?.className).not.toBe("")
      unmount()
    }
  })

  it("accepts every fit without error", () => {
    const fits = ["cover", "contain", "fill", "none"] as const
    for (const fit of fits) {
      const { container, unmount } = render(
        <Image src="/a.jpg" alt="x" fit={fit} />
      )
      expect(container.firstElementChild?.className).not.toBe("")
      unmount()
    }
  })

  it("accepts a typed sx prop", () => {
    const { container } = render(<Image src="/a.jpg" alt="x" sx={sx.custom} />)
    expect(container.firstElementChild?.className).not.toBe("")
  })
})
