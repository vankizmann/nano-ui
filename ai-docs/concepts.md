# nano-ui Concepts (for AI agents)

Read this before any component doc. Every component doc references these
patterns instead of re-explaining them.

## What nano-ui is

`@kizmann/nano-ui` (npm) is a Vue 3 component library, version `3.0.0`,
optimized for desktop applications with drag-and-drop. It depends only on
`@kizmann/pico-js` (`^2.1.4`, a regular `dependency`, not a peer dependency).
There is **no `moment` dependency** in this version — date/time handling goes
through `@kizmann/pico-js`'s `Now`/`Locale` helpers (see
`src/datetime/js/helper/NDateHelper.ts`). If you find documentation elsewhere
claiming a `moment` peer dependency, treat it as stale.

## The Controller / Data / View pattern

Every component is a set of (usually) four files under
`src/<group>/js/<component-name>/`:

| File | Class | Purpose |
|---|---|---|
| `N<Comp>.ts` | — (Vue SFC-less component) | `defineComponent()` call: declares `name`, `props`, `emits`, and a `setup()` that wires the other three together. This is the file to read for the public prop/emit contract. |
| `N<Comp>Controller.ts` | extends `ProtoController` | Owns all reactive state, computed-like getters, event handlers, and lifecycle logic that would otherwise live inline in `setup()`. |
| `N<Comp>Data.ts` | extends `ProtoData` | A thin getter/setter facade over the controller's props/state (`this.scope.get(key)` / `this.scope.set(key, value)`). Components read/write through `this.data.foo`, not `this.props.foo` directly. |
| `N<Comp>View.ts` | extends `ProtoView` | The render function (`default()`), plus per-part render helpers (`this.div('part-name', [...])` etc.) building the BEM DOM tree. No reactive logic lives here. |

`N<Comp>.ts`'s `setup(props, context)` always follows this exact shape:

```ts
setup(props, context) {
    let ncx = new N<Comp>Controller(props, context);
    ncx.dispose(() => { ncx = null; });
    return ncx.render();
}
```

`ncx.render()` (defined on `ProtoController`, `src/root/js/proto/ProtoController.ts`)
returns `() => this.view.default()` — i.e. the actual Vue render function.
`ncx.dispose(fn)` registers `fn` to run ~2s after `onUnmounted` (via
`Run.delay`, not immediately) for cleanup.

Some components use a small variation: `GroupController`
(`src/root/js/controller/GroupController.ts`, extends `ProtoController`) adds
`append(child)`/`remove(child)`/`watchChilds(cb)` and a reactive `childs` list —
used by parent components that track child instances registered via
`inject`/`provide` (e.g. group/collection components). Some components also
split into multiple controller variants for different behavior modes (e.g.
`NCheckboxControllerGlobal.ts` / `NCheckboxControllerSingle.ts` — confirm which
applies per usage in that component's own doc).

## `ProtoController` — the shared runtime API

`src/root/js/proto/ProtoController.ts`. Key methods every Controller
subclass inherits (not exhaustive — read the file for full API):

- `get(key, fallback?)` / `set(key, value)` — read/write a reactive value.
  Values not explicitly created via `makeData`/`cloneProp`/`linkProp` fall
  back to reading the prop of the same name (`prop(key, fallback)`).
- `update(key, value)` — `set()` + emits `update:${key}` with the new value.
  This is the standard v-model write path.
- `prop(key, fallback?)` — read a raw prop (unwraps refs).
- `cloneProp(key, options?)` — creates a local reactive copy of a prop that
  stays in sync via a `watch()` (one-way, prop → local).
- `linkProp(key, source?, freeze?)` — creates a `computed()` alias to another
  reactive source (defaults to `this.props`); can point at another
  controller's `.vals` via `source.ncx.vals`.
- `makeData(key, value?)` — creates a plain local `ref()`, independent of any
  prop.
- `compData(key, cb)` — a `computed()` stored in `vals`.
  `watchProp` / `watchData` — watch a prop or a `vals` entry.
- `emit(event, ...args)` — thin wrapper over `context.emit`.
  `pass(keys)` — exposes bound methods onto the instance's public `ctx`
  (what a parent gets via a template ref).
- `injectRef(key, fallback?)` — wraps Vue's `inject`; used by e.g.
  `NFormItem` context injection (`injectRef(['form-item', 'NFormItem'])` runs
  automatically in `ProtoController.setup()` for every component).
- `ncx(key)` — resolves the child component's own Controller instance from a
  template ref registered via `makeRef(key)` (relies on the render-time
  `instance.ncx` back-reference set in `setup()`).
- `dom(key)` / `rel(key)` — resolve a template ref to a DOM element / raw ref.
- `onSignal(event, cb)` / `offSignal(uid)` / `fireSignal(event, ...args)` —
  a global pub/sub bus (backed by pico-js's `Signal`), used for cross-component
  communication that doesn't fit parent/child props (e.g. `Notify`/`Alert`/
  `Confirm`, popover/modal stacking).
- `applyClear()` — resets `modelValue` to the component's `clearValue` prop
  and emits `update:modelValue` — this is what the built-in "clear" (×) button
  calls.
- `attrs` — getter for `context.attrs` (fall-through attributes).

**`superDisabled`** (`ProtoData`, `src/root/js/proto/ProtoData.ts`): a
component is treated as disabled if its own `disabled` prop is true, OR if it
is registered inside an `NFormItem` whose bound model value is falsy/absent in
a specific way — read `ProtoData.superDisabled` before assuming a component's
effective disabled state is just its own `disabled` prop.

## `ProtoData` — the shared data facade

`src/root/js/proto/ProtoData.ts`, `extends ProtoExtend([BaseData, IconData])`.
Provides:

- `classRoot(merge?)` — builds the component's root BEM class list:
  the base BEM class, then conditionally `n-theme-{theme}`, `n-size-{size}`,
  `n-type-{type}`, `n-color-{$color}` (color resolved through
  `Styler.wheel()`), `n-load`, `n-disabled` (from `superDisabled`),
  `n-clearable`, `n-icon-{iconPosition}`.
- `classPart(part, merge?)` — builds a `{bem}__{part}` class for a DOM part.
- Every subclass additionally gets `BaseData`'s getters (`load`, `disabled`,
  `size`, `type`, `color`, `$color`, `theme`, `clearable`, `clearValue`) and
  `IconData`'s getters (`icon`, `iconPosition`, `iconDisabled`) for free —
  these back the shared prop mixins below.

