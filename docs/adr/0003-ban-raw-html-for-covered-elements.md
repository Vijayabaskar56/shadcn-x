# Ban raw HTML for the covered element set; grow coverage to minimize raw HTML

## Status

accepted

## Context & Decision

Goal: reduce the use of raw HTML host elements in the consumer app layer **as
much as possible** — without making the guardrail unlivable.

The `no-raw-html` rule therefore bans a **curated set, not the entire host
surface**. The banned-tag list is defined as *exactly the set of elements for
which a shadcn-x primitive exists*:

- **Today:** the layout/text elements `Box`'s `as` already covers — `div`,
  `span`, `section`, `nav`, `article`, `main`, `aside`, `header`, `footer`,
  `ul`/`ol`/`li`, `p`, headings, etc.
- **Not yet banned:** `<input>`, `<svg>`, `<img>`, form controls, media — only
  because no primitive replaces them yet.

As primitives are built (`Input`, `Icon`, `Image`, …), **each new primitive adds
its tag to the banned list.** Coverage and the fence grow in lockstep, so raw
HTML shrinks monotonically toward zero. We only ever ban what we can already
replace — so there is no "no primitive exists" dead end.

## Consequences

- The banned-tag list is the canonical record of which primitives exist; adding a
  primitive is incomplete until its tag is added to the rule.
- Building out the primitive set is the lever that drives raw-HTML usage down;
  the rule just ratchets each gain into place.
- The `eslint-disable` comment remains the sanctioned, visible escape valve for
  the rare deliberate use of a covered element's raw form.

## Superseded approach

An earlier draft banned the *entire* host surface up front ("go all in"). Reverted:
it makes the guardrail unlivable before coverage is complete, and forces an
escape valve for every uncovered tag. The curated-and-growing list achieves the
same end state (near-zero raw HTML) without the dead ends.
