# NSlider

A draggable-handle slider bound via `v-model`, supporting both a single-value mode and a two-handle range mode.

## Import / Registration

Registered globally by `src/slider/index.ts` as `NSlider` (`App.component(NSlider.name, NSlider)`). Source: `src/slider/js/slider/{NSlider,NSliderController,NSliderData,NSliderView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | Size modifier, see concepts.md "Type and Size are open strings". |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Color/type modifier, see concepts.md. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Disables interaction (subject to `superDisabled`, see concepts.md). |
| `modelValue` | `[String, Number, Array]` | `null` | `NSlider.ts` (own prop) | Single-mode: a plain number (a numeric `String` is accepted by prop validation but the internal math (`Num.subtract`, array checks) is written for numbers — see Gotchas). Range-mode (`range: true`): a 2-element `[min, max]` array. Confirmed exact shape and dual behavior in `NSliderController.onPointerup`/`updateValues`. |
| `range` | `Boolean` | `false` | `NSlider.ts` (own prop) | Switches between single-handle mode (one draggable handle, `modelValue` is a number) and two-handle mode (`modelValue` is `[min, max]`). |
| `labels` | `Array` | `() => []` | `NSlider.ts` (own prop) | Tooltip labels indexed positionally against the `steps` array (only meaningful when `steps` is also an array — see Realistic example). Rendered as each handle's `data-tooltip` attribute. |
| `steps` | `[Number, Array]` | `1` | `NSlider.ts` (own prop) | As a `Number`: a fixed increment used to round the drag position. As an `Array` (e.g. `[100, 200, 300]`): an explicit list of allowed stop values — dragging snaps to the closest one, and `min`/`max` are then **ignored** in favor of the array's first/last entries (see `minfix`/`maxfix` below and Gotchas). |
| `min` | `Number` | `0` | `NSlider.ts` (own prop) | Minimum value. Only used when `steps` is a plain `Number` (overridden by `Arr.first(steps)` when `steps` is an `Array`). |
| `max` | `Number` | `100` | `NSlider.ts` (own prop) | Maximum value. Only used when `steps` is a plain `Number` (overridden by `Arr.last(steps)` when `steps` is an `Array`). |

`NSliderData` exposes the effective bounds as `minfix`/`maxfix` getters (`Mix.isArr(steps) ? Arr.first(steps)/Arr.last(steps) : min/max`) — read these, not raw `min`/`max`, to know the actual clamping range when documenting or debugging a `steps`-array slider.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `range: false` → the dragged handle's resolved number (`Arr.last(data.values)`). `range: true` → the full `[min, max]` array (`data.values`). | `NSliderController.onPointerup`, i.e. when the user releases a drag on either handle. Not fired continuously during drag — intermediate positions are tracked only in local `values` state, which powers the visual bar/handle rendering during the drag. |

## Slots

None — `NSliderView.default()` renders only `this.bar()` and `this.handles()`; it never calls `this.slot(...)`. Note: several demos pass slot content into `<n-slider>...</n-slider>` (e.g. `demos/overview.html`'s `<n-slider ...>Slider</n-slider>`) but this content is not rendered by the current source — see Gotchas.

## Exposed methods

None. `NSliderController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-slider v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref(30);
</script>
```

## Realistic example

Adapted from `demos/overview.html` — a plain slider, a range slider, and a stepped slider with custom labels:

```vue
<template>
  <!-- single value, default 0-100 range -->
  <n-slider v-model="value" size="md" />

  <!-- two-handle range mode -->
  <n-slider v-model="rangeValue" :range="true" />

  <!-- fixed stop points with tooltip labels (min/max come from the steps array: 100 and 300) -->
  <n-slider
    v-model="stepValue"
    :steps="[100, 200, 300]"
    :labels="['Small', 'Medium', 'Big']"
  />
</template>

<script setup>
import { ref } from 'vue';
const value = ref(30);
const rangeValue = ref([20, 60]);
const stepValue = ref(200);
</script>
```

## Required composition

None — standalone.

## Common mistakes

- Binding `modelValue` to a single number while `range="true"` (or vice versa): the two modes require different shapes (`Number` vs `[min, max]` `Array`); mismatching them means `updateValues()`'s `Mix.isArr(data.model)` check silently falls into the wrong branch.
- Setting `min`/`max` together with an array `steps` and expecting them to take effect: they're overridden by the array's first/last entries (`minfix`/`maxfix`).
- Expecting `labels` to map by value: they map by **index into `steps`** (`Arr.findIndex(data.steps, value)` then `Obj.get(data.labels, key, value)`), so `labels` only makes sense paired with an array `steps` of the same length.
- Putting slot content inside `<n-slider>...</n-slider>`: it is silently dropped (no slot rendering in `NSliderView`).

## Gotchas

- **External `modelValue` changes after mount don't move the handles.** `NSliderController.setup()` calls `updateValues()` exactly once (synchronously, at setup time) to derive the internal `values` array that drives handle/bar rendering. `cloneProp('modelValue')` does watch the prop and updates the underlying local value on external change, but nothing re-invokes `updateValues()` afterward — so programmatically reassigning the parent's bound value post-mount updates `data.model` but not the rendered handle position. Only user drags (`onPointermove`) update `values` afterward.
- <!-- UNVERIFIED: numeric `steps` (non-array) rounding appears to operate on the raw 0–100 pointer-percentage (`width` in `onPointermove`/`getClosestStep`) without rescaling into a custom `min`/`max` domain, unlike the array-`steps` branch which does rescale via `(Arr.last(steps) - Arr.first(steps)) / 100 * width`. This suggests a numeric `steps` slider with non-default `min`/`max` (e.g. `min="50" max="150" steps="5"`) may snap incorrectly — inferred from reading `NSliderController.getClosestStep`, not confirmed by running it. Default `min="0" max="100"` sidesteps this entirely since the percentage and value domains coincide numerically. -->
- `update:modelValue` only fires on pointer release, not during drag — don't rely on it for live/continuous feedback; the live-drag value lives in the component's internal (non-exposed) `values` state.
- The component measures its own pixel width via a `ResizeObserver` (`onMounted`/`onResize`) — if it's rendered while hidden (`display: none`, an inactive tab, etc.) its initial width can be `0`/stale until a resize occurs.

## Related components

None — NSlider has no composition relationship with other components (see task scope: documented independently from NSwitch).
