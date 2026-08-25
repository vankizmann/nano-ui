# NChartItem

A headless (renders nothing itself) data-carrier component: each instance
represents one bar/arc's data and registers itself with an ancestor chart
(`NChartBar` or `NChartDonut`) via inject/provide.

## Import / Registration

Registered globally via `App.use(Install)` from the **chart** group index
(`src/chart/index.ts`), which calls `App.component('NChartItem', NChartItem)`
(alongside `NChartBar` and `NChartDonut` — all three are registered together
by the same install function).

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `type` | `String` | `null` | `Props.Type` | Open string; known styled values `primary`/`secondary`/`info`/`warning`/`danger`/`success`, plus `neutral` (used internally by the parent chart's own "Other" bucket, but usable directly — see `demos/charts.html`). When set, this bar/arc renders with `n-type-{type}` and its own/wheel-derived `color` is ignored (see the parent chart docs' Gotchas). |
| `color` | `[String, Number]` | `null` | `Props.Color` | Explicit color-wheel index/value for this item. When `null` (default), the parent chart derives one from its own `color` prop plus this item's position: `Styler.wheel(Mix.int(parentColor) + index)`. Ignored if `type` is also set. |
| `value` | `[String, Number]` | `null` | own (`NChartItemProps`) | The numeric value this bar/arc represents. Read via `Mix.num`/`Num.float` by the parent for height/arc-length math and summed for totals/averages. |
| `axis` | `String` | `Locale.trans('Item')` | own (`NChartItemProps`) | The label shown in the popover (bar chart) / legend / hover tooltip (donut chart) for this item. |
| `label` | `String` | `null` | own (`NChartItemProps`) | <!-- UNVERIFIED as intentionally functional --> Declared but **never read** anywhere in `NChartItemData`, `NChartItemController`, or `toItem()` — currently has no effect on rendering. Do not rely on it; use `axis` instead. |

### Data shape this item contributes to its parent

Once mounted, `toItem()` is what the parent chart actually consumes for each
child:

```ts
interface ChartItem {
    axis: string;
    value: string | number;
    color: string | number | null;
    type: string | null;
}
```

Concrete example (a single item inside a chart):

```vue
<n-chart-item value="4800" axis="Jan" type="primary"></n-chart-item>
```

## Events

None — `NChartItem.ts` declares no `emits` array at all, and
`NChartItemController` never calls `scope.emit(...)` or `update(...)`.

## Slots

None. `NChartItemView.default()` returns `null` unconditionally — the
component renders no DOM and therefore has no slot outlets.

## Exposed methods

None — `NChartItemController` never calls `pass()`. It does define
`toItem()`, `onMounted()`, and `onUnmounted()` as regular (non-exposed)
methods, called only by the item itself and read by the parent chart via its
own `childs` array of controller instances (not via a template-ref API).

## Minimal example

```vue
<n-chart-bar>
    <n-chart-item value="10"></n-chart-item>
</n-chart-bar>
```

`NChartItem` is never used standalone — see "Required composition" below.

## Realistic example

From `demos/charts.html`, a full donut dataset with explicit numeric colors:

```vue
<n-chart-donut :width="8" :color="0" :limit="5" size="sm">
    <n-chart-item value="500" color="9"></n-chart-item>
    <n-chart-item value="20" color="10"></n-chart-item>
    <n-chart-item value="25" color="11"></n-chart-item>
    <n-chart-item value="40" color="12"></n-chart-item>
    <n-chart-item value="80" color="13"></n-chart-item>
    <n-chart-item value="20" color="14"></n-chart-item>
</n-chart-donut>
```

(the source demo also passes a `linecap="normal"` attribute on `n-chart-donut`
— that is not a declared prop of `NChartDonut`, so it falls through as a
plain, no-op DOM attribute; omitted here.)

## Required composition

**Confirmed: `NChartItem` requires a parent that `provide()`s the `'NChart'`
injection key — currently only `NChartBar` and `NChartDonut` do this.**

`NChartItemController.setup()` calls `this.injectRef(['chart', 'NChart'])`
(reading whatever ancestor called `provide('NChart', ...)`), and:

```ts
onMounted() { this.ncx('chart')?.append(this); }
onUnmounted() { this.ncx('chart')?.remove(this); }
```

Both `NChartBarController` and `NChartDonutController` extend
`GroupController` and call `provide('NChart', this.instance)` in their own
`setup()`, giving them `append(child)`/`remove(child)`/`watchChilds(cb)` and a
reactive `childs` list (see concepts.md's `GroupController` section). This is
exactly and only how a chart's data set is built — there is no
`items`/`data`/`series` prop on either chart component.

`NChartItem` itself renders nothing (`view.default()` returns `null`) and
performs no visual role on its own — outside a `NChart`-providing parent, it
silently registers nowhere (`this.ncx('chart')` is `undefined`, so
`?.append(this)` never fires) and has zero effect. It is **not** independent;
treat it as a required, chart-scoped child of `NChartBar` or `NChartDonut`
(interchangeably — the injection contract is identical for both).

## Common mistakes

- Using `<n-chart-item>` outside `<n-chart-bar>`/`<n-chart-donut>` expecting
  it to render a standalone bar or badge — it renders nothing by itself, ever.
- Setting `label` expecting it to appear as the item's display text — it's
  unused; use `axis`.
- Setting both `color` and `type` and expecting `color` to still apply as a
  fallback tint — `type`, if present, fully overrides the color-wheel/`color`
  path in the parent's render logic (`if (!item.type) { …color… } else {
  …type… }`).
- Binding `v-model` on `NChartItem` — it has no `modelValue` prop and is not
  a v-model-style component at all; it's a one-shot data descriptor read once
  per render via `toItem()`.

## Gotchas

- There is no reactive update path from prop changes on an already-mounted
  `NChartItem` back to a visible re-render trigger beyond normal Vue
  reactivity — the parent's `makeDataset()`/`makeMaxval()`/`makeTotal()` are
  only explicitly re-run on `watchChilds` (mount/unmount) and on the parent's
  own `limit` prop changing; changing an item's `value` prop while mounted
  still flows through because `data.visible`/`data.hidden` hold live
  `NChartItemController` references (`item.data.value` is read live at
  render time), but derived aggregates like `avgval`/`maxval`/`total` are
  **not** wrapped in a `computed()` — they're plain `set()` calls run only
  from the watchers above, so they will not update on an in-place `value`
  change alone. <!-- UNVERIFIED: exact Vue reactivity edge case here; confirmed only that makeMaxval/makeAvgval/makeTotal are imperative methods invoked from watchProp('limit')/watchChilds(), not computed(). -->
- `uid` (used internally for `append`/`remove`/dataset filtering) comes from
  `this.makeUID()` in `setup()`, not from any prop — there's no way to pass a
  stable custom key for an item.

## Related components

- `NChartBar` — bar-chart parent; see `ai-docs/components/chart-bar.md`.
- `NChartDonut` — donut-chart parent; see `ai-docs/components/chart-donut.md`.
