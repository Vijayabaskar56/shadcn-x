---
title: Box
description: A polymorphic layout primitive powered by StyleX design tokens.
---

# Box

`Box` is a polymorphic layout primitive powered by StyleX design tokens. It is
the lowest-level building block for composing layouts without writing one-off
CSS.

## Usage

```tsx
import { Box } from "@/components/box"

export function Example() {
  return (
    <Box display="flex" flexDirection="column" gap="xl" padding="xl">
      <Box as="h1" fontSize="xl" fontWeight="bold" color="text-primary">
        Hello
      </Box>
    </Box>
  )
}
```

## Polymorphism

Use the `as` prop to render any element while keeping the same styling props:

```tsx
<Box as="section" padding="lg">…</Box>
<Box as="h2" fontSize="lg">Heading</Box>
```

## Token-driven props

Spacing, color, and typography props accept token names rather than raw values,
so everything stays consistent with the theme.

| Prop       | Example values               |
| ---------- | ---------------------------- |
| `padding`  | `sm`, `md`, `lg`, `xl`       |
| `gap`      | `sm`, `md`, `lg`, `xl`       |
| `fontSize` | `sm`, `md`, `lg`, `xl`       |
| `color`    | `text-primary`, `text-muted` |

> [!TIP]
> Because `Box` only emits atomic StyleX classes, repeated style combinations
> are deduplicated across your whole app.
