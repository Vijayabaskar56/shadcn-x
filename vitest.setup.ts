import "@testing-library/jest-dom/vitest"

// jsdom omits a couple of browser APIs that overlay libraries rely on at mount
// (cmdk → ResizeObserver, vaul → window.matchMedia). Stub them so the component
// test suite runs under jsdom.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver =
  ResizeObserverStub as unknown as typeof ResizeObserver

if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

if (typeof window !== "undefined") {
  window.scrollTo = () => {}
}

// jsdom has no layout, so scroll/pointer-capture APIs are absent — cmdk scrolls
// the active item into view, vaul captures the pointer while dragging. Stub them
// so overlay tests don't throw on mount/interaction.
if (typeof Element !== "undefined") {
  const proto = Element.prototype as unknown as Record<string, unknown>
  proto.scrollIntoView ??= function () {}
  proto.scrollIntoViewIfNeeded ??= function () {}
  proto.setPointerCapture ??= function () {}
  proto.releasePointerCapture ??= function () {}
  proto.hasPointerCapture ??= function () {
    return false
  }
}
