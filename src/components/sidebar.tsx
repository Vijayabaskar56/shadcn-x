import type { StyleXStyles } from "@stylexjs/stylex"
import type { ComponentPropsWithoutRef } from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import type { ButtonProps } from "@/components/button"
import type { InputProps } from "@/components/input"
import type { SeparatorProps } from "@/components/separator"
import type { TooltipContentProps } from "@/components/tooltip"

import { Button } from "@/components/button"
import { Icon } from "@/components/icon"
import { Input } from "@/components/input"
import { Separator } from "@/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/sheet"
import { Text } from "@/components/text"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"

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

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
const u = spacing["--spacing"]

type SidebarState = "expanded" | "collapsed"
type SidebarSide = "left" | "right"
type SidebarVariant = "sidebar" | "floating" | "inset"
type SidebarCollapsible = "offcanvas" | "icon" | "none"
type SidebarMenuButtonVariant = "default" | "outline"
type SidebarMenuButtonSize = "default" | "sm" | "lg"
type SidebarMenuSubButtonSize = "sm" | "md"

type SidebarContextProps = {
  state: SidebarState
  open: boolean
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const Div = "div"
const Main = "main"
const Ul = "ul"
const Li = "li"

const styles = stylex.create({
  wrapper: {
    display: "flex",
    minHeight: "100svh",
    width: "100%",
    backgroundColor: colors["background-primary"],
    color: colors["text-primary"],
  },
  sidebar: {
    color: colors["text-primary"],
  },
  sidebarStatic: {
    display: "flex",
    height: "100%",
    width: "16rem",
    flexDirection: "column",
    backgroundColor: colors["background-card"],
  },
  desktopShell: {
    display: {
      default: "none",
      "@media (min-width: 768px)": "block",
    },
  },
  gap: {
    position: "relative",
    width: "16rem",
    flexShrink: 0,
    backgroundColor: "transparent",
    transitionProperty: "width",
    transitionDuration: duration.fast,
  },
  gapCollapsed: {
    width: "3rem",
  },
  gapOffcanvas: {
    width: 0,
  },
  container: {
    position: "fixed",
    top: 0,
    bottom: 0,
    zIndex: 10,
    display: "flex",
    height: "100svh",
    width: "16rem",
    flexDirection: "column",
    transitionProperty: "inset-inline-start, inset-inline-end, width",
    transitionDuration: duration.fast,
  },
  containerLeft: {
    insetInlineStart: 0,
    borderInlineEndWidth: 1,
    borderInlineEndStyle: "solid",
    borderInlineEndColor: colors["border-primary"],
  },
  containerRight: {
    insetInlineEnd: 0,
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: colors["border-primary"],
  },
  containerOffcanvasLeft: {
    insetInlineStart: "-16rem",
  },
  containerOffcanvasRight: {
    insetInlineEnd: "-16rem",
  },
  containerIcon: {
    width: "3rem",
  },
  containerFloating: {
    padding: spacing.s,
    borderWidth: 0,
  },
  inner: {
    display: "flex",
    width: "100%",
    height: "100%",
    minWidth: 0,
    flexDirection: "column",
    backgroundColor: colors["background-card"],
  },
  innerFloating: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors["border-primary"],
    borderRadius: borderRadius.l,
    boxShadow: boxShadow.s,
    overflow: "hidden",
  },
  mobileContent: {
    width: "18rem",
    maxWidth: "18rem",
    padding: 0,
    backgroundColor: colors["background-card"],
  },
  mobileInner: {
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },
  visuallyHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  trigger: {
    width: `calc(${u} * 7)`,
    height: `calc(${u} * 7)`,
  },
  rail: {
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 20,
    display: {
      default: "none",
      "@media (min-width: 640px)": "flex",
    },
    width: spacing.l,
    cursor: "pointer",
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
  },
  railLeft: {
    insetInlineEnd: `calc(${spacing.l} * -1)`,
  },
  railRight: {
    insetInlineStart: `calc(${spacing.l} * -1)`,
  },
  inset: {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: 0,
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors["background-primary"],
  },
  input: {
    height: `calc(${u} * 8)`,
    backgroundColor: colors["background-primary"],
    boxShadow: boxShadow.none,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.s,
    padding: spacing.s,
  },
  content: {
    display: "flex",
    minHeight: 0,
    flex: 1,
    flexDirection: "column",
    gap: spacing.s,
    overflow: "auto",
  },
  contentIcon: {
    overflow: "hidden",
  },
  group: {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    padding: spacing.s,
  },
  groupLabel: {
    display: "flex",
    height: `calc(${u} * 8)`,
    flexShrink: 0,
    alignItems: "center",
    borderRadius: borderRadius.m,
    paddingInline: spacing.s,
    color: colors["muted-foreground"],
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    outline: "none",
  },
  groupLabelCollapsed: {
    marginTop: `calc(${u} * -8)`,
    opacity: 0,
  },
  groupAction: {
    position: "absolute",
    top: `calc(${u} * 3.5)`,
    insetInlineEnd: spacing.m,
    display: "flex",
    width: `calc(${u} * 5)`,
    aspectRatio: "1",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderRadius: borderRadius.m,
    padding: 0,
    color: colors["text-primary"],
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
    outline: "none",
    cursor: "pointer",
  },
  hideWhenCollapsed: {
    display: "none",
  },
  groupContent: {
    width: "100%",
    fontSize: fontSize.s,
  },
  menu: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: spacing.xs,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  menuItem: {
    position: "relative",
  },
  menuButton: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    alignItems: "center",
    gap: spacing.s,
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: borderRadius.m,
    paddingInline: spacing.s,
    color: colors["text-primary"],
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
      ":active": colors["background-muted"],
    },
    textAlign: "start",
    fontSize: fontSize.s,
    outline: "none",
    cursor: "pointer",
    transitionProperty: "color, background-color, border-color, width, height",
    transitionDuration: duration.fast,
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
    pointerEvents: {
      default: null,
      ":disabled": "none",
    },
  },
  menuButtonDefault: {
    height: `calc(${u} * 8)`,
  },
  menuButtonSm: {
    height: `calc(${u} * 7)`,
    fontSize: fontSize.xs,
  },
  menuButtonLg: {
    height: `calc(${u} * 12)`,
  },
  menuButtonOutline: {
    backgroundColor: colors["background-primary"],
    borderColor: colors["border-primary"],
    boxShadow: boxShadow.s,
  },
  menuButtonActive: {
    backgroundColor: colors["background-muted"],
    color: colors["text-primary"],
    fontWeight: fontWeight.medium,
  },
  menuButtonCollapsed: {
    width: `calc(${u} * 8)`,
    height: `calc(${u} * 8)`,
    padding: spacing.s,
  },
  menuAction: {
    position: "absolute",
    top: `calc(${u} * 1.5)`,
    insetInlineEnd: spacing.xs,
    display: "flex",
    width: `calc(${u} * 5)`,
    aspectRatio: "1",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderRadius: borderRadius.m,
    padding: 0,
    color: colors["text-primary"],
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
    },
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
    outline: "none",
    cursor: "pointer",
  },
  menuActionHover: {
    opacity: {
      default: 1,
      "@media (min-width: 768px)": 0,
      ":focus-visible": 1,
      ":hover": 1,
    },
  },
  menuBadge: {
    position: "absolute",
    top: `calc(${u} * 1.5)`,
    insetInlineEnd: spacing.xs,
    display: "flex",
    minWidth: `calc(${u} * 5)`,
    height: `calc(${u} * 5)`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.m,
    paddingInline: spacing.xs,
    color: colors["text-primary"],
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
    userSelect: "none",
    pointerEvents: "none",
  },
  skeleton: {
    display: "flex",
    height: `calc(${u} * 8)`,
    alignItems: "center",
    gap: spacing.s,
    borderRadius: borderRadius.m,
    paddingInline: spacing.s,
  },
  skeletonBlock: {
    borderRadius: borderRadius.m,
    backgroundColor: colors["background-muted"],
  },
  skeletonIcon: {
    width: "1rem",
    height: "1rem",
    flexShrink: 0,
  },
  skeletonText: (width: string) => ({
    width,
    maxWidth: width,
    height: "1rem",
    flex: 1,
  }),
  menuSub: {
    display: "flex",
    minWidth: 0,
    flexDirection: "column",
    gap: spacing.xs,
    margin: 0,
    marginInline: `calc(${u} * 3.5)`,
    paddingBlock: `calc(${u} * 0.5)`,
    paddingInline: `calc(${u} * 2.5)`,
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: colors["border-primary"],
    listStyle: "none",
  },
  menuSubItem: {
    position: "relative",
  },
  menuSubButton: {
    display: "flex",
    height: `calc(${u} * 7)`,
    minWidth: 0,
    alignItems: "center",
    gap: spacing.s,
    overflow: "hidden",
    borderRadius: borderRadius.m,
    paddingInline: spacing.s,
    color: colors["text-primary"],
    backgroundColor: {
      default: "transparent",
      ":hover": colors["background-muted"],
      ":active": colors["background-muted"],
    },
    textDecorationLine: "none",
    outline: "none",
    boxShadow: {
      default: null,
      ":focus-visible": focusRing.ring,
    },
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
    pointerEvents: {
      default: null,
      ":disabled": "none",
    },
  },
  menuSubButtonSm: {
    fontSize: fontSize.xs,
  },
  menuSubButtonMd: {
    fontSize: fontSize.s,
  },
  separator: {
    width: "auto",
    marginInline: spacing.s,
  },
})

