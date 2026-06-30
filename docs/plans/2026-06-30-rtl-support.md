# RTL Support — Plan

> Status: draft · Date: 2026-06-30
> Driving doc: StyleX docs at `docs/stylex-docs/` (API reference for all claims below)

## 1. Goal

Every shadcn-x component works correctly in both LTR and RTL document directions
without the consumer writing direction-specific styles. Consumers flip the entire
app by wrapping it in `<DirectionProvider dir="rtl">` — no per-component opt-in,
no `dark:`-style direction variants.

## 2. How StyleX handles direction

StyleX does **not** auto-flip physical properties. Instead it provides the full
set of CSS logical properties as first-class, typed StyleX keys. The author
writes logical explicitly, and the browser maps them based on `dir`.

### Confirmed logical properties (from `docs/stylex-docs/`)

| Category | StyleX key | CSS output |
|---|---|---|
| padding | `paddingInline` | `padding-inline` |
| padding | `paddingInlineStart` | `padding-inline-start` |
| padding | `paddingInlineEnd` | `padding-inline-end` |
| padding | `paddingBlock` | `padding-block` |
| margin | `marginInline` | `margin-inline` |
| margin | `marginInlineStart` | `margin-inline-start` |
| margin | `marginInlineEnd` | `margin-inline-end` |
| margin | `marginBlock` | `margin-block` |
| border | `borderStartWidth` | `border-start-width` |
| border | `borderEndWidth` | `border-end-width` |
| border | `borderStartColor` | `border-start-color` |
| border | `borderEndColor` | `border-end-color` |
| position | `start` | `inset-inline-start` |
| position | `end` | `inset-inline-end` |
| position | `insetInline` | `inset-inline` |
| size | `inlineSize` | `inline-size` |
| text-align | `"start"` / `"end"` | `start` / `end` |

Sources: `api/javascript/props.mdx`, `api/javascript/create.mdx`,
`api/types/StyleXStyles.mdx`, `api/types/StyleXStylesWithout.mdx`,
`learn/thinking-in-stylex.mdx`, `learn/recipes/variants.mdx`.

### Configuration knobs

- **`enableLTRRTLComments`** (unplugin option) — adds `/* @ltr */` / `/* @rtl */`
  annotations to emitted CSS for post-processing (e.g. generating separate LTR/RTL
  stylesheets). Not required for the logical-property approach, but good to enable
  for future flexibility.
- **`preferInline`** (ESLint `@stylexjs/valid-shorthands` option) — flags physical
  directional properties and suggests logical equivalents. Our lint runs on oxlint,
  so we need to check compat or write a narrow custom rule.

## 3. Approach

**Use CSS logical properties everywhere, not auto-flipping physical ones.**
StyleX leaves direction to the browser via `dir` — we just write the logical
equivalent of each physical property.

Migration pattern:
```
// Before (physical — ignores dir)
paddingLeft: spacing.m

// After (logical — respects dir)
paddingInlineStart: spacing.m
```

Shadcn/ui's RTL support relies on Tailwind's `start-*`/`end-*` utilities + a CLI
transform that rewrites physical classes at install time. We don't have a Tailwind
layer. Instead we:
1. Write logical properties at authoring time (no transform needed).
2. Provide a `DirectionProvider` that sets `dir` on the document.
3. The browser handles the rest.

### What does NOT need to change

- **Token values** — `spacing`, `colors`, `borderRadius`, etc. are value scales,
  not directional. They stay as-is.
- **`light-dark()`** — unrelated to direction, stays.
- **Button's `paddingInlineStart`/`paddingInlineEnd`** — already logical,
  already correct. Confirmed at `src/components/button.tsx:133-139`.
- **Icon's `"inline-start"` / `"inline-end"` position** — direction-agnostic naming
  (the `data-icon` attribute). The padding it controls is already logical.

## 4. Migration — component inventory

### Box (`src/components/box.tsx`)

