export type DocsNavItem = {
  label: string
  /** Slug matching a doc's `slug` (its path under content/docs without extension) */
  slug: string
}

export type DocsNavSection = {
  label: string
  items: Array<DocsNavItem>
}

/**
 * Sidebar structure for the docs site. Order here drives both the sidebar and
 * the prev/next navigation. Each `slug` must match a file in `content/docs`.
 */
export const docsNav: Array<DocsNavSection> = [
  {
    label: "Getting Started",
    items: [
      { label: "Introduction", slug: "introduction" },
      { label: "Installation", slug: "installation" },
      { label: "Theming", slug: "theming" },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Accordion", slug: "accordion" },
      { label: "Alert Dialog", slug: "alert-dialog" },
      { label: "Aspect Ratio", slug: "aspect-ratio" },
      { label: "Box", slug: "box" },
      { label: "Button", slug: "button" },
      { label: "Button Group", slug: "button-group" },
      { label: "Card", slug: "card" },
      { label: "Checkbox", slug: "checkbox" },
      { label: "Collapsible", slug: "collapsible" },
      { label: "Combobox", slug: "combobox" },
      { label: "Command", slug: "command" },
      { label: "Context Menu", slug: "context-menu" },
      { label: "Dialog", slug: "dialog" },
      { label: "Direction", slug: "direction" },
      { label: "Drawer", slug: "drawer" },
      { label: "Dropdown Menu", slug: "dropdown-menu" },
      { label: "Empty", slug: "empty" },
      { label: "Field", slug: "field" },
      { label: "Form", slug: "form" },
      { label: "Hover Card", slug: "hover-card" },
      { label: "Icon", slug: "icon" },
      { label: "Image", slug: "image" },
      { label: "Input", slug: "input" },
      { label: "Input Group", slug: "input-group" },
      { label: "Input OTP", slug: "input-otp" },
      { label: "Item", slug: "item" },
      { label: "Label", slug: "label" },
      { label: "Link", slug: "link" },
      { label: "Menubar", slug: "menubar" },
      { label: "Native Select", slug: "native-select" },
      { label: "Navigation Menu", slug: "navigation-menu" },
      { label: "Popover", slug: "popover" },
      { label: "Radio Group", slug: "radio-group" },
      { label: "Resizable", slug: "resizable" },
      { label: "Scroll Area", slug: "scroll-area" },
      { label: "Select", slug: "select" },
      { label: "Separator", slug: "separator" },
      { label: "Sheet", slug: "sheet" },
      { label: "Sidebar", slug: "sidebar" },
      { label: "Slider", slug: "slider" },
      { label: "Switch", slug: "switch" },
      { label: "Table", slug: "table" },
      { label: "Tabs", slug: "tabs" },
      { label: "Text", slug: "text" },
      { label: "Textarea", slug: "textarea" },
      { label: "Toggle", slug: "toggle" },
      { label: "Toggle Group", slug: "toggle-group" },
      { label: "Tooltip", slug: "tooltip" },
    ],
  },
]

/** Flattened, in-order list of nav items — used for prev/next links. */
export const docsNavFlat: Array<DocsNavItem> = docsNav.flatMap(
  (section) => section.items
)

/** The slug of the first doc, used as the `/docs` landing target. */
export const firstDocSlug = docsNavFlat[0].slug
