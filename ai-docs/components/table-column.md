# NTableColumn

Declares one column of an `NTable` — its cell renderer, filter UI, sort/filter behavior, width, and (for `select`/`matrix` types) a selection plugin. Renders no DOM of its own (`NTableColumnView.default()` returns `null`); it's read by the parent `NTable` via `NTable`'s `childs` list (see concepts.md's `GroupController`).

## Import / Registration

Registered globally by `src/table/index.ts` as `NTableColumn` (tag `<n-table-column>`). Source: `src/table/js/table-column/NTableColumn.ts` / `NTableColumnController.ts` / `NTableColumnData.ts` / `NTableColumnView.ts`.

## Props

Spreads `Props.TrueText`, `Props.FalseText`, `Props.EmptyText`, `Props.UndefinedText` (all `TextProps.ts`, `Locale.trans(...)`-backed defaults — see concepts.md) and `Props.OptionsObject` (`options`/`optionsValue`/`optionsLabel` trio — see concepts.md's "Options resolution"), plus its own props declared in `NTableColumn.ts`.

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `trueText` | `String` | `Locale.trans('Yes')` | `Props.TrueText` | Used by the `boolean` cell renderer. |
| `falseText` | `String` | `Locale.trans('No')` | `Props.FalseText` | Used by the `boolean` cell renderer. |
| `emptyText` | `String` | `Locale.trans('No items')` | `Props.EmptyText` | <!-- UNVERIFIED: not read anywhere in src/table's cell/filter renderers found so far — declared but apparently unused at the column level. --> |
| `undefinedText` | `String` | `Locale.trans('Undefined')` | `Props.UndefinedText` | Shown by the `option` cell renderer when `getOption(input)` finds no matching option. |
| `options` / `optionsValue` / `optionsLabel` | see concepts.md | `{}` / `'$index'` / `'$value'` | `Props.OptionsObject` | Powers both the `option` **cell** renderer (`NTableCellOption`, via `column.getOption(value)`) and the `option` **filter** renderer (`NTableFilterOption`, via `column.getOptions()`) — one config drives both. `options` may also be a `Function` (called as `options(this)`, resolved in `createOptionsMap()`) in addition to Array/Object. |
| `uid` | any | `null` | own | Optional explicit unique id for the column instance; falls back to an auto-generated uid (`makeUID()`) if not set. |
| `modelValue` | any | `null` | own | Only meaningful for `type: 'select'` / `type: 'matrix'` (drives the plugin — see "Plugins" below). Emits `update:modelValue` when the plugin toggles a row. Not used by the plain cell types (`string`/`boolean`/`datetime`/`image`/`option`). |
| `data` | `Object` | `null` | own | Generic per-column config bag, consumed differently per type: for `image` columns, `{ thumbProp: 'someField' }` picks a distinct thumbnail field off the row; for `select`/`matrix` plugin columns, `{ allowUncheck, matrix, prop }` (see "Plugins"). |
| `plugin` | `Object` | `null` | own | <!-- CONFIRMED DEAD PROP: declared in NTableColumnProps but never read by NTableColumnController/Data — the actual plugin class is looked up from `globalThis.NTablePlugins[data.type]`, not from this prop. Do not rely on it. --> |
| `type` | `String` | `'string'` | own | **Selects both the cell renderer (`NTableCells`) and, when `filter` is true, the filter-popover renderer (`NTableFilters`) — the same prop drives both**, resolved via `NTableView.resolve(column.data.type, scope)` (`src/table/js/table/NTableView.ts`). Full enumerated values below. |
| `label` | `String` | `null` | own | Column header text. |
| `tooltip` | `String` | `null` | own | Header tooltip (`data-tooltip-inv` attribute). |
| `prop` | `String` | `null` | own | **Row-data key** (dot-path, resolved via pico-js `Obj.get(row, prop)`). Also the fallback for `sortProp`/`filterProp` when those are left `null`. |
| `sort` | `Boolean` | `false` | own | Whether clicking the header sorts by this column. |
| `sortProp` | `String` | `null`, falls back to `prop` | own | The property name reported in the table's `sort`/`update:sortProp` events; only relevant if different from `prop`. |
| `filter` | `Boolean` | `false` | own | Whether this column shows a filter icon/popover. |
| `filterProp` | `String` | `null`, falls back to `prop` | own | The `property` value written into the table's `filter` array entries; falls back to `prop`. |
| `disabled` | `Boolean \| Function` | `false` | own | For `select`/`matrix` plugin columns: `Function` form is called as `disabled(item)` per row (`NTableSelectPlugin.disabled`/`NTableMatrixPlugin.disabled`) to disable individual row checkboxes. |
| `visible` | `Boolean` | `true` | own | Static per-column visibility flag, checked first in `getVisibility()`. |
| `breakpoint` | `String \| Number` | `null` | own | If set, column auto-hides when the table's rendered width is below this number (`Mix.num(breakpoint) > width`), used only when `NTable`'s `visible` prop is left unset (auto-computed on mount). |
| `align` | `String` | `'left'` | own | Column/cell text alignment — plain string, not validated against a fixed set in source (treat as an open string similar to `type`/`size`, though only `left`/`center`/`right` appear to have matching cell/header CSS classes generated). |
| `width` | `String \| Number` | `null` | own | Flex-basis: `Number` → `${width}px`, `String` → used verbatim (e.g. `'20%'`). Ignored if `fixedWidth` is set. |
| `fixedWidth` | `Number` | `null` | own | Locks the column to a fixed, user-resizable pixel width (drives `n-resizer`'s `disabled`/`modelValue` wiring in `NTableView.column()`). |
| `minWidth` | `Number` | `60` | own | Only applied when `fixedWidth` is not set. |
| `maxWidth` | `Number` | `null` | own | Only applied when `fixedWidth` is not set. |
| `datetimeFormat` | `String` | `'LTSD'` | own | Format token passed to pico-js `Now.make(input).format(datetimeFormat)` in the `datetime` cell renderer. |

**`type` — full enumerated cell-renderer values** (`globalThis.NTableCells`, registered in `src/table/index.ts` from `src/table/js/table-cell/*.ts`; unknown values fall back to `'string'` per `NTableView.resolve()`):

| `type` value | Renderer file | Behavior |
|---|---|---|
| `'string'` (default) | `NTableCellString.ts` | Renders `Str.string(input)` as plain text. Also the fallback for any unrecognized `type`. |
| `'boolean'` | `NTableCellBoolean.ts` | Renders `trueText`/`falseText` via `Str.boolean(input, trueText, falseText)`. |
| `'datetime'` | `NTableCellDatetime.ts` | Renders `Now.make(input).format(datetimeFormat)`. |
| `'image'` | `NTableCellImage.ts` | Renders an `<n-preview>` for the value at `prop` (and optionally a distinct thumbnail from `data.thumbProp`). |
| `'option'` | `NTableCellOption.ts` | Resolves the row value against `options`/`optionsValue`/`optionsLabel` via `column.getOption(input)`; renders `undefinedText` if no match. |
| `'select'` | `NTableCellSelect.ts` | Renders a checkbox-style cell driven by `NTableSelectPlugin` (single-row selection into `modelValue`). |
| `'matrix'` | `NTableCellMatrix.ts` | Renders a checkbox-style cell driven by `NTableMatrixPlugin` (per-row bitmask toggle into `modelValue`). |

**`type` — full enumerated filter-renderer values** (`globalThis.NTableFilters`, from `src/table/js/table-filter/*.ts`; only consulted when `filter` is `true`; unknown values also fall back to `'string'`):

| `type` value | Renderer file | Filter UI / operators |
|---|---|---|
| `'string'` (default/fallback) | `NTableFilterString.ts` | Text input + operator select: `li` (Includes value, default), `nl` (Excludes value), `eq` (Equal value), `new` (Except value). |
| `'option'` | `NTableFilterOption.ts` | Checkbox group built from `column.getOptions()` (same `options`/`optionsValue`/`optionsLabel` as the cell) + operator select: `in` (Includes value, default), `ni` (Excludes value). |
| `'datetime'` | `NTableFilterDatetime.ts` | `n-datepicker` + operator select: `eq` (Exact date, default), `lt` (Before date), `gt` (After date). |

There is **no separate `filterType` prop** — a column with `type: 'boolean'`/`'image'`/`'select'`/`'matrix'` and `filter: true` will render the `'string'` filter UI (the fallback), which usually doesn't make semantic sense; only pair `filter: true` with `type: 'string'` / `'option'` / `'datetime'` for a matching filter UI.

**Plugins** (`globalThis.NTablePlugins`, from `src/table/js/plugin/*.ts`, keyed by the same `type` prop, instantiated in `NTableColumnController.setup()` when `type` matches a registered key):

| `type` value | Plugin class | `modelValue` shape | `data` config | Behavior |
|---|---|---|---|---|
| `'select'` | `NTableSelectPlugin.ts` | The single selected row object, or `null` | `{ allowUncheck: true }` (default) | Clicking a row's checkbox cell sets `modelValue` to that row (comparing rows via `table.uniqueProp`) or `null` if already selected (when `allowUncheck`); emits `update:modelValue`. Disables all other rows' checkboxes once one is selected. |
| `'matrix'` | `NTableMatrixPlugin.ts` | An array of rows, each carrying a bitmask field (default field name `'matrix'`) | `{ allowUncheck: true, matrix: 0, prop: 'matrix' }` | For multi-column bit-flag matrices (e.g. one `NTableColumn` per permission bit, all sharing the same `modelValue` array): toggling a cell flips bit `config.matrix` for that row's `config.prop` field via pico-js `Num.combine`/`Arr.toggle`, then emits `update:modelValue` with the updated array. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `select`: `(item \| null)`; `matrix`: `(rows: array)` | The column's plugin (`select`/`matrix` type only) toggles a row's checkbox — see "Plugins" above. Plain cell types (`string`/`boolean`/`datetime`/`image`/`option`) never emit this. |

## Slots

None — `NTableColumnView.default()` returns `null`; the component is a pure config/registration node, not something that renders its own markup or slot content.

## Exposed methods

None (`ctx.pass([...])` is never called for this component).

## Minimal example

```vue
<n-table :items="rows" style="height: 300px;">
  <n-table-column prop="name" label="Name" />
</n-table>
```

## Realistic example

```vue
<template>
  <n-table :items="rows" style="height: 400px;">
    <n-table-column prop="name" label="Name" sort />
    <n-table-column prop="active" type="boolean" label="Active"
      true-text="Enabled" false-text="Disabled" />
    <n-table-column prop="role" type="option" label="Role" filter
      :options="{ admin: 'Administrator', user: 'Standard user' }" />
    <n-table-column prop="createdAt" type="datetime" label="Created"
      filter datetime-format="LL" />
  </n-table>
</template>

<script setup>
import { ref } from 'vue';

const rows = ref([
  { id: 1, name: 'Ada', active: true, role: 'admin', createdAt: '2026-01-04T00:00:00Z' },
  { id: 2, name: 'Grace', active: false, role: 'user', createdAt: '2026-03-11T00:00:00Z' },
]);
</script>
```

## Required composition

Must be a descendant inside an `<n-table>`'s default slot. `NTableColumnController.onMounted()`/`onUnmounted()` calls `this.ncx('table').append(this)`/`.remove(this)`, resolved through `injectRef(['table', 'NTable'])` — this only succeeds inside a component tree where an ancestor `NTable` has run `provide('NTable', this.instance)`.

## Common mistakes

- Assuming `type` only affects the cell — it also selects the filter UI when `filter: true`, and (for `'select'`/`'matrix'`) activates a whole plugin. Picking `type: 'image'` with `filter: true`, for instance, silently gets the generic string-filter UI, not something image-aware.
- Passing a `plugin` prop expecting it to configure the select/matrix behavior — it is dead code; configure via `data` instead (see plugin table above).
- Forgetting each row needs a stable, unique value at the table's `uniqueProp` (default `'id'`) for `select`/`matrix` plugin equality checks and for row identity generally (see `table.md`).

## Gotchas

- `sortProp`/`filterProp` both silently fall back to `prop` (via `NTableColumnData`'s getter default arg) — you only need to set them when the sort/filter key genuinely differs from the display `prop`.
- The `align` prop is not validated against an enum in source (unlike, say, `Props.AlignLeft`) — any string is accepted structurally but only known values get matching BEM classes/CSS.

## Related components

- `NTable` — required parent.
- `NPaginator` — used alongside `NTable`, not related to `NTableColumn` directly.
