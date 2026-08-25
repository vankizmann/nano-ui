# NCascader

A dropdown trigger for cascading (tree-shaped) selection — pick a path
through nested `options` (e.g. Country → State → City) via a popover that
internally renders an `NCascaderPanel`.

## Import / Registration

Registered globally via `App.use(Install)` from the **cascader** group index
(`src/cascader/index.ts`), which registers both `NCascader` (`n-cascader`)
and `NCascaderPanel` (`n-cascader-panel`) as separate top-level components in
the same call:

```ts
App.component(NCascader.name, NCascader);
App.component(NCascaderPanel.name, NCascaderPanel);
```

**Required composition (as given):** `NCascader` and `NCascaderPanel` are
fully independent components despite the shared naming — not a formal
parent/child pair the consumer is required to wire together. See Gotchas for
an apparent contradiction found in the render source.

`NCascader` extends the shared popover-panel stack (`NPopoverPanelController`
/ `NPopoverPanelView`), same as `NSelect`.

## Props

`NCascaderProps` spreads `NCascaderPanelProps` in full, so every
`NCascaderPanel` prop (except its `trigger`, which is also inherited) is also
an `NCascader` prop:

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (via `NCascaderPanelProps`) | Adds `n-load` to the root. |
| `size` | `String` | `null` | `Props.Size` (via `NCascaderPanelProps`) | Open string; known styled values `xs`/`sm`/`md`/`lg`/`xl`. |
| `type` | `String` | `null` | `Props.Type` (via `NCascaderPanelProps`) | Open string; known styled values `primary`/`secondary`/`info`/`warning`/`danger`/`success`. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (via `NCascaderPanelProps`) | Drives `superDisabled`/`n-disabled` class only — see Gotchas. |
| `clearable` | `Boolean` | `false` | `Props.Clearable` | Shows the built-in clear (×) button. |
| `clearValue` | `[String, Number, Boolean]` | `null` | `Props.ClearValue` | Value used by the clear button / `applyClear()`. |
| `emptyText` | `String` | `Locale.trans('No items')` | `Props.EmptyText` | Shown by `this.empty()` when `options` is empty. |
| `undefinedText` | `String` | `Locale.trans('Undefined')` | `Props.UndefinedText` | Label shown for a selected item whose `labelProp` value is empty (`NCascaderView.item()`). |
| `position` | `String` | `'bottom-start'` | `Props.PositionBottomStart` | Popover position; same 12-value set as `NSelect` (see select.md). |
| `modelValue` | `[Array, Object]` | `null` | `NCascaderPanelProps` (component-local) | In practice a `string[]` — the full selected **path**, one value (per `valueProp`) per depth level, root → leaf. See "Options tree shape" below. |
| `splitValue` | `String` | `null` | `NCascaderPanelProps` (component-local) | The single **leaf value** of the selected path — `Arr.last(modelValue)`. See Events for the exact semantics. |
| `options` | `[Array, Object]` | `() => []` | `NCascaderPanelProps` (component-local) | The tree. **Not** `Props.OptionsObject` — no `optionsValue`/`optionsLabel` here; see "Options tree shape". |
| `labelProp` | `String` | `'label'` | `NCascaderPanelProps` (component-local) | Dot-path (`Obj.get`) read on each node for its display label. |
| `valueProp` | `String` | `'value'` | `NCascaderPanelProps` (component-local) | **Plain key** (used as `item[data.valueProp]`, not `Obj.get`) read on each node for its selectable value. |
| `childProp` | `String` | `'children'` | `NCascaderPanelProps` (component-local) | Key holding a node's array of child nodes; used by `Arr.cascadeFind` to walk the tree. |
| `disabledProp` | `String` | `'disabled'` | `NCascaderPanelProps` (component-local) | Plain key read on each node to disable that individual option in the panel. |
| `collapse` | `Number` | `3` | Component-local (`NCascader.ts`) | Max number of path segments shown in the trigger's display row before collapsing the rest behind a `collapseText` marker. |
| `collapseText` | `String` | `'...'` | Component-local | Text of the collapsed-segment marker, via `Locale.trans()`. |
| `collapseFirst` | `Boolean` | `true` | Component-local | When `true` (default), the first path segment stays visible even when collapsing; when `false`, an extra segment shifts into the collapsed range. |
| `placeholder` | `String` | `'Please select'` | Component-local | Literal default, passed through `Locale.trans()` at render. |

