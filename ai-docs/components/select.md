# NSelect

A searchable dropdown picker (single or multiple selection) backed by a
virtualized option list, with optional free-text option creation.

## Import / Registration

Registered globally via `App.use(Install)` from the **select** group index
(`src/select/index.ts`), which calls `App.component('NSelect', NSelect)`
(tag `n-select`). Self-contained — no companion component to register
alongside it (unlike `NCascader`/`NCascaderPanel`).

`NSelect` extends the shared popover-panel stack: its Controller extends
`NPopoverPanelController`, its View extends `NPopoverPanelView`
(`src/popover/js/popover-panel/*`), so it renders as a display trigger plus
an `n-popover` internally.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` | Adds `n-load` to the root. |
| `size` | `String` | `null` | `Props.Size` | Open string; known styled values `xs`/`sm`/`md`/`lg`/`xl`. |
| `type` | `String` | `null` | `Props.Type` | Open string; known styled values `primary`/`secondary`/`info`/`warning`/`danger`/`success`. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` | Drives `superDisabled`; applied directly to the underlying `<input>`'s `disabled` attribute in `NSelectView.input()`. |
| `clearable` | `Boolean` | `false` | `Props.Clearable` | Shows the built-in clear (×) button (`this.clear()` in the `display()` render), wired to `applyClear()`. |
| `clearValue` | `[String, Number, Boolean]` | `null` | `Props.ClearValue` | Value `modelValue` is reset to by the clear button, and the value `applyModel()` falls back to when the selection becomes empty. |
| `emptyText` | `String` | `Locale.trans('No items')` | `Props.EmptyText` | Text shown by `this.empty()` when the (searched) option list is empty. |
| `undefinedText` | `String` | `Locale.trans('Undefined')` | `Props.UndefinedText` | Passed to `OptionHelper.getCombineList` as the label for model values that don't exist in `options` and `allowCreate` is `false`. |
| `position` | `String` | `'bottom-center'` | `Props.PositionBottomCenter` | Popover position; full 12-value set: `top-start`, `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end`, `left-start`, `left-center`, `left-end`, `right-start`, `right-center`, `right-end`. |
| `options` | `Object` (Array also accepted) | `{}` | `Props.OptionsObject` | See "Options resolution" in concepts.md. Walked by `OptionHelper.getList`/`getFlat` into `{ label, value }` pairs. |
| `optionsValue` | `String` | `'$index'` | `Props.OptionsObject` | Dot-path (via `Obj.get`) into the `{ $index, $value }` pair to resolve each option's `value`. |
| `optionsLabel` | `String` | `'$value'` | `Props.OptionsObject` | Dot-path into the `{ $index, $value }` pair to resolve each option's `label`. |
| `modelValue` | `any` | `null` | Component-local (`NSelect.ts`) | Untyped (matches concepts.md's confirmed entry). A single option **value** when `multiple` is `false`; an array of values when `multiple` is `true`. |
| `multiple` | `Boolean` | `false` | Component-local | Switches selection mode; changes `modelValue` shape from scalar to array and switches the display from a single input to a tags row. |
| `allowCreate` | `Boolean` | `false` | Component-local | Lets Enter commit the raw search text (`data.search`) as a new option value when nothing in the list matches (`onEnter()`); also lets values in `modelValue` that aren't in `options` render with their own string as the label instead of `undefinedText` (`OptionHelper.getCombineList`). |
| `collapse` | `Boolean` | `true` | Component-local | Multi-select only: when `true`, only the first selected tag is shown plus a `+:count` summary; when `false`, all tags render. |
| `placeholder` | `String` | `'Please select'` | Component-local | Literal default string, passed through `Locale.trans()` at render (`NSelectView.input()`). |
| `collapseText` | `String` | `'+:count item\|+:count items'` | Component-local | `Locale.choice()` plural-form template used for the multi-select collapse summary; `:count` is substituted with `model.length - 1`. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | New model value — a scalar (single mode) or filtered/deduped array (multiple mode), or `clearValue` if the selection became empty | Any option click (`item()`'s `onClick` → `applyModel(value)`), pressing Enter in the input (`onEnter()` → `applyModel(model)`), removing a tag's × icon (`tag()`'s `onClick` → `applyModel(value)`), or the built-in clear button (`applyClear()`, inherited from `ProtoController`) |

## Slots

None — `NSelectView` never calls `this.slot(...)`. It overrides both
`display()` and `panel()` from `NPopoverPanelView`, so even the inherited
`panel()` slot (`this.slot('panel')`) is unreachable; the dropdown body is
always the internal virtualized option list (`n-virtualbar` +
`n-popover-option`), not consumer-supplied content.

## Exposed methods

None — `NSelectController` never calls `pass()`.

## Minimal example

```vue
<n-select v-model="value" :options="{ mike: 'Mike', alex: 'Alex', hans: 'Hans' }"></n-select>
```

## Realistic example

Grounded in `demos/overview.html`'s current (non-stale) usage, which passes
plain key→label objects straight through the `Props.OptionsObject` defaults
(`optionsValue: '$index'`, `optionsLabel: '$value'` — no override needed):

```vue
<n-select
    v-model="size"
    :options="{ xs: 'XS', sm: 'SM', md: 'MD', lg: 'LG', xl: 'XL' }"
    size="md"
></n-select>

<n-select
    v-model="selectedIcons"
    :multiple="true"
    :collapse="false"
    :clearable="true"
    type="primary"
    :options="icons"
></n-select>
```

```js
// icons: array form also works (OptionHelper.getList accepts Array or Object)
icons = [
    { value: 'fa fa-ghost', label: 'Ghost' },
    { value: 'fa fa-directions', label: 'Directions' },
];
```

```vue
<!-- array form needs explicit optionsValue/optionsLabel since the defaults
     ($index/$value) would otherwise resolve to the array index and the
     whole item object -->
<n-select
    v-model="iconValue"
    :options="icons"
    options-value="$value.value"
    options-label="$value.label"
></n-select>
```

## Required composition

None — `NSelect` is self-contained, like `NTransfer`. It internally renders
an `n-popover` with an `n-virtualbar`/`n-popover-option` list as its dropdown
body, but none of that is authored by the consumer.

## Common mistakes

- Passing an **Array** of plain value/label objects without setting
  `optionsValue`/`optionsLabel`. With the defaults (`$index`/`$value`), an
  array's resolved `value` is the **array index**, not `item.value` — see the
  realistic example above.
- Assuming `modelValue` is always an array. It's a scalar unless `multiple`
  is `true` (`NSelectData.model` calls `Arr.first(model)` in single mode).
- Expecting the built-in clear button to appear without also setting
  `clearable="true"` — `Props.Clearable` defaults to `false`.
- Relying on a `panel`/`default` slot to customize the option list — there
  isn't one (see Slots).

## Gotchas

- `options` is declared `type: Object` but `OptionHelper.getList()` (via
  `Arr.each`) accepts an Array just as well — concepts.md's "options may be
  an Array or Object" note applies directly here.
- Values present in `modelValue` but absent from `options` still render (via
  `OptionHelper.getCombineList`): as their own string label if `allowCreate`
  is `true`, otherwise as `undefinedText`. This means an "orphaned" selected
  value doesn't silently disappear from the display.
- `collapseText` uses pico-js's `Locale.choice()` pluralization syntax
  (`'singular|plural'` with a `:count` placeholder), not a plain
  `Locale.trans()` lookup like `emptyText`/`undefinedText`.
- The dropdown popover width is fixed via `popoverConfig.width = -1` in
  `NSelectView` (overriding `NPopoverPanelView`'s default `width: 1`) —
  <!-- UNVERIFIED: exact semantics of the `width` popover config value (e.g.
  whether `-1` means "match trigger width" vs `1` meaning something else) —
  not traced into the `n-popover` component itself for this doc. -->

## Related components

- `NCascader` — the tree-shaped counterpart; also built on the same
  `NPopoverPanelController`/`NPopoverPanelView` base, but uses a
  `labelProp`/`valueProp`/`childProp` tree contract instead of
  `Props.OptionsObject`.
- `NTransfer` — a different flat-list picker (dual-list, not
  dropdown-based), also does not use `Props.OptionsObject`.
