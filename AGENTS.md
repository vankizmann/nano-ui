/plugin install claude-mem# AGENTS.md

## Syntax

Rules stack in three layers. `.editorconfig` is the baseline every file obeys,
`guide/syntax/DEFAULT.md` adds what every language in this repository shares, and each
language file records only its additions and departures. Before writing or editing any
source file, read `DEFAULT.md` and then the file for the language you are touching;
the baseline is summarised below so you rarely need to open it.

| Writing      | Read                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------- |
| Any file     | `.editorconfig` — baseline: UTF-8, LF line endings, 4-space indent, no final newline, no line-length limit     |
| Any language | `guide/syntax/DEFAULT.md` — indentation, braces, spacing, quoting, trailing commas, naming, comments, packing, literal layout, statement flow, block opening gap |
| PHP          | `guide/syntax/PHP.md` — optional type hints, docblocks, CakePHP underscore methods, constants                   |
| TypeScript   | `guide/syntax/TYPESCRIPT.md` — deliberate loose typing, `name : type` spacing, import specifiers, `#src/` alias |
| SCSS         | `guide/syntax/SCSS.md` — flat BEM selectors, block names from the View class, helpers import, forward chain     |

Every rule in the syntax files was measured against the existing codebase. Follow the
measured convention even where it contradicts general language advice; the files say
so explicitly where that happens (loose TypeScript types, absent PHP type hints,
unnested SCSS).

`.editorconfig` is a JetBrains export: beyond the universal keys above it carries
`ij_*` formatter settings per language. Where a syntax file and the editor config
disagree, the syntax file wins, because it was measured against the code and the
export was not.

Keep edits to the convention you are asked for. Tightening a type, adding a type hint,
or nesting a selector as a drive-by improvement is a departure from the measured rules,
not a cleanup.

## Build script

`src-exec/` holds the bottle build script: `bun src-exec/bottle.ts <tools|build|link|verify|pack>`.
It compiles the server stack from source into the prefix (default `/Applications/.webservy-dev`),
one formula per file under `src-exec/formulas/`. Read `src-exec/config.ts` for the bounds and
`src-exec/core/formula.ts` for the formula shape before adding or changing a formula. Every
compiler workaround lives next to the formula it belongs to, with the reason in a comment;
keep it that way instead of adding global flags.

`src-exec/assets/` is what ships as source rather than build output: the service scripts
under `bash/` and the `.default` config templates under `conf/`, laid out like the prefix.
`pack` copies both into the prefix every time, resolving only `{{prefix}}`. A template
whose path carries another placeholder, such as `php/php-{{version}}/`, is rendered by its
formula on every build instead. The app fills `{{port}}`, `{{mysql}}`, `{{dns}}` and the
host fields when it renders the live configs.