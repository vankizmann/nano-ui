# TypeScript syntax

`DEFAULT.md` applies to TypeScript in full and is not repeated here. This file records
only what is specific to TypeScript.

Counts come from a sweep of **708 TypeScript files** (47 157 lines) under
`plugins/sx-core/webroot/backend/src`, excluding `_OLD/` and `node_modules/`. All
frontend TypeScript in this repository lives there; the other plugins ship only a
`js/bootstrap.js` stub and SCSS.

---

## 1. Loose typing is deliberate — do not tighten it

This is the most important rule in this file, and it inverts the usual TypeScript
advice.

Property assignment in this codebase is highly dynamic. Strict types would force a new
round of declarations on every small change, so liberal `any`, loose signatures and
`// @ts-ignore` are **policy, not debt**: 1503 `: any` annotations and 59
`// @ts-ignore` comments.

```ts
// RIGHT — the signature stays open because the shape varies
constructor(props : any, context : SetupContext)
```

**Never narrow an existing type, tighten a signature, or remove an `// @ts-ignore` as
an unrequested improvement.** If a change needs a type, add it for that change only.

The build is configured to match: webpack compiles through Babel and does not
type-check, and `tsconfig.json` is `emitDeclarationOnly`. A passing build proves
nothing about types. That is intentional, not an oversight.

### The exception: `declare` narrowing

`declare` re-declarations are load-bearing and stay — 642 of them. They narrow a base
class member to the subclass type, and without them every access resolves to the base
type.

```ts
// RIGHT — required, not decoration
declare scope : SxHeaderController;
declare data : SxHeaderData;
declare view : SxHeaderView;
```

---

## 2. Space before the colon in type annotations

```ts
// RIGHT
bem : string = 'sx-header';
constructor(props : any, context : SetupContext)
```

```ts
// WRONG
bem: string = 'sx-header';
constructor(props: any, context: SetupContext)
```

| Position | Spaced | Tight |
|---|---|---|
| Class property declaration | 930 | 5 |
| Method parameter | 801 | 101 |

This applies to **type annotations only**. Object literal keys keep the tight form,
which is why both appear in the same file:

```ts
export default defineComponent({
    name: 'SxHeader',          // object key — tight
    props: SxHeaderProps,
});
```

---

## 3. Double-quoted import specifiers

The one departure from `DEFAULT.md` rule 7. Ordinary string literals stay single-quoted
(7896 to 34); **ES import specifiers** are double-quoted.

```ts
// RIGHT
import { Mix } from "@kizmann/pico-js";
const name = 'SxHeader';
```

```ts
// WRONG
import { Mix } from '@kizmann/pico-js';
```

**2363 double-quoted specifiers against 3 single** — effectively absolute. The three
exceptions are all third-party packages: `axios` in `SxClickup.ts` and `SxMessage.ts`,
and `froala-editor` in `froala-setup.ts`.

### `require()` is a different case

A `require('…')` argument is an ordinary string literal, not an import specifier, so
`DEFAULT.md` rule 7 governs it and the single-quoted form is correct.

```ts
// RIGHT
require('#src/console/index.ts');
```

It runs **151 single-quoted to 30 double** — the opposite way round from `import`. Do
not merge the two populations when counting; they follow different rules.

---

## 4. Always write the `.ts` extension

Relative and `#src/` specifiers carry an explicit `.ts` — 1658 do, 55 do not.

```ts
// RIGHT
import SxHeaderData from "./SxHeaderData.ts";
import { Core } from "#src/simplex/index.ts";
```

```ts
// WRONG
import SxHeaderData from "./SxHeaderData";
```

Package specifiers take no extension: `import { Mix } from "@kizmann/pico-js";`.

---

## 5. A specifier points at a file, never a folder

This is a hard rule.

```ts
// RIGHT
import { Auth } from "#src/simplex/index.ts";
```

```ts
// WRONG
import { Auth } from "#src/simplex";
```

**The rule covers `require()` as well as `import`.**

```ts
// WRONG — the same violation in require form
require('./transfer/index');
```

Roughly **46 `import` specifiers and 9 `require()` calls** break this rule, concentrated
in the `#src/simplex` and `#src/api` barrels. They are violations, not an alternative
style. Do not copy the bare form from surrounding code, and do not treat their number as
precedent.

---

## 6. Prefer the `#src/` alias over a deep relative path

A preference, not a rule — **686 alias specifiers against 93 deep-relative ones**.

```ts
// PREFERRED
import { Core } from "#src/simplex/index.ts";

// ACCEPTABLE
import { Core } from "../../../simplex/index.ts";
```

Existing relative imports are valid and are **not** to be rewritten. `#src/*` is
declared in both `tsconfig.json` `paths` and `package.json` `imports`.

---

## 7. JSDoc alongside the type annotation

A `@type` block above a property, even though the annotation already states the type —
1395 of them. The block is the convention; write it in new code.

```ts
/**
 * @type {string}
 */
bem : string = 'sx-header';

/**
 * @type {PropType<string>}
 */
title: {
    type: [String], default: null
},
```

Methods take `@param` and `@return`; classes composed with a mixin factory take
`@mixes`.

---

## 8. Exported constants are `PascalCase`; local casing is contextual

These are two separate rules, and only the first is strict.

### Exported constants are always `PascalCase`

```ts
// RIGHT
export const SxHeaderProps = { … };
```

```ts
// WRONG
export const sxHeaderProps = { … };
```

**166 `PascalCase` to 0 `camelCase` to 0 `UPPER_SNAKE_CASE`.** There is not one
exception.

### Local constants have no strict rule

Casing depends on the case. Follow the file you are editing.

```ts
// Both are fine
const activeScope = this.scope;
let [buffer, last] = [[], ''];
```

Locals run 310 `camelCase` to 3 `PascalCase`, but that describes the code rather than
constraining it. **There is also no rule preferring `const` over `let`** — a `let` where
`const` would have worked is not a defect and is not to be tightened.

`UPPER_SNAKE_CASE` is not the convention here, unlike in PHP — which is why constant
naming could not enter `DEFAULT.md`.

---

## Related

- Cross-language rules: `DEFAULT.md`
- TypeScript architecture — modules, mixins, signals, helpers, async, build: the
  `typescript/` folder *(not yet written)*
- Vue component structure: the `vue/` folder *(not yet written)*
