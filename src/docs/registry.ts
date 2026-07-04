import type { StyleXStyles } from "@stylexjs/stylex"
import type { MDXComponents } from "mdx/types"

import { Line, LineChart, XAxis } from "recharts"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert-dialog"
import { AspectRatio } from "@/components/aspect-ratio"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/avatar"
import { Badge } from "@/components/badge"
import { Box } from "@/components/box"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb"
import { Button } from "@/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/button-group"
import { Calendar } from "@/components/calendar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/chart"
import { Checkbox } from "@/components/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/combobox"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandLabel,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/command"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/context-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
import { DirectionProvider } from "@/components/direction"
import {
  resizablePreviewStyles,
  scrollAreaPreviewStyles,
} from "@/components/docs/preview-styles"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/empty"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/field"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card"
import { Icon } from "@/components/icon"
import { Image } from "@/components/image"
import { Input } from "@/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/input-otp"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/item"
import { Kbd, KbdGroup } from "@/components/kbd"
import { Label } from "@/components/label"
import { Link } from "@/components/link"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/menubar"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/native-select"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/popover"
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/progress"
import { RadioGroup, RadioGroupItem } from "@/components/radio-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/resizable"
import { ScrollArea, ScrollBar } from "@/components/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/select"
import { Separator } from "@/components/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet"
import {
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
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/sidebar"
import { Skeleton } from "@/components/skeleton"
import { Slider } from "@/components/slider"
import { Toaster } from "@/components/sonner"
import { Spinner } from "@/components/spinner"
import { Switch } from "@/components/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { Text } from "@/components/text"
import { Textarea } from "@/components/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import { Toggle } from "@/components/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip"

/**
 * The docs registry: one entry per doc under `content/docs`. Everything the
 * docs site needs to know about a doc lives here —
 *
 * - `slug`   — the file's path under `content/docs` (no extension). Typed once;
 *              nav, prev/next, and the parity tests all read it from here.
 * - `label`  — the sidebar / prev-next label.
 * - `components` — the primitives the doc's live previews use, exposed to MDX
 *              via the derived {@link registryMdxComponents} map. A component
 *              only needs to be registered once (the maps are merged), so
 *              shared primitives like `Box`/`Text` live under their own entry.
 * - `previewStyles` — bespoke `stylex.create` blocks the doc imports from
 *              `preview-styles.ts` (StyleX can't compile `.mdx`), recorded so
 *              the registry stays the one place describing a doc's surface.
 * - `navHidden` — registered (so previews render and tests cover it) but kept
 *              out of the sidebar.
 *
 * Section/entry order here IS the nav order — `docsNav` in `docs-config.ts`
 * is derived from this array.
 */
export type DocRegistryEntry = {
  label: string
  slug: string
  components?: MDXComponents
  previewStyles?: Record<string, StyleXStyles>
  navHidden?: boolean
}

export type DocRegistrySection = {
  label: string
  entries: Array<DocRegistryEntry>
}

export const docsRegistry: Array<DocRegistrySection> = [
  {
    label: "Getting Started",
    entries: [
      { label: "Introduction", slug: "introduction" },
      { label: "Installation", slug: "installation" },
      { label: "Theming", slug: "theming" },
    ],
  },
  {
    label: "Components",
    entries: [
      {
        label: "Accordion",
        slug: "accordion",
        components: {
          Accordion,
          AccordionContent,
          AccordionItem,
          AccordionTrigger,
        },
      },
      {
        label: "Alert",
        slug: "alert",
        components: { Alert, AlertAction, AlertDescription, AlertTitle },
      },
      {
        label: "Alert Dialog",
        slug: "alert-dialog",
        components: {
          AlertDialog,
          AlertDialogAction,
          AlertDialogCancel,
          AlertDialogContent,
          AlertDialogDescription,
          AlertDialogFooter,
          AlertDialogHeader,
          AlertDialogMedia,
          AlertDialogOverlay,
          AlertDialogPortal,
          AlertDialogTitle,
          AlertDialogTrigger,
        },
      },
      {
        label: "Aspect Ratio",
        slug: "aspect-ratio",
        components: { AspectRatio },
      },
      {
        label: "Avatar",
        slug: "avatar",
        components: {
          Avatar,
          AvatarBadge,
          AvatarFallback,
          AvatarGroup,
          AvatarGroupCount,
          AvatarImage,
        },
      },
      { label: "Badge", slug: "badge", components: { Badge } },
      { label: "Box", slug: "box", components: { Box } },
      {
        label: "Breadcrumb",
        slug: "breadcrumb",
        components: {
          Breadcrumb,
          BreadcrumbEllipsis,
          BreadcrumbItem,
          BreadcrumbLink,
          BreadcrumbList,
          BreadcrumbPage,
          BreadcrumbSeparator,
        },
      },
      { label: "Button", slug: "button", components: { Button } },
      {
        label: "Button Group",
        slug: "button-group",
        components: { ButtonGroup, ButtonGroupSeparator, ButtonGroupText },
      },
      { label: "Calendar", slug: "calendar", components: { Calendar } },
      {
        label: "Card",
        slug: "card",
        components: {
          Card,
          CardAction,
          CardContent,
          CardDescription,
          CardFooter,
          CardHeader,
          CardTitle,
        },
      },
      {
        label: "Carousel",
        slug: "carousel",
        components: {
          Carousel,
          CarouselContent,
          CarouselItem,
          CarouselNext,
          CarouselPrevious,
        },
      },
      {
        label: "Chart",
        slug: "chart",
        components: {
          ChartContainer,
          ChartTooltip,
          ChartTooltipContent,
          // recharts building blocks used inside chart previews.
          Line,
          LineChart,
          XAxis,
        },
      },
      { label: "Checkbox", slug: "checkbox", components: { Checkbox } },
      {
        label: "Collapsible",
        slug: "collapsible",
        components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
      },
      {
        label: "Combobox",
        slug: "combobox",
        components: {
          Combobox,
          ComboboxChip,
          ComboboxChips,
          ComboboxChipsInput,
          ComboboxClear,
          ComboboxCollection,
          ComboboxContent,
          ComboboxEmpty,
          ComboboxGroup,
          ComboboxInput,
          ComboboxItem,
          ComboboxLabel,
          ComboboxList,
          ComboboxSeparator,
          ComboboxTrigger,
          ComboboxValue,
        },
      },
      {
        label: "Command",
        slug: "command",
        components: {
          Command,
          CommandDialog,
          CommandEmpty,
          CommandGroup,
          CommandInput,
          CommandItem,
          CommandLabel,
          CommandList,
          CommandSeparator,
          CommandShortcut,
        },
      },
      {
        label: "Context Menu",
        slug: "context-menu",
        components: {
          ContextMenu,
          ContextMenuCheckboxItem,
          ContextMenuContent,
          ContextMenuGroup,
          ContextMenuItem,
          ContextMenuLabel,
          ContextMenuPortal,
          ContextMenuRadioGroup,
          ContextMenuRadioItem,
          ContextMenuSeparator,
          ContextMenuShortcut,
          ContextMenuSub,
          ContextMenuSubContent,
          ContextMenuSubTrigger,
          ContextMenuTrigger,
        },
      },
      {
        label: "Dialog",
        slug: "dialog",
        components: {
          Dialog,
          DialogClose,
          DialogContent,
          DialogDescription,
          DialogFooter,
          DialogHeader,
          DialogTitle,
          DialogTrigger,
        },
      },
      {
        label: "Direction",
        slug: "direction",
        components: { DirectionProvider },
      },
      {
        label: "Drawer",
        slug: "drawer",
        components: {
          Drawer,
          DrawerClose,
          DrawerContent,
          DrawerDescription,
          DrawerFooter,
          DrawerHandle,
          DrawerHeader,
          DrawerOverlay,
          DrawerPortal,
          DrawerTitle,
          DrawerTrigger,
        },
      },
      {
        label: "Dropdown Menu",
        slug: "dropdown-menu",
        components: {
          DropdownMenu,
          DropdownMenuCheckboxItem,
          DropdownMenuContent,
          DropdownMenuGroup,
          DropdownMenuItem,
          DropdownMenuLabel,
          DropdownMenuPortal,
          DropdownMenuRadioGroup,
          DropdownMenuRadioItem,
          DropdownMenuSeparator,
          DropdownMenuShortcut,
          DropdownMenuSub,
          DropdownMenuSubContent,
          DropdownMenuSubTrigger,
          DropdownMenuTrigger,
        },
      },
      {
        label: "Empty",
        slug: "empty",
        components: {
          Empty,
          EmptyContent,
          EmptyDescription,
          EmptyHeader,
          EmptyMedia,
          EmptyTitle,
        },
      },
      {
        label: "Field",
        slug: "field",
        components: {
          Field,
          FieldContent,
          FieldDescription,
          FieldError,
          FieldGroup,
          FieldLabel,
          FieldLegend,
          FieldSeparator,
          FieldSet,
          FieldTitle,
        },
      },
      {
        label: "Form",
        slug: "form",
        components: {
          Form,
          FormControl,
          FormDescription,
          FormField,
          FormItem,
          FormLabel,
          FormMessage,
        },
      },
      {
        label: "Hover Card",
        slug: "hover-card",
        components: { HoverCard, HoverCardContent, HoverCardTrigger },
      },
      { label: "Icon", slug: "icon", components: { Icon } },
      { label: "Image", slug: "image", components: { Image } },
      { label: "Input", slug: "input", components: { Input } },
      {
        label: "Input Group",
        slug: "input-group",
        components: {
          InputGroup,
          InputGroupAddon,
          InputGroupButton,
          InputGroupInput,
          InputGroupText,
          InputGroupTextarea,
        },
      },
      {
        label: "Input OTP",
        slug: "input-otp",
        components: {
          InputOTP,
          InputOTPGroup,
          InputOTPSeparator,
          InputOTPSlot,
        },
      },
      {
        label: "Item",
        slug: "item",
        components: {
          Item,
          ItemActions,
          ItemContent,
          ItemDescription,
          ItemFooter,
          ItemGroup,
          ItemHeader,
          ItemMedia,
          ItemSeparator,
          ItemTitle,
        },
      },
      { label: "Kbd", slug: "kbd", components: { Kbd, KbdGroup } },
      { label: "Label", slug: "label", components: { Label } },
      { label: "Link", slug: "link", components: { Link } },
      {
        label: "Menubar",
        slug: "menubar",
        components: {
          Menubar,
          MenubarCheckboxItem,
          MenubarContent,
          MenubarGroup,
          MenubarItem,
          MenubarLabel,
          MenubarMenu,
          MenubarPortal,
          MenubarRadioGroup,
          MenubarRadioItem,
          MenubarSeparator,
          MenubarShortcut,
          MenubarSub,
          MenubarSubContent,
          MenubarSubTrigger,
          MenubarTrigger,
        },
      },
      {
        label: "Native Select",
        slug: "native-select",
        components: { NativeSelect, NativeSelectOptGroup, NativeSelectOption },
      },
      {
        label: "Navigation Menu",
        slug: "navigation-menu",
        components: {
          NavigationMenu,
          NavigationMenuContent,
          NavigationMenuIndicator,
          NavigationMenuItem,
          NavigationMenuLink,
          NavigationMenuList,
          NavigationMenuTrigger,
          NavigationMenuViewport,
        },
      },
      {
        label: "Pagination",
        slug: "pagination",
        components: {
          Pagination,
          PaginationContent,
          PaginationEllipsis,
          PaginationItem,
          PaginationLink,
          PaginationNext,
          PaginationPrevious,
        },
      },
      {
        label: "Popover",
        slug: "popover",
        components: {
          Popover,
          PopoverContent,
          PopoverDescription,
          PopoverHeader,
          PopoverTitle,
          PopoverTrigger,
        },
      },
      {
        label: "Progress",
        slug: "progress",
        components: {
          Progress,
          ProgressIndicator,
          ProgressLabel,
          ProgressTrack,
          ProgressValue,
        },
      },
      {
        label: "Radio Group",
        slug: "radio-group",
        components: { RadioGroup, RadioGroupItem },
      },
      {
        label: "Resizable",
        slug: "resizable",
        components: { ResizableHandle, ResizablePanel, ResizablePanelGroup },
        previewStyles: resizablePreviewStyles,
      },
      {
        label: "Scroll Area",
        slug: "scroll-area",
        components: { ScrollArea, ScrollBar },
        previewStyles: scrollAreaPreviewStyles,
      },
      {
        label: "Select",
        slug: "select",
        components: {
          Select,
          SelectContent,
          SelectGroup,
          SelectItem,
          SelectLabel,
          SelectScrollDownButton,
          SelectScrollUpButton,
          SelectSeparator,
          SelectTrigger,
          SelectValue,
        },
      },
      { label: "Separator", slug: "separator", components: { Separator } },
      {
        label: "Sheet",
        slug: "sheet",
        components: {
          Sheet,
          SheetClose,
          SheetContent,
          SheetDescription,
          SheetFooter,
          SheetHeader,
          SheetOverlay,
          SheetPortal,
          SheetTitle,
          SheetTrigger,
        },
      },
      {
        label: "Sidebar",
        slug: "sidebar",
        components: {
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
          SidebarSeparator,
          SidebarTrigger,
        },
      },
      { label: "Skeleton", slug: "skeleton", components: { Skeleton } },
      { label: "Slider", slug: "slider", components: { Slider } },
      { label: "Sonner", slug: "sonner", components: { Toaster } },
      { label: "Spinner", slug: "spinner", components: { Spinner } },
      { label: "Switch", slug: "switch", components: { Switch } },
      {
        label: "Table",
        slug: "table",
        components: {
          Table,
          TableBody,
          TableCaption,
          TableCell,
          TableFooter,
          TableHead,
          TableHeader,
          TableRow,
        },
      },
      {
        label: "Tabs",
        slug: "tabs",
        components: { Tabs, TabsContent, TabsList, TabsTrigger },
      },
      { label: "Text", slug: "text", components: { Text } },
      { label: "Textarea", slug: "textarea", components: { Textarea } },
      {
        // Site chrome doc — reachable at /docs/theme-toggle but intentionally
        // absent from the sidebar nav.
        label: "Theme Toggle",
        slug: "theme-toggle",
        components: { ThemeToggle },
        navHidden: true,
      },
      { label: "Toggle", slug: "toggle", components: { Toggle } },
      {
        label: "Toggle Group",
        slug: "toggle-group",
        components: { ToggleGroup, ToggleGroupItem },
      },
      {
        label: "Tooltip",
        slug: "tooltip",
        components: {
          Tooltip,
          TooltipContent,
          TooltipProvider,
          TooltipTrigger,
        },
      },
    ],
  },
]

/** Flat, in-order list of all registry entries (including nav-hidden ones). */
export const docsRegistryFlat: Array<DocRegistryEntry> = docsRegistry.flatMap(
  (section) => section.entries
)

/**
 * The primitive half of the MDX component map, merged from every registry
 * entry. `mdx-components.tsx` spreads this under its hand-defined prose
 * renderers (headings, anchors, code, table, …).
 */
export const registryMdxComponents: MDXComponents =
  docsRegistryFlat.reduce<MDXComponents>(
    (acc, entry) => Object.assign(acc, entry.components),
    {}
  )
