# NChartDonut

A donut/ring-chart wrapper that renders one arc per `NChartItem` child (plus
an optional aggregated "Other" arc), a centered total label, and an optional
legend.

## Import / Registration

Registered globally via `App.use(Install)` from the **chart** group index
(`src/chart/index.ts`), which calls `App.component('NChartDonut', NChartDonut)`
(alongside `NChartBar` and `NChartItem` — all three are registered together
by the same install function).

## Props

`NChartDonut` itself declares **no data/items/series prop at all**. The
chart's data comes entirely from its `<n-chart-item>` children — see
"Required composition" below and `ai-docs/components/chart-item.md` for the
per-item shape.

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` | `null` | `Props.Size` | Open string; known styled values `xs`/`sm`/`md`/`lg`/`xl`. |
| `sort` | `Boolean` | `false` | own (`NChartDonutProps`) | When `true`, arcs are ordered by `data.value` descending instead of DOM/registration order. |
| `limit` | `Number` | `4` | own (`NChartDonutProps`) | Max number of individual arcs shown; the remainder are summed into one "Other" arc. Pass `null`/`undefined` to disable limiting. |
| `legend` | `Boolean` | `true` | own (`NChartDonutProps`) | Shows/hides the legend list below the ring (rendered inside `n-scrollbar`). |
| `color` | `[Number, String]` | `10` | own (`NChartDonutProps`) — **not** `Props.Color` (which defaults to `null`) | Base index into the 20-slot color wheel (`Styler.wheel`, `limitwheel = 19`). Each arc without its own `color` gets `Styler.wheel(Mix.int(color) + index)`. |
| `totalLabel` | `String` | `Locale.trans('Total')` | own (`NChartDonutProps`) | Label shown centered in the ring alongside the summed total (`--n-chart-label` CSS var). |
| `otherLabel` | `String` | `Locale.trans('Other')` | own (`NChartDonutProps`) | `axis` label used for the aggregated "Other" arc when `limit` hides items. |
| `width` | `Number` | `10` | own (`NChartDonutProps`) | Stroke width of the ring, applied as the `--n-stroke-width` CSS var and used in `getDistance()`'s gap math. |
| `overlap` | `Boolean` | `false` | own (`NChartDonutProps`) | When `false` (default), a small gap is subtracted between adjacent arcs (`dasharr - width*1.5`, offset shifted by `-width*0.5`) so arcs don't visually touch; when `true`, arcs render edge-to-edge and the root gets an extra `n-chart-donut--overlap` class. |

### Data shape (via `NChartItem` children, not a prop)

Identical contract to `NChartBar` — each `<n-chart-item>` child contributes:

```ts
interface ChartItem {
    axis: string;           // NChartItem's `axis` prop, default Locale.trans('Item')
    value: string | number; // NChartItem's `value` prop
    color: string | number | null;
    type: string | null;
}
```

Concrete example:

```vue
<n-chart-donut :width="8" :color="0" :limit="5">
    <n-chart-item value="500" color="9"></n-chart-item>
    <n-chart-item value="20" color="10"></n-chart-item>
    <n-chart-item value="25" color="11"></n-chart-item>
    <n-chart-item value="40" color="12"></n-chart-item>
</n-chart-donut>
```

## Events

None — `NChartDonut.ts` declares `emits: []` and `NChartDonutController` never
calls `scope.emit(...)` or `update(...)`. `onPointerenter`/`onPointerleave`
(fired from arc hover, see below) only write directly to a template-ref DOM
node's inline style — they do not emit anything to the parent.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | Where `<n-chart-item>` children are placed. `NChartDonutView.default()` renders `this.slot('default')` after the SVG ring/legend, but the items themselves render nothing visible (`NChartItemView.default()` returns `null`) — their only job is to register with the chart via inject/`append()`. |

## Exposed methods

None — `NChartDonutController` never calls `pass()`.

## Minimal example

```vue
<n-chart-donut>
    <n-chart-item value="40"></n-chart-item>
    <n-chart-item value="20"></n-chart-item>