const menuButtonSizeStyles = {
  default: styles.menuButtonDefault,
  sm: styles.menuButtonSm,
  lg: styles.menuButtonLg,
} satisfies Record<SidebarMenuButtonSize, StyleXStyles>

const menuButtonVariantStyles = {
  default: null,
  outline: styles.menuButtonOutline,
} satisfies Record<SidebarMenuButtonVariant, StyleXStyles | null>

const menuSubButtonSizeStyles = {
  sm: styles.menuSubButtonSm,
  md: styles.menuSubButtonMd,
} satisfies Record<SidebarMenuSubButtonSize, StyleXStyles>

type CleanDivProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "color"
>

type CleanMainProps = Omit<
  ComponentPropsWithoutRef<"main">,
  "className" | "style" | "color"
>

type CleanUlProps = Omit<
  ComponentPropsWithoutRef<"ul">,
  "className" | "style" | "color"
>

type CleanLiProps = Omit<
  ComponentPropsWithoutRef<"li">,
  "className" | "style" | "color"
>

type CleanButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "className" | "style" | "color"
>

type CleanAnchorProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "className" | "style" | "color"
>

type SidebarProviderProps = CleanDivProps & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  sx?: StyleXStyles
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
  sx,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value

      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      if (typeof document !== "undefined") {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      }
    },
    [open, setOpenProp]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((current) => !current)
    } else {
      setOpen((current) => !current)
    }
  }, [isMobile, setOpen])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"
  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [isMobile, open, openMobile, setOpen, toggleSidebar, state]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <Div
        data-slot="sidebar-wrapper"
        data-state={state}
        {...stylex.props(styles.wrapper, sx)}
        {...props}
      >
        {children}
      </Div>
    </SidebarContext.Provider>
  )
}