## `ProtoView` — the shared render helpers

`src/root/js/proto/ProtoView.ts`. Every View subclass gets:

- `default()` — override point, the component's actual render tree.
- `slot(key = 'default', ...args)` — renders a named slot if present, else
  `null`.
- `icon(props)` — renders an `<i class="n-icon {icon}">`. Accepts either a
  bare icon string or `{ icon, class, ...attrs }`. **This is the exact
  mechanism the `icon` prop is applied through** — see `ai-docs/icons.md`.
- `comp(el, props?, slot?)` — resolves and renders a globally-registered
  component by tag name (`resolveComponent`), used for the table/info cell
  and filter type registries (`NTableCells`, `NInfoCells`, `NTableFilters`,
  etc. — see each relevant component doc).
- `div(props, slot?, type?)` — renders a BEM-classed element; `props` can be a
  bare string (treated as the `name` for `classPart`) or a full props object.
- `clear(value?)` — renders the built-in clear (×) button when
  `clearable` is true and `value` is non-empty; wired to `applyClear()`.
- `angle()` — renders the built-in dropdown-angle icon.
- `empty(options?)` — renders `<n-empty-icon>` with `emptyText`/`emptyProps`.

## Shared prop mixins (`Props`)

`src/root/index.ts` re-exports every mixin under a single `Props` object:
`Props = { ...BaseProps, ...IconProps, ...AlignProps, ...PositionProps, ...TextProps, ...OptionProps, ...DragProps }`.
Components spread named groups from it, e.g. `...Props.Size, ...Props.Icon`,
instead of redeclaring common props. Full contents (source files under
`src/root/js/prop/`):

**`BaseProps.ts`**

| Export | Prop(s) | Type | Default |
|---|---|---|---|
| `Load` | `load` | `Boolean` | `false` |
| `Disabled` | `disabled` | `Boolean` | `false` |
| `Size` | `size` | `String` | `null` |
| `Type` | `type` | `String` | `null` |
| `Color` | `color` | `[String, Number]` | `null` |
| `Clearable` | `clearable` | `Boolean` | `false` |
| `ClearValue` | `clearValue` | `[String, Number, Boolean]` | `null` |
| `ThemeNone` | `theme` | `String` | `null` |
| `ThemeDark` | `theme` | `String` | `'dark'` |
| `EmptyPropsInline` | `emptyProps` | `Object` | `{ inline: true }` |
| `EmptyPropsStacked` | `emptyProps` | `Object` | `{ inline: false }` |

