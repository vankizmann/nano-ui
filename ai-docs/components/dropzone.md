# NDropzone

A single-item drag-and-drop target that captures whatever node is dropped on it into a `v-model:item`, without itself holding or rendering a list.

## Import / Registration

Registered globally as `NDropzone` (template tag `<n-dropzone>`) by
`src/draggable/index.ts` via `App.component(NDropzone.name, NDropzone)`.
Source: `src/draggable/js/dropzone/NDropzone.ts` (`defineComponent`),
`NDropzoneController.ts`, `NDropzoneData.ts`, `NDropzoneView.ts` — see
`ai-docs/concepts.md` for the shared Controller/Data/View pattern.

Note: `NDropzone` does **not** use `Props.Draglist` — it declares its own
small, local prop set (only `item`, `allowGroups`, `allowDrop`, `mode`, plus
`Props.Size`/`Props.Type`). It shares drag *mechanics* with `NDraglist`
(same `NDragHandler`/`NDragReciever` machinery) but not the item-tree props.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` | `null` | `Props.Size` (`BaseProps.ts`) | See `ai-docs/concepts.md` ("Type and Size are open strings"). Not otherwise used by `NDropzoneData`/`NDropzoneView` beyond `classRoot()`. |
| `type` | `String` | `null` | `Props.Type` (`BaseProps.ts`) | Same as above. |
| `item` | `Object` | `null` | Local (`NDropzone.ts`) | The captured item's raw data. `v-model:item`-able — set via `update:item` whenever a valid drop lands (`NDropzoneController.onDragdrop`). Not cloned/synced any other way; read-mostly from the parent's perspective. |
| `allowGroups` | `Array` | `null` | Local | Groups this zone accepts drops from. If `null`, defaults to `[this.uid]` (a component-generated unique id) at setup — meaning **with no `group`-matching source list, an `NDropzone` with default `allowGroups` will reject everything**, since no external `NDraglist`/`NDropzone` will share its auto-generated uid. Always set this explicitly to match a source list's `group`. |
| `allowDrop` | `Boolean \| Function` | `true` | Local | Gates whether a pending drop is accepted (`result.mode` forced to `'deny'` when false). When a function: called once per dragged item as `allowDrop(node, target, mode)` where `node = { value, item }` for the dragged item and `target` is always `null` for `NDropzone` (there is no concept of a per-node hover target inside a dropzone — `onDragmove` always resolves to `{ target: els.zone, mode: 'append' }`). All dragged items must pass (`nodeAllowDrop()` in `NDropzoneController.ts`). |
| `mode` | `String` | `null` | Local | Declared as `type: [String]` (the source's JSDoc comment says `PropType<object>`, which is stale/incorrect — the runtime type is `String`). When set, **overrides** the computed drop result's `mode` in both `onDragdrop()` and `onDragend()` — i.e. it is reported back to the *source* list as the drop outcome. Not a validated enum; structurally any string works, but only values meaningful to `NDraglist`'s own handling do anything useful — confirmed useful value: `'ignore'` (source list's `onDragend` treats `'ignore'`, like `'deny'`, as "do not remove the dragged item from my tree", turning the interaction into a non-destructive **copy** rather than a move). <!-- UNVERIFIED: no other `mode` string was found exercised against `NDropzone` in `demos/` beyond `'ignore'`; `'deny'` set on this prop technically would only matter if it also reached `onDragmove`, but `onDragmove` doesn't read `data.mode`, so `mode="deny"` on this prop is a no-op for the drop-acceptance decision (only `allowDrop:false` produces that) — it would just make `onDragdrop`/`onDragend` unnecessarily report a mode value of `'deny'` when a drop already succeeded. -->|

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:item` | `(item: object)` — the raw data of the **first** dragged node (`Arr.first(config.items).item`) | A drop is accepted. Fired from `NDropzoneController.onDragdrop()`, which only runs if the drag wasn't already denied at the `dragmove` stage (`allowGroups` mismatch or `allowDrop` false both prevent `onDragdrop` from running at all — see "Gotchas"). If more than one item is dragged (multi-select drag from an `NDraglist`), only the first is captured; the rest are silently dropped from this event (no truncation warning). |

There is no `move`/`row-click`/etc. — `NDropzone` is deliberately minimal: it
has no internal list, no selection, no keyboard nav, no tree.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | The raw `item` value directly (**not** wrapped in an object) — i.e. `v-slot="item"` binds `item` itself, or `v-slot="{ ...fields }"` destructures the item's own fields if it's a plain object | Renders the zone's content — typically showing whatever was last dropped (`data.item`), or empty-state markup when `item` is `null`. Called via `this.scope.context.slots?.default(this.scope.data.item)` in `NDropzoneView.body()`. |

