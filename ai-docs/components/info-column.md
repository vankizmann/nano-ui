# NInfoColumn

A single labeled field within an `NInfo` panel: reads one property off the
parent's `item` (via `prop`) and renders it through a cell-type renderer
resolved from the shared `NInfoCells` registry.

## Import / Registration

Registered globally alongside `NInfo` via `src/info/index.ts`
(`App.component('NInfoColumn', NInfoColumn)`). Its `type` prop selects a
renderer from `globalThis.NInfoCells`, a registry built by that same
`src/info/index.ts` by **re-registering the table module's cell renderers**
(`src/table/js/table-cell/*.ts`) under the `NInfoCells` global instead of
`NTableCells`:

```ts
globalThis.NInfoCells = {
    'string': NTableCellString, 'boolean': NTableCellBoolean,
    'datetime': NTableCellDatetime, 'image': NTableCellImage,
    'option': NTableCellOption,
};
```

`NInfoColumnView.resolve(type)` looks up `globalThis.NInfoCells[type]`,
falling back to the `'string'` renderer if the key isn't found:

```ts
resolve(type, scope = 'NInfoCells') {
    if ( globalThis[scope][type] ) return globalThis[scope][type];
    return globalThis[scope]['string'];
}
```

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `type` | `String` | `'string'` | Component-local (`NInfoColumn.ts`) | **Cell renderer selector.** Full enumerated list, exactly the `NInfoCells` registry keys: `'string'`, `'boolean'`, `'datetime'`, `'image'`, `'option'`. Any other value (including `'select'` or `'matrix'`, which exist as `NTableColumn` cell types) silently falls back to the `'string'` renderer via `resolve()` — there is no error, just a likely-wrong render. Also used verbatim in the root element's modifier class: `n-info-column--{type}`. |
| `label` | `String` | `null` | Component-local | Text rendered in the field's label part (`n-info-column__label`). No label slot exists — this prop is the only way to set it. |
| `prop` | `String` | `null` | Component-local | Dot-path read off the parent `NInfo`'s `item` via `Obj.get(item, prop)` — this is the value handed to the cell renderer as `input`. |
| `data` | `Object` | `null` | Component-local | Renderer-specific config object, read by individual cell renderers via `column.get('data')` (e.g. `NTableCellImage` reads `data.thumbProp` from it) — mirrors `NTableColumn`'s own `data` prop for the same cell components. |
| `datetimeFormat` | `String` | `'LTSD'` | Component-local | Format token string passed to `Now.make(input).format(...)` by the `'datetime'` cell renderer only. |
| `trueText` | `String` | `Locale.trans('Yes')` | `Props.TrueText` (`TextProps.ts`) | Used by the `'boolean'` cell renderer (`NTableCellBoolean`) via `column.data.trueText`. |
| `falseText` | `String` | `Locale.trans('No')` | `Props.FalseText` (`TextProps.ts`) | Used by the `'boolean'` cell renderer via `column.data.falseText`. |
| `emptyText` | `String` | `Locale.trans('No items')` | `Props.EmptyText` (`TextProps.ts`) | Declared via the shared mixin; <!-- UNVERIFIED: no direct read of `data.emptyText` found in `NInfoColumnController`/`View` or in the reused table-cell renderers — likely reserved for parity with `NTableColumn`, not observed to affect `NInfoColumn`'s own render path. --> |
| `undefinedText` | `String` | `Locale.trans('Undefined')` | `Props.UndefinedText` (`TextProps.ts`) | Used by the `'option'` cell renderer (`NTableCellOption`) as the fallback label when `getOption(input)` resolves to `null`. |
| `options` / `optionsValue` / `optionsLabel` | `Object` (Array also works) / `String` / `String` | `{}` / `'$index'` / `'$value'` | `Props.OptionsObject` (`OptionProps.ts`) | Standard options trio (see concepts.md "Options resolution"). Consumed by the `'option'` cell renderer via `column.getOption(input)` / `column.data.undefinedText`. |
| `modelValue` | any | `null` | Component-local | Declared but <!-- UNVERIFIED: no getter in `NInfoColumnData`, no read/write anywhere in `NInfoColumnController`/`View` — this prop is currently a no-op. Do not rely on `v-model` doing anything on `NInfoColumn`. --> |

Note: `type` here is **not** `Props.Type` from `BaseProps` (that's an open
styling string, default `null`) — it's a component-local prop with a
different meaning and a different default (`'string'`). See `info.md`'s
"Common mistakes" for the naming collision with `NInfo`'s own `type` prop.

## Events

None. `NInfoColumn.ts` doesn't declare an `emits` array at all (not even an
empty one), and `NInfoColumnController` never calls `this.emit(...)` or
`this.update(...)`.

