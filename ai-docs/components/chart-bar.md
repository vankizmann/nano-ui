# NChartBar

A bar-chart wrapper that renders one bar per `NChartItem` child (plus an
optional aggregated "Other" bar), a header showing the average value, and an
optional legend.

## Import / Registration

Registered globally via `App.use(Install)` from the **chart** group index
(`src/chart/index.ts`), which calls `App.component('NChartBar', NChartBar)`
(alongside `NChartDonut` and `NChartItem` — all three are registered together
by the same install function).

## Props

`NChartBar` itself declares **no data/items/series prop at all**. The chart's
data comes entirely from its `<n-chart-item>` children — see "Required
composition" below and `ai-docs/components/chart-item.md` for the per-item
shape.

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` | `null` | `Props.Size` | Open string; known styled values `xs`/`sm`/`md`/`lg`/`xl`. |
| `sort` | `Boolean` | `false` | own (`NChartBarProps`) | When `true`, bars are ordered by `data.value` descending (`Arr.sort(this.childs, 'data.value').reverse()`) instead of DOM/registration order. |
| `limit` | `Number` | `4` | own (`NChartBarProps`) | Max number of individual bars shown; the remainder are summed into one "Other" bar. Pass `null`/`undefined` to disable limiting (`data.limit ?? items.length`). |
| `legend` | `Boolean` | `true` | own (`NChartBarProps`) | Shows/hides the legend list below the bars (rendered inside `n-scrollbar`). |
| `color` | `[Number, String]` | `10` | own (`NChartBarProps`) — **not** `Props.Color` (which defaults to `null`) | Base index into the 20-slot color wheel (`Styler.wheel`, `limitwheel = 19`). Each bar without its own `color` gets `Styler.wheel(Mix.int(color) + index)`, so bars are auto-tinted in sequence starting from this offset. |
| `totalLabel` | `String` | `Locale.trans('Total')` | own (`NChartBarProps`) | Label text next to the header's total tag. |
| `otherLabel` | `String` | `Locale.trans('Other')` | own (`NChartBarProps`) | `axis` label used for the aggregated "Other" bar when `limit` hides items. |
| `minHeight` | `Number` | `5` | own (`NChartBarProps`) | Minimum bar height as a percentage, used in `getHeight()`: `((100 - minHeight) / maxval * value) + minHeight`. |

### Data shape (via `NChartItem` children, not a prop)

Each `<n-chart-item>` child contributes one entry once mounted. The controller
reads it back off the child's own `NChartItemController` as:

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
<n-chart-bar :color="0" :limit="5">
    <n-chart-item value="4800" axis="Jan"></n-chart-item>
    <n-chart-item value="2000" axis="Feb"></n-chart-item>
    <n-chart-item value="800" axis="Mar" type="danger"></n-chart-item>
</n-chart-bar>
```

## Events

None — `NChartBar.ts` declares `emits: []` and `NChartBarController` never
calls `scope.emit(...)` or `update(...)`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | Where `<n-chart-item>` children are placed. `NChartBarView.default()` renders `this.slot('default')` after the header/body, but the items themselves render nothing visible (`NChartItemView.default()` returns `null`) — their only job is to register with the chart via inject/`append()`. |

## Exposed methods

None — `NChartBarController` never calls `pass()`.

## Minimal example

```vue
<n-chart-bar>
    <n-chart-item value="40"></n-chart-item>
    <n-chart-item value="20"></n-chart-item>
</n-chart-bar>
```

## Realistic example

Adapted directly from `demos/charts.html`:

```vue
<n-chart-bar :color="0" :limit="5" :sort="true" size="sm">
    <n-chart-item value="40"></n-chart-item>
    <n-chart-item value="20"></n-chart-item>
    <n-chart-item value="25"></n-chart-item>
    <n-chart-item value="40"></n-chart-item>
    <n-chart-item value="80"></n-chart-item>
    <n-chart-item value="20"></n-chart-item>
</n-chart-bar>
```

