# NRating

A read-only star-rating display that renders a row of stars (full/half/empty) plus a pluralized text label for a numeric value.

## Import / Registration

Registered globally by `src/visuals/index.ts` as `NRating` (`App.component(NRating.name, NRating)`). Source: `src/visuals/js/rating/{NRating,NRatingController,NRatingData,NRatingView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | Size modifier, see concepts.md "Type and Size are open strings". |
| `type` | `String` (open string; known built-ins: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Styles the filled stars via `n-type-{type}`. Demo (`demos/overview.html`) uses `primary`/`secondary`/`success`/`warning`/`danger`/`info` — all confirmed built-ins, no `neutral` usage for `NRating`. |
| `modelValue` | `[String, Number]` | `0` | `NRating.ts` (own prop) | The rating value. Coerced to a number via `Mix.num()` (pico-js) in `NRatingData.value`. |
| `closestValue` | `Boolean` | `true` | `NRating.ts` (own prop) | When `true` (default), the displayed numeric label uses `closest` (the value rounded to the nearest `stepSize` increment) instead of the raw `modelValue`. |
| `stepSize` | `Number` | `0.5` | `NRating.ts` (own prop) | Increment used both for rounding the displayed value (`closest = Math.round(value / stepSize) * stepSize`) and for star half-fill thresholds (`closest >= index - 0.5`). |
| `decimals` | `Number` | `1` | `NRating.ts` (own prop) | Decimal places used when formatting the numeric label (`Str.number(value, decimals, 'en')`). |
| `stars` | `Number` | `5` | `NRating.ts` (own prop) | Number of star elements rendered. |
| `starsText` | `String` | `'No stars\|:count Star\|:count Stars'` | `NRating.ts` (own prop) | Pluralized label template passed to pico-js `Locale.choice(starsText, value, { count })`. See Gotchas — the placeholder must be `:count`, not `:value`. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| — | — | `NRating.ts` declares `emits: []`. Nothing in `NRatingController`/`NRatingView` calls `update()`, `emit()`, or attaches any pointer/click handlers — `NRating` is a purely presentational, read-only display in this source. There is no way for a user to change the rating by interacting with the component. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| — | — | None. `NRatingView` never calls `this.slot(...)`. |

## Exposed methods

None. `NRatingController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-rating :model-value="3.5" />
</template>
```

## Realistic example

Adapted from `demos/overview.html` — a grid of ratings across the confirmed built-in `type` values:

```vue
<template>
  <n-rating :model-value="3.3" v-bind="n_rating" type="primary" />
  <n-rating :model-value="3.5" v-bind="n_rating" type="secondary" />
  <n-rating :model-value="3.8" v-bind="n_rating" type="success" />
  <n-rating :model-value="0" v-bind="n_rating" type="warning" />
  <n-rating :model-value="1" v-bind="n_rating" type="danger" />
  <n-rating :model-value="3" v-bind="n_rating" type="info" />
</template>

<script setup>
import { reactive } from 'vue';
// demo's n_rating also sets a custom `choice` key, which is not an NRating
// prop at all (the real prop is `starsText`) — see Gotchas.
const n_rating = reactive({
  size: 'md',
  choice: 'No stars|:value star|:value stars',
  disabled: false,
});
</script>
```

## Required composition

None — independent, standalone component.

## Common mistakes

- Expecting `v-model="rating"` to make the stars clickable/editable: `NRating` has no emits and no interaction handlers at all in this source. It is display-only; despite having a `modelValue` prop (which invites a v-model mental model), there is no `update:modelValue` path.
- Using `:value` as the pluralization placeholder in a custom `starsText`, as `demos/overview.html`'s `n_rating.choice` does (`'No stars|:value star|:value stars'`): the actual replace map built in `NRatingView.value()` only sets a `count` key (`{ count: Str.number(value, ...) }`), and pico-js `Locale.choice()` only auto-fills a `count` placeholder by default. A `:value` placeholder in a custom string will **not** be interpolated — use `:count`. Also note the demo's `choice` key on `n_rating` is not even the right prop name (`starsText` is), so that override has no effect on `NRating` at all as bound in the demo.
- Assuming `stars` determines the max rating value for clamping: `NRatingData` performs no clamping of `modelValue`/`value` against `stars`— a `modelValue` greater than `stars` will simply overflow the rendered star row's "full" state logic (all stars render full, no error).

## Gotchas

- `closest` (used for both the half/full star fill and, by default, the displayed number) is computed as `Math.round(value / stepSize) * stepSize` — with the default `stepSize` of `0.5`, this rounds to the nearest half-star, which is also exactly the granularity the star fill logic (`closest >= index - 0.5`) can visually represent.
- `decimals` only affects the text-label formatting (`Str.number`), not the star fill visualization, which is inherently step-quantized by `stepSize`.
- `starsText` uses pico-js's `Locale.choice()` 2- or 3-part pipe syntax (`'No stars|:count Star|:count Stars'`) — see `NRatingView.value()`; the exact `count` placeholder name is load-bearing (see Common mistakes above).

## Related components

None — NRating has no composition relationship with NTag, NMessage, or NProgress; documented independently per task scope.