type SidebarProps = CleanDivProps & {
  side?: SidebarSide
  variant?: SidebarVariant
  collapsible?: SidebarCollapsible
  sx?: StyleXStyles
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  children,
  sx,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
  const collapsed = state === "collapsed"

  if (collapsible === "none") {
    return (
      <Div
        data-slot="sidebar"
        data-sidebar="sidebar"
        data-side={side}
        data-variant={variant}
        data-collapsible={collapsible}
        {...stylex.props(styles.sidebar, styles.sidebarStatic, sx)}
        {...props}
      >
        {children}
      </Div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          side={side}
          showCloseButton={false}
          sx={[styles.mobileContent, sx]}
          {...props}
        >
          <SheetHeader sx={styles.visuallyHidden}>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <Div {...stylex.props(styles.mobileInner)}>{children}</Div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Div
      data-slot="sidebar"
      data-state={state}
      data-collapsible={collapsed ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      {...stylex.props(styles.sidebar, styles.desktopShell)}
    >
      <Div
        data-slot="sidebar-gap"
        {...stylex.props(
          styles.gap,
          collapsed && collapsible === "icon" && styles.gapCollapsed,
          collapsed && collapsible === "offcanvas" && styles.gapOffcanvas
        )}
      />
      <Div
        data-slot="sidebar-container"
        data-side={side}
        {...stylex.props(
          styles.container,
          side === "left" ? styles.containerLeft : styles.containerRight,
          collapsed && collapsible === "icon" && styles.containerIcon,
          collapsed &&
            collapsible === "offcanvas" &&
            (side === "left"
              ? styles.containerOffcanvasLeft
              : styles.containerOffcanvasRight),
          (variant === "floating" || variant === "inset") &&
            styles.containerFloating,
          sx
        )}
        {...props}
      >
        <Div
          data-slot="sidebar-inner"
          data-sidebar="sidebar"
          {...stylex.props(
            styles.inner,
            (variant === "floating" || variant === "inset") &&
              styles.innerFloating
          )}
        >
          {children}
        </Div>
      </Div>
    </Div>
  )
}

type SidebarTriggerProps = Omit<ButtonProps, "variant" | "size"> & {
  sx?: StyleXStyles
}

function SidebarTrigger({
  onClick,
  sx,
  children,
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      sx={[styles.trigger, sx]}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {children ?? (
        <>
          <Icon name="PanelLeft" flipRtl />
          <Text as="span" sx={styles.visuallyHidden}>
            Toggle Sidebar
          </Text>
        </>
      )}
    </Button>
  )
}

type SidebarRailProps = CleanButtonProps & {
  sx?: StyleXStyles
}

function SidebarRail({ sx, ...props }: SidebarRailProps) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      title="Toggle Sidebar"
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      sx={[styles.rail, sx]}
      {...props}
    />
  )
}

