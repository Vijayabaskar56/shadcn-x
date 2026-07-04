---
name: create-component
description: Use when adding, porting, or changing a shadcn-x component. Encodes the on-system process — study BOTH references (coss's Base UI build + shadcn's API), then Base UI behavior + StyleX tokens, typed variants + sx, no className, guardrail + live-preview MDX doc — so every component ships conforming and documented.
---

# Build or Change a shadcn-x Component

shadcn-x is an LLM-safe component library: **off-system code must be
inexpressible**. Every component — new or edited — goes through this process. Do
not hand-roll one or paste shadcn's Tailwind/cva version verbatim; port it to our
model.

**Two branches.** *Creating* runs every step. *Updating* an existing component
runs the same steps against the existing files — test-first for the new behavior,
edit in place, refresh the doc — and skips the create-only steps (marked
**create-only**). Take the path that fits; the on-system rules bind both.

Read first (once per session): `CONTEXT.md`, `docs/adr/0001`–`0003`,
`docs/plans/2026-06-28-shadcn-x-design.md`. Worked examples to copy from:
`src/components/button.tsx` (variants/sizes/`sx`/`render`/`when.descendant`),
`src/components/icon.tsx` (`when.ancestor` + `defaultMarker`), `src/components/box.tsx`.

When the build, a token, or a test misbehaves, consult `gotchas.md`.

## Checklist (make a TodoWrite item per step)

### 1. Study BOTH references — take the API from shadcn, the build from coss
Read-only. Land the best of both worlds:
- **shadcn = the API** (variant/size names, subcomponents, prop parity — we match these exactly):
  - Base UI variant (PRIMARY): `references/ui/apps/v4/registry/bases/base/ui/<name>.tsx`
  - Canonical (full variant/size/API): `references/ui/apps/v4/registry/new-york-v4/ui/<name>.tsx`
- **coss = the build** — coss ui is Base UI + our exact primitive layer, so its
  structure ports more directly than shadcn's Tailwind/Radix:
  - `references/coss/packages/ui/src/components/<name>.tsx`
  - Registry copy: `references/coss/apps/ui/registry/default/ui/<name>.tsx`
- Both `references/ui` and `references/coss` are local symlinks (`references/README.md`); if one doesn't resolve, recreate it (`ln -s /path/to/target references/<name>`).

Completion: every `variant`, `size`, subcomponent, and prop noted, with a decision
on which reference each behavior follows.

### 2. Test first (TDD) — `tests/components/<name>.test.tsx`
- Write one behavior, watch it fail, implement, repeat. **Updating:** add or adjust
  a failing test for the changed behavior *before* editing the component.
- Test observable behavior via Testing Library (roles, `data-slot`, events, that a
  given `variant`/`size` renders, that `sx` is accepted) — not implementation details.

### 3. Implement `src/components/<name>.tsx`
- **Behavior/a11y from Base UI**: `import { X as XPrimitive } from "@base-ui/react/<x>"`. Keep `data-slot="<name>"` (consumer targeting + devtools + tests).
- **Styling via StyleX only**: `stylex.create`. No `cva`, no `cn`, no Tailwind, no className.
- **Import tokens with a RELATIVE path** — `import { colors } from "../styles/tokens.stylex"`, NOT `@/styles/...`. StyleX's babel plugin can't resolve the `@/` alias when reading `defineVars` and the build fails. (Non-token imports can use `@/`.)
- **Variants/sizes = typed union props** mapped to styles, with defaults.
- **`sx?: StyleXStyles<...>` merged LAST** in `stylex.props(...)` (last-wins) — the only per-instance override. (`import type { StyleXStyles } from "@stylexjs/stylex"`.)
- **Dark mode by construction**: colors come from `light-dark()` tokens; never write a dark variant.
- **Theme values MUST go through tokens — never hardcode them.** Radius, color, font size/weight, shadow, spacing are theme knobs in `tokens.stylex.ts` (`defineVars`). Use `borderRadius.l`, `colors.primary`, etc. — NOT `"0.625rem"` / `"#…"`. Hardcoding breaks single-knob customization (change `--radius` once, everything re-scales). Missing a shared value? Add a **semantically-named** token.
- **Literals are only for per-size dimensions** the token scale genuinely doesn't carry — a size's `height: "2rem"`, `gap: "0.375rem"`. That's the size *decision*, not a cross-cutting theme variable (shadcn hardcodes these per-size too). The public surface (`variant`/`size` props) stays the closed menu.
- To style a link/other element as this component, use Base UI's `render` prop — never expose className.

#### Cross-element styling → `stylex.when.*` (NOT distance selectors)
Never write `.parent > *` / `[&_svg]` / `:has(...)` by hand. The type-safe
equivalent is `stylex.when.*` + a marker (works in 0.19):
- The **observed** element carries `stylex.defaultMarker()` (spread via `stylex.props`).
- The **reacting** element uses a `when.*` key in a conditional value: `when.ancestor('[data-size="xs"]')` (react to a marked ancestor), `when.descendant('[data-slot="..."]')` (react to a marked descendant, via `:has()`), `when.siblingBefore/siblingAfter/anySibling`.
- For a parent→child slot relationship, give the child `data-slot="..."` and observe it via `when.descendant`. See `Icon`/`Button`.

#### State styling (`:hover`, `aria-expanded`, `data-state`, loading, …)
- **Self pseudo-classes work** as condition keys: `{ default: x, ":hover": y, ":disabled": z, ":focus-visible": ... }`.
- **Self attribute/`data-*`/`aria-*` selectors DO NOT work** — StyleX silently drops keys like `'[aria-expanded="true"]'` (compiles, emits no CSS).
- So style **your own state with a JS conditional**: `{...stylex.props(styles.base, isOpen && styles.open, sx)}` — and still SET `data-state`/`data-loading` as attributes (consumers, global CSS, devtools, tests). If Base UI owns the state, read its exposed state and drive the conditional from that.

### 4. Update the guardrail — only if it retires a host element
If the component replaces a raw tag (e.g. `Input`→`input`, `Image`→`img`), add
`tag: "<Name>"` to `DEFAULT_ELEMENTS` in `src/lint/rules/no-raw-html.ts` so the
fence grows with coverage (ADR-0003). Add/keep a RuleTester case.

### 5. The doc — `content/docs/<name>.mdx`
- shadcn-structured MDX with live previews: intro · **live preview** · Usage (import + basic) · Variants (live + code) · Sizes (live, if any) · Customization (`sx` / `createTheme` / variants) · Props table. Frontmatter `title` + `description`.
- Live previews embed real `<Name .../>` (blank lines around JSX blocks). A NEW primitive used live must be added to `mdxComponents` in `src/components/docs/mdx-components.tsx`.
- **Updating:** update the existing doc + previews to match the change.
- **Create-only:** add the slug to the right section in `src/docs/docs-config.ts`.

### 6. Verify (all must pass)
- `bunx tsc --noEmit`
- `bunx vitest run tests/components`
- `bunx fumadocs-mdx` (MDX compiles; regenerates `.source/`)
- `bunx oxlint --type-aware src tests` (exit 0; warnings ok)
- `bun run build` (full build for any composed/route-level component)

### 7. Tick the box in `todo.md`. **(create-only)**
