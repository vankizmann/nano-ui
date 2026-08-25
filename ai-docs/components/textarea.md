# NTextarea

A multi-line text input bound via `v-model`, with optional row auto-growing; reach for this over `NInput` whenever the value is expected to span multiple lines (no icon-button, no inline label, and no `clearable`/`clear` support — this is a leaner component than `NInput`).

## Import / Registration

Registered globally by `src/input/index.ts` as `NTextarea` (`App.component(NTextarea.name, NTextarea)`). Source: `src/input/js/textarea/{NTextarea,NTextareaController,NTextareaData,NTextareaView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Adds the `n-load` loading class. |
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | See concepts.md. |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Same open-string rule. Note: this is also (harmlessly) passed straight through as the native `<textarea>`'s `type` attribute — see Gotchas. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Subject to `superDisabled` (concepts.md). |
| `modelValue` | `[String, Number]` | `''` | `NTextarea.ts` (own prop) | v-model value. Cloned locally via `cloneProp('modelValue')`. |
| `placeholder` | `String` | `''` | `NTextarea.ts` (own prop) | Native placeholder text. |
| `autoRows` | `Boolean` | `false` | `NTextarea.ts` (own prop) | When `true`, the rendered `rows` attribute grows (up to `maxRows`) based on the number of newline characters currently in `modelValue`; recomputed on every render, so it also shrinks back down as lines are removed. |
| `minRows` | `Number` | `3` | `NTextarea.ts` (own prop) | Baseline `rows` attribute value, used regardless of `autoRows`. |
| `maxRows` | `Number` | `6` | `NTextarea.ts` (own prop) | Ceiling for the `autoRows` growth; ignored when `autoRows` is `false`. |
| `maxLength` | `Number` | `null` | `NTextarea.ts` (own prop) | Only applied as the native `maxLength` attribute when truthy (`if (data.maxLength) { props.maxLength = ... }`) — `null`/`0` mean no native character limit is set at all. |

Note: unlike `NInput`/`NInputNumber`, `NTextarea` does **not** mix in `Props.Clearable`/`Props.ClearValue`/`Props.Icon` — there is no icon, clear button, or `clearValue` support on this component at all.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | new `string` value (`e.target.value`) | Native `input` event on the `<textarea>` (`scope.update('modelValue', e.target.value)`). |
| `input` | native `Event` | Alongside `update:modelValue`, on every native input event. |
| `keydown` | native `KeyboardEvent` | Native `keydown` on the `<textarea>`. |
| `keyup` | native `KeyboardEvent` | Native `keyup` on the `<textarea>`. |
| `focus` | native `FocusEvent` | Native `focus` (sets internal focus state for the `n-focus` class). |
| `blur` | native `FocusEvent` | Native `blur` (clears the focus state). |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| none | — | `NTextareaView` never calls `this.slot(...)`. |

## Exposed methods

None. `NTextareaController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-textarea v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
```

## Realistic example

Adapted from `demos/form/index.html` (inside `NFormItem`) and `demos/overview.html` (`auto-rows` + `min-rows` variant):

```vue
<template>
  <n-form :form="form">
    <n-form-item label="Description" tooltip="Multi-line notes">
      <n-textarea v-model="form.notes" :auto-rows="true" :min-rows="1" :max-rows="8" />
    </n-form-item>

    <n-form-item prop="name" label="Bio">
      <n-textarea v-model="form.bio" :max-length="280" type="primary" placeholder="Tell us about yourself" />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ notes: '', bio: '' });
</script>
```

## Required composition

None required — standalone. Optional: can be placed inside `NButtonGroup` (confirmed composition pairing).

## Common mistakes

- Expecting a `clearable`/`clear` button like `NInput`/`NInputNumber` have: `NTextarea` doesn't mix in `Props.Clearable` at all — there is no built-in clear control on this component.
- Setting `maxLength="0"` expecting an explicit zero-character limit: the prop is only applied when truthy (`if (data.maxLength)`), so `0` (and `null`) both mean "no native `maxLength` attribute set," not "zero allowed characters."
- Setting `autoRows` without also considering `maxRows`: growth is capped at `maxRows` (default `6`) — a long pasted block of text will not keep expanding the textarea past that, it'll start scrolling internally instead.

## Gotchas

- The native `<textarea>` element receives `type: data.type` as an attribute (the visual `type` prop, e.g. `'primary'`) — `<textarea>` has no `type` attribute in HTML, so browsers ignore it; this is a harmless no-op inherited from the same render pattern used elsewhere in this codebase, not a way to change the rendered element type.
- `autoRows`'s row count is recalculated fresh on every render directly from `modelValue`'s newline count (`(Mix.str(data.model).match(/\n/g) || []).length + 1`) — it is not driven by the actual rendered pixel height of wrapped (non-newline) long lines, only by explicit `\n` characters.
- `iconDisabled`/`icon`/`clearable`-style props from other input variants are simply absent from this component's prop set (`inheritAttrs: false`, so they don't exist here at all — passing them lands in `$attrs` and gets spread directly onto the inner `<textarea>` element via `Obj.except(scope.attrs, exclude, {...})`, i.e. as a raw, likely-invalid HTML attribute, not applied as a styled feature).

## Related components

`NInput` (single-line variant with icon-button/label/clear support), `NInputNumber` (numeric variant), `NInputFile` (file selection variant), `NFormItem` (form-layout wrapper providing labels/validation/`superDisabled` context).
