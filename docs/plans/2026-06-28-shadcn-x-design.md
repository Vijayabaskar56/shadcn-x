# shadcn-x — Project Goals, Enforcement Architecture & Glossary

> Status: design draft · Date: 2026-06-28
> Companion docs: `CONTEXT.md` (glossary) · `docs/adr/0001–0003` (decisions)

## 1. Project Goals

**One-liner.** An LLM-safe, copy-paste component library that follows shadcn's
*you-own-the-code* philosophy, but built on **StyleX + Base UI** instead of
Tailwind — engineered so that an AI agent writing UI lands on-system *by default*.

### The problem

Tailwind's open string surface is its strength for humans and its weakness for
agents. `p-4`, `p-[17px]`, `bg-gray-100`, `bg-zinc-100`, and forgotten `dark:`
variants are all valid, all lint-clean, and all *off-system*. Documentation
cannot fix this: anything in a doc is a probability, not a guarantee. An agent
weighs guidance against its whole context and complies *most of the time* — and
most-of-the-time is not a design system.

Reference: [Orbit — an LLM-safe design system](https://polar.sh/blog/orbit-llm-safe-design-system).

### The bet

Make off-brand decisions *inexpressible*. Tokens are decisions (`padding="l"`),
not values (`16px`). Primitives expose a closed prop surface typed to those
decisions. Escape hatches are closed off and enforced in CI, not prose. Dark mode
is by construction via `light-dark()`.

### Why StyleX + Base UI

- **StyleX** — compile-time, type-checked, atomic styles bound to `defineVars`
  tokens: the short menu we wrote, and the only menu the prop types accept.
- **Base UI** — unstyled, accessible behavior primitives, so we own styling
  without owning a11y/interaction logic.

### Success criterion — AX (Agent Experience)

An agent given only our docs + types produces correct, on-brand, themeable UI on
the first try. `/grill-with-docs` verifies a reader (human or agent) knows the rules.

### Non-goals

Not a Tailwind plugin · not a runtime CSS-in-JS library · not config-over-code ·
"widget" avoided as a term.

---

## 2. Enforcement Architecture

Resolved via the grilling session (2026-06-28). See ADRs for rationale.

### Two mechanisms, two failure modes — ADR-0001

- **Type system** enforces the *closed prop surface* on primitives. Positive
  guidance (autocomplete the right tokens, typos become type errors), works in
  the editor — but blind to alternatives (cannot stop a raw `<div>`).
- **Lint plugin** is the *fence around the escape hatches* — the only thing that
  catches cross-file patterns (raw elements, inline style, raw values).

### Two layers — `CONTEXT.md`

- **Library source layer** (copied-in component code): infinitely editable, NOT
  policed by guardrails. Customizability lives here.
- **Consumer app layer** (screens written *using* the components): where
  guardrails apply.

### Plugin runtime & distribution

- Written against the **`eslintCompatPlugin`** API → runs under both **oxlint**
  (primary/fast) and **ESLint**, so the guardrail travels into consumer repos —
  ADR-0001. (Bets on oxlint's alpha JS-plugin API; ESLint-compat is the hedge.)
- **Distribution: hybrid** — published as a versioned npm package *and* exposed
  via the registry for copy-paste, so consumers choose managed upgrades vs.
  ownership.

### Customization without `className` — ADR-0002

Raw `className`/`style` are banned on primitives. On-system overrides, by reach:
1. **Variant props** (`variant`/`size`/`tone`) — replaces `cva`.
2. **Typed `sx` prop** — accepts `StyleXStyles` only, token-constrained where
   practical, merged last. The controlled per-instance escape valve.
3. **`stylex.createTheme`** — override token *values* for a subtree (re-skin).
4. **Edit the owned source** — structural/arbitrary changes.

### The rule set (consumer app layer)

- **`no-raw-html`** — bans a **curated, growing** list = the elements that have a
  primitive (today: Box's layout/text `as` set). Each new primitive (`Input`,
  `Icon`, `Image`, …) adds its tag to the list, so raw HTML shrinks toward zero —
  ADR-0003.
- **`no-className-style`** — bans `className`/`style` on our components.
- **`no-raw-design-values`** — bans hardcoded hex/rgb/oklch/px/rem literals.
- **Escape valve** — a visible `eslint-disable` comment with a reason (greppable
  to-do list of missing primitives).

### Implied scope

Driving raw HTML down means the primitive set must grow to cover the host
surface: layout/text (`Box` via `as`), interactive controls (input, textarea,
select, button), media (image, svg/icon). Building primitives is the lever;
`no-raw-html` ratchets each gain into place.

---

## 3. Glossary Design

The glossary (`CONTEXT.md` for canonical terms) is the shared vocabulary that
`/grill-with-docs` (a Q&A drill) draws questions from. Two banks:

- **Bank A — Ecosystem fluency.** Adopted wholesale from
  [components.build definitions](https://github.com/vercel/components.build/blob/main/content/docs/definitions.mdx):
  Primitive · Component · Pattern · Block · Page · Template · Utility ·
  Props API · Children/Slots · Render Prop · Controlled/Uncontrolled ·
  Provider/Context · Portal · Headless · Styled · Variants · Design Tokens ·
  Role/State/Property · Keyboard Map · Focus Management · Package ·
  Copy-and-Paste · Registry · the classification heuristics.
- **Bank B — shadcn-x rules.** The LLM-safe / AX terms (now canonical in
  `CONTEXT.md`): LLM-safe · AX · On-system/Off-system · Decision (token-as-) ·
  Escape hatch · Library source layer · Consumer app layer · Guardrail ·
  Re-theme · sx · Variant. Plus: Closed prop surface · Dark-mode-by-construction
  · `light-dark()` · `defineVars` · CI-over-docs · `Box` · `as` polymorphism ·
  Scale vocabulary.

### Entry format (built for grillability)

```yaml
term: <name>
category: shadcn-x | adopted
definition: <one canonical sentence>
why: <the decision / rationale>
on-system: <a correct example>
off-system: <the tempting wrong answer an agent reaches for>
see-also: [...]
```

The `off-system` field is the distractor the drill turns into "spot the mistake"
/ multiple-choice questions, encoding the Orbit failure modes directly.

---

## 4. Next steps

1. Publish the glossary as a docs page (keep the entry format so the drill parses it).
2. Build the primitive set toward host-surface coverage; add each tag to `no-raw-html`.
3. Build the `eslint-plugin-shadcn-x` rules (`no-raw-html`, `no-className-style`,
   `no-raw-design-values`) against `eslintCompatPlugin`; teach the on-system path
   in each error message.
4. Spec the `/grill-with-docs` question banks (definition recall,
   spot-the-off-system, multiple-choice from `off-system` distractors).

## Reference

shadcn/ui source (read-only, for building our own components):
`/Users/vijayabaskar/work/references/ui` — outside this repo, never linted here.
