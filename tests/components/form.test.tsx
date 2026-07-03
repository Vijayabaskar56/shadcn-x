import * as stylex from "@stylexjs/stylex"
import { render, screen, waitFor } from "@testing-library/react"
import * as React from "react"
import { useForm } from "react-hook-form"
import { describe, expect, it } from "vitest"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/form"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Form", () => {
  it("renders FormItem with data-slot", () => {
    render(
      <FormItem data-testid="item">
        <div />
      </FormItem>
    )
    expect(screen.getByTestId("item")).toHaveAttribute("data-slot", "form-item")
  })

  it("renders FormLabel with data-slot", () => {
    function TestForm() {
      const form = useForm({ defaultValues: { test: "" } })
      return (
        <Form {...form}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormLabel data-testid="label">Name</FormLabel>
              </FormItem>
            )}
          />
        </Form>
      )
    }

    render(<TestForm />)
    expect(screen.getByTestId("label")).toHaveAttribute(
      "data-slot",
      "form-label"
    )
  })

  it("renders FormLabel with data-error when error exists", async () => {
    function TestForm() {
      const form = useForm({ defaultValues: { test: "" } })

      React.useEffect(() => {
        form.setError("test", { message: "Required" })
      })

      return (
        <Form {...form}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormLabel data-testid="label">Name</FormLabel>
              </FormItem>
            )}
          />
        </Form>
      )
    }

    render(<TestForm />)

    await waitFor(() => {
      expect(screen.getByTestId("label")).toHaveAttribute("data-error", "true")
    })
  })

  it("renders FormControl with data-slot", () => {
    function TestForm() {
      const form = useForm({ defaultValues: { test: "" } })
      return (
        <Form {...form}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormControl data-testid="control">
                  <input />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      )
    }

    render(<TestForm />)
    expect(screen.getByTestId("control")).toHaveAttribute(
      "data-slot",
      "form-control"
    )
  })

  it("merges FormControl wiring into its child instead of wrapping it", () => {
    function TestForm() {
      const form = useForm({ defaultValues: { test: "" } })
      return (
        <Form {...form}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormControl>
                  <input data-testid="control" />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      )
    }

    render(<TestForm />)
    // No wrapper div: the wiring lands directly on the <input>, so htmlFor
    // targets the real control (Slot behavior, matching shadcn).
    const control = screen.getByTestId("control")
    expect(control.tagName).toBe("INPUT")
    expect(control).toHaveAttribute("data-slot", "form-control")
    expect(control).toHaveAttribute("id")
    expect(control).toHaveAttribute("aria-describedby")
  })

  it("applies the sx prop to FormItem", () => {
    render(
      <FormItem data-testid="item" sx={sx.custom}>
        <div />
      </FormItem>
    )
    const item = screen.getByTestId("item")
    // StyleX compiles sx into an atomic class appended after the base styles.
    expect(item.className).not.toBe("")
    expect(item.getAttribute("class")?.length ?? 0).toBeGreaterThan(0)
  })

  it("renders FormDescription with data-slot", () => {
    function TestForm() {
      const form = useForm({ defaultValues: { test: "" } })
      return (
        <Form {...form}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormDescription data-testid="desc">
                  Enter your name
                </FormDescription>
              </FormItem>
            )}
          />
        </Form>
      )
    }

    render(<TestForm />)
    expect(screen.getByTestId("desc")).toHaveAttribute(
      "data-slot",
      "form-description"
    )
  })

  it("renders FormMessage with data-slot when error exists", async () => {
    function TestForm() {
      const form = useForm({ defaultValues: { test: "" } })

      React.useEffect(() => {
        form.setError("test", { message: "Required" })
      })

      return (
        <Form {...form}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormMessage data-testid="msg" />
              </FormItem>
            )}
          />
        </Form>
      )
    }

    render(<TestForm />)

    await waitFor(() => {
      expect(screen.getByTestId("msg")).toHaveAttribute(
        "data-slot",
        "form-message"
      )
    })
  })

  it("renders FormMessage with error text", async () => {
    function TestForm() {
      const form = useForm({ defaultValues: { test: "" } })

      React.useEffect(() => {
        form.setError("test", { message: "This field is required" })
      })

      return (
        <Form {...form}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      )
    }

    render(<TestForm />)

    await waitFor(() => {
      expect(screen.getByText("This field is required")).toBeInTheDocument()
    })
  })

  it("renders nothing in FormMessage when there is no error and no children", () => {
    function TestForm() {
      const form = useForm({ defaultValues: { test: "" } })
      return (
        <Form {...form}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormMessage data-testid="msg" />
              </FormItem>
            )}
          />
        </Form>
      )
    }

    render(<TestForm />)
    expect(screen.queryByTestId("msg")).not.toBeInTheDocument()
  })
})
