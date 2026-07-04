/**
 * Element coverage — the single source of truth for "which raw HTML host tag
 * does which shadcn-x primitive retire" (ADR-0003), and for which tags `Box`
 * still accepts via `as=`.
 *
 * Consumed by:
 * - `src/lint/rules/no-raw-html.ts` — every entry with a `primitive` becomes a
 *   banned tag (the rule's default `elements` map);
 * - `src/components/box.tsx` — entries carrying `boxAllowed` form the
 *   `AllowedElement` union for Box's `as=` prop.
 *
 * The list is curated, not exhaustive: we ban only the host elements a
 * primitive already replaces, so raw HTML shrinks toward zero as primitives
 * ship. Elements with no primitive yet (e.g. `video`) are intentionally absent
 * and stay allowed until their primitive lands.
 *
 * Keep this module dependency-free (pure data): it is imported both by app
 * code (box.tsx) and by the lint plugin, which oxlint loads via Node ESM and
 * ESLint via `eslintCompatPlugin` (ADR-0001).
 */

/**
 * Why Box's `as=` still permits a tag even though the guardrail may ban the
 * raw element. Every value is a deliberate, documented exception:
 *
 * - `box-is-the-primitive` — the tag's retiring primitive IS Box, so
 *   `<Box as="...">` is exactly the on-system spelling.
 * - `no-primitive-yet` — nothing retires the tag yet (it is not banned
 *   either); Box is the only on-system way to render it.
 * - `retirement-pending` — a dedicated primitive exists and the raw tag is
 *   banned, but Box keeps accepting the tag until callers migrate
 *   (see todo.md "Box AllowedElement retirement").
 * - `mdx-prose-infra` — banned tag kept ONLY for markdown prose rendering in
 *   docs (`src/components/docs/mdx-components.tsx` maps markdown tables/rules
 *   through `Box as=`). App code must use the real primitive.
 */
export type BoxAllowedReason =
  | "box-is-the-primitive"
  | "no-primitive-yet"
  | "retirement-pending"
  | "mdx-prose-infra"

/**
 * One row of the coverage table.
 *
 * `primitive: null` means no primitive covers the tag yet — the guardrail does
 * NOT ban it (it only appears here because Box permits it and the exception
 * needs documenting).
 */
export type ElementCoverageEntry = {
  readonly tag: string
  readonly primitive: string | null
  readonly boxAllowed?: BoxAllowedReason
}

export const ELEMENT_COVERAGE = [
  // ---- Box-covered flow content: `<Box as="...">` is the primitive. ----
  { tag: "div", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "span", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "section", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "nav", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "article", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "main", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "aside", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "header", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "footer", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "ul", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "ol", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "li", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "figure", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "figcaption", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "blockquote", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "pre", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "code", primitive: "Box", boxAllowed: "box-is-the-primitive" },
  { tag: "time", primitive: "Box", boxAllowed: "box-is-the-primitive" },

  // ---- Typography → Text. ----
  { tag: "p", primitive: "Text" },
  { tag: "h1", primitive: "Text" },
  { tag: "h2", primitive: "Text" },
  { tag: "h3", primitive: "Text" },
  { tag: "h4", primitive: "Text" },
  { tag: "h5", primitive: "Text" },
  { tag: "h6", primitive: "Text" },
  { tag: "kbd", primitive: "Kbd" },

  // ---- Table. th/td (and the table tag itself) stay Box-permitted ONLY for
  // markdown prose in docs; app code must use the Table primitives. ----
  { tag: "table", primitive: "Table", boxAllowed: "mdx-prose-infra" },
  { tag: "thead", primitive: "TableHeader" },
  { tag: "tbody", primitive: "TableBody" },
  { tag: "tfoot", primitive: "TableFooter" },
  { tag: "tr", primitive: "TableRow" },
  { tag: "th", primitive: "TableHead", boxAllowed: "mdx-prose-infra" },
  { tag: "td", primitive: "TableCell", boxAllowed: "mdx-prose-infra" },
  { tag: "caption", primitive: "TableCaption" },

  // ---- Rules / media / interactive. ----
  { tag: "hr", primitive: "Separator", boxAllowed: "mdx-prose-infra" },
  { tag: "img", primitive: "Image" },
  { tag: "button", primitive: "Button" },
  { tag: "a", primitive: "Link" },
  { tag: "label", primitive: "Label" },
  { tag: "svg", primitive: "Icon" },

  // ---- Form controls. ----
  { tag: "textarea", primitive: "Textarea" },
  { tag: "input", primitive: "Input" },
  { tag: "select", primitive: "NativeSelect" },
  { tag: "option", primitive: "NativeSelectOption" },
  { tag: "optgroup", primitive: "NativeSelectOptGroup" },
  // No primitive for `form`: our `Form` is the react-hook-form `FormProvider`
  // context (it renders no DOM), so it does NOT retire the `<form>` element —
  // you still need a real `<form onSubmit>` inside it. Like `img` before
  // `Image`, `<form>` stays allowed (and Box renders it) until a primitive
  // actually covers it.
  { tag: "form", primitive: null, boxAllowed: "no-primitive-yet" },
  // `FieldSet` retires the raw tag; no call sites remain on `Box as="fieldset"`,
  // so the tag is banned and Box no longer accepts it.
  { tag: "fieldset", primitive: "FieldSet" },
  { tag: "legend", primitive: "FieldLegend" },
] as const satisfies readonly ElementCoverageEntry[]

type Entry = (typeof ELEMENT_COVERAGE)[number]

/** Tags Box's `as=` prop accepts — derived from the table, never hand-listed. */
export type BoxAllowedTag = Extract<
  Entry,
  { readonly boxAllowed: BoxAllowedReason }
>["tag"]

/**
 * Default banned host elements → the shadcn-x primitive that covers them.
 * This is the `no-raw-html` rule's default `elements` option.
 */
export const DEFAULT_ELEMENTS: Readonly<Record<string, string>> =
  Object.fromEntries(
    ELEMENT_COVERAGE.flatMap((entry) =>
      entry.primitive === null ? [] : [[entry.tag, entry.primitive] as const]
    )
  )

/** Runtime list of Box-permitted tags (for tests and tooling). */
export const BOX_ALLOWED_TAGS: readonly BoxAllowedTag[] =
  ELEMENT_COVERAGE.filter(
    (
      entry
    ): entry is Extract<Entry, { readonly boxAllowed: BoxAllowedReason }> =>
      "boxAllowed" in entry
  ).map((entry) => entry.tag)
