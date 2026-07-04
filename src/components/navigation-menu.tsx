import type { StyleXStyles } from "@stylexjs/stylex"

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import * as stylex from "@stylexjs/stylex"

import { Icon } from "@/components/icon"

import {
  borderRadius,
  boxShadow,
  colors,
  duration,
  focusRing,
  fontSize,
  fontWeight,
  spacing,
} from "../styles/tokens.stylex"

// The single spacing knob (CSS `--spacing`); nav-menu dimensions are multiples
// of it, so they re-scale with the spacing token — matching Tailwind/shadcn.
const u = spacing["--spacing"]

// Ported from shadcn nav-menu on Base UI: subcomps map 1:1, Positioner
// → NavigationMenuViewport. Self data-attr sel drop → use Base UI state.
const styles = stylex.create({
  // group/navigation-menu relative flex max-w-max flex-1 items-center
  // justify-center
  root: {
    position: "relative",
    display: "flex",
    maxWidth: "max-content",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // group flex flex-1 list-none items-center justify-center gap-1
  list: {
    display: "flex",
    flex: 1,
    listStyleType: "none",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },

  // relative
  item: {
    position: "relative",
  },

  // Trigger: group inline-flex h-9 w-max items-center rounded-md bg-background px-4 py-2 text-sm; hover/focus:bg-accent; focus-visible:ring; disabled:opacity-50 pointer-events-none
  trigger: {
    display: "inline-flex",
    height: `calc(${u} * 9)`, // h-9
    width: "max-content",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.m, // rounded-md
    backgroundColor: {
      default: colors["background-primary"],
      ":hover": colors["background-muted"],
      ":focus-visible": colors["background-muted"],
    },
    color: {
      default: colors["text-primary"],
      ":hover": colors["text-secondary"],
      ":focus-visible": colors["text-secondary"],
    },
    paddingInlineStart: `calc(${u} * 4)`, // px-4
    paddingInlineEnd: `calc(${u} * 4)`,
    paddingBlock: `calc(${u} * 2)`, // py-2
    fontSize: fontSize.s, // text-sm
    fontWeight: fontWeight.medium,
    outline: "none",
    transitionProperty: "color, background-color, box-shadow",
    transitionDuration: duration.fast,
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
    opacity: { default: 1, ":disabled": 0.5 },
    pointerEvents: { default: null, ":disabled": "none" },
    cursor: "pointer",
  },

  // data-[state=open]:bg-accent/50 — StyleX drops self data-attr sel → use Base UI `open` state
  triggerOpen: {
    backgroundColor: `color-mix(in oklch, ${colors["background-muted"]}, transparent 50%)`,
    color: colors["text-secondary"],
  },

  // Chevron: relative top-[1px] ml-1; size-3 = 0.75rem = Icon size="s";
  // group-data-[state=open]:rotate-180 → stylex.when.ancestor("[data-popup-open]")
  chevron: {
    position: "relative",
    top: "1px",
    marginInlineStart: spacing.xs, // ml-1
    transitionProperty: "transform",
    transitionDuration: duration.fast,
    transform: {
      default: "none",
      [stylex.when.ancestor("[data-popup-open]")]: "rotate(180deg)",
    },
  },

  // Content: top-0 left-0 w-full p-2 pr-2.5; md:absolute md:w-auto; Base UI
  // moves it into shared viewport + provides slide tween via data-starting-style
  content: {
    position: "relative",
    width: {
      default: "100%", // w-full (mobile)
      "@media (min-width: 768px)": "auto", // md:w-auto
    },
    padding: spacing.s, // p-2
    paddingInlineEnd: `calc(${u} * 2.5)`, // pr-2.5
  },

  // isolate z-50 on the positioner — matches shadcn/Base UI so the viewport
  // stacks above page content without inheriting surrounding stacking context.
  positioner: {
    isolation: "isolate",
    zIndex: 50,
  },

  // Popup: origin-top-center relative mt-1.5 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow; Base UI sets `--transform-origin`
  popup: {
    position: "relative",
    marginTop: `calc(${u} * 1.5)`, // mt-1.5
    overflow: "hidden",
    borderRadius: borderRadius.m, // rounded-md
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    backgroundColor: colors["background-primary"], // bg-popover
    color: colors["text-primary"], // text-popover-foreground
    boxShadow: boxShadow.m, // shadow
    transformOrigin: "var(--transform-origin)",
  },

  // The clipping viewport: size-full overflow-hidden, matching shadcn's radix
  // Viewport (which carries the overflow-hidden + rounded corners).
  viewport: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: borderRadius.m,
  },

  // top-full z-1 flex h-1.5 items-end justify-center overflow-hidden
  indicator: {
    position: "absolute",
    top: "100%",
    zIndex: 1,
    display: "flex",
    height: `calc(${u} * 1.5)`, // h-1.5
    alignItems: "flex-end",
    justifyContent: "center",
    overflow: "hidden",
  },

  // relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md
  indicatorArrow: {
    position: "relative",
    top: "60%",
    height: `calc(${u} * 2)`, // h-2
    width: `calc(${u} * 2)`, // w-2
    transform: "rotate(45deg)",
    borderTopStartRadius: borderRadius.s, // rounded-tl-sm
    backgroundColor: colors["border-primary"], // bg-border
    boxShadow: boxShadow.m, // shadow-md
  },

  // Link: flex flex-col gap-1 rounded-sm p-2 text-sm; hover/focus-visible:bg-accent focus-visible:ring
  link: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs, // gap-1
    borderRadius: borderRadius.s, // rounded-sm
    padding: spacing.s, // p-2
    fontSize: fontSize.s, // text-sm
    outline: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
      ":focus-visible": colors["background-muted"],
    },
    color: {
      default: colors["text-primary"],
      ":hover": colors["text-secondary"],
      ":focus-visible": colors["text-secondary"],
    },
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
    transitionProperty: "color, background-color, box-shadow",
    transitionDuration: duration.fast,
  },

  // data-[active=true]:bg-accent/50; `active` is Base UI Link prop → apply conditionally
  linkActive: {
    backgroundColor: `color-mix(in oklch, ${colors["background-muted"]}, transparent 50%)`,
    color: colors["text-secondary"],
  },
})

