# NInputNumber

A numeric text input with increase/decrease stepper buttons and a display-format string, bound via `v-model`; reach for this over plain `NInput` whenever the value must be clamped to a `min`/`max` range or formatted (currency, units) for display.

## Import / Registration

Registered globally by `src/input/index.ts` as `NInputNumber` (`App.component(NInputNumber.name, NInputNumber)`). Source: `src/input/js/input-number/{NInputNumber,NInputNumberController,NInputNumberData,NInputNumberView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Adds the `n-load` loading class. |
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | See concepts.md. |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Same open-string rule. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Subject to `superDisabled`. |
| `clearable` | `Boolean` | `false` | `Props.Clearable` (`BaseProps.ts`) | Renders the built-in `×` clear button (`this.clear()` is called unconditionally in the render tree, between the input and the increase button). |
| `clearValue` | `[String, Number, Boolean]` | `null` | `Props.ClearValue` (`BaseProps.ts`) | Value `modelValue` resets to via `applyClear()`. |
| `icon` | `String` | `''` | `Props.Icon` (`IconProps.ts`) | <!-- UNVERIFIED: prop is mixed in and available via `IconData`, but `NInputNumberView` never calls `this.icon(...)` for the model's own icon (it only uses hardcoded `fa fa-minus`/`fa fa-plus` icons for the stepper buttons). No visible effect found in this component's own render tree. --> |
| `iconPosition` | `String`, validated in `['before','after']` | `'before'` | `Props.IconPositionBefore` (`IconProps.ts`) | Same caveat as `icon` — not read in `NInputNumberView`. |
| `iconDisabled` | `Boolean` | `false` | `Props.IconDisabled` (`IconProps.ts`) | Same caveat — not read in this component's source. |
| `modelValue` | `[String, Number]` | `''` | `NInputNumber.ts` (own prop) | Declared type allows `String` or `Number`, but internally treated as numeric (`Mix.isNum` checks, `min`/`max` clamping). Cloned locally via `cloneProp('modelValue')`. |
| `min` | `Number` | `0` | `NInputNumber.ts` (own prop) | Lower clamp bound, enforced in `applyFormat()`, `decreaseNumber()`, `increaseNumber()`. |
| `max` | `Number` | `Number.MAX_SAFE_INTEGER` | `NInputNumber.ts` (own prop) | Upper clamp bound, same enforcement points. |
| `stepSize` | `Number` | `1` | `NInputNumber.ts` (own prop) | <!-- UNVERIFIED / confirmed dead prop: declared and exposed via `NInputNumberData.stepSize` getter/setter, but `decreaseNumber()`/`increaseNumber()` hardcode `value -= 1` / `value += 1` and never read `data.stepSize`. Setting `stepSize` currently has no effect on the stepper buttons — the step is always exactly 1 regardless of this prop. `demos/overview.html` even has a commented-out example passing `:step-size="0.1"`, suggesting this was intended to work but does not in the current source. --> |
| `precision` | `Number` | `0` | `NInputNumber.ts` (own prop) | Decimal precision. `precision > 0` parses the typed value with `Locale.num()` (decimal-aware); `precision < 1` (i.e. `0` or negative) parses with `Locale.int()`. Also passed to `Str.number(model, precision)` for display formatting. |
| `format` | `String` | `':count'` | `NInputNumber.ts` (own prop) | Display template resolved via `Locale.replace(format, { count })` — `:count` is replaced with the formatted number. E.g. `format=":count USD"` displays `"42 USD"`. |
| `placeholder` | `String` | `''` | `NInputNumber.ts` (own prop) | Native placeholder text. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | new `number` | **Not** fired on every keystroke (see Gotchas). Fired by `applyFormat()` (on `Enter` keydown or on `blur`), and immediately by `decreaseNumber()`/`increaseNumber()` when the stepper buttons are used. |
| `input` | native `Event` | Native `input` event on the `<input>` element — fired on every keystroke, but this does **not** update `modelValue` by itself. |
| `keydown` | native `KeyboardEvent` | Native `keydown`. If the key is Enter (`e.which === 13`), `applyFormat(e.target.value)` runs first, then this emits. |
| `keyup` | native `KeyboardEvent` | Native `keyup`. |
| `focus` | native `FocusEvent` | Native `focus` (sets internal focus state). |
| `blur` | native `FocusEvent` | Native `blur` — `applyFormat(e.target.value)` runs first (committing/clamping the typed value), then this emits. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| none | — | `NInputNumberView` never calls `this.slot(...)`. |

## Exposed methods

None. `NInputNumberController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-input-number v-model="value" :min="0" :max="100" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref(0);
</script>
```

## Realistic example

Adapted from `demos/overview.html` (currency-formatted, clamped-range field with a `:clearable` companion pair of min/max controls):

```vue
<template>
  <n-input-number v-model="minValue" :min="-100" :max="100" placeholder="Min. Value" />
  <n-input-number v-model="maxValue" :min="-100" :max="100" placeholder="Max. Value" />

  <n-input-number
    v-model="price"
    :min="minValue"
    :max="maxValue"
    :precision="2"
    :clearable="true"
    format=":count USD"
    type="primary"
  />
