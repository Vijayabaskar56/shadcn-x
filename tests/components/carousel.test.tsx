import * as stylex from "@stylexjs/stylex"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeAll, describe, expect, it, vi } from "vitest"

import type { CarouselApi } from "@/components/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

beforeAll(() => {
  class TestIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.IntersectionObserver =
    TestIntersectionObserver as unknown as typeof IntersectionObserver
})

describe("Carousel", () => {
  it("renders the root slot as a carousel region", () => {
    render(<Carousel aria-label="Featured"><CarouselContent /></Carousel>)

    expect(screen.getByRole("region", { name: "Featured" })).toHaveAttribute(
      "data-slot",
      "carousel"
    )
  })

  it("renders content and item slots", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    expect(container.querySelector('[data-slot="carousel-content"]')).not.toBeNull()
    expect(container.querySelector('[data-slot="carousel-item"]')).not.toBeNull()
  })

  it("renders previous and next controls", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )

    expect(screen.getByText("Previous slide")).toBeInTheDocument()
    expect(screen.getByText("Next slide")).toBeInTheDocument()
  })

  it("accepts a typed sx prop on every subcomponent", () => {
    const { container } = render(
      <Carousel aria-label="Styled" sx={sx.custom}>
        <CarouselContent sx={sx.custom}>
          <CarouselItem sx={sx.custom}>One</CarouselItem>
        </CarouselContent>
        <CarouselPrevious sx={sx.custom} />
        <CarouselNext sx={sx.custom} />
      </Carousel>
    )

    expect(
      container.querySelector('[data-slot="carousel"]')?.className
    ).not.toBe("")
    expect(
      container.querySelector('[data-slot="carousel-content"] > *')?.className
    ).not.toBe("")
    expect(
      container.querySelector('[data-slot="carousel-item"]')?.className
    ).not.toBe("")
    expect(
      container.querySelector('[data-slot="carousel-previous"]')?.className
    ).not.toBe("")
    expect(
      container.querySelector('[data-slot="carousel-next"]')?.className
    ).not.toBe("")
  })

  it("scrolls via ArrowRight/ArrowLeft keyboard navigation", async () => {
    let api: CarouselApi
    render(
      <Carousel
        aria-label="Keys"
        setApi={(next) => {
          api = next
        }}
      >
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
          <CarouselItem>Two</CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    await waitFor(() => expect(api).toBeTruthy())

    const scrollNext = vi.spyOn(api!, "scrollNext")
    const scrollPrev = vi.spyOn(api!, "scrollPrev")
    const region = screen.getByRole("region", { name: "Keys" })

    fireEvent.keyDown(region, { key: "ArrowRight" })
    expect(scrollNext).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(region, { key: "ArrowLeft" })
    expect(scrollPrev).toHaveBeenCalledTimes(1)
  })
})
