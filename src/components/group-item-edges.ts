import * as stylex from "@stylexjs/stylex"

// Shared edge-flattening: item reads ancestor's data-orientation via when.ancestor + defaultMarker; zeroes adjacent radii, collapses doubled border. Focus-raise per consumer.
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
