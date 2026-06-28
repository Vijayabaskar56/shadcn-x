---
name: create-component
description: Use when adding a new shadcn-x component (or porting one from shadcn/ui). Encodes the on-system build process — Base UI + StyleX tokens, typed variants + sx, no className, guardrail update, and a live-preview MDX doc — so every component ships conforming and documented.
---

# Create a shadcn-x Component

shadcn-x is an LLM-safe component library: off-system code must be inexpressible.
Every component follows this process exactly. Do not hand-roll a component or
copy shadcn's Tailwind/cva version verbatim — port it to our model.

Read first (once per session): `CONTEXT.md`, `docs/adr/0001`–`0003`,
`docs/plans/2026-06-28-shadcn-x-design.md`.

## Checklist (make a TodoWrite item per step)

### 1. Study the reference (read-only)
- Base UI variant (PRIMARY): `/Users/vijayabaskar/work/references/ui/apps/v4/registry/bases/base/ui/<name>.tsx`
- Canonical (for full variant/size/API parity): `/Users/vijayabaskar/work/references/ui/apps/v4/registry/new-york-v4/ui/<name>.tsx`
- Note every `variant`, `size`, subcomponent, and prop. We match shadcn's API and
  variant names exactly.

### 2. Test first (TDD)
- Write `src/components/<name>.test.tsx` with one behavior, watch it fail, implement, repeat.
- Test observable behavior via Testing Library (roles, `data-slot`, events, that a
  given `variant`/`size` renders, that `sx` is accepted). Not implementation details.

### 3. Implement `src/components/<name>.tsx`
- **Behavior/a11y from Base UI**: `import { X as XPrimitive } from "@base-ui/react/<x>"`. Keep `data-slot`.
- **Styling via StyleX only**: `stylex.create` bound to tokens from `@/styles/tokens.stylex`. No `cva`, no `cn`, no Tailwind, no className.
- **Variants/sizes = typed union props** mapped to styles, with defaults.
- **`sx?: StyleXStyles<...>` merged LAST** in `stylex.props(...)` (last-wins) — the only per-instance override. (`import type { StyleXStyles } from "@stylexjs/stylex"`.)
- **Dark mode by construction**: colors come from `light-dark()` tokens; never write a dark variant.
- **No distance selectors** (no `.parent > *`, no descendant styling). Every element styles itself; use `stylex.when.*` for cross-element state.
- If you need a new color/space value, add a **semantically-named** token to `tokens.stylex.ts` with `light-dark(oklch(...))` — never a raw value in the component.
- To style a link/other element as this component, use Base UI's `render` prop — never expose className.

### 4. Update the guardrail (if it retires a host element)
- If the component replaces a raw tag (e.g. `Input`→`input`, `Image`→`img`), add
  `tag: "<Name>"` to `DEFAULT_ELEMENTS` in `src/lint/rules/no-raw-html.ts` so the
  fence grows with coverage (ADR-0003). Add/keep a RuleTester case.

### 5. Write the doc — `content/docs/<name>.mdx`
- Use MDX (live previews), shadcn-structured: intro · **live preview** · Usage
  (import + basic) · Variants (live + code) · Sizes (live, if any) · Customization
  (`sx` / `createTheme` / variants) · Props table. Frontmatter `title` + `description`.
- Live previews: embed real `<Name .../>` (put blank lines around JSX blocks).
- If the doc uses a NEW primitive live, add it to `mdxComponents` in
  `src/components/docs/mdx-components.tsx`.
- Add the slug to the right section in `src/docs/docs-config.ts`.

### 6. Verify (all must pass)
- `bunx tsc --noEmit`
- `bunx vitest run src/components`
- `node scripts/build-content.mjs` (MDX compiles)
- `bunx oxlint --type-aware src` (exit 0; warnings ok)
- `bun run build` (full build for any composed/route-level component)

### 7. Tick the box in `todo.md`.

## Gotchas (learned building Box/Button)
- StyleX component tests need the StyleX plugin in `vitest.config.ts` (already wired) — `defineVars` throws at runtime otherwise.
- The lint plugin is authored with oxlint's `createOnce`; per-file options/state go in a `before()` hook (`context.options` is `null` at `createOnce` setup time).
- `.mdx` docs aren't linted (oxlint globs only js/ts) — keep examples on-system anyway; they're the canonical reference an agent will copy.
