import * as stylex from "@stylexjs/stylex"

// stylex.create in .mdx survives to runtime (unplugin only transforms JS/TS);
// docs needing bespoke preview sizing import styles from here.

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