## Slots

None. `NInfoColumnView` never calls `this.slot(...)` — the label comes from
the `label` prop only, and the field is always rendered through the resolved
cell-type component, not slot content.

## Exposed methods

None — `NInfoColumnController` never calls `pass()`.

## Minimal example

```vue
<n-info :item="user">
    <n-info-column label="Name" prop="name"></n-info-column>
</n-info>
```

## Realistic example

```vue
<n-info :item="user">
    <n-info-column label="Name" type="string" prop="name"></n-info-column>
    <n-info-column
        label="Avatar"
        type="image"
        prop="avatar"
        :data="{ thumbProp: 'avatarThumb' }"
    ></n-info-column>
    <n-info-column label="Joined" type="datetime" prop="joinedAt" datetime-format="LL"></n-info-column>
    <n-info-column label="Active" type="boolean" prop="active" true-text="Enabled" false-text="Disabled"></n-info-column>
    <n-info-column
        label="Role"
        type="option"
        prop="roleId"
        :options="[{ value: 1, name: 'Admin' }, { value: 2, name: 'Member' }]"
        options-value="$value.value"
        options-label="$value.name"
        undefined-text="Unknown role"
    ></n-info-column>
</n-info>
```

## Required composition

**Confirmed from source: `NInfoColumn` must be a descendant of `NInfo`.**
`NInfoColumnController.setup()` calls
`this.injectRef(['info', 'NInfo'])`, and its `onMounted()`/`onUnmounted()`
hooks call `this.ncx('info')?.append(this)` / `?.remove(this)` — registering
itself into the parent `NInfo`'s (`GroupController`) child list. More
importantly, `NInfoColumnView.field()` reads the actual value to render via:

```ts
const item = Obj.get(scope.ncx('info'), ['data', 'item'], {});
const input = Obj.get(item, data.prop);
```

Outside an `NInfo` ancestor, `inject('NInfo', null)` resolves to `null`, so
`scope.ncx('info')` is `undefined` — the optional chaining means **no hard
runtime error is thrown** (unlike e.g. `NCollapseItem`, which does error
standalone), but `item` silently falls back to `{}` and `input` is always
`undefined`, so every column renders empty/blank. Functionally, `NInfoColumn`
outside `NInfo` is inert, even though it won't crash.

## Common mistakes

- Passing `type="select"` or `type="matrix"` expecting it to work like
  `NTableColumn` — **confirmed not supported**: `NInfoCells` only registers
  `string`/`boolean`/`datetime`/`image`/`option` (5 of the 7 `NTableColumn`
  cell types). Both `select` and `matrix` silently fall back to the
  `'string'` renderer via `resolve()`'s registry-miss branch, producing a
  raw stringified value instead of the expected control.
- Using `NInfoColumn` outside `<n-info>` — no error is thrown, but every
  field renders blank because `item`/`input` resolve to `{}`/`undefined`
  (see "Required composition" above).
- Expecting `v-model="..."` on `NInfoColumn` to do anything — `modelValue`
  is declared but never read or written; this component is display-only.
- Confusing this `type` prop (cell renderer choice) with the shared
  `Props.Type` styling prop used elsewhere in the library — they don't
  overlap in meaning or accepted values.

## Gotchas

- `data` is a generic per-renderer config bag, not itself typed per cell
  type — check the specific `NTableCell*.ts` source (`src/table/js/table-cell/`)
  for what keys a given `type` actually reads from it (e.g. only
  `'image'` reads `data.thumbProp`).
- The root element's class includes `n-info-column--{type}` using the raw
  `type` string, so an unsupported value like `type="matrix"` still produces
  a `n-info-column--matrix` class even though it renders with the `string`
  cell component underneath — the class and the actual renderer can disagree.
- `emptyText` is declared (via `Props.EmptyText`) but not observed to be
  consumed anywhere in this component's own render path or by any of the
  five reused cell renderers — don't rely on it doing anything here.
- `datetimeFormat` defaults to `'LTSD'`, not a plain date pattern — it's a
  pico-js `Now`/`Locale` token string (see concepts.md's note on the
  `Now`/`Locale` datetime helpers replacing `moment`).

## Related components

- `NInfo` (`ai-docs/components/info.md`) — the required parent; provides
  `item` and the injection context this component depends on.
- `NTableColumn` / `NTable` — owns the original `string`/`boolean`/
  `datetime`/`image`/`option`/`select`/`matrix` cell-renderer set under
  `src/table/js/table-cell/`; `NInfoColumn` reuses 5 of those 7 renderer
  components directly (not reimplementations) via the `NInfoCells` registry.
  `select` and `matrix` remain table-only.
