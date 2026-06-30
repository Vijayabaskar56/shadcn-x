import * as stylex from "@stylexjs/stylex"

// Shared group edge-flattening — applied by every on-system item that sits
// flush inside a <ButtonGroup> (Button, ButtonGroupText). The item reads its
// ancestor group's `data-orientation` (via stylex.when.ancestor + the group's
// defaultMarker) and zeroes its adjacent corner radii + collapses the doubled
// border on its inner edge, so adjacent items read as one control.
//
// The focus-raise rule (position/z-index) is NOT here: it differs per item
// (a Button raises on `:focus-visible`; a non-focusable text chip raises on
// `:focus-within`), so each consumer keeps its own. Centralizing only the
// genuinely-identical edge math closes the drift (see ADR/audit A2).
export const groupItemEdges = stylex.create({
  base: {
    borderStartStartRadius: {
      default: null,
      [stylex.when.ancestor('[data-orientation="horizontal"]')]: {
        default: null,
        ":not(:first-child)": 0,
      },
      [stylex.when.ancestor('[data-orientation="vertical"]')]: {
        default: null,
        ":not(:first-child)": 0,
      },
    },
    borderStartEndRadius: {
      default: null,
      [stylex.when.ancestor('[data-orientation="horizontal"]')]: {
        default: null,
        ":not(:last-child)": 0,
      },
      [stylex.when.ancestor('[data-orientation="vertical"]')]: {
        default: null,
        ":not(:first-child)": 0,
      },
    },
    borderEndStartRadius: {
      default: null,
      [stylex.when.ancestor('[data-orientation="horizontal"]')]: {
        default: null,
        ":not(:first-child)": 0,
      },
      [stylex.when.ancestor('[data-orientation="vertical"]')]: {
        default: null,
        ":not(:last-child)": 0,
      },
    },
    borderEndEndRadius: {
      default: null,
      [stylex.when.ancestor('[data-orientation="horizontal"]')]: {
        default: null,
        ":not(:last-child)": 0,
      },
      [stylex.when.ancestor('[data-orientation="vertical"]')]: {
        default: null,
        ":not(:last-child)": 0,
      },
    },
    borderInlineStartWidth: {
      default: null,
      [stylex.when.ancestor('[data-orientation="horizontal"]')]: {
        default: null,
        ":not(:first-child)": 0,
      },
    },
    borderBlockStartWidth: {
      default: null,
      [stylex.when.ancestor('[data-orientation="vertical"]')]: {
        default: null,
        ":not(:first-child)": 0,
      },
    },
  },
}).base
