import type { ComponentProps, ReactNode } from "react"

import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Line, LineChart } from "recharts"
import * as stylex from "@stylexjs/stylex"

// jsdom has no layout, so Recharts' ResponsiveContainer measures 0x0 and never
// renders its children. Replace it with a passthrough so the tooltip/legend
// content (which reads ChartContainer's context) actually mounts.
vi.mock("recharts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("recharts")>()
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: ReactNode }) => children,
  }
})

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/chart"

const config = {
  desktop: { label: "Desktop", color: "var(--color-desktop)" },
}

const tooltipPayload = [
  {
    dataKey: "desktop",
    name: "desktop",
    value: 186,
    color: "rebeccapurple",
    payload: { month: "January", desktop: 186, fill: "rebeccapurple" },
  },
]

describe("Chart", () => {
  it("renders a chart container", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <LineChart data={[{ desktop: 10 }]}>
          <Line dataKey="desktop" />
        </LineChart>
      </ChartContainer>
    )

    expect(container.querySelector('[data-slot="chart"]')).not.toBeNull()
  })

  it("exports Recharts tooltip and legend primitives", () => {
    expect(ChartTooltip).toBeDefined()
    expect(ChartLegend).toBeDefined()
  })

  it("injects chart color variables", () => {
    const { container } = render(
      <ChartContainer config={{ desktop: { label: "Desktop", color: "red" } }}>
        <LineChart data={[{ desktop: 10 }]}>
          <Line dataKey="desktop" />
        </LineChart>
      </ChartContainer>
    )

    expect(container.querySelector("style")?.textContent).toContain(
      "--color-desktop: red"
    )
  })

  it("applies the sx prop to the container", () => {
    const sx = stylex.create({ tall: { minHeight: 500 } })

    const withoutSx = render(
      <ChartContainer config={config}>
        <LineChart data={[{ desktop: 10 }]}>
          <Line dataKey="desktop" />
        </LineChart>
      </ChartContainer>
    )
    const withSx = render(
      <ChartContainer config={config} sx={sx.tall}>
        <LineChart data={[{ desktop: 10 }]}>
          <Line dataKey="desktop" />
        </LineChart>
      </ChartContainer>
    )

    const base =
      withoutSx.container.querySelector('[data-slot="chart"]')?.className ?? ""
    const themed =
      withSx.container.querySelector('[data-slot="chart"]')?.className ?? ""

    // sx is merged last, so it contributes extra StyleX classes.
    expect(themed).not.toEqual(base)
    expect(themed.length).toBeGreaterThan(base.length)
  })
})

describe("ChartTooltipContent", () => {
  function renderTooltip(props: Record<string, unknown>) {
    // ChartTooltipContent reads config via context, so it must render inside
    // ChartContainer. ResponsiveContainer clones its child with dimensions.
    return render(
      <ChartContainer config={config}>
        <ChartTooltipContent
          {...(props as unknown as ComponentProps<typeof ChartTooltipContent>)}
        />
      </ChartContainer>
    )
  }

  it("renders nothing when inactive", () => {
    const { container } = renderTooltip({ active: false, payload: tooltipPayload })
    expect(container.querySelector('[data-slot="chart-tooltip"]')).toBeNull()
  })

  it("renders label and value for an active payload", () => {
    const { container } = renderTooltip({
      active: true,
      payload: tooltipPayload,
    })
    const tooltip = container.querySelector('[data-slot="chart-tooltip"]')
    expect(tooltip).not.toBeNull()
    // config label resolves the tooltip label + item name.
    expect(tooltip?.textContent).toContain("Desktop")
    expect(tooltip?.textContent).toContain("186")
  })

  it("hides the label when hideLabel is set", () => {
    const { container } = renderTooltip({
      active: true,
      payload: tooltipPayload,
      hideLabel: true,
    })
    const tooltip = container.querySelector('[data-slot="chart-tooltip"]')
    // "Desktop" appears once as the item name, but not as the label heading.
    const occurrences = tooltip?.textContent?.match(/Desktop/g)?.length ?? 0
    expect(occurrences).toBe(1)
  })

  it("renders the indicator using the color prop as primary fallback", () => {
    const { container } = renderTooltip({
      active: true,
      payload: tooltipPayload,
      color: "hotpink",
    })
    const tooltip = container.querySelector('[data-slot="chart-tooltip"]')
    // dynamic StyleX styles emit the color through inline CSS variables.
    expect(tooltip?.innerHTML).toContain("hotpink")
  })

  it("renders all indicator variants without error", () => {
    for (const indicator of ["dot", "line", "dashed"] as const) {
      const { container } = renderTooltip({
        active: true,
        payload: tooltipPayload,
        indicator,
      })
      expect(
        container.querySelector('[data-slot="chart-tooltip"]')
      ).not.toBeNull()
    }
  })

  it("omits the indicator when hideIndicator is set", () => {
    const withIndicator = renderTooltip({
      active: true,
      payload: tooltipPayload,
    })
    const withoutIndicator = renderTooltip({
      active: true,
      payload: tooltipPayload,
      hideIndicator: true,
    })
    const a = withIndicator.container.querySelectorAll("div").length
    const b = withoutIndicator.container.querySelectorAll("div").length
    expect(b).toBeLessThan(a)
  })

  it("calls formatter when provided", () => {
    const formatter = vi.fn(() => <span>formatted</span>)
    const { container } = renderTooltip({
      active: true,
      payload: tooltipPayload,
      formatter,
    })
    expect(formatter).toHaveBeenCalled()
    expect(
      container.querySelector('[data-slot="chart-tooltip"]')?.textContent
    ).toContain("formatted")
  })

  it("resolves the label through labelKey", () => {
    const { container } = renderTooltip({
      active: true,
      payload: tooltipPayload,
      labelKey: "month",
    })
    // month payload value "January" is not in config, so it renders raw.
    expect(
      container.querySelector('[data-slot="chart-tooltip"]')
    ).not.toBeNull()
  })
})

describe("ChartLegendContent", () => {
  const legendPayload = [
    { value: "desktop", dataKey: "desktop", color: "rebeccapurple", type: "line" },
  ]

  function renderLegend(props: Record<string, unknown>) {
    return render(
      <ChartContainer config={config}>
        <ChartLegendContent
          {...(props as unknown as ComponentProps<typeof ChartLegendContent>)}
        />
      </ChartContainer>
    )
  }

  it("renders legend items from payload", () => {
    const { container } = renderLegend({ payload: legendPayload })
    const legend = container.querySelector('[data-slot="chart-legend"]')
    expect(legend).not.toBeNull()
    expect(legend?.textContent).toContain("Desktop")
  })

  it("renders nothing without a payload", () => {
    const { container } = renderLegend({ payload: [] })
    expect(container.querySelector('[data-slot="chart-legend"]')).toBeNull()
  })

  it("applies top vs bottom padding based on verticalAlign", () => {
    const bottom = renderLegend({ payload: legendPayload })
    const top = renderLegend({ payload: legendPayload, verticalAlign: "top" })
    const bottomClass =
      bottom.container.querySelector('[data-slot="chart-legend"]')?.className ??
      ""
    const topClass =
      top.container.querySelector('[data-slot="chart-legend"]')?.className ?? ""
    expect(topClass).not.toEqual(bottomClass)
  })
})
