import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/field"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

describe("Field", () => {
  it("renders with data-slot attribute", () => {
    render(<Field data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveAttribute("data-slot", "field")
  })

  it("renders with role group", () => {
    render(<Field data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveAttribute("role", "group")
  })

  it("defaults to vertical orientation", () => {
    render(<Field data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveAttribute(
      "data-orientation",
      "vertical"
    )
  })

  it("accepts horizontal orientation", () => {
    render(<Field orientation="horizontal" data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveAttribute(
      "data-orientation",
      "horizontal"
    )
  })

  it("accepts responsive orientation", () => {
    render(<Field orientation="responsive" data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveAttribute(
      "data-orientation",
      "responsive"
    )
  })

  it("sets data-disabled='true' when disabled (drives descendant Label dimming)", () => {
    render(<Field disabled data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveAttribute("data-disabled", "true")
  })

  it("omits data-disabled when enabled", () => {
    render(<Field data-testid="field" />)
    expect(screen.getByTestId("field")).not.toHaveAttribute("data-disabled")
  })

  it("accepts a typed sx prop", () => {
    render(<Field data-testid="field" sx={sx.custom} />)
    expect(screen.getByTestId("field").className).not.toBe("")
  })
})

describe("FieldSet", () => {
  it("renders a fieldset with data-slot", () => {
    render(<FieldSet data-testid="fs" />)
    const el = screen.getByTestId("fs")
    expect(el.tagName).toBe("FIELDSET")
    expect(el).toHaveAttribute("data-slot", "field-set")
  })

  it("wires disabled: native disabled + data-disabled='true' marker", () => {
    render(<FieldSet disabled data-testid="fs" />)
    const el = screen.getByTestId("fs")
    expect(el).toBeDisabled()
    expect(el).toHaveAttribute("data-disabled", "true")
  })

  it("omits data-disabled when enabled", () => {
    render(<FieldSet data-testid="fs" />)
    expect(screen.getByTestId("fs")).not.toHaveAttribute("data-disabled")
  })
})

describe("FieldLegend", () => {
  it("renders a legend with data-slot", () => {
    render(<FieldLegend data-testid="fl">Title</FieldLegend>)
    const el = screen.getByTestId("fl")
    expect(el.tagName).toBe("LEGEND")
    expect(el).toHaveAttribute("data-slot", "field-legend")
  })

  it("renders children", () => {
    render(<FieldLegend>My Legend</FieldLegend>)
    expect(screen.getByText("My Legend")).toBeInTheDocument()
  })

  it("defaults to data-variant legend", () => {
    render(<FieldLegend data-testid="fl">Title</FieldLegend>)
    expect(screen.getByTestId("fl")).toHaveAttribute("data-variant", "legend")
  })

  it("sets data-variant from the variant prop", () => {
    render(
      <FieldLegend variant="label" data-testid="fl">
        Title
      </FieldLegend>
    )
    expect(screen.getByTestId("fl")).toHaveAttribute("data-variant", "label")
  })
})

describe("FieldGroup", () => {
  it("renders with data-slot", () => {
    render(<FieldGroup data-testid="fg" />)
    expect(screen.getByTestId("fg")).toHaveAttribute("data-slot", "field-group")
  })
})

describe("FieldContent", () => {
  it("renders with data-slot", () => {
    render(<FieldContent data-testid="fc" />)
    expect(screen.getByTestId("fc")).toHaveAttribute(
      "data-slot",
      "field-content"
    )
  })
})

describe("FieldLabel", () => {
  it("renders a label with data-slot", () => {
    render(<FieldLabel data-testid="fl">Name</FieldLabel>)
    const el = screen.getByTestId("fl")
    expect(el.tagName).toBe("LABEL")
    expect(el).toHaveAttribute("data-slot", "field-label")
  })

  it("renders children", () => {
    render(<FieldLabel>Email</FieldLabel>)
    expect(screen.getByText("Email")).toBeInTheDocument()
  })
})

describe("FieldTitle", () => {
  it("renders with data-slot field-label (matches reference)", () => {
    render(<FieldTitle data-testid="ft" />)
    expect(screen.getByTestId("ft")).toHaveAttribute("data-slot", "field-label")
  })
})

describe("FieldDescription", () => {
  it("renders a paragraph with data-slot", () => {
    render(<FieldDescription data-testid="fd" />)
    const el = screen.getByTestId("fd")
    expect(el.tagName).toBe("P")
    expect(el).toHaveAttribute("data-slot", "field-description")
  })

  it("renders children", () => {
    render(<FieldDescription>Help text</FieldDescription>)
    expect(screen.getByText("Help text")).toBeInTheDocument()
  })
})

describe("FieldSeparator", () => {
  it("renders with data-slot", () => {
    render(<FieldSeparator data-testid="fs" />)
    expect(screen.getByTestId("fs")).toHaveAttribute(
      "data-slot",
      "field-separator"
    )
  })

  it("renders children as separator content", () => {
    render(<FieldSeparator>or</FieldSeparator>)
    expect(screen.getByText("or")).toBeInTheDocument()
  })

  it("sets data-content false without children", () => {
    render(<FieldSeparator data-testid="fs" />)
    expect(screen.getByTestId("fs")).toHaveAttribute("data-content", "false")
  })

  it("sets data-content true with children", () => {
    render(<FieldSeparator data-testid="fs">or</FieldSeparator>)
    expect(screen.getByTestId("fs")).toHaveAttribute("data-content", "true")
  })
})

describe("FieldError", () => {
  it("renders nothing without children or errors", () => {
    const { container } = render(<FieldError />)
    expect(container.innerHTML).toBe("")
  })

  it("renders children when provided", () => {
    render(<FieldError>Required</FieldError>)
    expect(screen.getByText("Required")).toBeInTheDocument()
  })

  it("renders role alert", () => {
    render(<FieldError>Error</FieldError>)
    expect(screen.getByText("Error")).toHaveAttribute("role", "alert")
  })

  it("renders a single error message from errors array", () => {
    render(<FieldError errors={[{ message: "Field is required" }]} />)
    expect(screen.getByText("Field is required")).toBeInTheDocument()
  })

  it("renders multiple errors as a list", () => {
    render(
      <FieldError
        errors={[{ message: "Required" }, { message: "Too short" }]}
      />
    )
    expect(screen.getByText("Required")).toBeInTheDocument()
    expect(screen.getByText("Too short")).toBeInTheDocument()
  })

  it("deduplicates errors by message", () => {
    render(
      <FieldError errors={[{ message: "Required" }, { message: "Required" }]} />
    )
    expect(screen.getAllByText("Required")).toHaveLength(1)
  })
})
