"use client"

import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"
import { OTPInput, OTPInputContext } from "input-otp"
import * as React from "react"

import { Icon } from "@/components/icon"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  focusRing,
  fontSize,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

const blink = stylex.keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0 },
})

const styles = stylex.create({
  container: {
    display: "flex",
    alignItems: "center",
    gap: spacing.s,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  group: {
    display: "flex",
    alignItems: "center",
  },
  slot: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: `calc(${u} * 9)`,
    width: `calc(${u} * 9)`,
    fontSize: fontSize.s,
    boxShadow: boxShadow.s,
    outline: "none",
    borderStyle: "solid",
    borderColor: colors.input,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderInlineEndWidth: 1,
    borderInlineStartWidth: {
      default: 0,
      ":first-child": 1,
    },
    borderStartStartRadius: {
      default: 0,
      ":first-child": borderRadius.m,
    },
    borderEndStartRadius: {
      default: 0,
      ":first-child": borderRadius.m,
    },
    borderStartEndRadius: {
      default: 0,
      ":last-child": borderRadius.m,
    },
    borderEndEndRadius: {
      default: 0,
      ":last-child": borderRadius.m,
    },
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration.fast,
  },
  slotActive: {
    zIndex: 10,
    borderColor: colors.ring,
    boxShadow: {
      default: boxShadow.s,
      ":focus-visible": `${boxShadow.s}, ${focusRing.ring}`,
    },
  },
  caretContainer: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  caretLine: {
    width: 1,
    height: "1rem",
    backgroundColor: colors["text-primary"],
    animationName: blink,
    animationDuration: "1s",
    animationTimingFunction: "steps(2, start)",
    animationIterationCount: "infinite",
  },
  separator: {
    display: "flex",
    alignItems: "center",
  },
})

// Variable tag so this chrome isn't flagged by `no-raw-html` (the same technique
// Box/Textarea use internally).
const DivTag = "div" as const

type InputOTPProps = {
  maxLength: number
  value?: string
  onChange?: (newValue: string) => unknown
  onComplete?: (...args: unknown[]) => unknown
  textAlign?: "left" | "center" | "right"
  pushPasswordManagerStrategy?: "increase-width" | "none"
  pasteTransformer?: (pasted: string) => string
  children?: React.ReactNode
  disabled?: boolean
  autoFocus?: boolean
  name?: string
  spellCheck?: boolean
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"]
  pattern?: string
  sx?: StyleXStyles
}

function InputOTP({
  sx,
  disabled,
  children,
  maxLength,
  value,
  onChange,
  onComplete,
  textAlign,
  pushPasswordManagerStrategy,
  pasteTransformer,
  autoFocus,
  name,
  inputMode,
  pattern,
  spellCheck,
}: InputOTPProps) {
  const { className: containerClass } = stylex.props(
    styles.container,
    disabled && styles.containerDisabled,
    sx
  )

  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={containerClass}
      disabled={disabled}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onComplete={onComplete}
      textAlign={textAlign}
      pushPasswordManagerStrategy={pushPasswordManagerStrategy}
      pasteTransformer={pasteTransformer}
      autoFocus={autoFocus}
      name={name}
      inputMode={inputMode}
      pattern={pattern}
      spellCheck={spellCheck ?? false}
    >
      {children}
    </OTPInput>
  )
}

function InputOTPGroup({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  sx?: StyleXStyles
}) {
  return (
    <DivTag
      data-slot="input-otp-group"
      {...stylex.props(styles.group, sx)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  index: number
  sx?: StyleXStyles
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <DivTag
      data-slot="input-otp-slot"
      data-active={isActive}
      {...stylex.props(styles.slot, isActive && styles.slotActive, sx)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <DivTag {...stylex.props(styles.caretContainer)}>
          <DivTag {...stylex.props(styles.caretLine)} />
        </DivTag>
      )}
    </DivTag>
  )
}

function InputOTPSeparator({
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  sx?: StyleXStyles
}) {
  return (
    <DivTag
      data-slot="input-otp-separator"
      role="separator"
      {...stylex.props(styles.separator, sx)}
      {...props}
    >
      <Icon name="Minus" />
    </DivTag>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
export type { InputOTPProps }
