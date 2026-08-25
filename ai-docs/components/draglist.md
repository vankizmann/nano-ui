# NDraglist

A virtualized, drag-and-drop-enabled tree/list view (also usable as a grid via `grid: true`) for reordering, nesting, selecting, and expanding hierarchical items.

## Import / Registration

Registered globally as `NDraglist` (template tag `<n-draglist>`) by
`src/draggable/index.ts` via `App.component(NDraglist.name, NDraglist)`.
Source: `src/draggable/js/draglist/NDraglist.ts` (`defineComponent`),
`NDraglistController.ts`, `NDraglistData.ts`, `NDraglistView.ts` — see
`ai-docs/concepts.md` for the shared Controller/Data/View pattern.

There is no separate `NDraggrid` registration — "grid mode" is the same
`NDraglist` component with `grid: true`. Internally the View switches its BEM
root from `n-draglist`/`n-draglist-item` to `n-draggrid`/`n-draggrid-item`
when `data.grid` is true (`NDraglistView.ts` `default()`).

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` | `null` | `Props.Size` (`BaseProps.ts`) | See `ai-docs/concepts.md` ("Type and Size are open strings"). |
| `type` | `String` | `null` | `Props.Type` (`BaseProps.ts`) | Same as above. |
| `items` | `Array` | `() => []` | `Props.Draglist` (`DragProps.ts`) | The tree data. See "Items tree shape" below. |
| `current` | `Object` | `null` | `Props.Draglist` | Currently-focused/active node's raw item object. `v-model:current`-able (`update:current` is emitted, but see the Events table — one reset path does **not** emit). Cloned locally via `cloneProp` at setup. |
| `selected` | `Array` | `() => []` | `Props.Draglist` | Array of selected node **uids** (the value of `uniqueProp` for each selected item, not the item objects themselves). `v-model:selected`-able. |
| `expanded` | `Array` | `() => []` | `Props.Draglist` | Array of expanded node uids (controls which children are visible — see `NVirtualHelper.visibles()`). `v-model:expanded`-able. |
| `cascade` | `Array` | `() => []` | `Props.Draglist` | Array of uids describing the "path" to the current node (root → leaf), used to derive/restore `current` on mount and updated on click/keyboard nav. `v-model:cascade`-able. |
| `group` | `Array` | `null` | `Props.Draglist` | Drag-group identity/identities this list belongs to; if `null`, defaults to `[this.uid]` (a component-generated unique id) at setup — see `NDraglistController.setup()`. |
| `allowGroups` | `Array` | `null` | `Props.Draglist` | Groups this list will *accept drops from*; if `null`, defaults to the resolved `group` value at setup. A drag from a source list is rejected outright (`onDragmove` returns early) unless `Arr.has(config.group, data.allowGroups)` is true. |
| `safezone` | `Number \| Function` | `0.6` | `Props.Draglist` | Fraction of a node's height/width (or a custom `(size, ...) => number` function) treated as the "before/after" edge band vs. the "inside" center band when computing drop mode — see `NDragReciever.getMode()`. |
| `allowCurrent` | `Boolean` | `true` | `Props.Draglist` | Whether the `n-current` CSS class is applied to the node matching `current` (purely a rendering toggle in `NDraglistView.node()`, does not block the `current` update itself). |
| `renderHandle` | `Boolean` | `false` | `Props.Draglist` | Renders a dedicated `__handle` drag-grip element per node and moves `draggable` off the row root onto the handle. See "Gotchas" — the `header_handle()` header counterpart is dead code. |
| `renderExpand` | `Boolean` | `false` | `Props.Draglist` | Renders a per-node expand/collapse angle icon (only for nodes with children — see `value.childs` on the virtual node). |
| `renderSelect` | `Boolean` | `false` | `Props.Draglist` | Renders a per-node checkbox. **Does not** render a "select all" header checkbox in the current build — see "Gotchas". |
| `allowSelect` | `Boolean \| Function` | `true` | `Props.Draglist` | Gates whether a node's checkbox is interactive (`n-disabled` class applied via `nodeAllowSelect()` when false). When a function: called as `allowSelect({ value, item })`. <!-- UNVERIFIED: `nodeAllowSelect()` only calls the function form after first checking `data.relation.depth` matches the node's depth — cross-depth selection is blocked structurally regardless of `allowSelect`'s return value, so `allowSelect` only fine-tunes within-depth selectability. --> |
| `allowDrag` | `Boolean \| Function` | `true` | `Props.Draglist` | Gates the DOM `draggable` attribute per node (and per handle, when `renderHandle` is true). When a function: called as `allowDrag({ value })`. |
| `allowDrop` | `Boolean \| Function` | `true` | `Props.Draglist` | Gates whether a pending drop is accepted (sets `result.mode = 'deny'` when false). When a function: called once per dragged item as `allowDrop(node, target, mode)` where `node = { value, item }` (dragged item) and `target` is the same shape for the hovered node (or `null` for a root/append drop); **all** dragged items must pass for the drop to be allowed (`nodeAllowDrop()` in `NDraglistController.ts`). |
| `transformDrop` | `Function` | `null` | `Props.Draglist` | `(item) => item`, applied to each dragged item's raw data right before it's spliced into the target tree on drop (`onDragdrop()`); e.g. reassigning a fresh id so a "copy" doesn't collide. If not a function, defaults to identity. |
| `insertNode` | `Boolean` | `true` | `Props.Draglist` | If false, `NDragHelper`'s append/inside/before/after operations become no-ops (item is not spliced into the destination tree) — use to build a drop target that only reports the event without mutating the list. |
| `removeNode` | `Boolean` | `true` | `Props.Draglist` | If false, `NDragHelper.unlinkNodes()`/`removeNodes()` become no-ops (dragged item is not stripped out of the source tree) — pairs with `insertNode: false` on the source to implement copy-instead-of-move. |
| `uniqueProp` | `String` | `'id'` | `Props.Draglist` | Dot-path key read off each raw item to get its unique id. |
| `childProp` | `String` | `'children'` | `Props.Draglist` | Dot-path key read off each raw item to get its child array. |
| `itemSkip` | `Boolean` | `false` | `Props.Draglist` | If true, `nodeDragmove()` short-circuits and returns the raw zone-level result unchanged — effectively disables node-level (before/inside/after) drop targeting, leaving only zone-level `append` drops. |
| `rootSkip` | `Boolean` | `false` | `Props.Draglist` | If true, `onDragmove()` skips computing the zone-level `append` fallback result — effectively disables dropping directly onto the list's empty/root area, leaving only node-level drops. |
| `emptyText` | `String` | `Locale.trans('No items')` | `Props.EmptyText` (`TextProps.ts`) | Passed through to the internal `n-virtualbar`'s empty state. |
| `emptyProps` | `Object` | `{ inline: false }` | `Props.EmptyPropsStacked` (`BaseProps.ts`) | Passed through to the internal `n-virtualbar`'s empty state. |
| `grid` | `Boolean` | `false` | Local (`NDraglist.ts`) | Switches BEM root/behavior to grid mode (`n-draggrid`) and is forwarded to the drag-mode calculation (`grid` affects axis used in `NDragReciever.getMode()` — X axis in grid mode vs. Y axis in list mode). |
| `itemHeight` | `Number` | `32` | Local | Row height forwarded to the internal `n-virtualbar` for virtualization math. |
| `itemWidth` | `Number` | `120` | Local | Grid cell width, forwarded to `n-virtualbar`; also used to compute per-depth indentation is **not** this — indentation uses `itemOffset`, not `itemWidth`. |
| `itemOffset` | `Number` | `30` | Local | Pixels of left-indent per tree depth level (`node_spacer()`), and also used as the drop-target's horizontal offset compensation for indented rows during drag (`nodeDragmove()`). |
| `scrollPortal` | `Boolean` | `false` | Local | Forwarded to the internal `n-virtualbar` (controls whether its scrollbar renders through a teleport/portal). <!-- UNVERIFIED: exact `n-virtualbar` behavior — out of scope for this doc. --> |

### Items tree shape

Each entry in `items` (and recursively in each entry's `childProp`, `'children'` by default) is a plain object with at least:

```ts
interface DraglistNode {
    [uniqueProp]: string | number;   // default key: 'id' — must be unique across the whole tree
    [childProp]?: DraglistNode[];    // default key: 'children' — omit or [] for leaf nodes
    // ...any other fields your row template needs
}
```

Concrete example (confirmed real usage, `demos/overview.html`):

```js
const virtualTree = [
    {
        id: 'a1b2c3',          // uniqueProp
        label: 'Item 1',
        value: 'a1b2c3',
        matrix: 10,
        image: 'https://picsum.photos/600/600.jpg',
        enabled: true,
        children: [            // childProp
            { id: 'd4e5f6', label: 'Item 2', children: [] },
            { id: 'g7h8i9', label: 'Item 3', children: [] },
        ],
    },
    // ...more root nodes
];
```

Internally, `NVirtualHelper.virtuals()` walks this tree once (on `items`
change) into a flat list of lightweight "virtual" node descriptors —
`{ uid, index, depth, route, cascade, parent, childs, total }` — where
`route` is the exact array-index path into `items` (e.g.
`['items', 0, 'children', 1]`) used internally to read/write the real node
via `Obj.get`/`Obj.set`. This flat list (`data.virtuals`, further filtered by
`expanded` into `data.visibles`) is what actually drives rendering and drop
math — the raw `items` tree is only spliced into at drop-time.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:items` | `(items: DraglistNode[])` — a full clone of the tree after mutation | A drop is accepted and mutates the tree (`onDragdrop`, when `result.mode` is one of `append`/`inside`/`before`/`after`), and also when a drag that originated from this list ends inside a *different* zone (`onDragend`, to strip the moved nodes out of the source). |
| `move` | `(uid, ids, options)` — see below | Only from `onDragdrop` (the *destination* list/dropzone of a successful drop), right after `update:items`. |
| `update:selected` | `(uids: (string\|number)[])` | Checkbox click (`onSelectclick`), select-all (`selectAll()`), and reset to `[]` after any successful drop or drag-end. |
| `update:current` | `(item: object)` | Row click (`onCurrentclick`), keyboard up/down/left/right navigation (`setPrevCurrent`/`setNextCurrent`), `setTotalCurrent()`, and internal cascade-restore (`buildCurrent()`). **Not** fired when `current` is reset to `null` after a drop/drag-end — that reset uses the non-emitting `set()`, not `update()`, so `v-model:current` will appear "stuck" showing the old item's data even though internal state is `null`. |
| `update:expanded` | `(uids: (string\|number)[])` | Expand/collapse angle click (`onExpandclick`). |
| `update:cascade` | `(cascade: (string\|number)[])` | Row click when the clicked node's ancestor path differs from the current `cascade` (`onCurrentclick`), and keyboard/`setTotalCurrent` navigation. |
| `row-click` | `(item: object, e: MouseEvent)` | Any row is clicked. `item` is `data.current` **read immediately after** the click also ran `onCurrentclick`, so in practice it is the just-clicked item's raw data. |
| `node-click` | `({ value, item }, e: MouseEvent)` | Same click, richer payload: `value` is the clicked node's virtual descriptor (`uid`/`index`/`depth`/`route`/`cascade`/`parent`/`childs`/`total`), `item` is the same raw data as `row-click`'s payload. |
| `row-dblclick` | `(item: object, e: MouseEvent)` | Any row is double-clicked (fires alongside the two preceding `click`/`row-click` events per normal DOM dblclick semantics). |
| `node-dblclick` | `({ value, item }, e: MouseEvent)` | Same double-click, richer payload (same shape as `node-click`). |

