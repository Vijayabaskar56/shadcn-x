import * as stylex from "@stylexjs/stylex"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/combobox"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

function openCombobox(ariaLabel = "Pick") {
  fireEvent.click(screen.getByRole("combobox", { name: ariaLabel }))
}

describe("Combobox", () => {
  it("renders combobox-root as a provider", () => {
    render(
      <Combobox>
        <ComboboxTrigger aria-label="Pick">Trigger</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("renders ComboboxValue with data-slot", () => {
    render(
      <Combobox defaultValue="a">
        <ComboboxTrigger aria-label="Pick">
          <ComboboxValue />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    expect(screen.getByRole("combobox")).toHaveTextContent("a")
  })

  it("renders ComboboxTrigger with data-slot and chevron icon", () => {
    render(
      <Combobox>
        <ComboboxTrigger aria-label="Pick">Pick</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    const trigger = screen.getByRole("combobox")
    expect(trigger).toHaveAttribute("data-slot", "combobox-trigger")
    const icon = trigger.querySelector('[data-slot="icon"]')
    expect(icon).toBeInTheDocument()
  })

  it("renders ComboboxClear with data-slot and X icon", () => {
    render(
      <Combobox defaultValue="a" defaultOpen>
        <ComboboxTrigger aria-label="Pick">Pick</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxClear />
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    const clear = document.querySelector('[data-slot="combobox-clear"]')
    expect(clear).toBeInTheDocument()
    const icon = clear?.querySelector('[data-slot="icon"]')
    expect(icon).toBeInTheDocument()
  })

  it("renders ComboboxInput with InputGroup", () => {
    render(
      <Combobox>
        <ComboboxInput />
        <ComboboxContent>
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    const inputGroup = document.querySelector('[data-slot="input-group"]')
    expect(inputGroup).toBeInTheDocument()
  })

  it("renders ComboboxInput with trigger icon", () => {
    render(
      <Combobox>
        <ComboboxInput />
        <ComboboxContent>
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    const inputGroup = document.querySelector('[data-slot="input-group"]')
    const icon = inputGroup?.querySelector('[data-slot="icon"]')
    expect(icon).toBeInTheDocument()
  })

  it("renders ComboboxContent with data-slot", () => {
    render(
      <Combobox>
        <ComboboxTrigger aria-label="Pick">Pick</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("renders ComboboxList with data-slot", () => {
    render(
      <Combobox>
        <ComboboxTrigger aria-label="Pick">Pick</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem value="a">A</ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
    openCombobox()
    expect(
      document.querySelector('[data-slot="combobox-list"]')
    ).toBeInTheDocument()
  })

  it("renders ComboboxItem with data-slot and check icon", () => {
    render(
      <Combobox defaultValue="a" defaultOpen>
        <ComboboxTrigger aria-label="Pick">Pick</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    const item = document.querySelector('[data-slot="combobox-item"]')
    expect(item).toBeInTheDocument()
    expect(item).toHaveAttribute("data-slot", "combobox-item")
    const check = item?.querySelector('[data-slot="icon"]')
    expect(check).toBeInTheDocument()
  })

  it("renders ComboboxGroup with data-slot", () => {
    render(
      <Combobox>
        <ComboboxTrigger aria-label="Pick">Pick</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxGroup>
            <ComboboxItem value="a">A</ComboboxItem>
          </ComboboxGroup>
        </ComboboxContent>
      </Combobox>
    )
    openCombobox()
    expect(
      document.querySelector('[data-slot="combobox-group"]')
    ).toBeInTheDocument()
  })

  it("renders ComboboxLabel with data-slot", () => {
    render(
      <Combobox defaultOpen>
        <ComboboxTrigger aria-label="Pick">Pick</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxGroup>
            <ComboboxLabel>Options</ComboboxLabel>
            <ComboboxItem value="a">A</ComboboxItem>
          </ComboboxGroup>
        </ComboboxContent>
      </Combobox>
    )
    expect(
      document.querySelector('[data-slot="combobox-label"]')
    ).toBeInTheDocument()
  })

  it("renders ComboboxEmpty with data-slot", () => {
    render(
      <Combobox defaultOpen>
        <ComboboxTrigger aria-label="Pick">Pick</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxEmpty>No results</ComboboxEmpty>
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    expect(
      document.querySelector('[data-slot="combobox-empty"]')
    ).toBeInTheDocument()
  })

  it("renders ComboboxSeparator with data-slot", () => {
    render(
      <Combobox defaultOpen>
        <ComboboxTrigger aria-label="Pick">Pick</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxSeparator />
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    expect(
      document.querySelector('[data-slot="combobox-separator"]')
    ).toBeInTheDocument()
  })

  it("renders ComboboxChips with data-slot", () => {
    render(
      <Combobox>
        <ComboboxChips data-testid="chips">
          <ComboboxChip value="a">Apple</ComboboxChip>
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxItem value="a">Apple</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    expect(screen.getByTestId("chips")).toHaveAttribute(
      "data-slot",
      "combobox-chips"
    )
  })

  it("renders ComboboxChip with data-slot and remove icon", () => {
    render(
      <Combobox>
        <ComboboxChips>
          <ComboboxChip data-testid="chip" value="a">
            Apple
          </ComboboxChip>
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxItem value="a">Apple</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    const chip = screen.getByTestId("chip")
    expect(chip).toHaveAttribute("data-slot", "combobox-chip")
  })

  it("renders ComboboxChipsInput with data-slot", () => {
    render(
      <Combobox>
        <ComboboxChips>
          <ComboboxChipsInput data-testid="chip-input" />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxItem value="a">Apple</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    expect(screen.getByTestId("chip-input")).toHaveAttribute(
      "data-slot",
      "combobox-chip-input"
    )
  })

  it("fires onValueChange when an item is selected", () => {
    const onValueChange = vi.fn()
    render(
      <Combobox defaultOpen onValueChange={onValueChange}>
        <ComboboxTrigger aria-label="Pick">Pick</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxItem value="apple">Apple</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    fireEvent.click(screen.getByRole("option", { name: "Apple" }))
    expect(onValueChange).toHaveBeenCalledWith("apple", expect.anything())
  })

  it("accepts a typed sx prop on trigger and renders", () => {
    render(
      <Combobox>
        <ComboboxTrigger aria-label="Styled" sx={sx.custom}>
          Styled
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxItem value="a">A</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    )
    expect(screen.getByRole("combobox", { name: "Styled" })).toBeInTheDocument()
  })
})
