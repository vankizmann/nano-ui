# NInput

A single-line text input bound via `v-model`; reach for this over `NInputNumber` (numeric formatting/stepper) or `NTextarea` (multi-line) whenever you need a plain string/number field with optional icon-button and inline label.

## Import / Registration

Registered globally by `src/input/index.ts` as `NInput` (`App.component(NInput.name, NInput)`). Source: `src/input/js/input/{NInput,NInputController,NInputData,NInputView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Adds the `n-load` loading class (see concepts.md). |
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | See concepts.md "Type and Size are open strings". |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Same open-string rule. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Subject to `superDisabled` (concepts.md). |
| `clearable` | `Boolean` | `false` | `Props.Clearable` (`BaseProps.ts`) | Shows the built-in `×` clear button (`ProtoView.clear()`) when the model is non-empty. |
| `clearValue` | `[String, Number, Boolean]` | `null` | `Props.ClearValue` (`BaseProps.ts`) | Value `modelValue` is reset to by `applyClear()`. |
| `icon` | `String` | `''` | `Props.Icon` (`IconProps.ts`) | When non-empty, renders a clickable icon "button" part alongside the input. |
| `iconPosition` | `String`, validated in `['before','after']` | `'before'` | `Props.IconPositionBefore` (`IconProps.ts`) | Side the icon button renders on. |
| `iconDisabled` | `Boolean` | `false` | `Props.IconDisabled` (`IconProps.ts`) | <!-- UNVERIFIED: declared and available via `IconData`, but not read anywhere in `NInputView`/`NInputController` — the icon button click handler does not check it. May currently have no visible effect on `NInput` specifically; do not assume it disables the icon click. --> |
| `modelValue` | `[String, Number]` | `''` | `NInput.ts` (own prop) | v-model value. Confirmed exactly as concepts.md states. Cloned locally via `cloneProp('modelValue')`. |
| `nativeType` | `String` | `'text'` | `NInput.ts` (own prop) | Passed straight through as the native `<input type="...">` attribute (e.g. `'text'`, `'password'`, `'email'`) — any valid HTML input type string works, not a closed enum. |
| `placeholder` | `String` | `''` | `NInput.ts` (own prop) | Native placeholder text. |
| `label` | `String` | `null` | `NInput.ts` (own prop) | Inline label rendered next to the input; not rendered at all when empty (`Mix.isEmpty`). |
| `labelPosition` | `String` | `'before'` | `NInput.ts` (own prop) | Open string; only the literal values `'before'`/`'after'` are handled in `NInputView.default()`. Any other value means the label is never rendered even if `label` is set — see Common mistakes. |
| `onButtonClick` | `Function` | `null` | `NInput.ts` (own prop) | Not manually invoked in source — its presence only toggles an `n-has-event` class on the icon button. The actual click handling is via the `button-click` event (see Gotchas). |
| `onButtonDblclick` | `Function` | `null` | `NInput.ts` (own prop) | Same caveat as `onButtonClick`, for the `button-dblclick` event. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | new `string` value (`e.target.value`) | Native `input` event on the `<input>` element (`scope.update('modelValue', e.target.value)`). |
| `input` | native `Event` | Alongside `update:modelValue`, on every native input event. |
| `keydown` | native `KeyboardEvent` | Native `keydown` on the `<input>`. |
| `keyup` | native `KeyboardEvent` | Native `keyup` on the `<input>`. |
| `focus` | native `FocusEvent` | Native `focus` on the `<input>` (also sets internal focus state for the `n-focus` class). |
| `blur` | native `FocusEvent` | Native `blur` on the `<input>` (clears the focus state). |
| `button-click` | native `PointerEvent` | `pointerdown` on the icon-button part (only rendered when `icon` is set). **Not declared in the component's `emits` array** — see Gotchas. |
| `button-dblclick` | native `MouseEvent` | `dblclick` on the icon-button part. Also **not declared in `emits`**. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| none | — | `NInputView` never calls `this.slot(...)`. |

## Exposed methods

None. `NInputController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-input v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
```

## Realistic example

Adapted from `demos/overview.html` (type variants) and `demos/input/index.html` (icon-button + native-type toggle pattern, rewritten to the current `button-click` event since the demo's own `@icon-click` no longer exists in source — see Gotchas):

```vue
<template>
  <n-form :form="form">
    <n-form-item label="Name">
      <n-input v-model="form.name" type="primary" placeholder="Fill me" />
    </n-form-item>

    <n-form-item label="Disabled">
      <n-input v-model="form.name" :disabled="true" />
    </n-form-item>

    <n-form-item label="Password">
      <n-input
        v-model="form.password"
        :native-type="nativeType"
        :icon="icon"
        @button-click="toggleNativeType"
      />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

const form = reactive({ name: '', password: '' });
const nativeType = ref('password');
const icon = computed(() => nativeType.value === 'text' ? 'fa fa-eye-slash' : 'fa fa-eye');

function toggleNativeType() {
  nativeType.value = nativeType.value === 'text' ? 'password' : 'text';
}
</script>
```

## Required composition

None required — standalone. Optional: can be placed inside `NButtonGroup` (confirmed composition pairing) to render alongside buttons as a segmented control-style group.

## Common mistakes

- Setting `labelPosition` to anything other than `'before'`/`'after'`: the label silently never renders, even with a non-empty `label` prop — it's an open string but only those two literal values are branch-matched in the view.
- Binding `@icon-click` (seen in the older `demos/input/index.html` demo file): this event does not exist in the current source. The actual events are `button-click` / `button-dblclick`.
- Expecting `iconDisabled` to disable the icon-button's clickability on `NInput`: it's not read anywhere in this component's Controller/View — it has no confirmed effect here (see UNVERIFIED note in Props).
- Expecting `modelValue` to stay a `Number` when bound to numeric data: the native `<input>` always emits `e.target.value`, a `string`; use `NInputNumber` if you need numeric coercion.

## Gotchas

- `button-click` and `button-dblclick` are emitted via `scope.emit(...)` but are **not** listed in `NInput`'s `emits: [...]` array. They still work when bound with `@button-click`/`:on-button-click`, because Vue resolves emit-to-listener by matching `onButtonClick`/`onButtonDblclick` against whatever is declared as a prop (which `NInput.ts` does explicitly) — but this is easy to miss since the emits array undersells the component's real event surface.
- The icon/button part only renders at all when `icon` is non-empty (`Mix.isEmpty(data.icon)` guard) — setting only `onButtonClick`/`iconPosition` without an `icon` value produces no visible button and no way to trigger `button-click`.
- The built-in clear (`×`) button only shows when `clearable` is true **and** the current model value is non-empty (`ProtoView.clear(value)`); it is unrelated to `disabled`.

## Related components

`NInputNumber` (numeric variant with stepper), `NInputFile` (file selection variant), `NTextarea` (multi-line variant), `NFormItem` (form-layout wrapper providing labels/validation/`superDisabled` context).
