# NCascaderPanel

The cascading tree-list itself (columns of `n-virtualbar` lists, one per
depth) — usable standalone/inline, and also what `NCascader` renders
internally as its popover body.

## Import / Registration

Registered globally via `App.use(Install)` from the **cascader** group index
(`src/cascader/index.ts`), which registers both `NCascaderPanel`
(`n-cascader-panel`) and `NCascader` (`n-cascader`) as separate top-level
components in the same call — see cascader.md for the exact snippet.

**Required composition (as given):** `NCascaderPanel` and `NCascader` are
fully independent components despite the shared naming — `NCascaderPanel` is
not required to live inside an `NCascader`. See cascader.md's Gotchas for the
apparent contradiction in the render source (`NCascader` does internally
instantiate an `NCascaderPanel` as its popover content).

`NCascaderPanelController` extends `GroupController`
(`src/root/js/controller/GroupController.ts`), not `NPopoverPanelController`
— unlike `NSelect`/`NCascader`, it renders its own plain root `<div>`
directly (`NCascaderPanelView.default()`), with no popover trigger/display
row of its own. It also does `injectRef(['popover', 'NPopover'])` so that
`updateCascade()` can call `this.ncx('popover')?.superClose()` if it happens
to be rendered inside an `n-popover` (e.g. when embedded by `NCascader`) —
this is a no-op when used standalone.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` | Adds `n-load` to the root. |
| `size` | `String` | `null` | `Props.Size` | Open string; known styled values `xs`/`sm`/`md`/`lg`/`xl`. |
| `type` | `String` | `null` | `Props.Type` | Open string; known styled values `primary`/`secondary`/`info`/`warning`/`danger`/`success`. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` | Drives `superDisabled`/`n-disabled` class only — not read anywhere else in this component; per-node disabling goes through `disabledProp` instead. |
| `modelValue` | `[Array, Object]` | `null` | Component-local (`NCascaderPanel.ts`) | In practice a `string[]` — the full selected path (one `valueProp` value per depth, root → leaf). |
| `splitValue` | `String` | `null` | Component-local | The single leaf value of the selected path (`Arr.last(modelValue)`) — see cascader.md's Events section for the exact bidirectional-sync semantics, which are identical here (same `NCascaderHelper` functions). |
| `trigger` | `String` | `'hover'` | Component-local | `'hover'`: mouseenter expands a column, click commits the selection. `'click'`: click expands a column, dblclick commits the selection. No runtime validator; any other string disables both expand and commit (see cascader.md Gotchas). |
| `options` | `[Array, Object]` | `() => []` | Component-local | The tree. **Not** `Props.OptionsObject`. See "Options tree shape" below. |
| `labelProp` | `String` | `'label'` | Component-local | Dot-path (`Obj.get`) read on each node for its display label. |
| `valueProp` | `String` | `'value'` | Component-local | **Plain key** (`item[data.valueProp]`, not dot-path) read on each node for its selectable value. |
| `childProp` | `String` | `'children'` | Component-local | Key holding a node's array of child nodes; walked via `Arr.cascadeFind`. |
| `disabledProp` | `String` | `'disabled'` | Component-local | Plain key read on each node; passed straight through as the `disabled` prop of that node's `n-popover-option`. |

### Options tree shape

Same contract as `NCascader` (this is the component that actually implements
the tree walk — `NCascader` only forwards to it):

```ts
interface CascaderNode {
    value: string;      // read via valueProp (plain key, default 'value')
    label: string;       // read via labelProp (Obj.get, default 'label')
    children?: CascaderNode[]; // read via childProp (default 'children')
    disabled?: boolean;  // read via disabledProp (default 'disabled')
}
```

`options` itself can be an Array or Object (typed `[Array, Object]`), walked
by `Arr.cascadeFind(options, childProp, matcherFn)`
(`src/cascader/js/helper/NCascaderHelper.ts`), which returns the array of
nodes forming the path from the root down to the first match — this is what
gets mapped through `valueProp` to build `modelValue`.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `string[]` — full path of `valueProp` values, root → the just-clicked/dblclicked node | `updateCascade(item, depth)` commits a selection (click or dblclick, depending on `trigger`) |
| `update:splitValue` | `string` — `valueProp` of the just-selected node, i.e. `Arr.last(modelValue)` | Same `updateCascade()` call as above, emitted alongside `update:modelValue` in the same handler |

