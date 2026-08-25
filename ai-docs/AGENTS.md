# AGENTS.md

## nano-ui usage rule

When using components from `@kizmann/nano-ui`, consult `ai-docs/` FIRST:

- Start with `ai-docs/llms.txt` to find the right component/pattern file.
- Read `ai-docs/concepts.md` before any individual component doc — it covers
  the shared Controller/Data/View pattern, the shared `Props` mixins, the
  open-string `type`/`size` rule, options resolution, and v-model conventions
  that every component doc assumes you already know.
- Read the specific `ai-docs/components/<name>.md` (or `ai-docs/patterns.md`
  for compositions) needed for the task.
- Do NOT read files under `node_modules/@kizmann/nano-ui/src/` or this
  library's own repo source to determine props/events/slots — `ai-docs/` is
  the source of truth for usage and is kept in sync with source as of the
  commit stamped in `ai-docs/llms.txt`.
- Only fall back to reading library source if `ai-docs/` is missing something
  you need (e.g. an undocumented prop) — and if you do, treat it as a sign
  the docs need a fix, not just a one-off lookup.