### `move` event payload detail

Emitted as `emit('move', targetUid, ids, options)` from `onDragdrop` in
`NDraglistController.ts`:

- `targetUid` — for `inside`/`before`/`after` drops, the **uid of the node the
  drop was targeted at** (the new parent, for `inside`; the new sibling
  reference point, for `before`/`after`). For an `append` drop (dropped onto
  empty zone space, no specific node target), this is instead whatever uid
  was recorded at drag-start — in practice the **source** zone's own
  component uid, not an item id. <!-- UNVERIFIED: this asymmetry is traced
  directly from `config.uid` reuse in `onDragdrop()`, but its intended
  semantics for `append` mode aren't documented in source — treat `targetUid`
  as reliable only for `inside`/`before`/`after`. -->
- `ids` — array of the **uids of the dragged items** (`config.items` mapped
  through `value.uid`), i.e. what moved.
- `options` — `{ uids: {zone, item}, mode, target, grid, type, group, items, item }`:
  - `mode`: `'append' | 'inside' | 'before' | 'after'` (the only modes that
    reach `move` — `deny`/`self`/`ignore` never get this far).
  - `group`: the dragged group id(s) (clone of the source's `group` prop at drag-start).
  - `items`: array of `{ value, item }` pairs for every dragged node (richer than `ids`).
  - `item`: the resolved target item object — the new parent object for
    `inside`, the parent of the reference sibling for `before`/`after`, or
    `null`/`fallback` for `append` (root-level drop).

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | `{ value, item }` — `value` is the node's virtual descriptor (`uid`, `index`, `depth`, `route`, `cascade`, `parent`, `childs`, `total`); `item` is the raw tree-node object (`Obj.get(data, value.route)`) | Renders the content of each row/cell. Called once per **visible** node (`data.visibles`, i.e. respecting `expanded`), via the internal `n-virtualbar`'s virtualized item slot. There is no separate header/footer slot. |

No other slots exist. `NDraglistView.node_element()` builds a local `passed`
object that additionally includes `copy()`/`remove()` callbacks, but **they
are never passed to the slot** — only `{ value, item }` reaches
`context.slots.default(...)`. Do not rely on `copy`/`remove` in your slot
template (see "Gotchas").

## Exposed methods

None. No `pass()`/`context.expose()` calls exist in `NDraglistController.ts`,
so a template `ref` on `<n-draglist>` does not get bound access to controller
methods like `getItemById`/`getParentById`/`selectAll`/`scrollToIndex` in the
current Vue 3 build. <!-- UNVERIFIED: the legacy Vue 2 demo
(`demos/draggable/index.html`) calls `this.$refs.drag.getParentById(...)`
directly, which implies some prior build exposed the controller on the
template ref (or exposed it by default under Vue 2's options-API instance
model). That demo also references `n-draglist-tree`, `slot-scope`, and props
(`viewport-height`, `threshold`) that do not exist anywhere in the current
`src/`, so it reflects a different, older API surface — do not treat it as
current behavior. -->

## Minimal example

```vue
<template>
    <n-draglist v-model:items="items">
        <template #default="{ item }">
            {{ item.label }}
        </template>
    </n-draglist>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
    { id: '1', label: 'First', children: [] },
    { id: '2', label: 'Second', children: [] },
]);
</script>
```

## Realistic example

Nested tree with drag handles, expand/collapse, checkboxes, and a `move`
listener (shape closely follows `demos/overview.html`):

```vue
<template>
    <n-draglist
        v-model:items="tree"
        v-model:selected="selected"
        v-model:expanded="expanded"
        :group="['project-tree']"
        :render-handle="true"
        :render-expand="true"
        :render-select="true"
        :safezone="0.3"
        :item-offset="24"
        style="height: 400px;"
        @move="onMove"
    >
        <template #default="{ value, item }">
            <div :style="{ lineHeight: '32px' }">
                {{ item.label }} <small v-if="value.childs">({{ value.childs }})</small>
            </div>
        </template>
    </n-draglist>
</template>

<script setup>
import { ref } from 'vue';

const tree = ref([
    {
        id: 'folder-1',
        label: 'Folder 1',
        children: [
            { id: 'file-1', label: 'File 1', children: [] },
            { id: 'file-2', label: 'File 2', children: [] },
        ],
    },
    { id: 'file-3', label: 'File 3', children: [] },
]);

const selected = ref([]);
const expanded = ref(['folder-1']);

function onMove(targetUid, ids, options) {
    console.log('moved', ids, 'to', targetUid, options.mode);
}
</script>
```

## Required composition

None confirmed. `NDraglist` runs standalone via the global `NDragHandler`
pub/sub (window-level `dragover`/`drop` listeners registered once,
`src/draggable/js/drag/NDragHandler.ts`) and its own internal
`NDragReciever` per instance — it does not require an `NDropzone` ancestor or
sibling to function; multiple `NDraglist`/`NDropzone` instances interoperate
purely by sharing a `group` string. `provide('NDraglist', this.instance)` is
called in `setup()`, but no other component in `src/` was found injecting
that key. <!-- UNVERIFIED: could not find a confirmed consumer of the
`'NDraglist'` provide/inject key in the current source tree. -->

## Common mistakes

- **Wrong child-key name.** If your data uses `subItems`/`items`/`nodes`
  instead of `children`, you must pass `child-prop="subItems"` — otherwise
  every node is treated as a leaf (no drop-inside target, no expand arrow).
- **Wrong id-key name.** Similarly, if your unique identifier field isn't
  literally `id`, pass `unique-prop="..."`. `selected`/`expanded`/`cascade`
  all store *this* value, not the item object.
- **Assuming `selected`/`expanded`/`cascade` hold items.** They hold arrays
  of uid values (`uniqueProp` values), not the tree-node objects themselves.
- **Relying on `copy`/`remove` in the default slot.** They are built
  internally (`NDraglistView.node_element()`) but never actually forwarded to
  the slot call — only `{ value, item }` is. A disabled demo block
  (`demos/overview.html`, `v-if="false"`) still shows this pattern; it does
  not work against current source.
- **Expecting `update:current` after a drop.** `current` is reset to `null`
  after a successful drop/drag-end via `set()`, which does not emit — a
  `v-model:current` binding will silently retain the previous value.
- **Two lists dragging into each other but nothing happens.** Check `group`/
  `allowGroups` — a drop is rejected outright unless the dragged item's
  `group` intersects the target list's `allowGroups`.

## Gotchas

- **Select-all header is dead code.** `NDraglistView.header()` and its
  `header_handle()`/`header_expand()`/`header_select()` helpers build a
  header row with a select-all checkbox bound to `scope.selectAll()`, but
  `default()` never calls `this.header()` — nothing in the current render
  tree invokes it. `renderSelect: true` only renders the **per-node**
  checkbox (`node_select()`); there is no working select-all UI without
  building your own (you can still call the underlying logic — see
  `selectState()`/`selectAll()` in `NDraglistController.ts` — but there is no
  exposed way to call them from outside per "Exposed methods" above).
- **`NDragHandler`/`NDragCounter`/`NDragIndicator`/`NDragReciever` are
  internal-only.** They are exported as named exports from
  `src/draggable/index.ts` (not registered as Vue components) and implement
  the shared cross-instance drag machinery: `NDragHandler` is a global
  singleton wiring `window` `dragover`/`drop`/`dragend` listeners and routing
  them to the right zone's `NDragReciever` (one instance per mounted
  `NDraglist`/`NDropzone`, created in `onMounted()` via
  `NDragHandler.append(uid, config)`); `NDragCounter` renders the floating
  "N items" drag-ghost badge that follows the cursor; `NDragIndicator`
  renders the floating drop-position outline box. None of these are meant to
  be instantiated or rendered directly in application templates — treat them
  as implementation detail, not public API. `NDropTarget.ts` in the same
  folder is an empty file (no exported symbol) as of this source snapshot.
- **Keyboard navigation is global-ish.** Arrow-key handling is bound via a
  global `Pointer.bind(uid, 'keydown', ...)` scoped to `[dropzone="${uid}"]`
  — it requires the event target to be inside the list's DOM subtree, not
  full page-level capture.
- **`mode: 'self'`/`'ignore'`/`'deny'` never reach `move`/`update:items`.**
  See the `move` payload note above — only `append`/`inside`/`before`/`after`
  produce a tree mutation and a `move` event.

## Related components

- `NDropzone` (`ai-docs/components/dropzone.md`) — a simpler single-item drop
  target sharing the same underlying drag machinery (`NDragHandler`,
  `NDragReciever`) and `group`/`allowGroups`/`allowDrop` conventions.
