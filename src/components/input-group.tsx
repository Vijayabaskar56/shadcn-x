import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Textarea } from "@/components/textarea"

import { colors, fontSize } from "../styles/tokens.stylex"

const styles = stylex.create({
  group: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    alignItems: "center",
    outline: "none",
    position: "relative",
  },
  addon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "text",
    userSelect: "none",
  },
  addonInlineStart: {
    order: -1,
  },
  addonInlineEnd: {
    order: 1,
  },
  addonBlockStart: {
    order: -1,
    width: "100%",
    justifyContent: "flex-start",
  },
  addonBlockEnd: {
    order: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
  text: {
    display: "flex",
    alignItems: "center",
    color: colors["text-secondary"],
    fontSize: fontSize.s,
  },
  control: {
    flex: 1,
  },
  textareaControl: {
    flex: 1,
    resize: "none",
  },
})

// Variable tags so these primitives aren't flagged by their own `no-raw-html`
// rule (the same technique Box/Textarea use internally).
const DivTag = "div" as const
const SpanTag = "span" as const

type AddonAlign = "inline-start" | "inline-end" | "block-start" | "block-end"

function InputGroup({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  sx?: StyleXStyles
}) {
  return (
    <DivTag
      data-slot="input-group"
      role="group"
      {...stylex.props(styles.group, sx)}
      {...props}
    />
  )
}

const inputGroupAddonAlignStyles: Record<AddonAlign, StyleXStyles> = {
  "inline-start": styles.addonInlineStart,
  "inline-end": styles.addonInlineEnd,
  "block-start": styles.addonBlockStart,
  "block-end": styles.addonBlockEnd,
}

function InputGroupAddon({
  sx,
  align = "inline-start" as AddonAlign,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  align?: AddonAlign
  sx?: StyleXStyles
}) {
  return (
    <DivTag
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      {...stylex.props(styles.addon, inputGroupAddonAlignStyles[align], sx)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

function InputGroupButton({
  sx,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Button>, "size" | "type"> & {
  type?: "button" | "submit" | "reset"
  size?: "xs" | "sm" | "icon-xs" | "icon-sm"
  sx?: StyleXStyles
}) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      size={size}
      sx={sx}
      {...props}
    />
  )
}

function InputGroupText({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"span"> & {
  sx?: StyleXStyles
}) {
  return (
    <SpanTag
      data-slot="input-group-text"
      {...stylex.props(styles.text, sx)}
      {...props}
    />
  )
}

function InputGroupInput({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<typeof Input> & {
  sx?: StyleXStyles
}) {
  return <Input data-slot="input-group-control" sx={sx} {...props} />
}

function InputGroupTextarea({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<typeof Textarea> & {
  sx?: StyleXStyles
}) {
  return <Textarea data-slot="input-group-control" sx={sx} {...props} />
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
