import { defineConfig } from "oxfmt"

export default defineConfig({
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "es5",
  printWidth: 80,
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  sortTailwindcss: {
    stylesheet: "./src/styles/globals.css",
    functions: ["cn", "cva"],
  },
  sortImports: {
    groups: [
      "type-import",
      ["value-builtin", "value-external"],
      "type-internal",
      "value-internal",
      ["type-parent", "type-sibling", "type-index"],
      ["value-parent", "value-sibling", "value-index"],
      "unknown",
    ],
  },
  ignorePatterns: [
    "**/routeTree.gen.ts",
    "**/node_modules/**",
    "**/.output/**",
    "**/.tanstack/**",
    "**/dist/**",
  ],
})
