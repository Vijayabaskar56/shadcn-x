"use client"

import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentProps, ComponentType, ReactNode } from "react"
import type { TooltipValueType } from "recharts"

import * as RechartsPrimitive from "recharts"
import * as stylex from "@stylexjs/stylex"
import { createContext, useContext, useId, useMemo } from "react"

import {
  borderRadius,
  boxShadow,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

const Div = "div" as const
const Span = "span" as const
const StyleTag = "style" as const

const THEMES = { light: "", dark: ".dark" } as const
const INITIAL_DIMENSION = { width: 320, height: 200 } as const

type TooltipNameType = number | string

export type ChartConfig = Record<
  string,
  {
    label?: ReactNode
    icon?: ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

type ChartContextValue = {
  config: ChartConfig
}

type ChartContainerProps = Omit<
  ComponentProps<"div">,
  "className" | "style" | "color"
> & {
  config: ChartConfig
  children: ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
  initialDimension?: { width: number; height: number }
  sx?: StyleXStyles
}

const ChartContext = createContext<ChartContextValue | null>(null)

const styles = stylex.create({
  container: {
    display: "flex",
    aspectRatio: "16 / 9",
    justifyContent: "center",
    color: colors["text-primary"],
    fontSize: fontSize.xs,
  },
  tooltip: {
    display: "grid",
    minWidth: "8rem",
    alignItems: "flex-start",
    gap: spacing.s,
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-card"],
    padding: spacing.s,
    boxShadow: boxShadow.m,
  },
  tooltipLabel: {
    fontWeight: fontWeight.medium,
  },
  tooltipList: {
    display: "grid",
    gap: spacing.xs,
  },
  tooltipItem: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: spacing.s,
  },
  indicator: (color: string) => ({
    width: spacing.s,
    height: spacing.s,
    flexShrink: 0,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: color,
    backgroundColor: color,
  }),
  indicatorLine: {
    width: spacing.xs,
    height: "1.5rem",
  },
  indicatorDashed: {
    width: 0,
    height: "1.5rem",
    borderWidth: "1.5px",
    borderStyle: "dashed",
    backgroundColor: "transparent",
  },
  itemBody: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.l,
    lineHeight: 1,
  },
  itemName: {
    color: colors["muted-foreground"],
  },
  itemValue: {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
    fontWeight: fontWeight.medium,
    color: colors["text-primary"],
    fontVariantNumeric: "tabular-nums",
  },
  legend: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.l,
  },
  legendTop: {
    paddingBottom: spacing.m,
  },
  legendBottom: {
    paddingTop: spacing.m,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
  },
})

function useChart() {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

function ChartContainer({
  id,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  sx,
  ...props
}: ChartContainerProps) {
  const uniqueId = useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <Div
        data-slot="chart"
        data-chart={chartId}
        {...stylex.props(styles.container, sx)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer
          initialDimension={initialDimension}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </Div>
    </ChartContext.Provider>
  )
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme ?? itemConfig.color
  )

  if (colorConfig.length === 0) return null

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const vars = colorConfig
        .map(([key, itemConfig]) => {
          const color =
            itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
            itemConfig.color
          return color ? `  --color-${key}: ${color};` : null
        })
        .filter(Boolean)
        .join("\n")
      return `${prefix} [data-chart=${id}] {\n${vars}\n}`
    })
    .join("\n")

  return <StyleTag dangerouslySetInnerHTML={{ __html: css }} />
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  formatter,
  color,
  nameKey,
  labelKey,
  sx,
  labelSx,
}: ComponentProps<typeof RechartsPrimitive.Tooltip> &
  {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
    color?: string
    sx?: StyleXStyles
    labelSx?: StyleXStyles
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      TooltipNameType
    >,
    "accessibilityLayer"
  >) {
  const { config } = useChart()

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) return null
    const [item] = payload
    const key = String(labelKey ?? item?.dataKey ?? item?.name ?? "value")
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <Div {...stylex.props(styles.tooltipLabel, labelSx)}>
          {labelFormatter(value, payload)}
        </Div>
      )
    }

    return value ? (
      <Div {...stylex.props(styles.tooltipLabel, labelSx)}>{value}</Div>
    ) : null
  }, [config, hideLabel, label, labelFormatter, labelKey, labelSx, payload])

  if (!active || !payload?.length) return null

  return (
    <Div data-slot="chart-tooltip" {...stylex.props(styles.tooltip, sx)}>
      {tooltipLabel}
      <Div {...stylex.props(styles.tooltipList)}>
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = String(nameKey ?? item.name ?? item.dataKey ?? "value")
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = String(
              color ?? item.payload?.fill ?? item.color ?? "currentColor"
            )

            return (
              <Div key={index} {...stylex.props(styles.tooltipItem)}>
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : !hideIndicator ? (
                      <Div
                        {...stylex.props(
                          styles.indicator(indicatorColor),
                          indicator === "line" && styles.indicatorLine,
                          indicator === "dashed" && styles.indicatorDashed
                        )}
                      />
                    ) : null}
                    <Div {...stylex.props(styles.itemBody)}>
                      <Span {...stylex.props(styles.itemName)}>
                        {itemConfig?.label ?? item.name}
                      </Span>
                      {item.value != null ? (
                        <Span {...stylex.props(styles.itemValue)}>
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </Span>
                      ) : null}
                    </Div>
                  </>
                )}
              </Div>
            )
          })}
      </Div>
    </Div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: {
  hideIcon?: boolean
  nameKey?: string
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <Div
      data-slot="chart-legend"
      {...stylex.props(
        styles.legend,
        verticalAlign === "top" ? styles.legendTop : styles.legendBottom
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = String(nameKey ?? item.dataKey ?? "value")
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          return (
            <Div key={index} {...stylex.props(styles.legendItem)}>
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <Div {...stylex.props(styles.indicator(`${item.color}`))} />
              )}
              {itemConfig?.label}
            </Div>
          )
        })}
    </Div>
  )
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) return undefined

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
