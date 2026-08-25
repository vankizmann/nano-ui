# NDatetimepicker

A text-input date-and-time field that opens a popover containing an internal `NDatepickerPanel` (calendar) and `NTimepickerPanel` (time list) side by side; no range mode (no `arrive`/`depart`).

## Import / Registration

Registered globally by `src/datetime/index.ts` as `NDatetimepicker` (`App.component(NDatetimepicker.name, NDatetimepicker)`). Source: `src/datetime/js/datetimepicker/{NDatetimepicker,NDatetimepickerController,NDatetimepickerData,NDatetimepickerView}.ts`. `NDatetimepickerController` extends `NPopoverPanelController` (same base as `NDatepicker`; see `datepicker.md` and concepts.md).

## Props

`NDatetimepickerProps` (`src/datetime/js/datetimepicker/NDatetimepicker.ts`):

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | See concepts.md "Type and Size are open strings". |
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | Same open-string rule. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Subject to `superDisabled` (concepts.md). |
| `clearable` | `Boolean` | `false` | `Props.Clearable` (`BaseProps.ts`) | Shows the built-in clear (×) button. |
| `clearValue` | `[String, Number, Boolean]` | `null` | `Props.ClearValue` (`BaseProps.ts`) | Value `modelValue` resets to on clear; also forwarded as-is into both internal panels. |
| `position` | `String`, validated against the 12-value popover position set | `'bottom-start'` | `Props.PositionBottomStart` (`PositionProps.ts`) | Popover placement; full enum in concepts.md. |
| `modelValue` | untyped (no `type` key) | `null` | `NDatetimepicker.ts` (own prop) | See "Common mistakes" — always read back as a **formatted string**, never a `Date`, despite the untyped declaration. |
| `minDate` | any | `null` | `NDatetimepicker.ts` (own prop) | Earliest selectable date/time; forwarded to the internal `NDatepickerPanel`. Accepts anything `Now.make()` accepts, including relative expressions like `"now"`. |
| `maxDate` | any | `null` | `NDatetimepicker.ts` (own prop) | Latest selectable date/time, same as `minDate`. |
| `panels` | `Number` | `1` | `NDatetimepicker.ts` (own prop) | Number of side-by-side month grids in the internal calendar panel. |
| `placeholder` | `String` | `'Select datetime'` | `NDatetimepicker.ts` (own prop) | Placeholder for the text input. |
| `format` | `String` | `'YYYY-MM-DD HH:mm:ss'` | `NDatetimepicker.ts` (own prop) | Format `modelValue` is **written back** as. Forwarded unchanged to both the internal `NDatepickerPanel` and `NTimepickerPanel`, so it must contain both date and time tokens for both sub-panels to parse/format it meaningfully. |
| `displayFormat` | `String` | `'YYYY-MM-DD HH:mm:ss'` | `NDatetimepicker.ts` (own prop) | Format used to parse the typed text and render the text field. Unlike `NDatepicker`, this defaults to the **same** value as `format` (both full date+time). |
| `icon` | `String` | `() => Styler.icon('calendar')` | `NDatetimepicker.ts` (own prop, **not** `Props.Icon`) | Icon shown in the field handle. |

Note: unlike `NDatepicker`, `NDatetimepickerProps` does **not** spread `NDatepickerPanelProps` — it declares its own `modelValue`/`minDate`/`maxDate`/`panels`/`format`/`displayFormat`, and has no `range`/`arrive`/`depart`/`rangeSeperator`/`placeholderArrive`/`placeholderDepart` props at all.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | a formatted datetime string | User presses Enter in the text input (`onInput()`), clicks the clear button (`applyClear()`, inherited from `ProtoController`), picks a date in the internal calendar (bubbled from `n-datepicker-panel`'s `update:modelValue`), or picks a time in the internal time list (bubbled from `n-timepicker-panel`'s `update:modelValue`). |

This is the only emit declared (`emits: ['update:modelValue']`) — there is no `update:arrive`/`update:depart` on this component.

## Slots

None. `NDatetimepickerView` overrides `NPopoverPanelView.panel()` to always render its own `datepicker()` + `timepicker()` pair directly — it does not fall through to `this.slot('panel')`.

## Exposed methods

None. `NDatetimepickerController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-datetimepicker v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref(null);
</script>
```

## Realistic example

Adapted from `demos/overview.html`'s options pattern (size/type/clearable/disabled all bindable):

```vue
<template>
  <n-form :form="form">
    <n-form-item label="Appointment">
      <n-datetimepicker
        v-model="form.appointment"
        size="md"
        type="primary"
        :clearable="true"
      />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ appointment: 'now+2days' });
</script>
```

## Required composition

None required from the consumer — `NDatetimepicker` is self-contained: it composes `NDatepickerPanel` and `NTimepickerPanel` internally inside its own popover (`NDatetimepickerView.panel()` renders both, forwarding `modelValue`/`clearValue`/`format` — plus `panels`/`minDate`/`maxDate` to the date side only). Optionally, like `NDatepicker`, it can be placed inside `<n-button-group>` alongside other pickers purely for grouped layout — not a requirement, and not directly demonstrated for this specific component in `demos/`.

## Common mistakes

- **Assuming `modelValue` is a `Date` object.** The prop is declared with no `type` restriction at all (`{ default: null }`), which can read as "accepts anything," but the only value the component ever actually writes back via `update:modelValue` is a **string**, formatted per the `format` prop (default `'YYYY-MM-DD HH:mm:ss'`). Feed it a `Date`/`Now`/compatible string on the way in; expect a string on the way out.
- **Setting `format`/`displayFormat` to a date-only pattern (e.g. `'YYYY-MM-DD'`).** Both default to a full date+time pattern and both are forwarded to the internal `NTimepickerPanel`; a date-only `format` would strip time information out of every written value.
- **Expecting a `range` prop.** `NDatetimepicker` has no range mode — use `NDatepicker` with `range: true` for a date range, or two separate `NDatetimepicker`s if you need a datetime range.

## Gotchas

- The same `modelValue` (and `clearValue`/`format`) is passed straight through to **both** internal panels (`NDatepickerPanelView`'s date grid and `NTimepickerPanel`'s time list) — each panel parses out and updates only the portion it cares about, but both receive the whole formatted string on every change, and either one's click can independently trigger `update:modelValue` on the outer `NDatetimepicker`.
- As with `NDatepicker`, reading an externally-supplied `modelValue` goes through `NDateHelper.getDate()`, which calls `Now.make(value)` without passing the `format` prop — parsing relies on pico-js's default format/relative-expression detection, not your custom `format`. <!-- UNVERIFIED: exact fallback parsing behavior for a customized `format` that doesn't match ISO or the default pattern. -->
- `minDate`/`maxDate` are only forwarded to the date panel, not the time panel — there is no way to restrict selectable *times* on a given day through this component's props.

## Related components

- `NDatepickerPanel` — the calendar half of the internal popover; see `datepicker-panel.md`.
- `NDatepicker` — the date-only counterpart (also supports `range`); see `datepicker.md`.
- `NTimepickerPanel` / `NTimepicker` — the time-selection half composed inside this component's popover (documented separately, outside this batch).
