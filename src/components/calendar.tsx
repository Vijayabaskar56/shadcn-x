"use client"

import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentProps } from "react"
import type { Locale } from "react-day-picker"

import * as stylex from "@stylexjs/stylex"
import {
  DayButton,
  DayPicker,
  getDefaultClassNames,
} from "react-day-picker"
import { useEffect, useRef } from "react"

import { Button } from "./button"
import { Icon } from "./icon"
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

const Div = "div" as const
const Table = "table" as const
const Td = "td" as const

const u = spacing["--spacing"]

const styles = stylex.create({
  root: {
    width: "fit-content",
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
  },
  monthGrid: {
    width: "100%",
    borderCollapse: "collapse",
  },
  weekNumber: {
    display: "flex",
    width: `calc(${u} * 9)`,
    height: `calc(${u} * 9)`,
    alignItems: "center",
    justifyContent: "center",
    color: colors["muted-foreground"],
    fontSize: fontSize.s,
  },
  dayButton: {
    width: "100%",
    minWidth: `calc(${u} * 9)`,
    height: `calc(${u} * 9)`,
    borderWidth: 0,
    fontWeight: fontWeight.regular,
  },
  selected: {
    backgroundColor: colors.primary,
    color: colors["primary-foreground"],
  },
  rangeMiddle: {
    borderRadius: borderRadius.none,
    backgroundColor: colors["background-muted"],
    color: colors["text-primary"],
  },
})

type CalendarProps = Omit<
  ComponentProps<typeof DayPicker>,
  "className" | "classNames" | "style" | "color"
> & {
  buttonVariant?: ComponentProps<typeof Button>["variant"]
  sx?: StyleXStyles
}

type CalendarDayButtonProps = ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>
  buttonVariant?: ComponentProps<typeof Button>["variant"]
}

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ")
}

function Calendar({
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  sx,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()
  const dayPickerProps = {
    showOutsideDays,
    captionLayout,
    locale,
    formatters: {
      formatMonthDropdown: (date: Date) =>
        date.toLocaleString(locale?.code, { month: "short" }),
      ...formatters,
    },
    classNames: {
      root: mergeClassNames(defaultClassNames.root),
      months: mergeClassNames(defaultClassNames.months),
      month: mergeClassNames(defaultClassNames.month),
      month_grid: mergeClassNames(defaultClassNames.month_grid),
    },
    components: {
      Root: ({ className, rootRef, ...rootProps }: any) => {
        const styled = stylex.props(styles.root, sx)
        return (
          <Div
            data-slot="calendar"
            ref={rootRef}
            {...rootProps}
            className={mergeClassNames(className, styled.className)}
            style={styled.style}
          />
        )
      },
      MonthGrid: ({ className, ...monthGridProps }: any) => {
        const styled = stylex.props(styles.monthGrid)
        return (
          <Table
            {...monthGridProps}
            className={mergeClassNames(className, styled.className)}
            style={styled.style}
          />
        )
      },
      Chevron: ({ orientation, size: _size, ...chevronProps }: any) => {
        const name =
          orientation === "left"
            ? "ChevronLeft"
            : orientation === "right"
              ? "ChevronRight"
              : "ChevronDown"
        return (
          <Icon
            name={name}
            size="m"
            flipRtl={orientation === "left" || orientation === "right"}
            {...chevronProps}
          />
        )
      },
      PreviousMonthButton: ({
        className: _className,
        style: _style,
        ...prevProps
      }: any) => (
        <Button variant={buttonVariant} size="icon" {...prevProps} />
      ),
      NextMonthButton: ({
        className: _className,
        style: _style,
        ...nextProps
      }: any) => (
        <Button variant={buttonVariant} size="icon" {...nextProps} />
      ),
      DayButton: (dayButtonProps: any) => (
        <CalendarDayButton
          locale={locale}
          buttonVariant={buttonVariant}
          {...dayButtonProps}
        />
      ),
      WeekNumber: ({ children, ...weekNumberProps }: any) => (
        <Td {...weekNumberProps}>
          <Div {...stylex.props(styles.weekNumber)}>{children}</Div>
        </Td>
      ),
      ...components,
    },
    ...props,
  } as unknown as ComponentProps<typeof DayPicker>

  return <DayPicker {...dayPickerProps} />
}

function CalendarDayButton({
  day,
  modifiers,
  locale,
  buttonVariant = "ghost",
  ...props
}: CalendarDayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const selected =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle

  return (
    <Button
      ref={ref}
      variant={buttonVariant}
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={selected || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      sx={[
        styles.dayButton,
        (selected || modifiers.range_start || modifiers.range_end) &&
          styles.selected,
        modifiers.range_middle && styles.rangeMiddle,
      ]}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
export type { CalendarProps, CalendarDayButtonProps }
