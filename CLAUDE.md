# shadcn-x

An **LLM-safe** component library: shadcn's *you-own-the-code* philosophy, built
on **StyleX + Base UI** (not Tailwind), engineered so an AI agent writing UI
lands on-system by default. See `CONTEXT.md` (glossary) and `docs/adr/` (decisions).

## On-system rules (non-negotiable)

These are enforced by the `shadcn-x` lint plugin (`src/lint/`), not just docs:

- **No raw `className` or `style`** on our components. Customize via, in order:
  `variant`/`size` props → typed `sx` (`StyleXStyles`, merged last) → `stylex.createTheme` → edit the owned source. (ADR-0002)
- **No raw HTML host elements** where a primitive exists — use the primitive
  (e.g. `<Box as="nav">` not `<nav>`). The banned list grows as primitives ship. (ADR-0003)
- **No hardcoded design values** (hex/px/rgb/oklch) in JSX — use tokens from `src/styles/tokens.stylex.ts`.
- **Tokens are decisions**: semantic names (`background-card`, `padding="l"`), `light-dark()` for theming (no `dark:` pass).
- **StyleX discipline**: co-locate styles; every element styles itself (no distance selectors); no magic strings.

## Adding a component

**Use the `create-component` skill. Never hand-roll a component or copy shadcn's
Tailwind/cva version verbatim.** The skill encodes the full process: study the
Base UI reference → TDD → Base UI behavior + StyleX tokens + typed variants/`sx`
→ update the `no-raw-html` guardrail → write a live-preview `.mdx` doc → verify.

Component checklist + status: `todo.md`.

## Layout

- `src/components/` — components (you own these; the guardrail does NOT lint library source the same as app code)
- `src/styles/tokens.stylex.ts` — the single source of design decisions (`defineVars`)
- `src/lint/` — the guardrail plugin (oxlint `createOnce` + `eslintCompatPlugin`; runs in oxlint + ESLint)
- `content/docs/*.mdx` — component docs with live previews; nav in `src/docs/docs-config.ts`
- reference (read-only, external): `/Users/vijayabaskar/work/references/ui` (shadcn/ui; Base UI variant under `apps/v4/registry/bases/base/ui`)

## Verify

```sh
bunx tsc --noEmit
bunx vitest run
bunx oxlint --type-aware src   # exit 0; shadcn-x warnings are the migration surface
node scripts/build-content.mjs
bun run build
```
