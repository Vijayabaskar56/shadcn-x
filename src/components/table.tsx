import type { StyleXStyles } from "@stylexjs/stylex"

import * as stylex from "@stylexjs/stylex"

import { Box } from "@/components/box"
import { ScrollArea } from "@/components/scroll-area"

import {
  colors,
  duration,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

const u = spacing["--spacing"]

// Ported from shadcn's table. shadcn leans on descendant selectors
// ([&_tr:last-child]:border-0, [&_tr]:border-b); the on-system equivalent is
// stylex.when.ancestor + a marker — the section (tbody/tfoot) carries the
// marker, and TableRow reacts. The checkbox pseudo-rules ([&:has([role=checkbox])])
// are omitted until a Checkbox primitive exists.
const styles = stylex.create({
  table: {
    width: "100%", // w-full
    captionSide: "bottom", // caption-bottom
    fontSize: fontSize.s, // text-sm
    borderCollapse: "collapse",
  },

  // Footer: a tinted, medium-weight summary row.
  footer: {
    borderTopWidth: 1, // border-t
    borderTopStyle: "solid",
    borderTopColor: colors["border-primary"],
    backgroundColor: `color-mix(in oklch, ${colors["background-muted"]}, transparent 50%)`, // bg-muted/50
    fontWeight: fontWeight.medium, // font-medium
  },

  row: {
    borderBottomStyle: "solid", // border-b
    borderBottomColor: colors["border-primary"],
    transitionProperty: "background-color", // transition-colors
    transitionDuration: duration.fast,
    backgroundColor: {
      default: null,
      ":hover": `color-mix(in oklch, ${colors["background-muted"]}, transparent 50%)`, // hover:bg-muted/50
    },
    // border-b on every row, DROPPED on the last row of a body/footer section so
    // the table doesn't end on a doubled line (shadcn's
    // [&_tr:last-child]:border-0). The section carries a marker + data-slot; the
    // row observes it via stylex.when.ancestor and zeroes its border when last.
    borderBottomWidth: {
      default: 1,
      [stylex.when.ancestor('[data-slot="table-body"]')]: {
        default: 1,
        ":last-child": 0,
      },
      [stylex.when.ancestor('[data-slot="table-footer"]')]: {
        default: 1,
        ":last-child": 0,
      },
    },
  },

  head: {
    height: `calc(${u} * 10)`, // h-10
    paddingInline: spacing.s, // px-2
    textAlign: "start",
    verticalAlign: "middle", // align-middle
    fontWeight: fontWeight.medium, // font-medium
    whiteSpace: "nowrap", // whitespace-nowrap
    color: colors["text-primary"], // text-foreground
  },

  cell: {
    padding: spacing.s, // p-2
    verticalAlign: "middle", // align-middle
    whiteSpace: "nowrap", // whitespace-nowrap
  },

  caption: {
    marginTop: spacing.l, // mt-4
    fontSize: fontSize.s, // text-sm
    color: colors["muted-foreground"], // text-muted-foreground
  },
})

// Variable tags so the primitive that *defines* the on-system elements isn't
// flagged by its own `no-raw-html` rule.
const TableTag = "table" as const
const HeaderTag = "thead" as const
const BodyTag = "tbody" as const
const FooterTag = "tfoot" as const
const RowTag = "tr" as const
const HeadCellTag = "th" as const
const DataCellTag = "td" as const
const CaptionTag = "caption" as const

type TableComponentProps<E extends keyof React.JSX.IntrinsicElements> = Omit<
  React.ComponentPropsWithoutRef<E>,
  "className" | "style" | "color"
> & {
  sx?: StyleXStyles
}

export type TableProps = TableComponentProps<"table">
export type TableHeaderProps = TableComponentProps<"thead">
export type TableBodyProps = TableComponentProps<"tbody">
export type TableFooterProps = TableComponentProps<"tfoot">
export type TableRowProps = TableComponentProps<"tr">
export type TableHeadProps = TableComponentProps<"th">
export type TableCellProps = TableComponentProps<"td">
export type TableCaptionProps = TableComponentProps<"caption">

function Table({ sx, ...props }: TableProps) {
  return (
    // shadcn wraps <table> in a relative, full-width, horizontally-scrollable
    // container so wide tables pan instead of overflowing the page. ScrollArea
    // provides the styled horizontal scroll surface.
    <Box as="div" width="full" position="relative" data-slot="table-container">
      <ScrollArea>
        <TableTag
          data-slot="table"
          {...stylex.props(styles.table, sx)}
          {...props}
        />
      </ScrollArea>
    </Box>
  )
}

function TableHeader({ sx, ...props }: TableHeaderProps) {
  return <HeaderTag data-slot="table-header" {...stylex.props(sx)} {...props} />
}

function TableBody({ sx, ...props }: TableBodyProps) {
  return (
    <BodyTag
      data-slot="table-body"
      // defaultMarker lets a <TableRow> observe this section via
      // stylex.when.ancestor (last-row border drop).
      {...stylex.props(stylex.defaultMarker(), sx)}
      {...props}
    />
  )
}

function TableFooter({ sx, ...props }: TableFooterProps) {
  return (
    <FooterTag
      data-slot="table-footer"
      {...stylex.props(styles.footer, stylex.defaultMarker(), sx)}
      {...props}
    />
  )
}

function TableRow({ sx, ...props }: TableRowProps) {
  return (
    <RowTag
      data-slot="table-row"
      {...stylex.props(styles.row, sx)}
      {...props}
    />
  )
}

function TableHead({ sx, ...props }: TableHeadProps) {
  return (
    <HeadCellTag
      data-slot="table-head"
      {...stylex.props(styles.head, sx)}
      {...props}
    />
  )
}

function TableCell({ sx, ...props }: TableCellProps) {
  return (
    <DataCellTag
      data-slot="table-cell"
      {...stylex.props(styles.cell, sx)}
      {...props}
    />
  )
}

function TableCaption({ sx, ...props }: TableCaptionProps) {
  return (
    <CaptionTag
      data-slot="table-caption"
      {...stylex.props(styles.caption, sx)}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}
