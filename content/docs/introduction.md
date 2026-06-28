---
title: Introduction
description: shadcn-x is a small, themeable React component layer built on Base UI, Tailwind CSS, and StyleX.
---

# Introduction

**shadcn-x** is a small, themeable React component layer built on
[Base UI](https://base-ui.com), [Tailwind CSS](https://tailwindcss.com), and
[StyleX](https://stylexjs.com). It ships a handful of primitives you own and
edit directly — no black-box dependency to upgrade.

> [!NOTE]
> These docs are themselves powered by [content-collections](https://www.content-collections.dev),
> compiled at build time and rendered through TanStack Start.

## Why shadcn-x

- **You own the code.** Components live in your `src/components` folder — copy,
  paste, and adapt them.
- **Themeable by default.** Colors and radii are driven by CSS variables, with a
  light and dark theme out of the box.
- **Accessible primitives.** Built on Base UI, so focus management, keyboard
  navigation, and ARIA are handled for you.

## A quick taste

```tsx
import { Button } from "@/components/button"

export function Example() {
  return <Button variant="default">Get started</Button>
}
```

Head to [Installation](/docs/installation) to set it up, or jump straight to the
[Button](/docs/button) and [Box](/docs/box) component docs.
