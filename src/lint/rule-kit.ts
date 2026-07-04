import type { Context } from "@oxlint/plugins"

/**
 * Shared scaffolding for the shadcn-x guardrail rules. Rules are authored with
 * oxlint's `createOnce` API (and run under ESLint via `eslintCompatPlugin`),
 * which comes with three recurring chores this kit centralizes:
 *
 * 1. **Source matching** — deciding whether an import source belongs to a
 *    configured package list (`matchesSource`).
 * 2. **Ancestor walks** — climbing `node.parent` until a predicate matches
 *    (`findAncestor`).
 * 3. **Per-file option resolution** — `createOnce` runs once per rule, but
 *    `context.options` is only populated per file (it is `null` at setup
 *    time), so options must be re-resolved in the `before()` hook
 *    (`perFileOption`).
 */

/**
 * True if `value` is one of `sources` or a subpath of one
 * (`"pkg"` matches `"pkg"` and `"pkg/anything"`, never `"pkg-other"`).
 */
export function matchesSource(value: string, sources: string[]): boolean {
  return sources.some((s) => value === s || value.startsWith(`${s}/`))
}

/**
 * Walk up `node.parent` and return the first ancestor for which `predicate`
 * is true, or `null` if none matches. If `stopWhen` is given, the walk is cut
 * short (returning `null`) at the first ancestor it matches — `predicate` is
 * always tested first, so a node matching both still counts as found.
 */
export function findAncestor(
  node: any,
  predicate: (ancestor: any) => boolean,
  stopWhen?: (ancestor: any) => boolean
): any {
  let current = node.parent
  while (current) {
    if (predicate(current)) return current
    if (stopWhen?.(current)) return null
    current = current.parent
  }
  return null
}

/**
 * Per-file option state for `createOnce` rules.
 *
 * `createOnce(context)` runs once per rule while `context.options` is
 * resolved per file, so reading options at setup time silently yields `null`.
 * This helper owns that dance: call `option.before()` first thing in the
 * rule's `before()` hook, then read `option.current` inside visitors.
 *
 * `current` is `defaults` with each key overridden by the same key of the
 * file's first options object when that key is present and not `undefined`
 * (i.e. per-key `?? default` semantics, not a blind spread).
 */
export function perFileOption<Option extends object>(
  context: Context,
  defaults: Option
): { readonly current: Option; before(): void } {
  const state = {
    current: defaults,
    before() {
      const provided = ((context.options ?? [])[0] ?? {}) as Partial<Option>
      const merged = { ...defaults }
      for (const key of Object.keys(defaults) as (keyof Option)[]) {
        const value = provided[key]
        if (value !== undefined) merged[key] = value
      }
      state.current = merged
    },
  }
  return state
}
