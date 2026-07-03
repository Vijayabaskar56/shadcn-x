"use client"

import type { StyleXStyles } from "@stylexjs/stylex"
import type {
  ComponentPropsWithoutRef,
  KeyboardEvent,
} from "react"
import type { UseEmblaCarouselType } from "embla-carousel-react"

import useEmblaCarousel from "embla-carousel-react"
import * as stylex from "@stylexjs/stylex"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

import { Box } from "./box"
import { Button } from "./button"
import { useDirection } from "./direction"
import { Icon } from "./icon"
import { spacing } from "../styles/tokens.stylex"

const Div = "div" as const

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]
type CarouselOrientation = "horizontal" | "vertical"

type CarouselProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: CarouselOrientation
  setApi?: (api: CarouselApi) => void
  sx?: StyleXStyles
}

type CarouselSlotProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

type CarouselControlProps = Omit<
  ComponentPropsWithoutRef<typeof Button>,
  "children" | "onClick" | "className" | "style"
> & {
  sx?: StyleXStyles
}

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: CarouselApi
  orientation: CarouselOrientation
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

const u = spacing["--spacing"]

const styles = stylex.create({
  root: {
    position: "relative",
  },
  viewport: {
    overflow: "hidden",
  },
  content: {
    display: "flex",
  },
  contentHorizontal: {
    marginInlineStart: `calc(${u} * -4)`,
  },
  contentVertical: {
    flexDirection: "column",
    marginBlockStart: `calc(${u} * -4)`,
  },
  item: {
    minWidth: 0,
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "100%",
  },
  itemHorizontal: {
    paddingInlineStart: spacing.l,
  },
  itemVertical: {
    paddingBlockStart: spacing.l,
  },
  control: {
    position: "absolute",
    touchAction: "manipulation",
  },
  previousHorizontal: {
    insetBlock: 0,
    insetInlineStart: `calc(${u} * -12)`,
    marginBlock: "auto",
  },
  nextHorizontal: {
    insetBlock: 0,
    insetInlineEnd: `calc(${u} * -12)`,
    marginBlock: "auto",
  },
  previousVertical: {
    insetBlockStart: `calc(${u} * -12)`,
    insetInlineStart: "50%",
    transform: "translateX(-50%) rotate(90deg)",
  },
  nextVertical: {
    insetBlockEnd: `calc(${u} * -12)`,
    insetInlineStart: "50%",
    transform: "translateX(-50%) rotate(90deg)",
  },
  verticalRtl: {
    transform: "translateX(50%) rotate(90deg)",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
})

function useCarousel() {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  children,
  sx,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback((nextApi: NonNullable<CarouselApi>) => {
    setCanScrollPrev(nextApi.canScrollPrev())
    setCanScrollNext(nextApi.canScrollNext())
  }, [])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollNext, scrollPrev]
  )

  useEffect(() => {
    if (api) setApi?.(api)
  }, [api, setApi])

  useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => {
      api.off("reInit", onSelect)
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <Div
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        onKeyDownCapture={handleKeyDown}
        {...stylex.props(styles.root, sx)}
        {...props}
      >
        {children}
      </Div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ sx, ...props }: CarouselSlotProps) {
  const { carouselRef, orientation } = useCarousel()
  return (
    <Div
      data-slot="carousel-content"
      ref={carouselRef}
      {...stylex.props(styles.viewport)}
    >
      <Div
        {...stylex.props(
          styles.content,
          orientation === "horizontal"
            ? styles.contentHorizontal
            : styles.contentVertical,
          sx
        )}
        {...props}
      />
    </Div>
  )
}

function CarouselItem({ sx, ...props }: CarouselSlotProps) {
  const { orientation } = useCarousel()
  return (
    <Div
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
      {...stylex.props(
        styles.item,
        orientation === "horizontal" ? styles.itemHorizontal : styles.itemVertical,
        sx
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  variant = "outline",
  size = "icon-sm",
  sx,
  ...props
}: CarouselControlProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()
  const direction = useDirection()
  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      sx={[
        styles.control,
        orientation === "horizontal"
          ? styles.previousHorizontal
          : styles.previousVertical,
        orientation === "vertical" && direction === "rtl" && styles.verticalRtl,
        sx,
      ]}
      {...props}
    >
      <Icon name="ChevronLeft" flipRtl />
      <Box as="span" sx={styles.srOnly}>
        Previous slide
      </Box>
    </Button>
  )
}

function CarouselNext({
  variant = "outline",
  size = "icon-sm",
  sx,
  ...props
}: CarouselControlProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
  const direction = useDirection()
  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      disabled={!canScrollNext}
      onClick={scrollNext}
      sx={[
        styles.control,
        orientation === "horizontal" ? styles.nextHorizontal : styles.nextVertical,
        orientation === "vertical" && direction === "rtl" && styles.verticalRtl,
        sx,
      ]}
      {...props}
    >
      <Icon name="ChevronRight" flipRtl />
      <Box as="span" sx={styles.srOnly}>
        Next slide
      </Box>
    </Button>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
}
export type {
  CarouselApi,
  CarouselOptions,
  CarouselPlugin,
  CarouselProps,
  CarouselSlotProps,
}
