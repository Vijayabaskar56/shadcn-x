import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Label } from "@/components/label"

import { colors, fontSize, fontWeight, spacing } from "../styles/tokens.stylex"

const styles = stylex.create({
  fieldSet: {
    display: "flex",
    flexDirection: "column",
  },
  legend: {
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    color: colors["text-primary"],
    marginBottom: spacing.s,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    // Establish the container so `responsive` Fields can switch layout at the
    // `@md` breakpoint (matches the reference's `@container/field-group`).
    containerType: "inline-size",
    containerName: "field-group",
  },
  field: {
    display: "flex",
    width: "100%",
  },
  fieldVertical: {
    flexDirection: "column",
  },
  fieldHorizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Vertical by default, switching to horizontal once the enclosing
  // FieldGroup container reaches the `@md` breakpoint (28rem).
  fieldResponsive: {
    flexDirection: {
      default: "column",
      "@container field-group (min-width: 28rem)": "row",
    },
    alignItems: {
      default: null,
      "@container field-group (min-width: 28rem)": "center",
    },
  },
  fieldContent: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    lineHeight: 1.375,
  },
  fieldLabel: {
    display: "flex",
    width: "fit-content",
  },
  fieldTitle: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
  },
  fieldDescription: {
    fontSize: fontSize.s,
    color: colors["text-secondary"],
    lineHeight: "normal",
    fontWeight: fontWeight.regular,
  },
  fieldSeparator: {
    position: "relative",
  },
  separatorLine: {
    position: "absolute",
    inset: 0,
    top: "50%",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderColor: colors["border-primary"],
  },
  separatorContent: {
    position: "relative",
    display: "block",
    width: "fit-content",
    marginInline: "auto",
    backgroundColor: colors["background-primary"],
    paddingInline: spacing.s,
  },
  fieldError: {
    fontSize: fontSize.s,
    color: colors.destructive,
    fontWeight: fontWeight.regular,
  },
  errorList: {
    marginInlineStart: spacing.l,
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
    listStyle: "disc",
  },
})

// Variable tags so these defining primitives aren't flagged by their own
// `no-raw-html` rule — the same technique Box/Textarea/Label use internally.
const FieldSetTag = "fieldset" as const
const LegendTag = "legend" as const
const DivTag = "div" as const
const PTag = "p" as const
const SpanTag = "span" as const
const UlTag = "ul" as const
const LiTag = "li" as const

function FieldSet({
  sx,
  disabled,
  ...props
}: React.ComponentPropsWithoutRef<"fieldset"> & {
  sx?: StyleXStyles
}) {
  // When disabled we both natively disable the fieldset AND carry the
  // data-disabled="true" + stylex.defaultMarker() so a descendant Label's
  // `stylex.when.ancestor('[data-disabled="true"]')` dim/pointer-events branches
  // actually emit (marker + matching attribute are both required — see MEMORY).
  return (
    <FieldSetTag
      data-slot="field-set"
      disabled={disabled}
      data-disabled={disabled ? "true" : undefined}
      {...stylex.props(styles.fieldSet, disabled && stylex.defaultMarker(), sx)}
      {...props}
    />
  )
}

function FieldLegend({
  sx,
  variant = "legend",
  ...props
}: React.ComponentPropsWithoutRef<"legend"> & {
  variant?: "legend" | "label"
  sx?: StyleXStyles
}) {
  return (
    <LegendTag
      data-slot="field-legend"
      data-variant={variant}
      {...stylex.props(styles.legend, sx)}
      {...props}
    />
  )
}

function FieldGroup({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  sx?: StyleXStyles
}) {
  return (
    <DivTag
      data-slot="field-group"
      {...stylex.props(styles.fieldGroup, sx)}
      {...props}
    />
  )
}

type Orientation = "vertical" | "horizontal" | "responsive"

function Field({
  sx,
  orientation = "vertical" as Orientation,
  disabled,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  orientation?: Orientation
  disabled?: boolean
  sx?: StyleXStyles
}) {
  const orientationStyle =
    orientation === "horizontal"
      ? styles.fieldHorizontal
      : orientation === "responsive"
        ? styles.fieldResponsive
        : styles.fieldVertical

  // The Field is a <div> (no native disabled), so disabling is styling-only:
  // data-disabled="true" + stylex.defaultMarker() let a descendant Label's
  // `stylex.when.ancestor('[data-disabled="true"]')` branches emit (matching
  // shadcn's `group-data-[disabled=true]/field:opacity-50`).
  return (
    <DivTag
      role="group"
      data-slot="field"
      data-orientation={orientation}
      data-disabled={disabled ? "true" : undefined}
      {...stylex.props(
        styles.field,
        orientationStyle,
        disabled && stylex.defaultMarker(),
        sx
      )}
      {...props}
    />
  )
}

function FieldContent({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  sx?: StyleXStyles
}) {
  return (
    <DivTag
      data-slot="field-content"
      {...stylex.props(styles.fieldContent, sx)}
      {...props}
    />
  )
}

function FieldLabel({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<typeof Label> & {
  sx?: StyleXStyles
}) {
  return (
    <Label
      data-slot="field-label"
      {...stylex.props(styles.fieldLabel, sx)}
      {...props}
    />
  )
}

function FieldTitle({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  sx?: StyleXStyles
}) {
  return (
    <DivTag
      data-slot="field-label"
      {...stylex.props(styles.fieldTitle, sx)}
      {...props}
    />
  )
}

function FieldDescription({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"p"> & {
  sx?: StyleXStyles
}) {
  return (
    <PTag
      data-slot="field-description"
      {...stylex.props(styles.fieldDescription, sx)}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  children?: React.ReactNode
  sx?: StyleXStyles
}) {
  return (
    <DivTag
      data-slot="field-separator"
      data-content={!!children}
      {...stylex.props(styles.fieldSeparator, sx)}
      {...props}
    >
      <DivTag {...stylex.props(styles.separatorLine)} />
      {children && (
        <SpanTag
          data-slot="field-separator-content"
          {...stylex.props(styles.separatorContent)}
        >
          {children}
        </SpanTag>
      )}
    </DivTag>
  )
}

const useMemo = React.useMemo

function FieldError({
  children,
  errors,
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  children?: React.ReactNode
  errors?: Array<{ message?: string } | undefined>
  sx?: StyleXStyles
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <UlTag {...stylex.props(styles.errorList)}>
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <LiTag key={index}>{error.message}</LiTag>
        )}
      </UlTag>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <DivTag
      role="alert"
      data-slot="field-error"
      {...stylex.props(styles.fieldError, sx)}
      {...props}
    >
      {content}
    </DivTag>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
