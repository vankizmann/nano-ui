# NTransfer

A dual-list picker: search/select items in a "source" panel and move them to
a "target" panel (via button, double-click, or drag), with the target list's
membership bound as `modelValue`.

## Import / Registration

Registered globally via `App.use(Install)` from the **transfer** group index
(`src/transfer/index.ts`), which calls `App.component('NTransfer', NTransfer)`.
Self-contained — no companion component to register alongside it.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` | Adds `n-load` class to the root. |
| `size` | `String` | `null` | `Props.Size` | Open string; known styled values `xs`/`sm`/`md`/`lg`/`xl`. |
| `type` | `String` | `null` | `Props.Type` | Open string; known styled values `primary`/`secondary`/`info`/`warning`/`danger`/`success`. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` | Adds `n-disabled` (via `superDisabled`). <!-- UNVERIFIED: neither controller nor view reads `data.disabled`/`superDisabled` to gate any interaction (drag, buttons, dblclick) — it only affects the root class list via `classRoot()`. Treat as a styling-only flag unless you verify otherwise. --> |
| `modelValue` | `[Array, Object]` | `null` | Component-local (`NTransfer.ts`) | The **target** list's contents — an array (or object map) of the same item shape found in `options`. This is what `v-model` binds. Matches concepts.md's confirmed `[Array, Object]` type. |
| `options` | `[Array, Object]` | `() => []` | Component-local (`NTransfer.ts`) | The full universe of selectable items. **Not** `Props.OptionsObject` — see Gotchas. Source items must be objects; every item needs a value at `labelProp` and a value at `uniqueProp`. |
| `labelProp` | `String` | `'label'` | Component-local | Dot-path (via `Obj.get`) read on each item to get its display label, used for both rendering and the search filter (`Str.has`). |
| `uniqueProp` | `String` | `'id'` | Component-local | Dot-path read on each item for identity — used to dedupe source-vs-target membership and for drag-drop's `Arr.add`/`Arr.remove`. |
| `sourceLabel` | `String` | `'Source'` | Component-local | Header title text for the left panel, resolved through `Locale.trans()` at render (`data.$sourceLabel`). |
| `targetLabel` | `String` | `'Target'` | Component-local | Header title text for the right panel, resolved through `Locale.trans()` (`data.$targetLabel`). |
| `sourcePlaceholder` | `String` | `'Search source'` | Component-local | Placeholder for the left panel's search `n-input`. |
| `targetPlaceholder` | `String` | `'Search target'` | Component-local | Placeholder for the right panel's search `n-input`. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `any[]` (or `object`, matching `options`' shape) — the new target list | Move-right button click (`moveSelectedToTarget`), move-left button click (`moveSelectedToSource`), row double-click in either panel (`moveToTarget`/`moveToSource`), or a drag-drop into the target `n-draglist` (`onUpdate:items` → `scope.update('modelValue', items)`). |

## Slots

None — `NTransferView` never calls `this.slot(...)`; both panels render item labels via a plain string return from the `n-draglist` `default` scoped slot (`Obj.get(item, data.labelProp)`), not a slot NTransfer itself exposes to its consumer.

## Exposed methods

None — `NTransferController` never calls `pass()`.

## Minimal example

```vue
<n-transfer v-model="target"></n-transfer>
```

## Realistic example

Built from source (the only two demo files that reference `n-transfer`,
`demos/transfer/index.html` and the `NTransfer` section of
`demos/overview.html`, use a stale pre-rewrite API — see Gotchas — so this
example is derived directly from the current `NTransferProps`):

```vue
<n-transfer
    v-model="assignedUsers"
    :options="allUsers"
    label-prop="name"
    unique-prop="id"
    source-label="Available"
    target-label="Assigned"
    source-placeholder="Search available users"
    target-placeholder="Search assigned users"
    size="sm"
></n-transfer>
```

```js
allUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carol' },
];

assignedUsers = [
    { id: 2, name: 'Bob' },
];
```

## Required composition

None — `NTransfer` is self-contained, like `NSelect`. It internally renders
two `n-draglist` panels plus `n-button`/`n-input` parts, but none of that is
authored by the consumer.

## Common mistakes

- Passing `options` shaped for `Props.OptionsObject` (i.e. expecting
  `optionsValue`/`optionsLabel` support). `NTransfer` does **not** use that
  mixin at all — see Gotchas. Use `labelProp`/`uniqueProp` instead, and make
  sure every option object actually has those keys (default `label`/`id`).
- Expecting `modelValue` to be a list of ids/keys. It is the actual **item
  objects** moved into the target list (`Arr.add`/`Arr.remove` operate on
  the objects themselves, matched by `uniqueProp`), not a list of ids.
- Expecting drag-and-drop to work symmetrically in both directions. It
  doesn't — see Gotchas.

## Gotchas

- **`NTransfer` does not use `Props.OptionsObject`.** Despite concepts.md's
  general "any component with an `options` prop always has `optionsValue`/
  `optionsLabel` alongside it" rule, `NTransferProps` declares its own
  `options: { type: [Array,Object], default: () => [] }` with no
  `optionsValue`/`optionsLabel` props at all — it uses `labelProp`
  (default `'label'`) and `uniqueProp` (default `'id'`) instead, resolved via
  plain `Obj.get(item, prop)` (no `$index`/`$value` pair wrapping, unlike
  `OptionHelper`). Treat NTransfer as the exception to that general rule.
- **Drag-and-drop is one-directional.** The source `n-draglist` is configured
  with `insertNode: false` (items can be dragged *out* of it but not dropped
  *into* it), while the target `n-draglist` has `insertNode: true,
  removeNode: true`. So dragging only moves items from source → target;
  moving an item back from target → source must go through the move-left
  button or a double-click on the target row (`moveToSource`).
- **`sourceLabel`/`targetLabel`/`*Placeholder` defaults are plain English
  literals**, not `Locale.trans()` keys declared at the prop level like
  `Props.TextProps` — but they are still passed through `Locale.trans()` at
  render time via the `$sourceLabel`/`$targetLabel`/`$sourcePlaceholder`/
  `$targetPlaceholder` getters in `NTransferData`. So a locale that defines a
  translation for the literal string `'Source'` will still translate it.
- `demos/transfer/index.html` and the `NTransfer` block in
  `demos/overview.html` are stale: they load Vue 2.5.13 and a prebuilt
  `dist/nano-ui.esm.js`, and use `:items="..."` and a `trigger="click"` prop
  that do not exist anywhere in the current `NTransferProps`. Do not use
  these files as an API reference for this component; they were not used as
  the basis for the examples above.
- `disabled` appears to be styling-only (see the Props table entry) —
  <!-- UNVERIFIED: confirm whether any parent gating (e.g. `n-form-item`
  disabling propagation) still applies at a level above this component. -->

## Related components

- `NSelect` — the flat single/multi picker `NTransfer` is conceptually
  closest to (per the task brief), though it does **not** share the
  `options`/`optionsValue`/`optionsLabel` trio with it.
- `NDraglist` (internal) — both panels are rendered as `n-draglist` instances
  under the hood; drag-and-drop semantics come from there.
