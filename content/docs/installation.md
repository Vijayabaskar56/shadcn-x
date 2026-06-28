---
title: Installation
description: Install dependencies and wire up the shadcn-x component layer in a TanStack Start app.
---

# Installation

shadcn-x targets a [TanStack Start](https://tanstack.com/start) app using Tailwind
CSS v4. The steps below assume a fresh project.

## 1. Install dependencies

```bash
bun add @base-ui/react class-variance-authority clsx tailwind-merge
bun add -d tailwindcss @tailwindcss/vite
```

## 2. Add the Tailwind plugin

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss()],
})
```

## 3. Import the styles

Add the global stylesheet to your root route so the theme tokens are available
everywhere.

```tsx
import appCss from "@/styles/globals.css?url"
```

> [!TIP]
> The `cn` helper merges Tailwind classes safely, so later utility classes win
> over earlier ones.

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Requirements

| Tool     | Version |
| -------- | ------- |
| Node     | >= 20   |
| React    | 19      |
| Tailwind | 4       |

Once installed, continue to [Theming](/docs/theming).