type SidebarInsetProps = CleanMainProps & {
  sx?: StyleXStyles
}

function SidebarInset({ sx, ...props }: SidebarInsetProps) {
  return (
    <Main
      data-slot="sidebar-inset"
      {...stylex.props(styles.inset, sx)}
      {...props}
    />
  )
}

type SidebarInputProps = InputProps & {
  sx?: StyleXStyles
}

function SidebarInput({ sx, ...props }: SidebarInputProps) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      sx={[styles.input, sx]}
      {...props}
    />
  )
}

type SidebarSectionProps = CleanDivProps & {
  sx?: StyleXStyles
}

function SidebarHeader({ sx, ...props }: SidebarSectionProps) {
  return (
    <Div
      data-slot="sidebar-header"
      data-sidebar="header"
      {...stylex.props(styles.section, sx)}
      {...props}
    />
  )
}

function SidebarFooter({ sx, ...props }: SidebarSectionProps) {
  return (
    <Div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      {...stylex.props(styles.section, sx)}
      {...props}
    />
  )
}

type SidebarSeparatorProps = SeparatorProps & {
  sx?: StyleXStyles
}

function SidebarSeparator({ sx, ...props }: SidebarSeparatorProps) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      sx={[styles.separator, sx]}
      {...props}
    />
  )
}

type SidebarContentProps = CleanDivProps & {
  sx?: StyleXStyles
}

function SidebarContent({ sx, ...props }: SidebarContentProps) {
  const { state } = useSidebar()

  return (
    <Div
      data-slot="sidebar-content"
      data-sidebar="content"
      {...stylex.props(
        styles.content,
        state === "collapsed" && styles.contentIcon,
        sx
      )}
      {...props}
    />
  )
}

type SidebarGroupProps = CleanDivProps & {
  sx?: StyleXStyles
}

function SidebarGroup({ sx, ...props }: SidebarGroupProps) {
  return (
    <Div
      data-slot="sidebar-group"
      data-sidebar="group"
      {...stylex.props(styles.group, sx)}
      {...props}
    />
  )
}

type SidebarGroupLabelProps = useRender.ComponentProps<"div"> &
  CleanDivProps & {
    sx?: StyleXStyles
  }

function SidebarGroupLabel({ render, sx, ...props }: SidebarGroupLabelProps) {
  const { state } = useSidebar()

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        ...stylex.props(
          styles.groupLabel,
          state === "collapsed" && styles.groupLabelCollapsed,
          sx
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  })
}

type SidebarGroupActionProps = useRender.ComponentProps<"button"> &
  CleanButtonProps & {
    sx?: StyleXStyles
  }

function SidebarGroupAction({ render, sx, ...props }: SidebarGroupActionProps) {
  const { state } = useSidebar()

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        ...stylex.props(
          styles.groupAction,
          state === "collapsed" && styles.hideWhenCollapsed,
          sx
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  })
}

type SidebarGroupContentProps = CleanDivProps & {
  sx?: StyleXStyles
}

function SidebarGroupContent({ sx, ...props }: SidebarGroupContentProps) {
  return (
    <Div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      {...stylex.props(styles.groupContent, sx)}
      {...props}
    />
  )
}

type SidebarMenuProps = CleanUlProps & {
  sx?: StyleXStyles
}

function SidebarMenu({ sx, ...props }: SidebarMenuProps) {
  return (
    <Ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      {...stylex.props(styles.menu, sx)}
      {...props}
    />
  )
}

type SidebarMenuItemProps = CleanLiProps & {
  sx?: StyleXStyles
}