| Physical | Logical replacement | Prop surface change? |
|---|---|---|
| `paddingLeft` + `paddingRight` in `paddingXMap` | `paddingInlineStart` + `paddingInlineEnd` | No — `paddingX` prop keeps working |
| `borderLeft` / `borderRight` style keys | `borderInlineStart` / `borderInlineEnd` | No — `borderLeft`/`borderRight` prop names could stay as convenience aliases or be deprecated |
| `textAlign: "left" \| "right"` (value) | `textAlign: "start" \| "end"` (value) | Soft — add `"start"`/`"end"` alongside `"left"`/`"right"` |
| `alignItems: "flex-start" \| "flex-end"` | No logical equivalent (Flexbox always uses `flex-start`/`flex-end` which don't flip on `dir`) | None |

### Text (`src/components/text.tsx`)

| Physical | Logical |
|---|---|
| `paddingLeft: spacing.xl` (blockquote) | `paddingInlineStart: spacing.xl` |
| `borderLeftWidth: 2` + `borderLeftStyle: "solid"` | `borderInlineStartWidth: 2` + `borderInlineStartStyle: "solid"` |

### MDX components (`src/components/docs/mdx-components.tsx`)

| Physical | Logical |
|---|---|
| `paddingLeft: "0.4em"` / `paddingRight: "0.4em"` (inline code) | `paddingInline: "0.4em"` |
| `paddingLeft: "1.5rem"` (ul, ol, li, blockquote) | `paddingInlineStart: "1.5rem"` |
| `borderLeftWidth: "2px"` + `borderLeftStyle: "solid"` (blockquote) | `borderInlineStartWidth` + `borderInlineStartStyle` |
| `paddingLeft: "1rem"` / `paddingRight: "1rem"` (th, td) | `paddingInline: "1rem"` |
| `textAlign: "left"` (th) | `textAlign: "start"` |

### Doc TOC (`src/components/docs/doc-toc.tsx`)

| Physical | Logical |
|---|---|
| `paddingLeft: spacing.m` | `paddingInlineStart: spacing.m` |

## 5. Component-specific RTL behaviors (beyond properties)

### Icon auto-flip

Directional icons (arrows, chevrons, carets) should mirror in RTL. Use
`stylex.when.ancestor('[dir="rtl"]')` to apply `transform: scaleX(-1)` on icons
with `position="inline-start"` or `position="inline-end"`.

```tsx
// In icon styles
flipRtl: {
  transform: {
    default: null,
    [stylex.when.ancestor('[dir="rtl"]')]: 'scaleX(-1)',
  },
},
```

Applied conditionally based on the icon name or a new `rtlFlip` prop (defaulting
to `true` for common directional icons).

### Overlay animations (Phases 2-4)

When Dialogs, Sheets, Drawers, Tooltips, and Popovers ship, their entry
animations (`slide-in-from-left` → `slide-in-from-start`) need direction-aware
keyframes. StyleX's `@keyframes` don't auto-flip, so either:

- Name animations logically (`slideInFromStart` / `slideInFromEnd`) and swap
  via a `dir`-aware conditional, or
- Let the overlay always animate from the correct side based on `position`
  (Sheet/Drawer already choose left or right; RTL swaps the semantic).

## 6. Build plan

### Phase 1 — Foundation

- [ ] **Enable `enableLTRRTLComments`** in `vite.config.ts`
- [ ] **Build `Direction` (provider)** — context + `useDirection` hook (Phase 5
      todo). Thin wrapper around `document.dir` + React context.
- [ ] **Check/port `preferInline` lint rule** — if oxlint's StyleX plugin doesn't
      expose it, write a narrow custom rule that flags physical `paddingLeft`,
      `marginRight`, `borderLeft`, etc. in `src/components/`.

### Phase 2 — Logical property migration

- [ ] **Box**: migrate `paddingXMap` from `paddingLeft`+`paddingRight` to
      `paddingInlineStart`+`paddingInlineEnd`
- [ ] **Box**: migrate `borderLeft`/`borderRight` styles to `borderInlineStart`/
      `borderInlineEnd`
- [ ] **Box**: add `"start"`/`"end"` to `TextAlign` type (deprecate `"left"`/`"right"`)
- [ ] **Text**: migrate `paddingLeft` + `borderLeft*` to `paddingInlineStart` +
      `borderInlineStart*`
- [ ] **MDX components**: migrate all physical padding/border/text-align to logical
- [ ] **Doc TOC**: migrate `paddingLeft` to `paddingInlineStart`

### Phase 3 — Component behaviors

- [ ] **Icon**: add `stylex.when.ancestor('[dir="rtl"]')` auto-flip for
      directional icons
- [ ] **Overlay primitives** (Phases 2-4): slide animations use logical directions

### Phase 4 — Testing

- [ ] Add `beforeEach(() => { document.dir = "rtl" })` to existing component
      tests and assert positions/flips are correct
- [ ] Add `DirectionProvider` integration test