</template>

<script setup>
import { ref } from 'vue';

const minValue = ref(-100);
const maxValue = ref(100);
const price = ref(0);
</script>
```

## Required composition

None required — standalone. Optional: can be placed inside `NButtonGroup` (confirmed composition pairing).

## Common mistakes

- Assuming `modelValue` updates live as the user types: it does not. Typing only emits a plain `input` event; `update:modelValue` is only fired on `Enter` or `blur` (via `applyFormat()`), or immediately when the stepper buttons are clicked. Code that reads `v-model` reactively while the user is mid-typing (e.g. computed validation on every keystroke) will see stale values until the field loses focus or Enter is pressed.
- Passing `:step-size` expecting the stepper buttons to move by that amount: `stepSize` is a declared, gettable/settable prop with no runtime effect — `decreaseNumber()`/`increaseNumber()` always move by exactly `1`. Treat this as a confirmed dead prop, not a misconfiguration on the consumer's side.
- Passing a non-numeric string as `modelValue` (e.g. `''` — the declared default): display falls back to an empty string (`Mix.isNum(data.model)` guard in `NInputNumberView.input()`), which is expected, but any arithmetic done against the raw prop before the first user interaction should guard against non-numeric values.

## Gotchas

- The `format` prop's `:count` placeholder is resolved via `Locale.replace()` (pico-js i18n), not a plain string replace — templates without a literal `:count` token simply never interpolate the number.
- `icon`/`iconPosition`/`iconDisabled` are present in the props table (inherited via `Props.Icon`/`Props.IconPositionBefore`/`Props.IconDisabled`) but `NInputNumberView` never renders a user-supplied icon or reads `iconDisabled` — only the hardcoded stepper icons (`fa fa-minus`/`fa fa-plus`) appear.
- Holding down the increase/decrease button (`pointerdown`) triggers one immediate step, then after a 500 ms delay starts auto-repeating every 120 ms until `pointerup` — a press-and-hold acceleration behavior that isn't obvious from the props alone.
- The clear button (`this.clear()`) is rendered unconditionally in the DOM tree between the input and the increase button, but — per `ProtoView.clear()` — only actually shows when `clearable` is true and the model is non-empty.
- There is no `nativeType` prop on this component (unlike `NInput`). The native `<input>`'s `type` attribute is set to `data.type` — i.e. the **visual** `type` prop (`primary`/`danger`/etc., or `null`). Browsers silently fall back to `type="text"` behavior for unrecognized values, so this has no visible effect in practice, but it means the styling `type` prop and the native input attribute are (harmlessly) the same underlying value, not independent concerns.

## Related components

`NInput` (plain string variant, no clamping/formatting), `NInputFile` (file selection variant), `NTextarea` (multi-line variant), `NFormItem` (form-layout wrapper providing labels/validation/`superDisabled` context).