`trigger` (`String`, default `'hover'`) is also present (inherited from
`NCascaderPanelProps`) — it controls the internal panel's interaction mode
(`'hover'` expands on mouseenter and selects on click; `'click'` expands on
click and selects on double-click). It has no runtime enum validator, but
only these two string values have defined behavior in
`NCascaderPanelController`.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `string[]` — the full path of `valueProp` values from the root node down to the just-selected node (e.g. `['country-1', 'state-2', 'city-9']`) | The internal `NCascaderPanel` commits a selection (`updateCascade()`, on click or dblclick depending on `trigger`) and emits `update:modelValue`, which `NCascaderView.panel()`'s `onUpdate:modelValue` handler forwards into `scope.update('modelValue', value)`. Also fired reactively by `NCascaderHelper.buildModelFromSplit()` when only `splitValue` changes externally (`detectModel()`, watched on `splitValue`/`options`). |
| `update:splitValue` | `string` — the single `valueProp` value of the **last (deepest) node in the just-selected path**, i.e. `Arr.last(modelValue)` | Same commit action as above (`updateCascade()` sets both `splitValue` and `modelValue` together from the same click). Also fired reactively by `NCascaderHelper.buildSplitFromModel()` when only `modelValue` changes externally. |

**What `splitValue` represents:** it is not a separate piece of state — it is
a derived, always-in-sync single-value mirror of `modelValue`'s last entry.
`NCascaderController.detectModel()` keeps the two reconciled in both
directions: if `modelValue` is set but `splitValue` is empty,
`buildSplitFromModel()` sets `splitValue = Arr.last(modelValue)`; if
`splitValue` is set but `modelValue` is empty, `buildModelFromSplit()` walks
`options` with `Arr.cascadeFind` to find the node whose `valueProp` equals
`splitValue`, then rebuilds the full path array as `modelValue`. In practice
this means: bind `v-model` (`modelValue`) when you want the full breadcrumb
path, and/or bind `splitValue` (via `v-model:split-value`) when you only want
to persist/read the single terminal (leaf, or deepest-clicked) value — e.g.
storing just a city id in a flat DB column while still letting the component
reconstruct and display the full Country/State/City path from that id alone
via `options`.

## Slots

None — neither `NCascaderView` nor (transitively) the internal
`NCascaderPanelView` calls `this.slot(...)`.

## Exposed methods

None — `NCascaderController` never calls `pass()`.

## Minimal example

```vue
<n-cascader v-model="path"></n-cascader>
```

## Realistic example

Tree shape confirmed against `demos/overview.html`'s `cascaderData` (which
uses the exact default keys `value`/`label`/`children`):

```vue
<n-cascader
    v-model="path"
    v-model:split-value="cityId"
    :options="locations"
    trigger="click"
    :clearable="true"
    type="primary"
></n-cascader>
```

```ts
interface CascaderNode {
    value: string;
    label: string;
    children?: CascaderNode[];
    disabled?: boolean; // read via disabledProp, default key 'disabled'
}

const locations: CascaderNode[] = [
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

// after selecting "San Francisco":
// path   -> ['us', 'us-ca', 'us-ca-sf']   (modelValue)
// cityId -> 'us-ca-sf'                     (splitValue)
```

## Required composition

- `NCascader` is standalone by the stated rule above — it does not require a
  separately-authored `NCascaderPanel` in the template (see Gotchas for the
  internal-render caveat).
- Optional: `NButtonGroup` (`src/button/js/button-group/`) can contain
  `NCascader` as a child — `NButtonGroupView` renders a plain default slot
  (`this.slot('default')`) with no type restriction, so any component
  including `NCascader` may be placed inside `<n-button-group>`. This is
  optional composition, not a requirement in either direction.

## Common mistakes

