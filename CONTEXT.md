# shadcn-x

An LLM-safe, copy-paste component library built on StyleX + Base UI. It follows
shadcn's *you-own-the-code* philosophy while making off-brand decisions hard to
express, so an AI agent writing UI lands on-system by default.

## Language

### Core thesis

**LLM-safe**:
A property of the system: expressing an off-brand decision in code is
hard-to-impossible because types and lint reject anything that is not a decision
we have actually made. Documentation is a probability; enforcement is a guarantee.
_Avoid_: AI-friendly, agent-ready

**AX (Agent Experience)**:
How reliably an AI agent produces correct, on-brand, themeable UI given only our
docs and types. The project's primary success criterion.
_Avoid_: DX-for-AI

**On-system**:
Code that expresses only existing design decisions, via tokens and primitives.
_Avoid_: compliant, valid

**Off-system**:
Code that is valid and renders, but uses values or elements outside the system
(a raw hex, `<div className="p-4">`). The failure static analysis usually misses.
_Avoid_: off-brand (use only for the visual result, not the code)

**Decision** (Token-as-decision):
A named token represents a role we chose (`padding="l"` = large spacing role),
not a raw value (`16px`). Two elements with the same token declare the same
decision, not a coincidence.
_Avoid_: variable, value, setting

**Escape hatch**:
Any opening that lets code bypass tokens — a raw layout element, arbitrary
`className`, inline `style`, or arbitrary-value syntax. Closing these is what
makes the closed prop surface actually hold.
_Avoid_: override, workaround

### Layers

**Library source layer**:
The component source the consumer copies in and owns (e.g. `box.tsx`). Stays
infinitely editable — guardrails do NOT police it. This is where customizability
lives.
_Avoid_: internals, vendor code

**Consumer app layer**:
The application screens an agent writes *using* the components. This is where
guardrails apply.
_Avoid_: userland, downstream

**Guardrail**:
An opt-in lint rule that catches off-system code in the consumer app layer. A
guardrail is a fence around escape hatches, never a constraint on the source you
own.
_Avoid_: restriction, constraint, rule (when ambiguous)

### Customization

Raw `className`/`style` are banned on primitives. The sanctioned, on-system ways
to customize, in order of reach:

**Re-theme**:
Overriding token *values* for a subtree via `stylex.createTheme`, without
touching any component. The way to re-skin globally or per-region.
_Avoid_: override styles, restyle

**sx**:
The typed per-instance override prop on a primitive. Accepts StyleX styles only
(`StyleXStyles`), constrained where practical to token values, and merged last.
The controlled escape valve that replaces raw `className`/`style`.
_Avoid_: className, style, css prop

**Variant**:
A discrete, documented prop permutation (`variant`/`size`/`tone`) mapped to an
internal style. The first-choice customization knob.
_Avoid_: mode, kind, flavor
