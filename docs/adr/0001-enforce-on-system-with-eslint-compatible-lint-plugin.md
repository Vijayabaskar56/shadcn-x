# Enforce on-system usage with an ESLint-compatible lint plugin

## Status

accepted

## Context & Decision

shadcn-x must make off-system code (raw `<div className="p-4">`, inline magic
values, non-token colors) hard to ship, not merely discouraged in docs. Two
enforcement mechanisms exist and we use **both, for different failure modes**:

- **Type system** — enforces the *closed prop surface* on our primitives
  (`Box`, etc.). Positive guidance: autocomplete offers only valid tokens, typos
  become type errors. It works in the editor before generation settles, but is
  blind to *alternatives* — it cannot stop an agent reaching for a raw `<div>`.
- **Lint plugin** — the *fence around the escape hatches*. Only lint can catch
  cross-file patterns (raw layout elements, inline `style`, direct hex imports)
  that types cannot see.

The guardrails apply at the **consumer app layer** (screens written *using* the
components), never the **library source layer** (the copied-in component code the
consumer owns and edits freely). Customizability lives in the source; safety
lives in how app code uses it. The two never touch the same files, so "guardrail"
never becomes "constraint."

The lint plugin is written against the **`eslintCompatPlugin`** API so the same
source runs under both **oxlint** (our fast primary runner) and **ESLint**.
Because shadcn-x is copy-paste, components land in consumer repos that mostly run
ESLint; an oxlint-only guardrail would protect our dev loop but not the agent
writing code in a consumer's repo — which is the whole point.

## Consequences

- We bet on oxlint's JS-plugin API while it is in alpha/beta. Accepted: oxlint is
  primary and the ESLint-compatible shape is the hedge if the oxc runtime shifts.
- The guardrail is **opt-in** — enabling the plugin is a consumer choice, so the
  library stays usable without it.
