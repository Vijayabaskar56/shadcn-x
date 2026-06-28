---
title: Button
description: A themeable button built on Base UI with variants and sizes via class-variance-authority.
---

# Button

A themeable button built on the Base UI `Button` primitive, with variants and
sizes powered by [class-variance-authority](https://cva.style).

## Usage

```tsx
import { Button } from "@/components/button"

export function Example() {
  return (
    <Button variant="outline" size="sm">
      Click me
    </Button>
  )
}
```

## Variants

| Variant       | Use for                              |
| ------------- | ------------------------------------ |
| `default`     | Primary actions                      |
| `secondary`   | Secondary actions                    |
| `outline`     | Lower-emphasis actions with a border |
| `ghost`       | Toolbar / icon buttons               |
| `destructive` | Dangerous actions like delete        |
| `link`        | Inline, link-styled actions          |

```tsx
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
```

## Sizes

Sizes range from `xs` to `lg`, plus square `icon` variants for icon-only
buttons.

```tsx
<Button size="xs">Extra small</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Settings">⚙️</Button>
```

> [!NOTE]
> `Button` forwards all native button props and merges your `className` with the
> variant classes, so `<Button className="w-full">` just works.