- **Wiring only `v-model` (i.e. only `modelValue`) and never touching
  `splitValue`.** This is a near-certain mistake for agents porting from
  other cascader-style components: if your app's data model only ever reads
  `splitValue` (e.g. persisting a single leaf id), forgetting
  `v-model:split-value="..."` means that id is silently generated internally
  but never surfaced to your own state, and vice versa — if you seed the
  component with only a `splitValue` and expect `modelValue` to already be
  populated as a plain prop read (rather than after the `Run.frame`-deferred
  `detectModel()` reconciliation), you'll observe a one-frame gap.
- Assuming `options` supports `Props.OptionsObject`'s `optionsValue`/
  `optionsLabel` dotted-path resolution. It doesn't — use `labelProp`/
  `valueProp`/`childProp`/`disabledProp` instead (plain/`Obj.get` key reads,
  not `$index`/`$value` pair wrapping).
- Assuming `valueProp` supports dot-path nesting like `labelProp` does.
  `labelProp` is resolved via `Obj.get(item, labelProp)` (dot-path capable),
  but `valueProp` is read as a **plain key** (`item[data.valueProp]`) in both
  `NCascaderPanelController` and `NCascaderPanelView` — a dotted `valueProp`
  like `'meta.id'` will not resolve.

## Gotchas

- **Apparent contradiction with the stated independence rule:**
  `NCascaderView.panel()` directly renders `n-cascader-panel` as the popover
  body, forwarding `NCascader`'s own current `modelValue`, `splitValue`,
  `options`, `size`, `type`, `disabled`, `load`, `trigger`, `labelProp`,
  `valueProp`, `childProp`, `disabledProp` into it via
  `passProps(props, Mix.keys(NCascaderPanelProps))`, and listening for the
  panel's `update:modelValue`/`update:splitValue` to update its own state:
  ```ts
  props['onUpdate:modelValue'] = (value) => scope.update('modelValue', value);
  props['onUpdate:splitValue'] = (value) => scope.update('splitValue', value);
  return this.comp('n-cascader-panel', props);
  ```
  This is a real internal parent/child render relationship — `NCascader`
  instantiates and drives an `NCascaderPanel` instance under the hood. It
  does not change the consumer-facing rule (you never author
  `<n-cascader-panel>` inside `<n-cascader>` yourself — it's generated), but
  it means the two components are coupled at the implementation level even
  though they are registered and documented as independent, separately
  usable components.
- `NCascaderController` also does `provide('NCascader', this.instance)`, but
  nothing in `NCascaderPanelController` (or elsewhere searched) injects that
  key — it appears unused/vestigial in the current source.
- `disabled` does not appear to be read anywhere in `NCascaderController`,
  `NCascaderView`, or `NCascaderPanelController` to gate opening, hovering,
  or clicking — only `classRoot()` applies the `n-disabled` styling class,
  and per-node disabling goes through `disabledProp` instead (passed as
  `disabled` to each `n-popover-option`). <!-- UNVERIFIED: whether the
  underlying `n-popover`/`n-popover-option` components independently read a
  `disabled` prop to block interaction — not traced into `src/popover/` for
  this doc. -->
- `demos/cascader/index.html` is stale: it loads Vue 2.5.13 off a prebuilt
  `dist/nano-ui.esm.js` and uses `:items="items"` — there is no `items` prop
  anywhere in the current `NCascaderProps`/`NCascaderPanelProps`. Its data
  generator does confirm the tree shape (`label`/`value`/`children`/
  `disabled` keys), which matches current defaults, but do not copy its
  template syntax.
- `trigger`'s two-value behavior (`'hover'` vs `'click'`) is not enforced by
  a prop validator (unlike, e.g., `Props.AlignHorizontal`'s array validator)
  — any other string is structurally accepted but falls through both
  `if` branches in `NCascaderPanelController.onMouseenter`/`onClick`/
  `onDblclick`, effectively disabling expand/select entirely.

## Related components

- `NCascaderPanel` — the tree list `NCascader` renders internally as its
  popover body; also directly usable standalone (e.g. inline, without a
  popover trigger). See cascader-panel.md, including the render-coupling
  gotcha above.
- `NSelect` — the flat counterpart; shares the same
  `NPopoverPanelController`/`NPopoverPanelView` base and the plain
  `update:modelValue` v-model convention (minus `splitValue`).
- `NButtonGroup` — optional container; see Required composition.
