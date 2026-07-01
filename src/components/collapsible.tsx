"use client"

import type { StyleXStyles } from "@stylexjs/stylex"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import * as stylex from "@stylexjs/stylex"

type CollapsibleProps = Omit<
  CollapsiblePrimitive.Root.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function Collapsible({ sx, ...props }: CollapsibleProps) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type CollapsibleTriggerProps = Omit<
  CollapsiblePrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function CollapsibleTrigger({ sx, ...props }: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

type CollapsibleContentProps = Omit<
  CollapsiblePrimitive.Panel.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function CollapsibleContent({ sx, ...props }: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      {...stylex.props(sx)}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
export type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
}
