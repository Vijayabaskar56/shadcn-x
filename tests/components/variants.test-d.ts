import * as stylex from "@stylexjs/stylex"

import type { VariantKey } from "@/components/variants"

import { defineVariants } from "@/components/variants"
import { colors, fontSize } from "@/styles/tokens.stylex"

const variants = defineVariants(
  stylex.create({
    default: { color: colors["text-primary"] },
    secondary: { color: colors["text-secondary"] },
  }),
  "default"
)

const exactKey: VariantKey<typeof variants> = "secondary"
void exactKey

const resolved: "default" | "secondary" = variants.resolve(null)
void resolved

// @ts-expect-error unknown variant keys are rejected for typed props.
const badKey: VariantKey<typeof variants> = "ghost"
void badKey

const wrongDefaultStyles = stylex.create({
  default: { color: colors["text-primary"] },
})
// @ts-expect-error the default key must exist in the axis.
defineVariants(wrongDefaultStyles, "secondary")

const dynamicStyles = stylex.create({
  default: { color: colors["text-primary"] },
  dynamic: (value: string) => ({ color: value }),
})
// @ts-expect-error dynamic StyleX functions do not belong in variant axes.
defineVariants(dynamicStyles)

const labels = {
  default: "Default",
  secondary: "Secondary",
} satisfies Record<VariantKey<typeof variants>, string>
void labels

const missingLabels = { default: "Default" }
// @ts-expect-error sibling maps must cover every public variant key.
const incompleteLabels = missingLabels satisfies Record<
  VariantKey<typeof variants>,
  string
>
void incompleteLabels

const sizes = defineVariants(
  stylex.create({
    sm: { fontSize: fontSize.s },
    lg: { fontSize: fontSize.l },
  })
)

const optionalMiss = sizes(undefined)
void optionalMiss
