import type { StyleXStyles } from "@stylexjs/stylex"
import type {
  ComponentType,
  ReactElement,
  SVGProps as ReactSVGProps,
} from "react"

import * as stylex from "@stylexjs/stylex"
import * as LucideIcons from "lucide-react"
import { cloneElement, createElement } from "react"

type IconSize = "s" | "m" | "l"
type IconPosition = "inline-start" | "inline-end"

const styles = stylex.create({
  base: {
    flexShrink: 0,
    // shadcn's [&_svg]:pointer-events-none — icons are decorative; clicks pass
    // through to the host control (Button/Link). Applied to every icon (the base
    // is always applied; a `size` only overlays width/height).
    pointerEvents: "none",
    // Default 1rem (shadcn's [&_svg:not([class*='size-'])]:size-4); auto-shrink
    // inside an xs button via stylex.when.ancestor (the button carries a marker +
    // data-size). An explicit `size` overrides this (and prevents the shrink).
    width: {
      default: "1rem",
      [stylex.when.ancestor('[data-size="xs"]')]: "0.75rem",
    },
    height: {
      default: "1rem",
      [stylex.when.ancestor('[data-size="xs"]')]: "0.75rem",
    },
  },
  s: { width: "0.75rem", height: "0.75rem" },
  m: { width: "1rem", height: "1rem" },
  l: { width: "1.25rem", height: "1.25rem" },
})

const sizeStyles = {
  s: styles.s,
  m: styles.m,
  l: styles.l,
} satisfies Record<IconSize, unknown>

// A library is any record of named icon components (lucide-react, tabler, a
// custom set, …). `IconName` narrows the keys to the component-valued ones, so
// `name` only autocompletes real icons — not a library's utility exports.
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
  sx?: StyleXStyles
} & Omit<
  ReactSVGProps<SVGSVGElement>,
  "ref" | "color" | "width" | "height" | "name" | "children"
>

// Two mutually-exclusive modes: `name` (resolve from the bound library, type-safe
// to that library's icon names) OR `children` (pass any icon element through —
// keeps the source library's own variant props fully typed; the easiest BYO).
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
    sx,
    ...rest
  }: IconProps<TLib>) {
    const injected = {
      ...stylex.props(
        // `base` always applies (flexShrink + pointerEvents + default sizing);
        // an explicit `size` overlays width/height and, being later, wins — so a
        // sized icon keeps its size and doesn't auto-shrink in xs buttons.
        styles.base,
        size && sizeStyles[size],
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
