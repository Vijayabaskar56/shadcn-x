---
name: create-component
description: Use when adding a new shadcn-x component (or porting one from shadcn/ui). Encodes the on-system build process — Base UI + StyleX tokens, typed variants + sx, no className, guardrail update, and a live-preview MDX doc — so every component ships conforming and documented.
---

# Create a shadcn-x Component

shadcn-x is an LLM-safe component library: off-system code must be inexpressible.
Every component follows this process exactly. Do not hand-roll a component or
copy shadcn's Tailwind/cva version verbatim — port it to our model.

Read first (once per session): `CONTEXT.md`, `docs/adr/0001`–`0003`,
`docs/plans/2026-06-28-shadcn-x-design.md`. Worked examples to copy from:
`src/components/button.tsx` (variants/sizes/`sx`/`render`/`when.descendant`),
`src/components/icon.tsx` (`when.ancestor` + `defaultMarker`), `src/components/box.tsx`.

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
- **Behavior/a11y from Base UI**: `import { X as XPrimitive } from "@base-ui/react/<x>"`. Keep `data-slot="<name>"` (consumer targeting + devtools + tests).
- **Styling via StyleX only**: `stylex.create`. No `cva`, no `cn`, no Tailwind, no className.
- **Import tokens with a RELATIVE path** — `import { colors } from "../styles/tokens.stylex"`, NOT `@/styles/...`. StyleX's babel plugin can't resolve the `@/` alias when reading `defineVars` and the build fails. (Non-token imports can use `@/`.)
- **Variants/sizes = typed union props** mapped to styles, with defaults.
- **`sx?: StyleXStyles<...>` merged LAST** in `stylex.props(...)` (last-wins) — the only per-instance override. (`import type { StyleXStyles } from "@stylexjs/stylex"`.)
- **Dark mode by construction**: colors come from `light-dark()` tokens; never write a dark variant.
- **Theme values MUST go through tokens — never hardcode them.** Radius, color, font size/weight, shadow, spacing are theme knobs in `tokens.stylex.ts` (StyleX `defineVars`). Use `borderRadius.l`, `colors.primary`, etc. — NOT `"0.625rem"` / `"#…"`. Hardcoding breaks the single-knob customization (e.g. radius derives from `--radius`: change it once, everything re-scales; verified by overriding `--radius` live). If a shared value is missing, add a **semantically-named** token (colors via `light-dark(oklch(...))`; radius via the derived `--radius` scale).
- **Literals are only for per-size component dimensions** the token scale genuinely doesn't carry — e.g. a button size's `height: "2rem"`, `gap: "0.375rem"`, `paddingInline: "0.625rem"`. shadcn hardcodes these per-size too (fixed utilities in the size variant); they're the size *decision*, not a cross-cutting theme variable. The PUBLIC surface (`variant`/`size` props) stays the closed menu.
- To style a link/other element as this component, use Base UI's `render` prop — never expose className.

#### Cross-element styling → `stylex.when.*` (NOT distance selectors)
Never write `.parent > *` / `[&_svg]` / `:has(...)` by hand. The sanctioned,
type-safe equivalent is `stylex.when.*` + a marker (verified working in 0.19):
- The **observed** element carries `stylex.defaultMarker()` (spread via `stylex.props`).
- The **reacting** element uses a `when.*` key in a conditional value:
  - `when.ancestor('[data-size="xs"]')` — react to a marked ancestor (e.g. Icon shrinks inside an xs Button).
  - `when.descendant('[data-icon="inline-start"]')` — react to a marked descendant (e.g. Button tightens padding when it holds an icon). Uses `:has()` (fine on our modern targets).
  - `when.siblingBefore/siblingAfter/anySibling` likewise.
- For a parent→child slot relationship, give the child `data-slot="..."` and let the parent observe it via `when.descendant('[data-slot="..."]')`. See `Icon`/`Button` for the worked example.

#### State styling (`:hover`, `aria-expanded`, `data-state`, loading, …)
- **Self pseudo-classes work** as condition keys: `{ default: x, ":hover": y, ":disabled": z, ":active": ..., ":focus-visible": ... }`.
- **Self attribute/`data-*`/`aria-*` selectors DO NOT work** — StyleX silently drops keys like `'[aria-expanded="true"]'` or `':is([data-state="open"])'` (compiles, emits no CSS). Do NOT rely on them.
- So style **your own state with a JS conditional**, since the component knows it:
  `{...stylex.props(styles.base, isOpen && styles.open, sx)}` — and still SET `data-state`/`data-loading`/etc. as attributes (for consumers, global CSS, devtools, tests). If the state is set by Base UI (e.g. `aria-expanded` on a trigger you don't render), read Base UI's exposed state and apply the conditional from that.

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

## Gotchas (learned building Box/Button/Icon + removing Tailwind)
- **`Box` covers the full prose/table tag set** — `div span section nav … p h1–h6 ul ol li a button time figure blockquote pre code table thead tbody tr th td caption hr img`. Use `<Box as="table">` etc. instead of raw HTML. Need a tag it lacks? Add it to `AllowedElement` in `box.tsx`.
- **Spreading HTML element props onto `Box`** (renderers/wrappers): omit the attrs that clash with Box's typed props — `Omit<ComponentPropsWithoutRef<E>, "color" | "width" | "height" | "border">`. Otherwise TS errors (HTML `color`/`width`/`border` are `string`/`number`, Box's are typed).
- **`light-dark()` survives the build only because `vite.config.ts` pins `stylex.vite({ lightningcssOptions: { targets } })` to modern browsers.** StyleX's unplugin runs lightningcss over the token CSS; with old targets it lowers `light-dark(oklch(a),oklch(b))` into two space-separated values → invalid `background-color` (transparent) and split per-axis `border-color`. Do NOT lower those targets.
- **No broad `*` resets in `globals.css`.** StyleX atomic styles live in `@layer`, and unlayered rules beat layered ones regardless of specificity — a `* { border-width: 0; margin: 0 }` silently kills every StyleX border/margin. Keep global resets narrow (box-sizing, `body` margin).
- StyleX component tests need the StyleX plugin in `vitest.config.ts` (already wired) — `defineVars` throws at runtime otherwise. To verify a component in isolation while other files are mid-edit, run `bunx vitest run src/components/<name>.test.tsx` (loads only its import graph).
- The lint plugin is authored with oxlint's `createOnce`; per-file options/state go in a `before()` hook (`context.options` is `null` at `createOnce` setup time).
- `.mdx` docs aren't linted (oxlint globs only js/ts) — keep examples on-system anyway; they're the canonical reference an agent will copy.
