# shadcn-x

An **LLM-safe** component library: shadcn's *you-own-the-code* philosophy, built
on **StyleX + Base UI** (not Tailwind), engineered so an AI agent writing UI
lands on-system by default. See `CONTEXT.md` (glossary) and `docs/adr/` (decisions).

## When in doubt, read the docs

The full **StyleX documentation is bundled in `docs/stylex-docs/`** (API,
recipes — `when.*` selectors, dynamic styles, theming — and types). If you're
unsure whether StyleX supports something — a pseudo-element, a `when.*` variant,
a value form, a theming capability — **consult `docs/stylex-docs/` before
proceeding, don't guess from memory.** Verify the assumption, then confirm
empirically (the emitted CSS lands in `dist/client/assets/*.css`).

## On-system rules (non-negotiable)

These are enforced by the `shadcn-x` lint plugin (`src/lint/`), not just docs:

- **No raw `className` or `style`** on our components. Customize via, in order:
  `variant`/`size` props → typed `sx` (`StyleXStyles`, merged last) → `stylex.createTheme` → edit the owned source. (ADR-0002)
- **No raw HTML host elements** where a primitive exists — use the primitive
  (e.g. `<Box as="nav">` not `<nav>`). The banned list grows as primitives ship. (ADR-0003)
- **No `@stylexjs/atoms`** — arbitrary-value atoms (`x.padding._16px`,
  `x.color(c)`, `x.width['calc(...)']`) are an open inline-value surface, the same
  escape hatch as raw `className`. StyleX in app code goes through tokens + the
  closed prop surface, not atoms. (ADR-0002, `no-stylex-atoms`)
- **No hardcoded design values** (hex/px/rgb/oklch) in JSX — use tokens from `src/styles/tokens.stylex.ts`.
- **Tokens are decisions**: semantic names (`background-card`, `padding="l"`), `light-dark()` for theming (no `dark:` pass).
- **StyleX discipline**: co-locate styles; every element styles itself (no distance selectors); no magic strings.

## Adding a component

**Use the `create-component` skill. Never hand-roll a component or copy shadcn's
Tailwind/cva version verbatim.** The skill encodes the full process: study the
Base UI reference → TDD → Base UI behavior + StyleX tokens + typed variants/`sx`
→ update the `no-raw-html` guardrail → write a live-preview `.mdx` doc → verify.

Component checklist + status: `todo.md`.

> Tests live in **`tests/`** (mirroring `src/`), not co-located with the
> component — e.g. `tests/components/button.test.tsx`. `vitest.config.ts`
> includes `tests/**/*.{test,spec}.{ts,tsx}`.

## Layout

- `src/components/` — components (you own these; the guardrail does NOT lint library source the same as app code)
- `src/styles/tokens.stylex.ts` — the single source of design decisions (`defineVars`)
- `src/lint/` — the guardrail plugin (oxlint `createOnce` + `eslintCompatPlugin`; runs in oxlint + ESLint). Rules: `no-raw-html`, `no-className-style`, `no-raw-design-values`, `no-stylex-atoms`.
- `tests/` — tests mirroring `src/` (`tests/components`, `tests/lint`, `tests/lib`)
- `docs/stylex-docs/` — the full StyleX docs (consult before guessing; see "When in doubt, read the docs")
- `content/docs/*.mdx` — component docs with live previews; nav in `src/docs/docs-config.ts`
- reference (read-only): `references/ui` — a **local symlink** to the shadcn/ui repo (see `references/README.md`); same target as the absolute `/Users/vijayabaskar/work/references/ui`. Base UI variant lives under `references/ui/apps/v4/registry/bases/base/ui`.

## Verify

```sh
bunx tsc --noEmit                  # tsconfig globs **/*.tsx, so tests/ are type-checked too
bunx vitest run                    # runs tests/** (see vitest.config.ts include)
bunx oxlint --type-aware src tests # exit 0; shadcn-x warnings are the migration surface
bunx fumadocs-mdx                  # regenerate .source/ (docs content entries + types)
bun run build
```
