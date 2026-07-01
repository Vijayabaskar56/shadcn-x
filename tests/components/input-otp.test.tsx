import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it, vi } from "vitest"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/input-otp"

beforeAll(() => {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
  if (typeof document.elementFromPoint !== "function") {
    document.elementFromPoint = () => null
  }
})

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("InputOTP", () => {
  it("renders without error", () => {
    const { container } = render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    )
    expect(
      container.querySelector('[data-slot="input-otp-group"]')
    ).toBeInTheDocument()
  })

  it("renders a hidden textbox for input", () => {
    render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
      </InputOTP>
    )
    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
  })

  it("responds to user typing", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <InputOTP maxLength={4} onChange={onChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    )
    const input = screen.getByRole("textbox")
    await user.type(input, "1234")
    expect(onChange).toHaveBeenCalled()
  })

  it("accepts a typed sx prop", () => {
    const { container } = render(
      <InputOTP maxLength={4} sx={sx.custom}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
      </InputOTP>
    )
    expect(
      container.querySelector('[data-slot="input-otp-group"]')
    ).toBeInTheDocument()
  })
})

describe("InputOTPGroup", () => {
  it("renders with data-slot", () => {
    render(
      <InputOTP maxLength={1}>
        <InputOTPGroup data-testid="group">
          <InputOTPSlot index={0} />
        </InputOTPGroup>
      </InputOTP>
    )
    expect(screen.getByTestId("group")).toHaveAttribute(
      "data-slot",
      "input-otp-group"
    )
  })
})

describe("InputOTPSlot", () => {
  it("renders with data-slot", () => {
    render(
      <InputOTP maxLength={1}>
        <InputOTPGroup>
          <InputOTPSlot index={0} data-testid="slot" />
        </InputOTPGroup>
      </InputOTP>
    )
    expect(screen.getByTestId("slot")).toHaveAttribute(
      "data-slot",
      "input-otp-slot"
    )
  })
})

describe("InputOTPSeparator", () => {
  it("renders a separator", () => {
    render(
      <InputOTP maxLength={2}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
        <InputOTPSeparator data-testid="sep" />
        <InputOTPGroup>
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )
    expect(screen.getByTestId("sep")).toHaveAttribute(
      "data-slot",
      "input-otp-separator"
    )
  })

  it("has role separator", () => {
    render(
      <InputOTP maxLength={2}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
        <InputOTPSeparator data-testid="sep" />
        <InputOTPGroup>
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )
    expect(screen.getByTestId("sep")).toHaveAttribute("role", "separator")
  })
})
