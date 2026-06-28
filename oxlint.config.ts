import { defineConfig } from "oxlint"

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
  ],
})
