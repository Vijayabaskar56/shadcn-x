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

## Phase 1 — Core form &amp; input

- [ ] Field
- [ ] Form
- [ ] Checkbox
- [ ] Radio Group
- [ ] Switch
- [ ] Slider
- [ ] Select
- [ ] Native Select
- [ ] Toggle
- [ ] Toggle Group
- [x] Button Group
- [ ] Input OTP
- [ ] Input Group
- [ ] Combobox

## Phase 2 — Overlays &amp; menus (Base UI behavior)

- [ ] Dialog
- [ ] Alert Dialog
- [ ] Sheet
- [ ] Drawer
- [ ] Popover
- [ ] Hover Card
- [ ] Tooltip
- [ ] Dropdown Menu
- [ ] Context Menu
- [ ] Menubar
- [ ] Navigation Menu
- [ ] Command

## Phase 3 — Layout &amp; containers

- [ ] Card
- [ ] Separator
- [ ] Aspect Ratio
- [ ] Scroll Area
- [ ] Resizable
- [ ] Sidebar
- [ ] Collapsible
- [ ] Accordion
- [ ] Tabs
- [ ] Item
- [ ] Empty

## Phase 4 — Display &amp; feedback

- [ ] Alert
- [ ] Badge
- [ ] Avatar
- [ ] Skeleton
- [ ] Spinner
- [ ] Progress
- [ ] Kbd
- [ ] Sonner (toast)
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Calendar
- [ ] Carousel
- [ ] Chart

## Phase 5 — RTL / Direction

Plan: `docs/plans/2026-06-30-rtl-support.md`

- [ ] `enableLTRRTLComments` config
- [ ] Direction (provider) + `useDirection` hook
- [ ] RTL: migrate Box physical → logical (`paddingX`, `borderLeft/Right`, `textAlign`)
- [ ] RTL: migrate Text (`borderLeft` → `borderInlineStart`)
- [ ] RTL: migrate docs components (mdx-components, doc-toc)
- [ ] RTL: Icon auto-flip (`stylex.when.ancestor('[dir="rtl"]')`)
- [ ] RTL: overlay animation directions (Phases 2-4)
- [ ] RTL: lint rule (`preferInline` equivalent for oxlint)
- [ ] RTL: test suite

## Phase 6 — AI / chat (Base UI variant extras; optional, only if needed)

- [ ] Message
- [ ] Message Scroller
- [ ] Bubble
- [ ] Attachment
- [ ] Marker

## Box AllowedElement retirement

When Primitive ships, Box loses these elements from its `AllowedElement` type

and `no-raw-html` remaps them from `Box` → `Primitive`:


| Element(s)                                                                        | Moves to                                              | When            |
| --------------------------------------------------------------------------------- | ----------------------------------------------------- | --------------- |
| `ul`/`ol`/`li`, `time`, `figure`, `figcaption`, `blockquote`, `pre`, `code`, `hr` | **Primitive** (new)                                   | Primitive [ ]   |
| `form`, `fieldset`                                                                | **Form** (Phase 1)                                    | Phase 1         |
| `p`, `h1`–`h6`                                                                    | **Text** (already exists — needs `no-raw-html` remap) | Primitive ships |
| `button`                                                                          | **Button** (already mapped)                           | Already done    |
| `a`                                                                               | **Link** (already mapped)                             | Already done    |
| `label`                                                                           | **Label** (already mapped)                            | Already done    |
| `img`                                                                             | **Image** (Phase 0)                                   | Image [ ]       |
| `table`, `thead`, `tbody`, `tr`, `th`, `td`, `caption`                            | **Table** (Phase 0)                                   | Table [ ]       |


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

