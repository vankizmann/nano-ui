# NInfo

A read-only key-value detail panel: renders a single `item` object through
its `NInfoColumn` children, or a built-in empty state when no item is set.

## Import / Registration

Registered globally via `src/info/index.ts`'s install function
(`App.component('NInfo', NInfo)`), which also registers `NInfoColumn` in the
same call. That same file additionally builds the shared cell-renderer
registry that `NInfoColumn` reads from:

```ts
globalThis.NInfoCells = {
    'string':   NTableCellString,
    'boolean':  NTableCellBoolean,
    'datetime': NTableCellDatetime,
    'image':    NTableCellImage,
    'option':   NTableCellOption,
};
```

These are the **same renderer components the table module uses**
(`src/table/js/table-cell/*.ts`, imported directly), re-keyed under
`NInfoCells` instead of `NTableCells`. `NInfo` itself doesn't touch this
registry — it's `NInfoColumn` that resolves a cell type through it (see
`ai-docs/components/info-column.md`).

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` | `null` | `Props.Size` (`BaseProps.ts`) | Open string — see concepts.md "Type and Size are open strings." Applied via `classRoot()` as `n-size-{size}`. |
| `type` | `String` | `null` | `Props.Type` (`BaseProps.ts`) | Open string, styling only (`n-type-{type}`) — unrelated to `NInfoColumn`'s own `type` prop (cell-renderer selector). |
| `item` | `Object` | `null` | Component-local (`NInfo.ts`) | The data object being displayed. Each child `NInfoColumn` reads one field out of it via its own `prop`. When falsy, `NInfo` renders the empty state instead of its children. |
| `syncEvent` | `Function` | `null` | Component-local | Stored and exposed via `data.syncEvent`, but <!-- UNVERIFIED: no call site found anywhere in `src/info/` — `NInfoController`/`NInfoView` never invoke it. Its purpose could not be confirmed from source; treat as reserved/unused in this version. --> |
| `scrollbar` | `Boolean` | `false` | Component-local | When `true`, wraps the body in an `n-scrollbar` component (`this.comp('n-scrollbar', ...)`) instead of a plain `div`. |
| `renderEmpty` | `Boolean` | `true` | Component-local | Declared and exposed via `data.renderEmpty`, but <!-- UNVERIFIED: `NInfoView.body()` branches only on `data.item` truthiness, never reads `data.renderEmpty` — the prop currently has no observed effect on the render path. --> |
| `emptyText` | `String` | `Locale.trans('No item')` | Component-local (overrides `Props.EmptyText`'s `'No items'` key) | Text shown in the empty state (`n-empty-icon`) when `item` is falsy. Note the singular wording differs from the shared `Props.EmptyText` default used elsewhere in the library. |

`NInfo` does **not** spread `Props.Load`/`Disabled`/`Color`/`Clearable`/etc. —
only `Size` and `Type` from `BaseProps`. Its prop list above is exhaustive.

## Events

None. `NInfo.ts` declares `emits: []`, and `NInfoController` never calls
`this.emit(...)` or `this.update(...)`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | Rendered inside the body wrapper only while `item` is truthy (`this.div('body', [this.slot()])` in `NInfoView.body()`). This is where `NInfoColumn` children go. |

## Exposed methods

None — `NInfoController` never calls `pass()`.

## Minimal example

```vue
<n-info :item="user">
    <n-info-column label="Name" prop="name"></n-info-column>
</n-info>
```

## Realistic example

Adapted directly from `demos/overview.html` (the `n-info` block bound to a
table's current row):

```vue
<n-info :item="user" :scrollbar="true" style="width: 300px; height: 500px;">
    <n-info-column label="Name" type="string" prop="name"></n-info-column>
    <n-info-column label="Avatar" type="image" prop="avatar"></n-info-column>
    <n-info-column label="Joined" type="datetime" prop="joinedAt"></n-info-column>
    <n-info-column label="Active" type="boolean" prop="active"></n-info-column>
    <n-info-column
        label="Role"
        type="option"
        prop="roleId"
        :options="[{ value: 1, name: 'Admin' }, { value: 2, name: 'Member' }]"
        options-value="$value.value"
        options-label="$value.name"
    ></n-info-column>
    <n-info-column label="ID" type="string" prop="id"></n-info-column>
</n-info>
```

## Required composition

`NInfo` is the parent side of the pair: it `provide('NInfo', this.instance)`
in `NInfoController.setup()` and is a `GroupController` (tracks appended
children via `append`/`remove`, though `NInfoView` doesn't currently iterate
`childs` itself — the default slot renders whatever markup is passed in).
`NInfo` has no dependency on `NInfoColumn` existing — an `NInfo` with no
column children (or arbitrary other content in its default slot) still
renders fine, showing the empty state only when `item` itself is falsy.
See `ai-docs/components/info-column.md` for the child-side requirement.

## Common mistakes

- Expecting `renderEmpty: false` to suppress the empty state — it has no
  observed effect; the empty state is driven purely by `item` truthiness.
- Assuming `type`/`size` restrict to a fixed set of values — see concepts.md,
  they're open strings with only `xs/sm/md/lg/xl` (size) and
  `primary/secondary/info/warning/danger/success` (type) styled by default.
- Confusing `NInfo`'s `type` prop (visual style) with `NInfoColumn`'s `type`
  prop (which cell renderer to use) — they are unrelated props that happen
  to share a name.

## Gotchas

- `syncEvent` and `renderEmpty` are both declared, plumbed through to
  `NInfoData` getters, but have no confirmed consumer in the current source
  — don't assume passing them changes behavior.
- The empty state uses `this.empty({ inline: false })` (`ProtoView.empty()`),
  which reads `emptyText`/`emptyProps` directly off `scope` rather than
  `data` — `NInfo` doesn't declare an `emptyProps` prop at all, so it always
  renders with `{}` merged under the `{ inline: false }` override.
- `scrollbar` changes the root wrapper component (`n-scrollbar` vs plain
  `div`) but not the BEM class list — `classList` is computed once and
  passed to whichever wrapper is used.

## Related components

- `NInfoColumn` (`ai-docs/components/info-column.md`) — the only documented
  way to render fields inside `NInfo`; required child-side `inject` of this
  component's provided context.
- `NTable` / `NTableColumn` — the cell-type rendering system
  (`string`/`boolean`/`datetime`/`image`/`option`) that `NInfoColumn` reuses
  verbatim from `src/table/js/table-cell/*.ts` is otherwise documented under
  the table component's own docs.
