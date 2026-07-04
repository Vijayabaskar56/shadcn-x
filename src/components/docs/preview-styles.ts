import * as stylex from "@stylexjs/stylex"

// Live-preview styles imported by content/docs/*.mdx. StyleX must be compiled
// by the unplugin, which only transforms JS/TS modules — `stylex.create` calls
// written inline in an .mdx file survive to runtime and throw. Docs that need
// bespoke preview sizing import their styles from here instead.

/** content/docs/resizable.mdx */
export const resizablePreviewStyles = stylex.create({
  frame: {
    width: "100%",
    height: "14rem",
  },
  compactFrame: {
    width: "100%",
    height: "10rem",
  },
  panel: {
    height: "100%",
  },
})

/** content/docs/scroll-area.mdx */
export const scrollAreaPreviewStyles = stylex.create({
  demo: {
    height: "12rem",
    width: "100%",
  },
  horizontal: {
    width: "100%",
  },
  row: {
    width: "36rem",
  },
})
