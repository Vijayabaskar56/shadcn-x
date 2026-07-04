import type { StyleXStyles } from "@stylexjs/stylex"

type VariantStyles<T> = {
  readonly [K in keyof T]: T[K] extends (...args: any) => any
    ? never
    : StyleXStyles
}

interface VariantAxis<K extends string> {
  (key: K | null | undefined): StyleXStyles
  readonly keys: readonly K[]
  readonly defaultKey: undefined
}

interface DefaultedVariantAxis<K extends string> {
  (key?: K | null): StyleXStyles
  resolve(key?: K | null): K
  readonly keys: readonly K[]
  readonly defaultKey: K
}

type VariantKey<A extends { keys: readonly string[] }> = A["keys"][number]

function defineVariants<T extends object, D extends Extract<keyof T, string>>(
  styles: T & VariantStyles<T>,
  defaultKey: D
): DefaultedVariantAxis<Extract<keyof T, string>>
function defineVariants<T extends object>(
  styles: T & VariantStyles<T>
): VariantAxis<Extract<keyof T, string>>
function defineVariants(
  styles: Record<string, StyleXStyles>,
  defaultKey?: string
): VariantAxis<string> | DefaultedVariantAxis<string> {
  const resolve = (key?: string | null) => key ?? defaultKey
  const axis = ((key?: string | null) => {
    const resolved = resolve(key)
    return resolved == null ? undefined : styles[resolved]
  }) as VariantAxis<string> | DefaultedVariantAxis<string>

  return Object.assign(axis, {
    resolve,
    keys: Object.keys(styles),
    defaultKey,
  })
}

export { defineVariants }
export type { VariantAxis, DefaultedVariantAxis, VariantKey }
