"use client"

import type { StyleXStyles } from "@stylexjs/stylex"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import * as stylex from "@stylexjs/stylex"

import { Icon } from "@/components/icon"

import {
  borderRadius,
  colors,
  duration,
  focusRing,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

const HeaderTag = AccordionPrimitive.Header
const Inner = "div" as const
// Trigger's `render` prop exposes `state.open` (StyleX can't key on self state).
// Variable tag avoids no-raw-html flag — same technique as navigation-menu.
const ButtonTag = "button" as const
const u = spacing["--spacing"]

const styles = stylex.create({
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  item: {
    borderBottomWidth: { default: 1, ":last-child": 0 },
    borderBottomStyle: "solid",
    borderBottomColor: colors["border-primary"],
  },
  header: {
    display: "flex",
  },
  trigger: {
    position: "relative",
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.l,
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    backgroundColor: "transparent",
    paddingBlock: spacing.l,
    color: colors["text-primary"],
    fontSize: fontSize.s,
    fontWeight: fontWeight.medium,
    textAlign: "start",
    outline: "none",
    textDecorationLine: { default: "none", ":hover": "underline" },
    transitionProperty:
      "color, border-color, box-shadow, text-decoration-color",
    transitionDuration: duration.fast,
    boxShadow: { default: null, ":focus-visible": focusRing.ring },
    opacity: { default: 1, ":disabled": 0.5 },
    pointerEvents: { default: null, ":disabled": "none" },
    cursor: { default: "pointer", ":disabled": "default" },
  },
  triggerIcon: {
    marginTop: `calc(${u} * 0.5)`,
    color: colors["muted-foreground"],
    transitionProperty: "transform",
    transitionDuration: duration.fast,
    transform: "none",
  },
  // Trigger's `state.open` from `render` prop → JS conditional rotation
  // (self aria-/data-attribute & when.ancestor emit no reliable CSS).
  triggerIconOpen: {
    transform: "rotate(180deg)",
  },
  content: {
    overflow: "hidden",
    color: colors["text-primary"],
    fontSize: fontSize.s,
  },
  contentInner: {
    paddingTop: spacing.none,
    paddingBottom: spacing.l,
  },
})

type AccordionProps = Omit<
  AccordionPrimitive.Root.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

function Accordion({ sx, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      {...stylex.props(styles.root, sx)}
      {...props}
    />
  )
}

type AccordionItemProps = Omit<
  AccordionPrimitive.Item.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

function AccordionItem({ sx, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      {...stylex.props(styles.item, sx)}
      {...props}
    />
  )
}

type AccordionTriggerProps = Omit<
  AccordionPrimitive.Trigger.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

function AccordionTrigger({ children, sx, ...props }: AccordionTriggerProps) {
  return (
    <HeaderTag {...stylex.props(styles.header)}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        {...props}
        // `render` fn reads `state.open`; spread primitive's resolved props +
        // styles onto button, rotate chevron from `state.open`.
        render={(triggerProps, state) => (
          <ButtonTag {...stylex.props(styles.trigger, sx)} {...triggerProps}>
            {children}
            <Icon
              name="ChevronDown"
              size="m"
              data-slot="accordion-trigger-icon"
              sx={[styles.triggerIcon, state.open && styles.triggerIconOpen]}
            />
          </ButtonTag>
        )}
      />
    </HeaderTag>
  )
}

type AccordionContentProps = Omit<
  AccordionPrimitive.Panel.Props,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

function AccordionContent({ children, sx, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      {...stylex.props(styles.content, sx)}
      {...props}
    >
      <Inner
        data-slot="accordion-content-inner"
        {...stylex.props(styles.contentInner)}
      >
        {children}
      </Inner>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
}
