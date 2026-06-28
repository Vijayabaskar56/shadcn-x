# Ban raw className/style on primitives; customize via StyleX

## Status

accepted

## Context & Decision

shadcn's composition model leans on `className` + `cn()`. That same open string
surface is the #1 way an agent goes off-system (`className="p-4 bg-gray-100"`).
We chose the **pure ban** (Orbit's stance): primitives do **not** accept raw
`className` or `style`.

Customization is preserved — and stays on-system — through StyleX instead:

1. **Variant props** — discrete `variant`/`size`/`tone` knobs (replaces `cva`).
2. **Typed `sx` prop** — accepts `StyleXStyles` only, constrained to token values
   where practical, merged last (StyleX atomic merge is last-wins). This is the
   controlled per-instance escape valve that replaces `className`/`style`. A raw
   utility string cannot enter it; only `stylex.create(...)` output can.
3. **`stylex.createTheme`** — override token *values* for a subtree to re-skin
   globally or per-region without touching components.
4. **Edit the owned source** — structural/arbitrary changes live in the library
   source layer, which the guardrail does not police.

## Consequences

- Diverges from shadcn's `cn(..., className)` pattern. Components written for
  shadcn-x compose via variants + `sx` + theming, not className merging.
- `Box`'s current raw `className`/`style` props are replaced by a typed `sx`.
- "Infinitely customizable" is delivered by re-theming + owned source, not by an
  open per-element string surface — every override stays typed and token-bound.

## Reference

shadcn/ui source used as a read-only reference for building our own components
lives at `/Users/vijayabaskar/work/references/ui` (outside this repo; never
linted here).