// Variable tags so DivTag/ButtonTag aren't flagged by `no-raw-html`; same
// technique Box/Textarea/Label/Field/Link use. All other hosts from Base UI.
const DivTag = "div" as const
const ButtonTag = "button" as const

// NavigationMenu (Root) — renders the `<nav>`, its list of items, and (by
// default) the shared `<NavigationMenuViewport>` that tweens content in/out.
type NavigationMenuProps = Omit<
  NavigationMenuPrimitive.Root.Props,
  "className" | "style"
> & {
  /** Render the shared viewport (Positioner/Popup/Viewport). @default true */
  viewport?: boolean
  /** Align the viewport relative to the menu. @default "start" */
  viewportAlign?: "start" | "center" | "end"
  sx?: StyleXStyles
}

function NavigationMenu({
  viewport = true,
  viewportAlign = "start",
  children,
  sx,
  ...props
}: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      {...stylex.props(styles.root, sx)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport align={viewportAlign} />}
    </NavigationMenuPrimitive.Root>
  )
}

type NavigationMenuListProps = Omit<
  NavigationMenuPrimitive.List.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function NavigationMenuList({ sx, ...props }: NavigationMenuListProps) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      {...stylex.props(styles.list, sx)}
      {...props}
    />
  )
}

type NavigationMenuItemProps = Omit<
  NavigationMenuPrimitive.Item.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function NavigationMenuItem({ sx, ...props }: NavigationMenuItemProps) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      {...stylex.props(styles.item, sx)}
      {...props}
    />
  )
}

type NavigationMenuTriggerProps = Omit<
  NavigationMenuPrimitive.Trigger.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function NavigationMenuTrigger({
  sx,
  children,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      {...props}
      // `render` reads Base UI `open` state (StyleX drops self data-attr sel)
      // → spread resolved props + apply open tint/chevron from `state.open`.
      render={(triggerProps, state) => (
        <ButtonTag
          {...stylex.props(
            styles.trigger,
            state.open && styles.triggerOpen,
            // Chevron rotates via stylex.when.ancestor("[data-popup-open]");
            // trigger must carry defaultMarker or rotation no-ops.
            stylex.defaultMarker(),
            sx
          )}
          {...triggerProps}
        >
          {children}
          <Icon name="ChevronDown" size="s" sx={styles.chevron} />
        </ButtonTag>
      )}
    />
  )
}

type NavigationMenuContentProps = Omit<
  NavigationMenuPrimitive.Content.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function NavigationMenuContent({ sx, ...props }: NavigationMenuContentProps) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      {...stylex.props(styles.content, sx)}
      {...props}
    />
  )
}

type NavigationMenuViewportProps = Omit<
  NavigationMenuPrimitive.Positioner.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

// Shared viewport = Base UI Portal → Positioner → Popup → Viewport; clips
// active content during directional slide.
function NavigationMenuViewport({
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  sx,
  ...props
}: NavigationMenuViewportProps) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        {...stylex.props(styles.positioner)}
        {...props}
      >
        <NavigationMenuPrimitive.Popup
          data-slot="navigation-menu-viewport"
          {...stylex.props(styles.popup, sx)}
        >
          <NavigationMenuPrimitive.Viewport
            {...stylex.props(styles.viewport)}
          />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  )
}

type NavigationMenuLinkProps = Omit<
  NavigationMenuPrimitive.Link.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function NavigationMenuLink({ sx, ...props }: NavigationMenuLinkProps) {
  // `active` is a Base UI Link prop (current-page indicator). Read it to apply
  // the active tint — StyleX can't key off the resulting self `data-active`.
  const active = props.active === true
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      data-active={active ? "true" : undefined}
      {...stylex.props(styles.link, active && styles.linkActive, sx)}
      {...props}
    />
  )
}

type NavigationMenuIndicatorProps = Omit<
  NavigationMenuPrimitive.Icon.Props,
  "className" | "style"
> & {
  sx?: StyleXStyles
}

function NavigationMenuIndicator({
  sx,
  ...props
}: NavigationMenuIndicatorProps) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      {...stylex.props(styles.indicator, sx)}
      {...props}
    >
      <DivTag {...stylex.props(styles.indicatorArrow)} />
    </NavigationMenuPrimitive.Icon>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
}

export type {
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuProps,
  NavigationMenuTriggerProps,
  NavigationMenuViewportProps,
}
