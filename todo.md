# shadcn-x — Component Build Checklist

Port of the shadcn/ui component surface to **StyleX + Base UI** with a closed,

token-typed prop surface. Reference (read-only, never linted):

- Base UI variant (primary): `/Users/vijayabaskar/work/references/ui/apps/v4/registry/bases/base/ui`
- Canonical full set (for variants/API parity): `/Users/vijayabaskar/work/references/ui/apps/v4/registry/new-york-v4/ui`

Each component must follow the per-component build system (see the

`create-component` skill): match shadcn's API + variants exactly, customize via

`sx`/variants/`createTheme` (no raw `className`/`style`), update `no-raw-html` if

it retires a host tag, and ship a per-component docs page. Nothing undocumented.

Legend: `[x]` done · `[ ]` todo · ⬛ retires a raw HTML tag (add to `no-raw-html`)

---

## Phase 0 — Foundations (host-surface primitives, the `no-raw-html` lever)

These drive raw-HTML usage toward zero. Build first.

- [x] Box ⬛ `div`/`span`/`section`/`nav`/`article`/`main`/`aside`/`header`/`footer`

  — layout containers only; everything else moves to Primitive or dedicated

  components (see § Box AllowedElement retirement below).
- [x] Button ⬛ `button`
- [x] Text (shadcn-x) ⬛ `p`/`h1`–`h6` (typography primitive; shadcn uses utility classes)
- [x] Link (shadcn-x) ⬛ `a` (wraps TanStack Router `Link`)
- [x] Input ⬛ `input`
- [x] Textarea ⬛ `textarea`
- [x] Label ⬛ `label`
- [x] Image (shadcn-x) ⬛ `img`
- [x] Icon (shadcn-x) ⬛ `svg` (library-agnostic: lucide default, createIcon for BYO)
- [x] Table ⬛ `table`/`thead`/`tbody`/`tr`/`th`/`td`/`caption`

## Phase 1 — Core form &amp; input ✅

- [x] Field ⬛ `fieldset`, `legend`
- [x] Form ⬛ `form`
- [x] Checkbox
- [x] Radio Group
- [x] Switch
- [x] Slider
- [x] Select
- [x] Native Select ⬛ `select`, `option`, `optgroup`
- [x] Toggle
- [x] Toggle Group
- [x] Button Group
- [x] Input OTP
- [x] Input Group
- [x] Combobox

## Phase 2 — Overlays &amp; menus (Base UI behavior)

- [x] Dialog
- [x] Alert Dialog
- [x] Sheet
- [x] Drawer
- [x] Popover
- [x] Hover Card
- [x] Tooltip
- [x] Dropdown Menu
- [x] Context Menu
- [x] Menubar
- [x] Navigation Menu
- [x] Command

## Phase 3 — Layout &amp; containers

- [x] Card
- [x] Separator
- [x] Aspect Ratio
- [x] Scroll Area
- [x] Resizable
- [x] Sidebar
- [x] Collapsible
- [x] Accordion
- [x] Tabs
- [x] Item
- [x] Empty

## Phase 4 — Display &amp; feedback

- [x] Alert
- [x] Badge
- [x] Avatar
- [x] Skeleton
- [x] Spinner
- [x] Progress
- [x] Kbd
- [x] Sonner (toast)
- [x] Breadcrumb
- [x] Pagination
- [x] Calendar
- [x] Carousel
- [x] Chart

## Phase 5 — RTL / Direction ✅

Plan: `docs/plans/2026-06-30-rtl-support.md` (implemented in `9680f1c`)

- [x] `enableLTRRTLComments` config
- [x] Direction (provider) + `useDirection` hook
- [x] RTL: migrate Box physical → logical (`paddingX`, `borderLeft/Right`, `textAlign`)
- [x] RTL: migrate Text (`borderLeft` → `borderInlineStart`)
- [x] RTL: migrate docs components (mdx-components, doc-toc, docs-sidebar, docs layout)
- [x] RTL: Icon auto-flip (`flipRtl` prop via `stylex.when.ancestor('[dir="rtl"]')`)
- [x] RTL: overlay animation directions (Phases 2-4)
- [x] RTL: lint rule (`preferInline` equivalent for oxlint)
- [x] RTL: test suite

## Phase 6 — AI / chat (Base UI variant extras; optional, only if needed)

- [ ] Message
- [ ] Message Scroller
- [ ] Bubble
- [ ] Attachment
- [ ] Marker

## Box AllowedElement retirement

**Canonical table: `src/element-coverage.ts`** — the single source of truth
for tag → retiring primitive and for which tags Box's `as=` still permits
(each with a documented `boxAllowed` reason). Both `no-raw-html`'s
`DEFAULT_ELEMENTS` and Box's `AllowedElement` union are derived from it;
`tests/lint/element-coverage.test.ts` asserts the whole table. Do not
hand-list tags here — edit the module instead.

Open retirements (flip the entry in `src/element-coverage.ts` when done):

- [ ] `ul`/`ol`/`li`, `time`, `figure`, `figcaption`, `blockquote`, `pre`,
  `code` — move from **Box** to a new **Primitive** component
- [x] `fieldset` — `FieldSet` shipped and no call sites remain on
  `Box as="fieldset"`; `boxAllowed` dropped, so the raw tag is banned and Box no
  longer accepts it
- [ ] `form` — no primitive yet (`Form` is the react-hook-form provider, no
  DOM); ban the raw tag when a DOM-rendering primitive lands
- [ ] `table`/`th`/`td`/`hr` — kept as `boxAllowed: "mdx-prose-infra"` for
  markdown prose in docs; retire if mdx-components stops needing them


---

## Per-component Definition of Done

1. **API parity** — props/subcomponents match shadcn's component exactly.
2. **All variants** — every `variant`/`size`/`tone` shadcn ships is present.
3. **Base UI behavior** — a11y/interaction delegated to Base UI primitive.
4. **StyleX + tokens** — styled only via `defineVars` tokens; `light-dark()` theming.
5. **Customizable** — `sx` (typed `StyleXStyles`) + variants; re-theme via `createTheme`.
6. **No escape hatches** — no raw `className`/`style`; if it retires a host tag,

  add that tag to `no-raw-html`.
7. **Docs** — a per-component docs page in shadcn-styled format (usage, props,

  variants, examples). Nothing undocumented.
8. **Verify** — typecheck + oxlint + test pass.

---
