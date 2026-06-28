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

- [x] Box ⬛ `div`/`span`/`section`/`nav`/`article`/`main`/`aside`/`header`/`footer`/`ul`/`ol`/`li`
- [x] Button ⬛ `button`
- [ ] Text (shadcn-x) ⬛ `p`/`h1`–`h6` (typography primitive; shadcn uses utility classes)
- [ ] Link (shadcn-x) ⬛ `a` (wraps TanStack Router `Link`)
- [ ] Input ⬛ `input`
- [ ] Textarea ⬛ `textarea`
- [ ] Label ⬛ `label`
- [ ] Image (shadcn-x) ⬛ `img`
- [ ] Icon (shadcn-x) ⬛ `svg` (lucide wrapper)
- [ ] Table ⬛ `table`/`thead`/`tbody`/`tr`/`th`/`td`

## Phase 1 — Core form & input

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
- [ ] Button Group
- [ ] Input OTP
- [ ] Input Group
- [ ] Combobox

## Phase 2 — Overlays & menus (Base UI behavior)

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

## Phase 3 — Layout & containers

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

## Phase 4 — Display & feedback

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

## Phase 5 — Providers / utilities

- [ ] Direction (provider)

## Phase 6 — AI / chat (Base UI variant extras; optional, only if needed)

- [ ] Message
- [ ] Message Scroller
- [ ] Bubble
- [ ] Attachment
- [ ] Marker

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

## Guardrail hardening (lint plugin backlog)

- [ ] **`no-stylex-atoms`** — ban `@stylexjs/atoms` imports in the consumer app
  layer. Atoms (`x.padding._16px`, `x.color(color)`, `x.width['calc(...)']`) are
  an open arbitrary-value inline surface — the same off-system escape hatch as
  raw `className` (ADR-0002). Either a standalone rule or a banned-import check
  folded into `no-className-style`. (StyleX in app code must go through tokens +
  the closed prop surface, not atoms.)