function SidebarMenuItem({ sx, ...props }: SidebarMenuItemProps) {
  return (
    <Li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      {...stylex.props(styles.menuItem, sx)}
      {...props}
    />
  )
}

type SidebarMenuButtonProps = useRender.ComponentProps<"button"> &
  CleanButtonProps & {
    isActive?: boolean
    tooltip?: string | TooltipContentProps
    variant?: SidebarMenuButtonVariant
    size?: SidebarMenuButtonSize
    sx?: StyleXStyles
  }

function SidebarMenuButton({
  render,
  isActive = false,
  tooltip,
  variant = "default",
  size = "default",
  sx,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar()
  const collapsed = state === "collapsed"
  const button = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        ...stylex.props(
          styles.menuButton,
          menuButtonVariantStyles[variant],
          menuButtonSizeStyles[size],
          isActive && styles.menuButtonActive,
          collapsed && styles.menuButtonCollapsed,
          sx
        ),
      },
      props
    ),
    render: tooltip ? <TooltipTrigger render={render} /> : render,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: String(isActive),
    },
  })

  if (!tooltip) {
    return button
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip

  return (
    <Tooltip>
      {button}
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  )
}

type SidebarMenuActionProps = useRender.ComponentProps<"button"> &
  CleanButtonProps & {
    showOnHover?: boolean
    sx?: StyleXStyles
  }

function SidebarMenuAction({
  render,
  showOnHover = false,
  sx,
  ...props
}: SidebarMenuActionProps) {
  const { state } = useSidebar()

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        ...stylex.props(
          styles.menuAction,
          showOnHover && styles.menuActionHover,
          state === "collapsed" && styles.hideWhenCollapsed,
          sx
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
    },
  })
}

type SidebarMenuBadgeProps = CleanDivProps & {
  sx?: StyleXStyles
}

function SidebarMenuBadge({ sx, ...props }: SidebarMenuBadgeProps) {
  const { state } = useSidebar()

  return (
    <Div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      {...stylex.props(
        styles.menuBadge,
        state === "collapsed" && styles.hideWhenCollapsed,
        sx
      )}
      {...props}
    />
  )
}

type SidebarMenuSkeletonProps = CleanDivProps & {
  showIcon?: boolean
  sx?: StyleXStyles
}

function SidebarMenuSkeleton({
  showIcon = false,
  sx,
  ...props
}: SidebarMenuSkeletonProps) {
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })

  return (
    <Div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      {...stylex.props(styles.skeleton, sx)}
      {...props}
    >
      {showIcon && (
        <Div
          data-sidebar="menu-skeleton-icon"
          {...stylex.props(styles.skeletonBlock, styles.skeletonIcon)}
        />
      )}
      <Div
        data-sidebar="menu-skeleton-text"
        {...stylex.props(styles.skeletonBlock, styles.skeletonText(width))}
      />
    </Div>
  )
}

type SidebarMenuSubProps = CleanUlProps & {
  sx?: StyleXStyles
}

function SidebarMenuSub({ sx, ...props }: SidebarMenuSubProps) {
  const { state } = useSidebar()

  return (
    <Ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      {...stylex.props(
        styles.menuSub,
        state === "collapsed" && styles.hideWhenCollapsed,
        sx
      )}
      {...props}
    />
  )
}

type SidebarMenuSubItemProps = CleanLiProps & {
  sx?: StyleXStyles
}

function SidebarMenuSubItem({ sx, ...props }: SidebarMenuSubItemProps) {
  return (
    <Li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      {...stylex.props(styles.menuSubItem, sx)}
      {...props}
    />
  )
}

type SidebarMenuSubButtonProps = useRender.ComponentProps<"a"> &
  CleanAnchorProps & {
    size?: SidebarMenuSubButtonSize
    isActive?: boolean
    sx?: StyleXStyles
  }

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  sx,
  ...props
}: SidebarMenuSubButtonProps) {
  const { state } = useSidebar()

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        ...stylex.props(
          styles.menuSubButton,
          menuSubButtonSizeStyles[size],
          isActive && styles.menuButtonActive,
          state === "collapsed" && styles.hideWhenCollapsed,
          sx
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: String(isActive),
    },
  })
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

export type {
  SidebarCollapsible,
  SidebarMenuButtonSize,
  SidebarMenuButtonVariant,
  SidebarMenuSubButtonSize,
  SidebarSide,
  SidebarState,
  SidebarVariant,
}
