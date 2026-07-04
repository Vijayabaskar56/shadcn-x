import type { StyleXStyles } from "@stylexjs/stylex"
import type {
  ComponentType,
  ReactElement,
  SVGProps as ReactSVGProps,
} from "react"

import * as stylex from "@stylexjs/stylex"
import * as LucideIcons from "lucide-react"
import { cloneElement, createElement } from "react"

import type { VariantKey } from "./variants"

import { useDirection } from "./direction"
import { defineVariants } from "./variants"

type IconPosition = "inline-start" | "inline-end"

const styles = stylex.create({
  base: {
    flexShrink: 0,
    // [&_svg]:pointer-events-none — decorative icons; clicks pass to host control; base always applied, size overlays
    pointerEvents: "none",
    // Default 1rem; auto-shrinks in xs button via stylex.when.ancestor; explicit `size` overrides
    width: {
      default: "1rem",
      [stylex.when.ancestor('[data-size="xs"]')]: "0.75rem",
    },
    height: {
      default: "1rem",
      [stylex.when.ancestor('[data-size="xs"]')]: "0.75rem",
    },
  },
  // Directional icons mirror in RTL; `when.ancestor` can't reach <html> dir →
  // JS conditional flip via `useDirection` hook.
  flipRtl: {
    transform: "scaleX(-1)",
  },
})

const sizes = defineVariants(
  stylex.create({
    s: { width: "0.75rem", height: "0.75rem" },
    m: { width: "1rem", height: "1rem" },
    l: { width: "1.25rem", height: "1.25rem" },
  })
)

type IconSize = VariantKey<typeof sizes>

// Library = record of named icon components; IconName narrows to component-valued keys so `name` autocompletes real icons only
type IconLibrary = Record<string, unknown>
type IconName<TLib extends IconLibrary> = {
  [K in keyof TLib]: TLib[K] extends ComponentType<ReactSVGProps<SVGSVGElement>>
    ? K
    : never
}[keyof TLib] &
  string

type CommonIconProps = {
  /** Explicit size; omit for the default (1rem, auto-shrinking in xs buttons). */
  size?: IconSize
  /** Marks the icon for button spacing (data-icon) so the button adjusts padding. */
  position?: IconPosition
  /** Accessible label. Omit for a decorative icon (rendered aria-hidden). */
  label?: string
  /** Flip horizontally in RTL contexts (directional icons: arrows, chevrons). */
  flipRtl?: boolean
  sx?: StyleXStyles
} & Omit<
  ReactSVGProps<SVGSVGElement>,
  | "ref"
  | "color"
  | "width"
  | "height"
  | "name"
  | "children"
  | "className"
  | "style"
>

// Two modes: `name` (type-safe library icon) OR `children` (pass any icon element; fully typed BYO)
type IconProps<TLib extends IconLibrary> =
  | (CommonIconProps & { name: IconName<TLib>; children?: never })
  | (CommonIconProps & { name?: undefined; children: ReactElement })

/**
 * Build an Icon component bound to a specific icon library. The returned `name`
 * prop is typed to that library's icon names, so typos are compile errors and
 * autocomplete lists only real icons. Switching the whole app's icon set is a
 * one-line change here — no React context, so nothing re-renders on swap.
 *
 *   const Icon = createIcon(TablerIcons) // or your own { Name: Component } set
 */
function createIcon<TLib extends IconLibrary>(library: TLib) {
  function Icon({
    name,
    children,
    size,
    position,
    label,
    flipRtl,
    sx,
    ...rest
  }: IconProps<TLib>) {
    const direction = useDirection()
    const injected = {
      ...stylex.props(
        // `base` always applies (flexShrink + pointerEvents + default sizing);
        // explicit `size` overlays width/height and wins (prevents xs shrink).
        styles.base,
        sizes(size),
        flipRtl && direction === "rtl" && styles.flipRtl,
        stylex.defaultMarker(),
        sx
      ),
      "data-slot": "icon",
      "data-icon": position,
      "aria-hidden": label ? undefined : true,
      "aria-label": label,
      role: label ? "img" : undefined,
    } as Record<string, unknown>

    if (name) {
      const Component = library[name] as ComponentType<
        ReactSVGProps<SVGSVGElement>
      >
      return createElement(Component, { ...rest, ...injected })
    }

    // Element mode: size/mark the passed element itself (no descendant selector).
    if (!children) return null
    return cloneElement(children, { ...rest, ...injected })
  }

  return Icon
}

/**
 * The default Icon, bound to lucide-react. `<Icon name="Search" />` works out of
 * the box; bring another library with `createIcon`, or pass any icon element as
 * children: `<Icon><MyCustomSvg /></Icon>`.
 */
const Icon = createIcon(LucideIcons)

export { Icon, createIcon }
export type { IconSize, IconPosition, IconName, IconProps }