`size` and `type` are **not closed enums** — see "Type and Size are open
strings" below.

**`IconProps.ts`**

| Export | Prop(s) | Type | Default |
|---|---|---|---|
| `Icon` | `icon` | `String` | `''` |
| `IconDisabled` | `iconDisabled` | `Boolean` | `false` |
| `IconPositionBefore` | `iconPosition` | `String`, validated in `['before','after']` | `'before'` |
| `IconPositionAfter` | `iconPosition` | `String`, validated in `['before','after']` | `'after'` |

**`AlignProps.ts`**

| Export | Prop(s) | Type | Default |
|---|---|---|---|
| `AlignHorizontal` | `align` | `String`, validated in `['horizontal','vertical']` | `'horizontal'` |
| `AlignVertical` | `align` | `String`, validated in `['horizontal','vertical']` | `'vertical'` |
| `AlignLeft` | `align` | `String`, validated in `['left','center','right']` | `'left'` |
| `AlignRight` | `align` | `String`, validated in `['left','center','right']` | `'left'` (yes — `AlignRight`'s default is `'left'` in source; not a typo you should "fix") |

**`PositionProps.ts`**

| Export | Prop(s) | Type | Default |
|---|---|---|---|
| `PositionBottomStart` | `position` | `String`, validated against the 12-value popover position set | `'bottom-start'` |
| `PositionBottomCenter` | `position` | same popover set | `'bottom-center'` |
| `PositionDrawer` | `position` | `String`, validated in `['top','bottom','left','right']` | `'right'` |
| `PositionModal` | `position` | same drawer set (`['top','bottom','left','right']`) | `'right'` |

Popover position full set (`PopoverPosition` in `src/root/js/data/PositionData.ts`):
`top-start, top-center, top-end, bottom-start, bottom-center, bottom-end, left-start, left-center, left-end, right-start, right-center, right-end`.

**`TextProps.ts`** — all `String`, all default via `Locale.trans(...)`
(pico-js i18n) so the literal default is a translation lookup, not a fixed
English string:

| Export | Prop | Translation key |
|---|---|---|
| `UndefinedText` | `undefinedText` | `'Undefined'` |
| `EmptyText` | `emptyText` | `'No items'` |
| `TrueText` | `trueText` | `'Yes'` |
| `FalseText` | `falseText` | `'No'` |

**`OptionProps.ts`** — `OptionsObject`: `options` (`Object`, default `{}`),
`optionsValue` (`String`, default `'$index'`), `optionsLabel` (`String`,
default `'$value'`). Always documented together — see "Options resolution"
below. Note the prop is typed `Object` but an Array also works (see below).

**`DragProps.ts`** — `Draglist`, a large mixin (`items`, `current`,
`selected`, `expanded`, `cascade`, `group`, `allowGroups`, `safezone`,
`allowCurrent`, `renderHandle`, `renderExpand`, `renderSelect`, `allowSelect`,
`allowDrag`, `allowDrop`, `transformDrop`, `insertNode`, `removeNode`,
`uniqueProp`, `childProp`, `itemSkip`, `rootSkip` — full defaults in
`src/root/js/prop/DragProps.ts`). Used by `NDraglist`/`NDropzone` — document
exact defaults in `components/draglist.md` rather than repeating here.

## Shared data classes

`src/root/js/data/*.ts` — plain getter/setter classes (`get x() { return
this.scope.get('x') }`) that a component's `N<Comp>Data` class extends
alongside `ProtoData`, mirroring the prop mixin it uses (e.g. a component
using `Props.OptionsObject` extends/mixes in `OptionData` to get `.options`/
`.optionsValue`/`.optionsLabel` getters). `BaseData` and `IconData` are always
present because `ProtoData` itself extends `ProtoExtend([BaseData, IconData])`.

## `ProtoExtend` — the multi-inheritance shim

`src/root/js/proto/ProtoExtend.ts`: `ProtoExtend([A, B, ...])` returns a class
whose prototype has every listed class's prototype merged in (via
`Mix.extend`), constructed as the first class in the list. This is how a
`Data` class can extend `ProtoData` **and** behave as if it also extends e.g.
`AlignData`/`OptionData` — Vue/TS components in this codebase use this instead
of real multiple inheritance. If a component's `Data` class shows
`extends ProtoExtend([ProtoData, OptionData])`-style code, treat it as having
every method/getter from both.

