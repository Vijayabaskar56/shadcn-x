# Gotchas

Consulted when the build, a token, or a test behaves unexpectedly. Learned
building Box/Button/Icon and removing Tailwind.

- **`Box` covers only tags without a dedicated primitive** — `div span section nav ul ol li form fieldset time figure figcaption blockquote pre code hr` (and `table`/`th`/`td` for MDX prose infra only). Elements with a primitive (`p`/`h1`–`h6` → `Text`, `a` → `Link`, `button` → `Button`, `label` → `Label`, `img` → `Image`, table family → `Table`) are NOT in `AllowedElement` — use the primitive, not `Box as="X"`. Need a tag it lacks? Add it to `AllowedElement` in `box.tsx`.
- **Spreading HTML element props onto `Box`** (renderers/wrappers): omit the attrs that clash with Box's typed props — `Omit<ComponentPropsWithoutRef<E>, "color" | "width" | "height" | "border">`. Otherwise TS errors (HTML `color`/`width`/`border` are `string`/`number`, Box's are typed).
- **`light-dark()` survives the build only because `vite.config.ts` pins `stylex.vite({ lightningcssOptions: { targets } })` to modern browsers.** StyleX's unplugin runs lightningcss over the token CSS; with old targets it lowers `light-dark(oklch(a),oklch(b))` into two space-separated values → invalid `background-color` (transparent) and split per-axis `border-color`. Do NOT lower those targets.
- **No broad `*` resets in `globals.css`.** StyleX atomic styles live in `@layer`, and unlayered rules beat layered ones regardless of specificity — a `* { border-width: 0; margin: 0 }` silently kills every StyleX border/margin. Keep global resets narrow (box-sizing, `body` margin).
- **StyleX component tests need the StyleX plugin in `vitest.config.ts`** (already wired) — `defineVars` throws at runtime otherwise. To verify one component in isolation while other files are mid-edit, run `bunx vitest run tests/components/<name>.test.tsx` (loads only its import graph).
- **The lint plugin is authored with oxlint's `createOnce`** — per-file options/state go in a `before()` hook (`context.options` is `null` at `createOnce` setup time). Don't hand-roll that dance — `src/lint/rule-kit.ts` provides `perFileOption` (plus `matchesSource` and `findAncestor`) for rule scaffolding.
- **`.mdx` docs aren't linted** (oxlint globs only js/ts) — keep examples on-system anyway; they're the canonical reference an agent will copy.
- **StyleX self-selectors that silently drop:** attribute/`data-*`/`aria-*` keys emit no CSS (see the state-styling rule in `SKILL.md`). When a state style "does nothing", this is why — switch to a JS conditional.
