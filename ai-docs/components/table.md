# NTable

A virtualized, sortable, filterable, drag-reorderable data table built on top of `NDraglist` (tree/flat row rendering + virtual scroll) and `NScrollbar`.

## Import / Registration

Registered globally by `src/table/index.ts` as `NTable` (tag `<n-table>`), alongside `NTableColumn` and `NPaginator`. Source: `src/table/js/table/NTable.ts` / `NTableController.ts` / `NTableData.ts` / `NTableView.ts`.

## Props

`NTable` uses the shared Controller/Data/View pattern (see `ai-docs/concepts.md`). It spreads `Props.Load`, `Props.Size`, `Props.Type` (open strings — see concepts.md), and the entire `Props.Draglist` mixin (`src/root/js/prop/DragProps.ts`), plus its own props declared directly in `NTable.ts`.

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Loading state, adds `n-load` class. |
| `size` | `String` | `null` | `Props.Size` | Open string, see concepts.md. |
| `type` | `String` | `null` | `Props.Type` | Open string, see concepts.md. |
| `items` | `Array` | `[]` | `Props.Draglist` (`DragProps.ts`) | **The row data.** See "Row data shape" below. Not cloned by the controller — read live via `data.items` (`DragData.get items()`). |
| `current` | `Object` | `null` | `Props.Draglist` | The "current" (focused/keyboard-navigated) row. <!-- CONFIRMED GOTCHA: NTableView.body()'s `passed` prop-forwarding list (src/table/js/table/NTableView.ts) does NOT include `current` or `selected` — only `expanded`/`cascade` are forwarded into the internal `n-draglist`. So setting `:current`/`:selected` on `<n-table>` does not push a value down into the underlying draglist's selection state; only the `update:current`/`update:selected` events (draglist → table → your v-model) flow outward. Treat these as effectively read-only/output props, not true two-way v-model inputs, until proven otherwise. --> |
| `selected` | `Array` | `[]` | `Props.Draglist` | Selected row uids. Same one-way-out caveat as `current` above. |
| `expanded` | `Array` | `[]` | `Props.Draglist` | Expanded row uids (tree rows). Forwarded into the internal draglist and bindable both ways. |
| `cascade` | `Array` | `[]` | `Props.Draglist` | Ancestor-uid path of the current cascade selection (tree drill-down). Forwarded both ways. |
| `group` | `Array` | `null` | `Props.Draglist` | Drag-and-drop group id list (defaults to `[this.uid]` internally). Forwarded. |
| `allowGroups` | `Array` | `null` | `Props.Draglist` | Which drag groups may drop into this table. <!-- CONFIRMED BUG: `NTableView.body()`'s `passed` array contains the key `'allowGroup'` (singular, no `s`) — not `'allowGroups'`. Since `NTable` has no such prop, `scope.props['allowGroup']` is always `undefined`, so whatever you pass as `allow-groups` on `<n-table>` is never actually forwarded to the internal `n-draglist`. --> |
| `safezone` | `Number \| Function` | `0.6` | `Props.Draglist` | Forwarded as-is to the draglist. |
| `allowCurrent` | `Boolean` | `true` | `Props.Draglist` | Forwarded. |
| `renderHandle` | `Boolean` | `false` | `Props.Draglist` | Forwarded. |
| `renderExpand` | `Boolean` | `false` | `Props.Draglist` | Forwarded. Needed to show the expand/collapse toggle for tree rows. |
| `renderSelect` | `Boolean` | `false` | `Props.Draglist` | Forwarded. Needed to show row checkboxes. |
| `allowSelect` | `Boolean \| Function` | `true` | `Props.Draglist` | Forwarded. |
| `allowDrag` | `Boolean \| Function` | `true` | `Props.Draglist` | Forwarded. |
| `allowDrop` | `Boolean \| Function` | `true` | `Props.Draglist` | Forwarded. |
| `transformDrop` | `Function` | `null` | `Props.Draglist` | Forwarded. |
| `insertNode` | `Boolean` | `true` | `Props.Draglist` | Forwarded. |
| `removeNode` | `Boolean` | `true` | `Props.Draglist` | Forwarded. |
| `uniqueProp` | `String` | `'id'` | `Props.Draglist` | Row key field. See "Row data shape". Forwarded. |
| `childProp` | `String` | `'children'` | `Props.Draglist` | Nested-rows field for tree tables. Forwarded. |
| `itemSkip` | `Boolean` | `false` | `Props.Draglist` | Forwarded. |
| `rootSkip` | `Boolean` | `false` | `Props.Draglist` | Forwarded. |
| `filter` | `Array` | `null` | own (`NTable.ts`) | The **applied** filter state. Array of `{ value, type, property, operator }`. Cloned locally (`cloneProp('filter')`). See "Sort/filter are state-only" below — you own re-filtering `items`. |
| `sortProp` | `String` | `'id'` | own | Currently sorted column's `sortProp`/`prop`. Cloned locally. |
| `sortDir` | `String` | `'desc'` | own | `'asc'` or `'desc'`. Cloned locally. |
| `visible` | `Array` | `null` | own | Array of visible columns' `prop` values (controls which `NTableColumn`s render). If left `null`, is auto-computed on mount from each column's `getVisibility(width)` (breakpoint check against the table's rendered width). Cloned locally. |
| `itemHeight` | `Number` | `32` | own | Row height in px — required for virtual-scroll math (forwarded to `n-draglist`/`n-virtualbar`). |
| `itemOffset` | `Number` | `30` | own | Per-depth indent (px) for tree rows; also forwarded. |

**Row data shape** (`items` prop) — confirmed from `NTableView.cell()` (`Obj.get(node.item, data.prop)`, dot-path lookup) and `DragProps`/`NDraglistController` (`uniqueProp`/`childProp`):

```json
[
  {
    "id": 1,
    "label": "Row A",
    "amount": 42,
    "active": true,
    "createdAt": "2026-08-20T10:00:00Z",
    "children": [
      { "id": 2, "label": "Child of Row A", "amount": 7, "active": false, "createdAt": "2026-08-21T09:00:00Z" }
    ]
  },
  { "id": 3, "label": "Row B", "amount": 100, "active": true, "createdAt": "2026-08-19T08:00:00Z" }
]
```

- Every row needs a value at `uniqueProp` (default `'id'`) that is **unique across the entire tree** (including nested `children`), not just among siblings.
- `children` (or whatever `childProp` is set to) is optional per row — omit it for flat tables.
- Each `NTableColumn`'s `prop` is looked up on the row via `Obj.get(row, prop)` (pico-js dot-path getter), so `prop="user.name"` works for nested fields; it is **not** required to be a top-level key.
- No other keys are structurally required — everything else is whatever your columns' `prop`s point at.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:items` | `(items: array)` | The internal draglist reorders/moves/removes rows via drag-and-drop (`NDraglistController.onDragdrop`/`onDragend`). |
| `update:current` | `(node)` | The internal draglist's current-row pointer changes (passthrough from `n-draglist`'s own `update:current`). |
| `update:selected` | `(uids: array)` | Row selection changes (passthrough). |
| `update:expanded` | `(uids: array)` | A tree row is expanded/collapsed (passthrough). |
| `update:cascade` | `(uids: array)` | Drill-down cascade path changes (passthrough). |
| `update:filter` | `(filters: array)` | User clicks "Apply" or "Reset" in a column's filter popover (`applyColumnFilter()`/`resetColumnFilter()`). Payload is the array of **non-empty** `{ value, type, property, operator }` entries. |
| `update:sortProp` | `(prop: string)` | User clicks a sortable column header and the sort column changes. |
| `update:sortDir` | `(dir: 'asc'\|'desc')` | User clicks a sortable column header and the direction changes (toggles asc/desc on repeat clicks of the same column). |
| `update:visible` | `(props: array)` | User toggles column visibility via the built-in right-click context-menu checkbox group. |
| `filter` | — | **Declared in `emits` but never actually emitted anywhere in source** (`grep` of `src/table` finds no `emit('filter', ...)` call). Do not rely on it — use `update:filter`. |
| `sort` | `(prop: string, dir: 'asc'\|'desc')` | Emitted alongside `update:sortProp`/`update:sortDir` from `applySortColumn()`, called whenever a sortable column header is clicked (even if the resulting values are unchanged) — positional args, not an object. |
| `row-click` | `(node)` | A row is clicked (passthrough from `n-draglist`'s `onRowClick`). |
| `row-dblclick` | `(node)` | A row is double-clicked. |
| `node-click` | `(node)` | A tree node (any depth) is clicked. |
| `node-dblclick` | `(node)` | A tree node is double-clicked. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| default | — | `NTableColumn` children go here (required — this is how the table discovers its columns). |
| default (unnamed, passed to `n-scrollbar`) | — | `NTableView.default()` also renders `this.slot()` (unnamed) after the header/context/body — an extra unscoped default slot for arbitrary extra content inside the scrollbar viewport. |

## Exposed methods

None via `ctx.pass([...])` — no `pass()` call exists anywhere in `src/table`. The controller (`NTableController`) does define `toggleSelect()` and `getTotalSelect()` (select-all-rows helpers that delegate to the internal draglist via `this.ncx('draglist')`), reachable only through the internal `ncx()`/template-ref mechanism described in concepts.md, not as a documented public API.

## Minimal example

```vue
<template>
  <n-table :items="rows" style="height: 400px;">
    <n-table-column prop="label" label="Label" />
    <n-table-column prop="amount" type="string" label="Amount" />
  </n-table>
</template>

<script setup>
import { ref } from 'vue';

const rows = ref([
  { id: 1, label: 'Row A', amount: '42' },
  { id: 2, label: 'Row B', amount: '100' },
]);
</script>
```

## Realistic example

```vue
<template>
  <div style="display: flex; flex-direction: column; height: 500px;">
    <n-table
      :items="rows"
      :sort-prop="sortProp"
      :sort-dir="sortDir"
      :filter="filter"
      style="flex: 1 1 auto; min-height: 0;"
      @sort="onSort"
      @update:filter="onFilter"
    >
      <n-table-column prop="name" label="Name" sort />
      <n-table-column prop="status" type="option" label="Status" filter
        :options="{ 0: 'Draft', 1: 'Published' }" />
      <n-table-column prop="createdAt" type="datetime" label="Created" filter
        datetime-format="LTSD" />
    </n-table>

    <n-paginator
      :page="page"
      :limit="limit"
      :total="total"
      @update:page="page = $event; reload()"
      @update:limit="limit = $event; reload()"
      style="flex: 0 0 auto;"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const rows = ref([]);
const total = ref(0);
const page = ref(1);
const limit = ref(100);
const sortProp = ref('name');
const sortDir = ref('asc');
const filter = ref(null);

function onSort(prop, dir) {
  sortProp.value = prop;
  sortDir.value = dir;
  reload();
}

function onFilter(value) {
  filter.value = value;
  reload();
}

function reload() {
  // NTable does not filter/sort `items` itself — you must refetch/re-derive
  // rows yourself from sortProp/sortDir/filter/page/limit and reassign `rows`.
}
</script>
```

## Required composition

- `NTableColumn` elements must be direct-or-nested descendants inside `<n-table>`'s default slot — each column's `NTableColumnController.onMounted()` calls `this.ncx('table').append(this)`, resolved via `injectRef(['table', 'NTable'])`, which only finds a provider if it is a descendant of an `NTable` (which calls `provide('NTable', this.instance)`). A column rendered outside an `NTable` will throw/fail to resolve its table.
- **`NPaginator` is not allowed inside `NTable`.** It is a fully separate component with no `inject`/`provide` relationship to `NTable` at all — use it adjacent to (e.g. below) the table, wiring `page`/`limit`/`total` yourself, as in the realistic example above.

## Common mistakes

- **Forgetting to give `<n-table>` an explicit height.** `NTable` has **no `height` prop.** Internally it renders `n-scrollbar` → `n-virtualbar`, whose virtual-scroll window is computed from the *actual rendered* `el.clientHeight` (`NVirtualbarController.buildState()`, `src/scrollbar/js/virtualbar/NVirtualbarController.ts`). The scrollbar's inner content (`.n-scrollbar-content`) is `position: absolute; top/left/right/bottom: 0` (`src/scrollbar/css/scrollbar.scss`) — it fills its parent, but contributes **no** height of its own back up the DOM. If `<n-table>` (or a flex/grid ancestor sizing it) doesn't have a real CSS height (inline `style="height: …"`, a fixed-height class, or `flex: 1 1 auto` inside a sized flex column), the table renders at effectively zero height and appears empty/broken. Always set height via CSS/style, never via a prop.
- **Assuming the table filters/sorts `items` itself.** It does not. `sortProp`/`sortDir`/`filter` are purely UI state that `NTable` tracks and reports via `sort`/`update:sortProp`/`update:sortDir`/`update:filter` — there is no code path anywhere in `NTableController`/`NTableView` that reorders or filters the `items` array. Your app must react to those events (client-side re-sort/re-filter, or a server refetch) and pass back an already-sorted/filtered `items` array.
- Expecting `v-model="items"` (plain, unnamed) to work — `NTable` has no `modelValue`/`update:modelValue` pair at all. Bind with `:items`/`@update:items` (or Vue's named-slot v-model sugar `v-model:items="rows"`).
- Expecting `:current`/`:selected` to drive the table's selection from outside — see the confirmed gotcha in the props table above; only `expanded`/`cascade` are genuinely two-way.

## Gotchas

- The `filter` and `paginate`-style "semantic" event some might expect (`filter`) is declared in `emits` but dead code — never fired. Use `update:filter`.
- `allowGroups` is silently broken due to a `'allowGroup'` (singular) typo in the internal prop-forwarding list — see props table.
- `current`/`selected` are not forwarded down into the internal `n-draglist` — only their `update:*` events flow upward. Treat them as effectively read-only for now.
- `demos/table/index.html` in this repo is a stale, pre-rewrite (Vue 2) demo using prop names that do not exist in current source (`viewport-height`, `render-expand`/`render-select` as bare booleans without value binding oddities, `default-width`, `preview-prop`, `close-filter-on-enter`, `sort-on-label`, plain `v-model="items"`). Do not copy attributes from it — none of those extra props exist on the current `NTableProps`/`NTableColumnProps`. `ai-docs/` is written from `src/`, not from this demo.
- <!-- UNVERIFIED: whether NTableColumn's `emptyText`/`undefinedText` props affect anything besides NTableCellOption's `undefinedText` fallback for missing option matches — `emptyText` in particular is not referenced anywhere in src/table's cell/filter renderers. -->

## Related components

- `NTableColumn` — declares each column; must be a descendant.
- `NPaginator` — pairs with `NTable` for page/limit UI, but is never nested inside it.
- `NDraglist` (`src/draggable/js/draglist/`) — the underlying tree/virtual-list engine `NTable` builds on; most of `Props.Draglist` is a direct passthrough to it.
- `NScrollbar` / `NVirtualbar` (`src/scrollbar/js/`) — provide the custom scrollbar and virtual-scroll viewport measurement.
