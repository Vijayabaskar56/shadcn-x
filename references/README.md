# references/

Local reference material for the `create-component` skill and other agents.

Each entry below is a **local symlink** to an externally-maintained repo on this
machine. They are **gitignored** (see `.gitignore`) — the symlinks point at
absolute paths outside this repo, so committing them would break on other
machines. Recreate them per machine using the instructions under each entry.

## `references/ui` — shadcn/ui reference

```sh
references/ui -> /Users/vijayabaskar/work/references/ui
```

The source of truth the `create-component` skill reads when building a new
component — specifically the **Base UI variants** under:

```
references/ui/apps/v4/registry/bases/base/ui/
```

## `references/coss` — coss.com/ui (formerly Origin UI)

```sh
references/coss -> /Users/vijayabaskar/work/references/coss
```

The Cal.com / Origin UI design system. Useful as a second opinion for component
composition, variants, and patterns. Key paths:

```
references/coss/apps/ui/        # coss ui component library + docs
references/coss/apps/origin/    # legacy Origin UI components (pre-acquisition)
references/coss/packages/ui/    # shared UI components package
```

## Setup on a new machine

1. Clone each repo somewhere outside this repo, e.g. under `/Users/<you>/work/references/`.
2. Link them:

   ```sh
   ln -s /path/to/your/references/ui   references/ui
   ln -s /path/to/your/references/coss references/coss
   ```

3. Verify:

   ```sh
   ls references/ui/apps/v4/registry/bases/base/ui/
   ls references/coss/apps/ui/
   ```

If a symlink is missing, `create-component` and any other reference-reading
agent will fall back to describing what's missing — re-create the link before
proceeding.
