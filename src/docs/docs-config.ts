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
      { label: "Button", slug: "button" },
      { label: "Button Group", slug: "button-group" },
      { label: "Box", slug: "box" },
      { label: "Text", slug: "text" },
      { label: "Link", slug: "link" },
      { label: "Label", slug: "label" },
      { label: "Icon", slug: "icon" },
      { label: "Input", slug: "input" },
      { label: "Image", slug: "image" },
      { label: "Table", slug: "table" },
      { label: "Textarea", slug: "textarea" },
      { label: "Direction", slug: "direction" },
      { label: "Checkbox", slug: "checkbox" },
      { label: "Combobox", slug: "combobox" },
      { label: "Field", slug: "field" },
      { label: "Form", slug: "form" },
      { label: "Input Group", slug: "input-group" },
      { label: "Input OTP", slug: "input-otp" },
      { label: "Native Select", slug: "native-select" },
      { label: "Radio Group", slug: "radio-group" },
      { label: "Select", slug: "select" },
      { label: "Slider", slug: "slider" },
      { label: "Switch", slug: "switch" },
      { label: "Toggle", slug: "toggle" },
      { label: "Toggle Group", slug: "toggle-group" },
    ],
  },
]

/** Flattened, in-order list of nav items — used for prev/next links. */
export const docsNavFlat: Array<DocsNavItem> = docsNav.flatMap(
  (section) => section.items
)

/** The slug of the first doc, used as the `/docs` landing target. */
export const firstDocSlug = docsNavFlat[0].slug
