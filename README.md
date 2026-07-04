# shadcn-x

> An **LLM-safe** component library — shadcn's *you-own-the-code* philosophy,
> built on **StyleX + Base UI** instead of Tailwind, engineered so an AI agent
> writing UI lands on-system by default.

> [!WARNING]
> **Early days.** The foundations are in place (the guardrail lint plugin, the
> `Box`/`Button` exemplar, the MDX docs pipeline, and the component-build
> system), but most of the component library is not built yet. See
> [`todo.md`](./todo.md) for the backlog.

## Why

LLMs write Tailwind fluently — and off-system. Ask one for a card and it reaches
for `p-4`, `rounded-lg`, `bg-gray-100`, `dark:bg-zinc-900`. Every value is
plausible; none is necessarily *yours*. `p-4`, `p-5`, `p-[17px]` are all valid,
all lint-clean, all different. Documentation can't fix this — a doc is a
probability, not a guarantee.

shadcn-x makes off-brand decisions **inexpressible**: if a value isn't a design
decision we actually made, it shouldn't compile or pass lint.

Inspired by Polar's [Orbit](https://polar.sh/blog/orbit-llm-safe-design-system).

## How

- **Tokens are decisions, not values.** `padding="l"` (a role), not `16px`.
- **Closed prop surfaces.** Primitives accept only typed tokens — the short menu
  we wrote is the only menu the types allow.
- **Customize without escape hatches.** `variant`/`size` props → typed `sx`
  (StyleX styles, merged last) → `stylex.createTheme` → edit the source you own.
  No `className`, no inline `style`.
- **Dark mode by construction.** Colors resolve via CSS `light-dark()` — no
  `dark:` pass to forget.
- **Enforced in CI, not prose.** A lint plugin (`src/lint/`) is the fence around
  the escape hatches: bans raw HTML where a primitive exists, `className`/`style`
  on our components, and hardcoded design values. Authored with oxlint's
  `createOnce` + `eslintCompatPlugin`, so it runs under **both oxlint and ESLint**
  — including in the repos that copy our components in.

Built on [StyleX](https://stylexjs.com) (compile-time, type-checked, atomic,
token-bound styles) and [Base UI](https://base-ui.com) (unstyled, accessible
behavior primitives). Component taxonomy follows
[components.build](https://github.com/vercel/components.build).

## Usage

shadcn-x components are copy-paste (you own the code) and optionally guarded by
the lint plugin. To add or port a component, the build process is encoded as a
skill — **`/create-component <name>`** — which keeps every component on-system
and documented. See [`CLAUDE.md`](./CLAUDE.md) and the
[`create-component`](./.claude/skills/create-component/SKILL.md) skill.

```tsx
import { Box } from "@/components/box"
import { Button } from "@/components/button"

;<Box display="flex" gap="m" padding="l" backgroundColor="background-card">
  <Button variant="secondary">Click me</Button>
</Box>
```

## Project docs

- [`CONTEXT.md`](./CONTEXT.md) — the glossary / ubiquitous language
- [`docs/adr/`](./docs/adr/) — architecture decisions (enforcement, customization, coverage)
- [`docs/plans/`](./docs/plans/) — goals + enforcement architecture + glossary spec
- [`todo.md`](./todo.md) — component build backlog
- Component docs site — `content/docs/*.mdx` (live previews)

## Development

```sh
bun install
bun run dev            # docs site + demo

bunx tsc --noEmit      # typecheck
bunx vitest run        # tests
bunx oxlint --type-aware src   # lint (shadcn-x warnings = the migration surface)
bunx fumadocs-mdx      # compile MDX docs (regenerates .source/)
bun run build          # production build
```

## Status

Foundations done: guardrail plugin (3 rules, tested + dogfooded), `Box` and
`Button` conformed, MDX live-preview docs, and the `create-component` system.
Next: Phase 0 primitives (`Text`, `Input`, `Icon`, `Image`, …) that retire the
most raw HTML and let the guardrails flip from `warn` to `error`.
