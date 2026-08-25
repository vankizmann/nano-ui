# NCollapse

The multi-panel accordion container: tracks which panel names are open as an
array `v-model`, and provides context (`NCollapse` inject key) that its
`NCollapseItem` children read to know if they're open and how to render.

## Import / Registration

Registered globally via `App.use(Install)` from the **collapse** group index
(`src/collapse/index.ts`), which calls `App.component('NCollapse', NCollapse)`
and `App.component('NCollapseItem', NCollapseItem)` together — both are
always registered as a pair.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` | Adds `n-load` to the root. |
| `size` | `String` | `null` | `Props.Size` | Open string; known styled values `xs`/`sm`/`md`/`lg`/`xl`. |
| `type` | `String` | `null` | `Props.Type` | Open string; known styled values `primary`/`secondary`/`info`/`warning`/`danger`/`success`. |
| `modelValue` | `Array` | `() => []` | Component-local (`NCollapse.ts`) | The list of currently-open panel `name`s. **Always multi-open** — see "Single vs. multiple open panels" below. |
| `scrollbar` | `Boolean` | `true` | Component-local | Default for child items' `scrollbar` (wraps panel content in `n-scrollbar` instead of a plain `<div>`). Each `NCollapseItem` can override this individually. |
| `lazy` | `Boolean` | `true` | Component-local | Default for child items' `lazy` (content isn't mounted until first opened). See gotchas on `lazy`/`keep` interaction. |
| `keep` | `Boolean` | `false` | Component-local | Default for child items' `keep` (once opened, content stays mounted — hidden via `display:none` rather than destroyed — when the panel closes). |
| `dragOpen` | `Boolean` | `true` | Component-local | If true, dragging something over a closed item's header (native `dragenter`) auto-opens that panel (`superFixed`, opens-only, never closes). Desktop drag-and-drop UX. |

## Single vs. multiple open panels

`NCollapse` **only supports multiple open panels** — there is no accordion /
single-open mode and no prop to switch modes. `modelValue` is always an
`Array` of open panel `name` strings. Toggling a panel
(`NCollapseController.superToggle(name)`) calls `Arr.toggle(clone(model),
name)` — i.e. it adds/removes just that one name from the array, with no
logic anywhere that closes other open panels. To emulate accordion (single-
open) behavior yourself, listen to `update:modelValue` and truncate the
array to its last entry before writing it back, or otherwise manage the
array externally.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `string[]` — the full new list of open panel names | A panel header is clicked (`superToggle`, via `NCollapseItem`'s `superToggle()` → `collapse.superToggle(name)`), or a drag-enter auto-opens a closed panel (`superFixed`, only adds, never removes). |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | Place `NCollapseItem` children here. Rendered as-is via `this.slot('default')` — see Gotchas about visual ordering. |

## Exposed methods

None — `NCollapseController` never calls `pass()`.

## Minimal example

```vue
<n-collapse v-model="openPanels">
    <n-collapse-item name="panel-1" label="Panel 1">
        Content 1
    </n-collapse-item>
    <n-collapse-item name="panel-2" label="Panel 2">
        Content 2
    </n-collapse-item>
</n-collapse>
```

## Realistic example

Built from source (no demo files reference `n-collapse`/`n-collapse-item`):

```vue
<n-collapse v-model="openPanels" :keep="true" size="sm">
    <n-collapse-item name="general" label="General" icon="cog" sort="1">
        <n-input v-model="form.name" placeholder="Name"></n-input>
    </n-collapse-item>
    <n-collapse-item name="advanced" label="Advanced" icon="sliders" sort="2" :lazy="false">
        <template v-slot:action>
            <n-button size="xs" type="danger">Reset</n-button>
        </template>
        <n-input v-model="form.token" placeholder="API token"></n-input>
    </n-collapse-item>
</n-collapse>
```

```js
openPanels = ['general'];
```

## Required composition

**Strict pairing, same pattern as `NRadio`/`NRadioGroup`**: `NCollapse` may
only contain `NCollapseItem` children, and `NCollapseItem` cannot be used
outside an `NCollapse` ancestor. This is enforced structurally by
`inject`/`provide`: `NCollapseController.setup()` calls
`provide('NCollapse', this.instance)`, and `NCollapseItemController.setup()`
calls `this.injectRef(['collapse', 'NCollapse'])` and then immediately reads
`collapse.data.scrollbar`/`.lazy`/`.keep` — if no ancestor `NCollapse`
provided that key, `collapse` is `undefined` and this throws.

## Common mistakes

- Expecting a `type`/`mode` prop (e.g. `accordion`) to restrict to one open
  panel at a time — no such prop exists; see "Single vs. multiple open
  panels" above.
- Assuming the `sort` prop on `NCollapseItem` controls visual order — it
  doesn't, in the current render path. See Gotchas.
- Putting non-`NCollapseItem` content directly in the default slot — nothing
  throws, but it won't participate in the open/close model or header/content
  chrome, and breaks the confirmed composition contract.

## Gotchas

- **`sort` / the `sorted` computed list appear to be dead code in the current
  render path.** `NCollapseController` maintains a `sorted` data value
  (`Arr.sort(this.childs, 'data.sort')`, updated via `watchChilds`/
  `watchData('modelValue', ...)`), and `NCollapseView` has an `items()` method
  that maps `data.sorted` to `item.view.display(scope)` — but
  `NCollapseView.default()` never calls `items()`; it renders
  `this.slot('default')` directly. So visual order is whatever DOM/template
  order you write `<n-collapse-item>` children in, **not** the `sort` prop
  value. <!-- UNVERIFIED: whether this is intentional (sort reserved for a
  future/alternate render path) or a bug — flagging per instructions rather
  than guessing. -->
- **`lazy`/`keep` interact non-trivially** (`NCollapseItemController.isActive()`):
  - `lazy: true, keep: false` (the defaults): content mounts on first open,
    unmounts (destroyed) when closed, and remounts fresh (loses state) next
    time it's opened.
  - `keep: true`: once opened, content stays mounted permanently (hidden with
    inline `display: none` when closed) — preserves component state (e.g. a
    form inside a panel) across collapses.
  - `lazy: false`: content mounts immediately on `NCollapse` render
    (regardless of open state), also without ever unmounting — functionally
    similar to `keep: true` but skips the "not yet opened" gate entirely.
- Per-item `scrollbar`/`lazy`/`keep` props default to `null`, which is a
  sentinel meaning "inherit from the parent `NCollapse`'s prop of the same
  name" (`NCollapseItemController.setup()` copies the parent's value in only
  when the local prop is `null`). Passing an explicit `true`/`false` on the
  item overrides the parent.
- `NCollapseItem`'s `name` prop defaults to the literal string `'default'`
  for every instance. If you don't give each item a distinct `name`, they
  all share `'default'` and open/close as one (`Arr.has`/`Arr.toggle`
  operate on that shared string), since the open/closed model is entirely
  name-based membership in the `modelValue` array.

## Related components

- `NCollapseItem` — the only valid child; see `ai-docs/components/collapse-item.md`.