</n-chart-donut>
```

## Realistic example

Adapted directly from `demos/charts.html`:

```vue
<n-chart-donut :width="8" :color="0" :limit="5" :overlap="true" size="xs">
    <n-chart-item value="80" type="primary"></n-chart-item>
    <n-chart-item value="20" type="warning"></n-chart-item>
    <n-chart-item value="25" type="success"></n-chart-item>
    <n-chart-item value="40" type="danger"></n-chart-item>
</n-chart-donut>
```

## Required composition

**Confirmed: `NChartItem` is a required child of a chart-providing ancestor —
either `NChartDonut` or `NChartBar`.** `NChartDonutController extends
GroupController` and calls `provide('NChart', this.instance)` during
`setup()`. `NChartItemController.setup()` calls `this.injectRef(['chart',
'NChart'])`, and `onMounted()` calls `this.ncx('chart')?.append(this)`
(`onUnmounted()` calls `.remove(this)`). `NChartDonutController.makeDataset()`
/`makeTotal()`/`makeMaxval()` then read straight from `this.childs` (the
`GroupController` list populated by that `append()` call) — there is no other
way to feed data into `NChartDonut`.

Without at least one `NChartItem` descendant, the ring renders just its base
circle with `total`/`maxval` computed from an empty array (`total: 0`,
`maxval: Number.MIN_VALUE`). An `NChartItem` rendered with no
`NChart`-providing ancestor mounts silently as a no-op — it produces no
visible output and registers nowhere.

`NChartItem` does not care *which* of the two chart components is its parent
— both provide the same `'NChart'` injection key with an API-compatible
instance (`GroupController.append`/`remove`), so the same `<n-chart-item>`
markup works verbatim under `<n-chart-donut>` or `<n-chart-bar>`.

## Common mistakes

- Looking for an `items`/`data`/`series` prop on `NChartDonut` — there isn't
  one. All data must be passed as `<n-chart-item>` children.
- Assuming `width` controls the SVG element's pixel size — the `<svg>` is
  hard-coded to `width="600" height="600" viewBox="0 0 140 140"`; `width` is
  the ring's **stroke** width only.
- Expecting hover state (`onPointerenter`) to update reactive component state
  or emit an event — it directly mutates a DOM node's inline CSS custom
  properties (`--n-chart-label`, `--n-chart-value`) via `this.dom('text')`,
  bypassing Vue reactivity entirely.
- Passing `color` as a prop on `NChartDonut` expecting a CSS color/theme color
  — it's a **numeric wheel offset** (`Styler.wheel`), not a color value;
  per-arc visual color is set via each `NChartItem`'s own `color` or `type`
  prop.

## Gotchas

- `NChartItem`'s `label` prop is declared but never read anywhere in
  `NChartItemData`, `NChartItemController`, or `toItem()` — it currently has
  no effect on rendering. Use `axis` for the arc's label text instead.
- If an item sets an explicit `type`, that takes priority over the color
  wheel entirely — the arc/legend swatch gets `n-type-{type}` instead of
  `n-color-{n}`, and the item's own `color` prop is ignored in that case.
- The built-in "Other" bucket is styled with `type: 'neutral'` internally —
  `neutral` is a real, working `n-type-*` value for chart items even though
  it isn't in the concepts.md list of globally "known styled" `type` values;
  it's specific to the chart components' own stylesheet.
- `overlap: false` (the default) shrinks each arc's dash length and shifts its
  offset to create a visible gap between arcs; with many very small values
  this can make thin slices disappear entirely (`Math.max(dasharr -
  width*1.5, 0)`).
- The legend is always sorted by value descending regardless of the `sort`
  prop, which only affects arc draw order — `sort` and legend order can
  visually disagree when `sort` is `false`.

## Related components

- `NChartItem` — required data-carrying child; see
  `ai-docs/components/chart-item.md`.
- `NChartBar` — the other chart type sharing the same `NChartItem` child
  contract and most of the same props (`sort`, `limit`, `legend`, `color`,
  `totalLabel`, `otherLabel`); see `ai-docs/components/chart-bar.md`.