`demos/charts.html` also shows explicit per-bar `type`s (bypassing the color
wheel for those bars):

```vue
<n-chart-bar :color="0" :limit="5" :legend="false" size="xs">
    <n-chart-item value="80" type="primary"></n-chart-item>
    <n-chart-item value="20" type="warning"></n-chart-item>
    <n-chart-item value="25" type="danger"></n-chart-item>
    <n-chart-item value="40" type="info"></n-chart-item>
    <n-chart-item value="25" type="success"></n-chart-item>
    <n-chart-item value="40" type="neutral"></n-chart-item>
</n-chart-bar>
```

## Required composition

**Confirmed: `NChartItem` is a required child of a chart-providing ancestor —
either `NChartBar` or `NChartDonut`.** `NChartBarController extends
GroupController` and calls `provide('NChart', this.instance)` during
`setup()`. `NChartItemController.setup()` calls `this.injectRef(['chart',
'NChart'])`, and `onMounted()` calls `this.ncx('chart')?.append(this)`
(`onUnmounted()` calls `.remove(this)`). `NChartBarController.makeDataset()`
then reads its bars straight from `this.childs` (the `GroupController` list
populated by that `append()` call) — there is no other way to feed data into
`NChartBar`.

Without at least one `NChartItem` descendant, `NChartBar` renders its header
and an empty bar frame (`avgval` computes to `NaN` since `total /
this.childs.length` divides by zero). An `NChartItem` rendered with no
`NChart`-providing ancestor mounts silently as a no-op (`this.ncx('chart')` is
`undefined`, so `?.append(this)` never fires) — it produces no visible output
and registers nowhere.

`NChartItem` does not care *which* of the two chart components is its parent
— both provide the same `'NChart'` injection key with an API-compatible
instance (`GroupController.append`/`remove`), so the same `<n-chart-item>`
markup works verbatim under `<n-chart-bar>` or `<n-chart-donut>`.

## Common mistakes

- Looking for an `items`/`data`/`series` prop on `NChartBar` — there isn't
  one. All data must be passed as `<n-chart-item>` children.
- Assuming `NChartItem` renders something on its own outside a chart parent —
  its view always returns `null`; it is purely a data-registration component.
- Passing `color` as a prop on `NChartBar` expecting a CSS color/theme color —
  it's a **numeric wheel offset** (`Styler.wheel`), not a color value; per-bar
  visual color is set via each `NChartItem`'s own `color` or `type` prop.
- Expecting `limit` to drop the excess items — it instead merges them into one
  extra "Other" bar (`otherLabel`), whose `value` is the sum of the hidden
  items' values.

## Gotchas

- `NChartItem`'s `label` prop is declared but never read anywhere in
  `NChartItemData`, `NChartItemController`, or `toItem()` — it currently has
  no effect on rendering. Use `axis` for the bar's label text instead.
- If an item sets an explicit `type`, that takes priority over the color
  wheel entirely — the bar/legend swatch gets `n-type-{type}` instead of
  `n-color-{n}`, and the item's own `color` prop is ignored in that case (see
  `NChartBarView.bar()`: `if (!item.type) { …n-color… } else { …n-type… }`).
- The built-in "Other" bucket is styled with `type: 'neutral'` internally —
  `neutral` is a real, working `n-type-*` value for chart items even though
  it isn't in the concepts.md list of globally "known styled" `type` values;
  it's specific to the chart components' own stylesheet.
- The legend is always sorted by value descending (`Arr.sort(scope.childs,
  'data.value').reverse()`) regardless of the `sort` prop, which only affects
  bar order — `sort` and legend order can visually disagree when `sort` is
  `false`.

## Related components

- `NChartItem` — required data-carrying child; see
  `ai-docs/components/chart-item.md`.
- `NChartDonut` — the other chart type sharing the same `NChartItem` child
  contract and most of the same props (`sort`, `limit`, `legend`, `color`,
  `totalLabel`, `otherLabel`); see `ai-docs/components/chart-donut.md`.
