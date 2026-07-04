import { fileURLToPath } from "node:url"
import { defineConfig } from "oxlint"

// Absolute path to our local lint plugin, derived from this config's location so
// it resolves regardless of cwd (oxlint loads JS plugins via Node ESM).
const shadcnXPlugin = fileURLToPath(
  new URL("./src/lint/index.ts", import.meta.url)
)

export default defineConfig({
  plugins: [
    "react",
    "react-perf",
    "typescript",
    "jsx-a11y",
    "import",
    "unicorn",
    "promise",
    "node",
    "oxc",
  ],
  jsPlugins: [
    { name: "react-hooks-js", specifier: "eslint-plugin-react-hooks" },
    { name: "shadcn-x", specifier: shadcnXPlugin },
  ],
  rules: {
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "no-console": "off",
    "no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],

    "react/react-in-jsx-scope": "off",
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "warn",

    "react-hooks-js/set-state-in-render": "warn",
    "react-hooks-js/set-state-in-effect": "warn",
    "react-hooks-js/no-deriving-state-in-effects": "warn",
    "react-hooks-js/purity": "warn",
    "react-hooks-js/immutability": "warn",
    "react-hooks-js/refs": "warn",
    "react-hooks-js/globals": "warn",
    "react-hooks-js/static-components": "warn",
    "react-hooks-js/error-boundaries": "warn",
    "react-hooks-js/use-memo": "warn",
    "react-hooks-js/void-use-memo": "warn",
    "react-hooks-js/preserve-manual-memoization": "warn",
    "react-hooks-js/incompatible-library": "warn",
    "react-hooks-js/unsupported-syntax": "warn",
    "react-hooks-js/gating": "warn",
    "react-hooks-js/config": "warn",

    "typescript/no-explicit-any": "warn",
    "typescript/no-non-null-assertion": "warn",
    "typescript/prefer-ts-expect-error": "warn",
    "typescript/no-floating-promises": "warn",
    "typescript/unbound-method": "warn",

    "import/no-duplicates": "error",
    "import/no-self-import": "error",
    "import/no-cycle": "warn",
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "promise/no-nesting": "warn",
    "promise/no-return-wrap": "error",

    // TanStack Router's <Link> renders real client-side anchors via `to`, and
    // Base UI's render-prop pattern composes links — both trip these rules.
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/anchor-has-content": "off",

    // shadcn-x guardrails (ADR-0001/0002/0003). "warn" while the migration is in
    // flight; each flips to "error" as the matching primitive ships and the app
    // layer is ported off raw HTML / className.
    // no-raw-html: src is fully migrated, so raw hosts there are a hard error.
    // Test fixtures deliberately render raw hosts (asserting the guardrail, and
    // exercising primitives' host props) — kept at "warn" via the tests override.
    "shadcn-x/no-raw-html": "error",
    "shadcn-x/no-className-style": "warn",
    "shadcn-x/no-physical-stylex-properties": "warn",
    "shadcn-x/no-raw-design-values": "warn",
    // no-stylex-atoms is prevention, not migration — we never imported atoms, so
    // any arbitrary-value atom import is a hard error from the start (ADR-0002).
    "shadcn-x/no-stylex-atoms": "error",
    "shadcn-x/no-manual-overflow": "error",
  },
  settings: {
    "jsx-a11y": {
      polymorphicPropName: "as",
      components: {
        Button: "button",
        Link: "a",
        Input: "input",
      },
    },
    react: {
      linkComponents: [{ name: "Link", attribute: "to" }],
      version: "19.0",
    },
  },
  env: {
    builtin: true,
    browser: true,
    node: true,
    es2024: true,
  },
  globals: {},
  ignorePatterns: [
    "**/routeTree.gen.ts",
    "**/node_modules/**",
    "**/.output/**",
    "**/.tanstack/**",
    "**/dist/**",
    "**/public/**",
  ],
  overrides: [
    {
      files: ["**/routeTree.gen.ts"],
      rules: {
        "unicorn/filename-case": "off",
        "unicorn/no-abusive-eslint-disable": "off",
      },
    },
    {
      // Lint rules interface with untyped AST nodes; `any` is idiomatic here.
      files: ["src/lint/**/*.ts"],
      rules: {
        "typescript/no-explicit-any": "off",
      },
    },
    {
      // Docs MDX infra: the renderer map's heading functions receive content via
      // props.children (heading-has-content can't see it).
      files: ["src/components/docs/mdx-components.tsx"],
      rules: {
        "jsx-a11y/heading-has-content": "off",
      },
    },
    {
      // Test fixtures deliberately render raw host elements — to assert the
      // guardrail itself and to exercise primitives' native host props. Keep
      // no-raw-html at "warn" here so those fixtures don't fail the build (src
      // stays at "error").
      files: ["tests/**"],
      rules: {
        "shadcn-x/no-raw-html": "warn",
      },
    },
  ],
})