## Type and Size are open strings, not closed enums

`Props.Type` (`type`) and `Props.Size` (`size`) are both declared as plain
`String` with `default: null` — there is no runtime enum/union restricting
values. Confirmed **built-in, styled** values:

- `type`: `primary`, `secondary`, `info`, `warning`, `danger`, `success`
- `size`: `xs`, `sm`, `md`, `lg`, `xl`

Any other string is structurally accepted (it becomes `n-type-{value}` /
`n-size-{value}` via `ProtoData.classRoot()`) but has **no default CSS** unless
the consuming app defines it. Document these as `String` with the built-ins
listed as "known defaults," never as a closed union.

## Options resolution (`options` / `optionsValue` / `optionsLabel`)

Any component with an `options` prop always has `optionsValue` and
`optionsLabel` alongside it (fixed trio from `Props.OptionsObject`,
`src/root/js/prop/OptionProps.ts`) plus matching getters from `OptionData`
(`src/root/js/data/OptionData.ts`). Resolution logic lives in
`OptionHelper.getList`/`getFlat` (`src/root/js/helper/OptionHelper.ts`):

1. `options` may be an **Array** or a plain **Object**.
2. `OptionHelper.getList()` walks it and produces `{ $index, $value }` pairs:
   - `$index` = the array position (number) or object key (string) — the
     entry's own key in the `options` structure, never something read out of
     the item itself.
   - `$value` = the entry's own value (the whole item, e.g. the full object).
3. `OptionHelper.getFlat()` then resolves `label`/`value` for each entry via
   `Obj.get(item, optionsLabel)` / `Obj.get(item, optionsValue)`, where `item`
   is the `{ $index, $value }` pair — so an expression like `optionsLabel`
   dots into that pair, e.g. `'$value.foo'` to reach `item.$value.foo`.

Examples:

```js
// options: [{ foo: 'bar' }]
// $index -> 0, $value -> { foo: 'bar' }
// optionsLabel: '$value.foo'  =>  'bar'

// options: { foo1: { foo: 'bar' } }
// $index -> 'foo1', $value -> { foo: 'bar' }
// optionsLabel: '$value.foo'  =>  'bar'
```

Defaults (`optionsValue: '$index'`, `optionsLabel: '$value'`) mean: with no
overrides, the raw index/key is used as the value, and the raw item is used
as the label. <!-- UNVERIFIED: whether `$index` alone (without dotting into
it) is valid as a full optionsLabel/optionsValue expression beyond the
literal default string — confirmed only that the default is exactly `$index`
and `$value` as whole-string values; dotted access (`$value.foo`) is
confirmed via `Obj.get`. -->

## v-model conventions

Standard Vue convention throughout: prop `modelValue`, event
`update:modelValue`, driven by `ProtoController.update('modelValue', value)`.
Confirmed directly for `NInput`, `NSwitch`, `NSelect`, `NModal`, `NTabs`,
`NTransfer`, `NCheckbox` — plain `v-model` works, there are no named-model
variants (`v-model:visible` etc.) on any of these, even where you might
expect one (`NModal`'s open state is a plain boolean `v-model`; `NTabs`'
active tab is a plain string `v-model`, default `'default'`).

`modelValue`'s declared **type varies per component** — always check that
component's own prop table:

| Component | `modelValue` type |
|---|---|
| `NInput` | `[String, Number]` |
| `NSwitch` | `[Number, Boolean, String, Object]` |
| `NTransfer` | `[Array, Object]` |
| `NSelect` | untyped, `default: null` |

**`NCascader` is the one exception found so far**: it emits both
`update:modelValue` and `update:splitValue` — a second bindable value
alongside the main one. See `ai-docs/components/cascader.md` for what each
represents; wiring only `v-model` on `NCascader` misses required state.

Do not assume plain `modelValue`/`update:modelValue` is universal across
every one of the 40+ components without checking — treat it as the strong
default, not a guarantee.

## Icons and app-level config

See `ai-docs/icons.md` and `ai-docs/config.md` — these are cross-cutting
enough to warrant their own files rather than living here.

## Source of truth

These docs are generated from source at commit `0ff05b4a37867486c8d7e3655ed05477cd0f886b`
(2026-08-20) — see `ai-docs/llms.txt` for the full provenance note. They are
**not** derived from `docs/` or any other pre-existing Markdown in this repo;
if you find `docs/files/*.md` disagreeing with a file here, that is expected —
`ai-docs/` was written directly from `src/`.
