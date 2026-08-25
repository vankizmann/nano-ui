# NDatepickerPanel

The calendar grid UI (month/year/date views, single or range selection) — confirmed to be **both** a standalone, directly-usable inline-calendar component **and** the exact component `NDatepicker`/`NDatetimepicker` render internally inside their popovers.

Confirmation: `demos/overview.html` uses it standalone, outside any popover, at top level (`<n-datepicker-panel v-bind="n_datepicker" min-date="now" :panels="2" :range="true">`). Separately, `NDatepickerView.panel()` (`src/datetime/js/datepicker/NDatepickerView.ts`) and `NDatetimepickerView.datepicker()` (`src/datetime/js/datetimepicker/NDatetimepickerView.ts`) both render it via `this.comp('n-datepicker-panel', props)` inside their own popovers, forwarding a subset of their own props straight through.

## Import / Registration

Registered globally by `src/datetime/index.ts` as `NDatepickerPanel` (`App.component(NDatepickerPanel.name, NDatepickerPanel)`). Source: `src/datetime/js/datepicker-panel/{NDatepickerPanel,NDatepickerPanelController,NDatepickerPanelData,NDatepickerPanelView}.ts`. `NDatepickerPanelController` extends `GroupController` (`src/root/js/controller/GroupController.ts`, see concepts.md) — note it never actually calls `append`/`remove`/`watchChilds` itself (see "Gotchas").

## Props

`NDatepickerPanelProps` (`src/datetime/js/datepicker-panel/NDatepickerPanel.ts`):

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Shows the built-in loading state. |
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | See concepts.md "Type and Size are open strings". |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Same open-string rule. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Subject to `superDisabled` (concepts.md). |
| `modelValue` | `[Array, String]` | `null` | `NDatepickerPanel.ts` (own prop) | A formatted date string in single mode, or `[arriveString, departString]` in `range` mode. See `datepicker.md`'s "Common mistakes" — same rule applies here. |
| `arrive` | `[String]` | `null` | `NDatepickerPanel.ts` (own prop) | Independently-bindable range start value. |
| `clearArrive` | any | `null` | `NDatepickerPanel.ts` (own prop) | Reserved for consumers wiring their own clear UI (the panel itself has no built-in clear button — that lives on `NDatepicker`). |
| `depart` | `[String]` | `null` | `NDatepickerPanel.ts` (own prop) | Independently-bindable range end value. |
| `clearDepart` | any | `null` | `NDatepickerPanel.ts` (own prop) | Same note as `clearArrive`. |
| `range` | `Boolean` | `false` | `NDatepickerPanel.ts` (own prop) | Enables two-click range selection in the day grid instead of single-click date selection. |
| `panels` | `Number` | `1` | `NDatepickerPanel.ts` (own prop) | Number of side-by-side month grids rendered. |
| `format` | `String` | `'YYYY-MM-DD HH:mm:ss'` | `NDatepickerPanel.ts` (own prop) | Format `modelValue`/`arrive`/`depart` are written back as when a day is clicked. |
| `minDate` | any | `null` | `NDatepickerPanel.ts` (own prop) | Earliest selectable day; disabled days below it get an `n-disabled` class (no click handler is removed — see "Gotchas"). |
| `maxDate` | any | `null` | `NDatepickerPanel.ts` (own prop) | Latest selectable day, same caveat as `minDate`. |

Note: `NDatepickerPanel` has **no** `clearable`/`clearValue`/`position`/`placeholder*`/`displayFormat`/`icon` props — those are `NDatepicker`-only, added on top when it wraps this panel in a popover+text-input.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | formatted date string (single mode) or `[arriveString, departString]` (range mode) | Single mode: clicking any day (`setRangeDate(date)` → `setModelDate(date)`). Range mode: clicking the second day of a range (`setRangeDate(date)` → `setModelRange(temp)`). |
| `update:arrive` | formatted date string | Range mode only, fired together with `update:modelValue` from `setModelRange(dates)` when the second day of a range is clicked. |
| `update:depart` | formatted date string | Range mode only, fired together with `update:modelValue` from `setModelRange(dates)`, same trigger as `update:arrive`. |

Clicking a month (in the "months" sub-view) or a year (in the "years" sub-view) does **not** emit any `update:*` event — it only calls `setPanelDate(item)`, which repositions the visible calendar and switches back to the "dates" view; it does not select/commit a value.

## Slots

None. `NDatepickerPanelView` never calls `this.slot(...)`.

## Exposed methods

None. `NDatepickerPanelController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-datepicker-panel v-model="date" />
</template>

<script setup>
import { ref } from 'vue';
const date = ref(null);
</script>
```

## Realistic example

Adapted from `demos/overview.html` — a standalone inline range calendar with two month panels and a floor date:

```vue
<template>
  <n-datepicker-panel
    v-model:arrive="stay.arrive"
    v-model:depart="stay.depart"
    min-date="now"
    :panels="2"
    :range="true"
    size="md"
    type="primary"
  />
</template>

<script setup>
import { reactive } from 'vue';
const stay = reactive({ arrive: null, depart: null });
</script>
```

## Required composition

None — usable standalone (as shown above), with no required parent. It is also composed internally, without any special setup required from the consumer, by `NDatepicker` (inside a popover, single or two-input mode) and by `NDatetimepicker` (inside a popover, alongside `NTimepickerPanel`). Optionally, like other pickers, an app can nest it (or its `NDatepicker` wrapper) inside `<n-button-group>` purely for grouped layout — not a requirement.

## Common mistakes

- **Assuming `modelValue` is a `Date` object.** As with `NDatepicker`, it is always a **string** (or a 2-string array in `range` mode), formatted per the `format` prop (default `'YYYY-MM-DD HH:mm:ss'`) — never a `Date`, and not affected by `displayFormat` (this component doesn't have a `displayFormat` prop at all; that's `NDatepicker`-only).
- **Expecting a single click to finish a range.** In `range: true` mode, the first click only stages `ranges`/`hovers` locally — no `update:*` fires until the second click resolves the pair via `setModelRange`.
- **Expecting `minDate`/`maxDate` to block clicks.** They only add an `n-disabled` CSS class to out-of-bounds days (`NDatepickerPanelView.date()`); the `onPointerdown` handler is still attached, so blocking the actual click is left to CSS (`pointer-events`) in the consuming app's theme, not JS.

## Gotchas

- `NDatepickerPanelController.onMousedown(item)` exists but is **dead code** — no element in `NDatepickerPanelView` wires up `onPointerdown`/`onClick` to call it. The real per-day click handler is `setRangeDate(date)` (bound in `NDatepickerPanelView.date()`).
- `NDatepickerPanelController` extends `GroupController` (adds `childs`/`append`/`remove`/`watchChilds`), but this file never calls any of those — <!-- UNVERIFIED: whether this base class choice is vestigial or used by some other integration point not present in this file. -->
- The header's month/year labels are clickable and switch `view` to `'months'`/`'years'` respectively; a "Go back" footer button (rendered via `this.comp('n-button', ...)`, calling `onRevert()`) only appears once you're in one of those sub-views — it resets `view` back to `'dates'` and re-centers on `displays[0]`'s original position via `setDisplayDates()`.
- `range` selection swaps arrive/depart order automatically if you click an earlier date second (`if (date.before(temp[0])) temp = temp.reverse()` in `setRangeDate`), so `arrive` is always guaranteed ≤ `depart` regardless of click order.

## Related components

- `NDatepicker` — wraps this panel in a popover with a text input; see `datepicker.md`.
- `NDatetimepicker` — composes this panel together with `NTimepickerPanel` inside one popover; see `datetimepicker.md`.
