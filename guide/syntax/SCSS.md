# SCSS syntax

`DEFAULT.md` applies where the concepts carry over — 4-space indentation, single
quotes, comments that explain why. This file records what is specific to SCSS.

Counts come from the **107 SCSS files** under
`plugins/sx-core/webroot/backend/src`.

---

## 1. Write flat selectors, not nested ones

Every selector is written out in full at the top level. Nesting and the `&` parent
selector are effectively unused.

```scss
// RIGHT
.sx-message { }
.sx-message__body { }
.sx-message.is-read { }
```

```scss
// WRONG
.sx-message {
    &__body { }
    &.is-read { }
}
```

| Form | Count |
|---|---|
| Flat top-level selectors | 1033 |
| Nested selectors | 51 |
| Lines beginning with `&` | 2 |

Flat selectors mean a class name is greppable. `&__body` is not.

---

## 2. Block, element, state

| Form | Example | Emitted by |
|---|---|---|
| Block | `.sx-message` | `data.classRoot()` |
| Element | `.sx-message__body` | `data.classPart('body')`, `this.div('body', …)` |
| State | `.sx-message.is-read`, `.sx-message.has-icon` | pushed onto the class list in a Data getter |

Elements use a double underscore. States are a **separate class on the block**,
prefixed `is-` or `has-` — never a third BEM segment, and never nested.

---

## 3. The block name is the View class's `bem` value

This is not a convention to remember separately. A component's View declares:

```ts
bem : string = 'sx-message';
```

and the nano-ui base class builds `sx-message` from it for the root element and
`sx-message__body` for every part. **If the stylesheet's block name does not match
`bem`, nothing lands.**

There are **38 `bem` declarations across 33 unique values** — five are declared in more
than one file. The rule is about names, so the denominator is 33: **30 of the 33 have a
matching block rule.** The three without — `sx-dataside`, `sx-menu-panel-select`,
`sx-messages` — belong to components that carry no styles of their own.

### The `sx-` prefix marks provenance

A component **exclusive to this project, which does not extend something from a
different project**, is `sx-`-prefixed. That includes the app-shell `Core*` components:
`CoreNotifyView` declares `bem : string = 'sx-notify'`.

Blocks that override or extend another project's component keep **that** project's
prefix, and are not violations:

| Prefix | Origin | Lives in |
|---|---|---|
| `.n-*` | nano-ui overrides | `scss/nano/` |
| `.fr-*` | Froala editor overrides | `component/froala/` |
| unprefixed | plain helpers — `.shadow`, `.cu-editor` | various |

83 top-level block names are not `sx-`-prefixed for exactly these reasons. **Do not
rename them, and do not report them as breaking this rule.**

---

## 4. Open a stylesheet with the helpers import

```scss
@use "~@kizmann/nano-ui/src/root/css/helpers" as *;
```

72 of the 90 non-index stylesheets carry it. It is what makes `color('gray-15')` and
`size('default-md-rad')` resolve. Write it in any file that uses those functions.

---

## 5. File placement and the forward chain

Stylesheets live in a `css/` directory beside `js/`, with one `index.scss` per unit
that forwards them:

```
pages/article/
├── index.scss          @forward list
├── css/
│   ├── article.scss
│   └── table.scss
└── js/
```

```scss
// pages/article/index.scss
@forward "./css/article";
@forward "./css/table";
```

`index.scss` files chain upward, mirroring the `require()` chain on the TypeScript
side:

```scss
// pages/index.scss
@forward "./article/index";
@forward "./menu/index";
```

**The stylesheet folder is named `css`.** That is the rule, not a majority to join.

There are twelve `css/` directories. `component/froala/scss/` is the one folder that
breaks the rule and should be renamed — treat it as a deviation to fix, not an exception
to copy. Note this concerns the *folder* only: Froala's `.fr-*` class names are correct
under rule 3, because they extend a third-party component.

App-wide styles belonging to no component live in `src/scss/app/`.

---

## Related

- Cross-language rules: `DEFAULT.md`
- Where `bem` is declared, and Vue component structure: the `vue/` folder
  *(not yet written)*
