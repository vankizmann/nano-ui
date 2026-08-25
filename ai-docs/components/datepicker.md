# NDatepicker

A text-input date field that opens a popover calendar (internally an `NDatepickerPanel`) for picking a single date or a `arrive`/`depart` date range.

## Import / Registration

Registered globally by `src/datetime/index.ts` as `NDatepicker` (`App.component(NDatepicker.name, NDatepicker)`). Source: `src/datetime/js/datepicker/{NDatepicker,NDatepickerController,NDatepickerData,NDatepickerView}.ts`. `NDatepickerController` extends `NPopoverPanelController` (`src/popover/js/popover-panel/NPopoverPanelController.ts`) — the same base used by `NSelect`/other popover-driven inputs (see concepts.md's Controller/Data/View section for the shared `ProtoController` API this inherits, e.g. `applyClear()`, `onFocus`/`onBlur`).

## Props

`NDatepickerProps` (`src/datetime/js/datepicker/NDatepicker.ts`) is built from `...NDatepickerPanelProps` (see `datepicker-panel.md`) plus its own additions below. The full effective prop set is the union of both tables.

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (via `NDatepickerPanelProps`) | Shows the built-in loading state. |
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (via `NDatepickerPanelProps`) | See concepts.md "Type and Size are open strings". |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (via `NDatepickerPanelProps`) | Same open-string rule. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (via `NDatepickerPanelProps`) | Subject to `superDisabled` (concepts.md). |
| `modelValue` | `[Array, String]` | `null` | `NDatepickerPanelProps` (own decl there) | See "Common mistakes" — always read back as a **formatted string** (single mode) or a **2-element array of formatted strings** (`range: true`), never a `Date`. |
| `arrive` | `[String]` | `null` | `NDatepickerPanelProps` | The range's start-date v-model (formatted string). Only meaningful when `range: true`. |
| `clearArrive` | any | `null` | `NDatepickerPanelProps` | Value `arrive` resets to on clear, in range mode. |
| `depart` | `[String]` | `null` | `NDatepickerPanelProps` | The range's end-date v-model (formatted string). Only meaningful when `range: true`. |
| `clearDepart` | any | `null` | `NDatepickerPanelProps` | Value `depart` resets to on clear, in range mode. |
| `range` | `Boolean` | `false` | `NDatepickerPanelProps` | Switches from a single date field to two (`arrive`/`depart`) inputs plus range-selection behavior in the panel. |
| `panels` | `Number` | `1` | `NDatepickerPanelProps` | Number of side-by-side month panels rendered in the popover calendar. |
| `format` | `String` | `'YYYY-MM-DD HH:mm:ss'` | `NDatepickerPanelProps` | The format `modelValue`/`arrive`/`depart` are **written back** as (via `Now#format()`). Distinct from `displayFormat` below — see "Gotchas". |
| `minDate` | any | `null` | `NDatepickerPanelProps` | Earliest selectable date. Accepts anything `Now.make()` accepts (`Date`, `Now` instance, ISO string, or a pico-js relative expression like `"now"` — confirmed via `demos/overview.html`'s `min-date="now"`). |
| `maxDate` | any | `null` | `NDatepickerPanelProps` | Latest selectable date, same accepted forms as `minDate`. |
| `clearable` | `Boolean` | `false` | `Props.Clearable` (own spread) | Shows the built-in clear (×) button when a value is present. |
| `clearValue` | `[String, Number, Boolean]` | `null` | `Props.ClearValue` (own spread) | Non-range clear target for `modelValue` (see `applyClear()`; in range mode `clearArrive`/`clearDepart` are used instead). |
| `position` | `String`, validated against the 12-value popover position set | `'bottom-start'` | `Props.PositionBottomStart` (own spread) | Popover placement; full enum in concepts.md. |
| `placeholder` | `String` | `'Select date'` | `NDatepicker.ts` (own prop) | Placeholder for the single (non-range) input. |
| `placeholderArrive` | `String` | `'Start date'` | `NDatepicker.ts` (own prop) | Placeholder for the `arrive` input in range mode. |
| `placeholderDepart` | `String` | `'End date'` | `NDatepicker.ts` (own prop) | Placeholder for the `depart` input in range mode. |
| `rangeSeperator` | `String` | `'-'` | `NDatepicker.ts` (own prop) | Text rendered between the arrive/depart inputs in range mode. |
| `displayFormat` | `String` | `'YYYY-MM-DD'` | `NDatepicker.ts` (own prop) | Format used to **parse the typed text** and to **render the text field(s)**. Distinct from `format` — see "Gotchas". |
| `icon` | `String` | `() => Styler.icon('calendar')` | `NDatepicker.ts` (own prop, **not** `Props.Icon`) | Icon shown in the field handle; rendered via `NPopoverPanelView.handle()`. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | a formatted date string, or `[arriveString, departString]` when `range: true` | User presses Enter in the text input (`onInput()`), commits an arrive/depart input (`onArrive()`/`onDepart()`, which also re-emits `modelValue` as the pair), clicks the clear button (`applyClear()`), or picks a date in the internal calendar panel (bubbled from `NDatepickerPanel`'s own `update:modelValue`). |
| `update:arrive` | formatted date string | Only in `range: true` mode: user commits the arrive text input (`onArrive()`), calls clear (`applyClear()`), or picks a range start/end in the panel (bubbled from `NDatepickerPanel`). |
| `update:depart` | formatted date string | Only in `range: true` mode: user commits the depart text input (`onDepart()`), calls clear (`applyClear()`), or completes a range pick in the panel (bubbled from `NDatepickerPanel`). |

## Slots

None. `NDatepickerView` overrides `NPopoverPanelView.panel()` to always render the internal `n-datepicker-panel` component directly — it does not fall through to `this.slot('panel')` like the base `NPopoverPanelView` does.

## Exposed methods

None. `NDatepickerController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-datepicker v-model="date" />
</template>

<script setup>
import { ref } from 'vue';
const date = ref(null);
</script>
```

## Realistic example

Adapted from `demos/datepicker/index.html` and `demos/overview.html` — a single date field with clear, and a separate arrive/depart range field:

```vue
<template>
  <n-form :form="form">
    <n-form-item label="Date">
      <n-datepicker v-model="form.date" :clearable="true" />
    </n-form-item>

    <n-form-item label="Stay">
      <n-datepicker
        v-model:arrive="form.arrive"
        v-model:depart="form.depart"
        :range="true"
        :clearable="true"
      />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  date: 'now+2days',
  arrive: 'now',
  depart: 'now+2days',
});
</script>
```

Note: `demos/datepicker/index.html` is a legacy Vue 2 demo and uses `:arrive.sync="form.arrive"` — the Vue 3 equivalent shown above is `v-model:arrive`/`v-model:depart`.

## Required composition

None required — `NDatepicker` is self-contained (it renders its own internal popover and calendar panel). Optionally, it can be placed inside `<n-button-group>` alongside `NTimepicker`/other pickers purely for grouped visual layout (confirmed pattern in `demos/overview.html`: `<n-button-group><n-datepicker .../><n-timepicker .../></n-button-group>`) — this is not a requirement of either component.

## Common mistakes

- **Assuming `modelValue` is a `Date` object.** It is not. Every write-back (`onInput`, `onArrive`, `onDepart`, `applyClear`, or a panel click) sets `modelValue` to a **string** formatted via `format` (default `'YYYY-MM-DD HH:mm:ss'`), or to a **2-element string array** `[arrive, depart]` when `range: true`. You may hand it a `Date`, a pico-js `Now` instance, or a compatible string on the way in (`NDateHelper.getDate`/`getDates` pass it through `Now.make()`), but always expect a string/array back out.
- **Confusing `format` with `displayFormat`.** `displayFormat` (default `'YYYY-MM-DD'`) controls what's shown in the text input and how typed text is parsed (`Now.make(data.input, data.displayFormat)`). `format` (default `'YYYY-MM-DD HH:mm:ss'`) controls what's actually written to `modelValue`/`arrive`/`depart`. With the defaults, typing `2026-08-25` and pressing Enter emits `"2026-08-25 00:00:00"`, not `"2026-08-25"`.
- **Wiring only `v-model` in range mode.** `range: true` needs `arrive`/`depart` handled too if you want the two text fields to be independently bindable — `modelValue` alone still receives `[arriveString, departString]`, but `update:arrive`/`update:depart` are separate events (`v-model:arrive`, `v-model:depart`).

## Gotchas

- Reading an externally-supplied `modelValue`/`arrive`/`depart` string always goes through `NDateHelper.getDate`/`getDates`, which calls `Now.make(value)` **without** passing the `format` prop — parsing relies on pico-js's default format (`'YYYY-MM-DD HH:mm:ss'`) plus its ISO-date/relative-expression detection, not on your custom `format` value. <!-- UNVERIFIED: exact fallback parsing behavior for a customized `format` whose string doesn't match the default pattern or ISO — confirmed only that the `format` prop itself is never passed into these `Now.make()` calls. -->
- `minDate`/`maxDate` accept pico-js relative-date expressions (e.g. `"now"`), not just literal date strings/`Date` objects — see `demos/overview.html`'s `min-date="now"`.
- In range mode, the popover requires two day-clicks to commit a range; the first click only updates internal hover/preview state (no `update:*` emitted) — see `datepicker-panel.md`'s Gotchas for the full click sequence.
- Pressing Tab in the `depart` input blurs/closes the popover (`onBlur()`); pressing Tab in the `arrive` input does not — only Enter commits the arrive value.

## Related components

- `NDatepickerPanel` — the calendar UI `NDatepicker` renders inside its popover (also usable standalone; see `datepicker-panel.md`).
- `NDatetimepicker` — the date+time counterpart, composing `NDatepickerPanel` and `NTimepickerPanel` together (see `datetimepicker.md`).
- `NTimepicker` — analogous single-purpose time field, commonly paired with `NDatepicker` inside `NButtonGroup`.
