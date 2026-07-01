import * as stylex from "@stylexjs/stylex"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/resizable"

const sx = stylex.create({
  custom: { opacity: 0.5 },
})

function ExampleResizable() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>One</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>Two</ResizablePanel>
    </ResizablePanelGroup>
  )
}

describe("Resizable", () => {
  it("renders the shadcn slots with data-slot attributes", () => {
    const { container } = render(<ExampleResizable />)

    expect(
      container.querySelector('[data-slot="resizable-panel-group"]')
    ).toBeInTheDocument()
    expect(
      container.querySelectorAll('[data-slot="resizable-panel"]')
    ).toHaveLength(2)
    expect(
      container.querySelector('[data-slot="resizable-handle"]')
    ).toBeInTheDocument()
  })

  it("forwards panel sizing props", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          id="left-panel"
          defaultSize={35}
          minSize={20}
          maxSize={80}
        >
          Left
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={65}>Right</ResizablePanel>
      </ResizablePanelGroup>
    )

    expect(screen.getByTestId("left-panel")).toHaveAttribute("id", "left-panel")
    expect(screen.getByText("Left")).toBeInTheDocument()
  })

  it("marks vertical groups for orientation-aware styling", () => {
    const { container } = render(
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={50}>Top</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>Bottom</ResizablePanel>
      </ResizablePanelGroup>
    )

    expect(
      container.querySelector('[data-slot="resizable-panel-group"]')
    ).toHaveAttribute("data-orientation", "vertical")
  })

  it("renders the optional handle grip", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>One</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>Two</ResizablePanel>
      </ResizablePanelGroup>
    )

    expect(
      container.querySelector('[data-slot="resizable-handle-grip"]')
    ).toBeInTheDocument()
    expect(container.querySelector('[data-slot="icon"]')).toBeInTheDocument()
  })

  it("accepts typed sx props on styleable slots", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal" sx={sx.custom}>
        <ResizablePanel defaultSize={50}>One</ResizablePanel>
        <ResizableHandle sx={sx.custom} />
        <ResizablePanel defaultSize={50}>Two</ResizablePanel>
      </ResizablePanelGroup>
    )

    expect(
      container.querySelector('[data-slot="resizable-panel-group"]')?.className
    ).not.toBe("")
    expect(
      container.querySelector('[data-slot="resizable-handle"]')?.className
    ).not.toBe("")
  })
})