Both events are always emitted together from `updateCascade()` — there is no
path where one fires without the other from a direct user interaction. (They
can, however, become resynchronized independently via the constructor-time
`buildModelFromSplit`/`buildSplitFromModel` calls if only one of the two
props was seeded externally.)

## Slots

None — `NCascaderPanelView` never calls `this.slot(...)`. Each depth column
is rendered via the `n-virtualbar` component's own scoped default slot
(`this.item(value, depth)`), not a slot `NCascaderPanel` exposes to its own
consumer.

## Exposed methods

None — `NCascaderPanelController` never calls `pass()`.

## Minimal example

```vue
<n-cascader-panel v-model="path" :options="tree"></n-cascader-panel>
```

## Realistic example

```vue
<n-cascader-panel
    v-model="path"
    v-model:split-value="cityId"
    :options="locations"
    trigger="click"
    type="primary"
></n-cascader-panel>
```

```ts
// same shape/data as cascader.md's realistic example
const locations = [
    {
        value: 'us', label: 'United States',
        children: [
            {
                value: 'us-ca', label: 'California',
                children: [
                    { value: 'us-ca-sf', label: 'San Francisco' },
                    { value: 'us-ca-la', label: 'Los Angeles' },
                ],
            },
        ],
    },
];
```

## Required composition

None required by the stated rule — `NCascaderPanel` renders its own root
`<div>` with `n-virtualbar` columns and needs no wrapping component to
function; it is usable directly inline (e.g. an always-visible tree browser,
as opposed to `NCascader`'s popover-triggered version). `NButtonGroup`'s
optional-child note (cascader.md) is specific to `NCascader`, not confirmed
for `NCascaderPanel`.

## Common mistakes

- Wiring only `v-model` and skipping `v-model:split-value`, same as
  `NCascader` — see cascader.md's Common mistakes for the exact failure
  mode. It applies identically here since both events fire from the same
  `updateCascade()` path.
- Assuming `valueProp` supports dot-path nesting like `labelProp` does — it
  doesn't (`item[data.valueProp]`, a plain key lookup, not `Obj.get`).
- Passing an `options` shaped for `Props.OptionsObject`
  (`optionsValue`/`optionsLabel`) — this component doesn't use that mixin at
  all; use `labelProp`/`valueProp`/`childProp` instead.

## Gotchas

- This is the component `NCascader` instantiates internally as its popover
  body (see cascader.md's Gotchas for the exact `passProps`/event-forwarding
  code) — so despite being documented and registered as fully independent,
  in practice `NCascaderPanel` is rendered on every `NCascader` instance too,
  just not authored directly by the `NCascader` consumer.
- `injectRef(['popover', 'NPopover'])` makes `updateCascade()`'s
  `this.ncx('popover')?.superClose()` call a safe no-op when
  `NCascaderPanel` is used standalone (no injected popover context) — it
  only actually closes something when nested inside an `n-popover` ancestor
  (which is exactly what happens when `NCascader` renders it).
- Extends `GroupController` (adds `childs`/`append`/`remove`/`watchChilds`),
  but nothing in `NCascaderPanelController`'s own logic calls `append()`/
  `remove()` — <!-- UNVERIFIED: whether some other part of the render tree
  (e.g. `n-popover-option` or `n-virtualbar` instances) registers itself as
  a child via `inject`/`provide` against this controller; not traced for
  this doc. Treat the `GroupController` base as present but functionally
  unused by this component's own code. -->

## Related components

- `NCascader` — the popover-triggered wrapper that renders this component
  internally; see its doc for the full trigger-display/collapse behavior
  this component doesn't have on its own.
- `NSelect` — the flat (non-tree) counterpart, built on
  `NPopoverPanelController`/`NPopoverPanelView` instead of `GroupController`.
