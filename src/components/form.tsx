"use client"

import type { StyleXStyles } from "@stylexjs/stylex"
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form"

import * as stylex from "@stylexjs/stylex"
import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form"

import { Box } from "@/components/box"

import { colors, fontSize, fontWeight, spacing } from "../styles/tokens.stylex"

// ─── Form (FormProvider alias) ───────────────────────────────────────────────

const Form = FormProvider

// ─── FormField context + component ───────────────────────────────────────────

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

// ─── useFormField hook ───────────────────────────────────────────────────────

const FormItemContext = React.createContext<{ id: string }>(
  {} as { id: string }
)

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

// ─── FormItem ────────────────────────────────────────────────────────────────

const itemStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.s,
  },
})

type FormItemProps = {
  children?: React.ReactNode
  sx?: StyleXStyles
} & Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color" | "children"
>

const FormItemTag = "div" as const

function FormItem({ children, sx, ...props }: FormItemProps) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <FormItemTag
        data-slot="form-item"
        {...stylex.props(itemStyles.base, sx)}
        {...props}
      >
        {children}
      </FormItemTag>
    </FormItemContext.Provider>
  )
}

// ─── FormLabel ───────────────────────────────────────────────────────────────

const formLabelStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.s,
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    lineHeight: 1,
    color: colors["text-primary"],
    userSelect: "none",
    opacity: {
      default: 1,
      [stylex.when.ancestor('[data-disabled="true"]')]: 0.5,
      [stylex.when.siblingBefore(":disabled")]: 0.5,
    },
    pointerEvents: {
      default: null,
      [stylex.when.ancestor('[data-disabled="true"]')]: "none",
      [stylex.when.siblingBefore(":disabled")]: "none",
    },
  },
  error: {
    color: colors.destructive,
  },
})

type FormLabelProps = {
  sx?: StyleXStyles
} & Omit<
  React.ComponentPropsWithoutRef<"label">,
  "className" | "style" | "color"
>

const FormLabelTag = "label" as const

function FormLabel({ sx, ...props }: FormLabelProps) {
  const { error, formItemId } = useFormField()
  return (
    <FormLabelTag
      data-slot="form-label"
      data-error={!!error}
      htmlFor={formItemId}
      {...stylex.props(
        formLabelStyles.base,
        error && formLabelStyles.error,
        sx
      )}
      {...props}
    />
  )
}

// ─── FormControl (uses Box instead of Slot.Root) ─────────────────────────────

type FormControlProps = {
  children?: React.ReactNode
} & Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color" | "children"
>

function FormControl({ children, ...props }: FormControlProps) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Box
      as="div"
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    >
      {children}
    </Box>
  )
}

// ─── FormDescription ─────────────────────────────────────────────────────────

const descriptionStyles = stylex.create({
  base: {
    fontSize: fontSize.s,
    color: colors["muted-foreground"],
  },
})

type FormDescriptionProps = {
  children?: React.ReactNode
  sx?: StyleXStyles
} & Omit<
  React.ComponentPropsWithoutRef<"p">,
  "className" | "style" | "color" | "children"
>

const FormDescriptionTag = "p" as const

function FormDescription({ children, sx, ...props }: FormDescriptionProps) {
  const { formDescriptionId } = useFormField()

  return (
    <FormDescriptionTag
      data-slot="form-description"
      id={formDescriptionId}
      {...stylex.props(descriptionStyles.base, sx)}
      {...props}
    >
      {children}
    </FormDescriptionTag>
  )
}

// ─── FormMessage ─────────────────────────────────────────────────────────────

const messageStyles = stylex.create({
  base: {
    fontSize: fontSize.s,
    color: colors.destructive,
  },
})

type FormMessageProps = {
  children?: React.ReactNode
  sx?: StyleXStyles
} & Omit<
  React.ComponentPropsWithoutRef<"p">,
  "className" | "style" | "color" | "children"
>

const FormMessageTag = "p" as const

function FormMessage({ children, sx, ...props }: FormMessageProps) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <FormMessageTag
      data-slot="form-message"
      id={formMessageId}
      {...stylex.props(messageStyles.base, sx)}
      {...props}
    >
      {body}
    </FormMessageTag>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
export type {
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
}