This differs from `NDraglist`'s default slot, which passes `{ value, item }`
— `NDropzone` passes the item value alone, with no virtual-node metadata
(there is no virtual node; a dropzone isn't a list).

## Exposed methods

None. No `pass()`/`context.expose()` calls exist in `NDropzoneController.ts`.

## Minimal example

```vue
<template>
    <n-dropzone v-model:item="droppedItem" :allow-groups="['project-tree']">
        <template #default="item">
            <div v-if="item">{{ item.label }}</div>
            <div v-else>Drop here</div>
        </template>
    </n-dropzone>
</template>

<script setup>
import { ref } from 'vue';

const droppedItem = ref(null);
</script>
```

## Realistic example

Paired with an `NDraglist` sharing a `group`, using `allow-drop` and `mode`
to build a non-destructive "drop to copy" trash/favorites-style target
(shape follows the confirmed usage in `demos/overview.html`):

```vue
<template>
    <n-draglist v-model:items="tree" :group="['project-tree']" style="height: 300px;">
        <template #default="{ item }">
            <div style="line-height: 32px;">{{ item.label }}</div>
        </template>
    </n-draglist>

    <n-dropzone
        v-model:item="favorite"
        :allow-groups="['project-tree']"
        :allow-drop="true"
        mode="ignore"
        style="width: 200px; height: 200px; border: 2px dashed #999;"
    >
        <template #default="item">
            <div v-if="item" style="padding: 8px;">
                Favorited: {{ item.label }}
            </div>
            <div v-else style="padding: 8px; opacity: 0.5;">
                Drag an item here to favorite it
            </div>
        </template>
    </n-dropzone>
</template>

<script setup>
import { ref } from 'vue';

const tree = ref([
    { id: 'file-1', label: 'File 1', children: [] },
    { id: 'file-2', label: 'File 2', children: [] },
]);

const favorite = ref(null);
</script>
```

With `mode="ignore"` above, dropping a node onto the zone captures it into
`favorite` **and** tells the source `NDraglist` not to remove it from `tree`
(the drag effectively copies a reference rather than moving the node).
Without `mode` set, the source list's default drag-end handling for a
cross-zone drop still only removes the node if `removeNode` is true on the
source list **and** the reported mode isn't `deny`/`ignore` — a plain
`NDropzone` drop (no `mode` prop) reports whatever `onDragmove` computed
(`'append'`), so the source *will* remove the dragged node by default.
<!-- UNVERIFIED: "the source will remove the node by default" is inferred
from `NDraglistController.onDragend()`'s `Arr.has(['deny','ignore'],
result.mode)` early-return guard combined with `NDragHelper.unlinkNodes`/
`removeNodes` being gated only by `removeNode`; not independently observed
running in a browser. -->

## Required composition

None structurally — `NDropzone` renders and mounts standalone (it doesn't
need an `NDraglist` ancestor or descendant). It is only *useful* paired with
at least one `NDraglist` (or another drag source) sharing a compatible
`group`/`allowGroups`, since it has no way to initiate a drag itself.

## Common mistakes

- **Leaving `allow-groups` unset.** Its default is `[this.uid]` (a private,
  auto-generated id), so with no explicit `allow-groups`, the zone silently
  rejects every drop from every other component — nothing will ever appear
  to work. Always pass `allow-groups` matching the source list(s)' `group`.
- **Expecting all dragged items.** Multi-select drags from an `NDraglist`
  only surface their **first** item via `update:item`; there is no array
  form of this event.
- **Confusing this component's `mode` prop with `NDraglist`'s drop-result
  `mode` values.** They're related but not the same axis: this prop
  *overrides what gets reported back*, it does not change whether
  `allowDrop` accepts the drop in the first place.
- **Assuming the default slot scope matches `NDraglist`'s.** It's the bare
  item (or `null`), not `{ value, item }`.

## Gotchas

- **`NDragHandler`/`NDragCounter`/`NDragIndicator`/`NDragReciever` are
  internal-only.** Same shared machinery documented in
  `ai-docs/components/draglist.md` — `NDropzone` creates its own
  `NDragReciever` in `onMounted()` exactly like `NDraglist` does
  (`NDragHandler.append(uid, config)`), and relies on the same global
  `NDragHandler` singleton for `window`-level `dragover`/`drop` routing.
  `NDropTarget.ts` (`src/draggable/js/drag/NDropTarget.ts`) is an empty file
  in this source snapshot — no exported symbol, nothing to document.
- **No node-level drop targeting.** Unlike `NDraglist`, there's no
  before/inside/after distinction — every accepted drop resolves to a single
  `'append'`-style result (`onDragmove` always sets `target: els.zone, mode:
  'append'`), then `mode` (the prop) can stomp that value afterward purely
  for what's *reported*, not for how the drop itself was resolved.
- **A drag started from a plain `NDropzone` isn't possible.** There's no
  `dragstart` wiring here (no draggable element, no `nodeDragstart`
  equivalent) — `NDropzone` is a pure target, never a source.

## Related components

- `NDraglist` (`ai-docs/components/draglist.md`) — the tree/list drag
  source (and equally valid drop target) sharing the same `NDragHandler`/
  `NDragReciever` machinery and `group`/`allowGroups`/`allowDrop`
  conventions.
