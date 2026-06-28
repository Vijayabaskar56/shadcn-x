export function DocContent({ html }: { html: string }) {
  return (
    <div
      className="prose max-w-none prose-neutral dark:prose-invert prose-pre:bg-transparent prose-pre:p-0"
      // Content is compiled from trusted local markdown at build time.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
