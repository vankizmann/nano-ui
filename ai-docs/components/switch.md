# NSwitch

A toggle switch bound via `v-model`, switching its `modelValue` between an `onValue` and an `offValue`.

## Import / Registration

Registered globally by `src/switch/index.ts` as `NSwitch` (`App.component(NSwitch.name, NSwitch)`). Source: `src/switch/js/switch/{NSwitch,NSwitchController,NSwitchData,NSwitchView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | Size modifier, see concepts.md "Type and Size are open strings". |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Disables toggling (subject to `superDisabled`, see concepts.md). |
| `modelValue` | `[Number, Boolean, String, Object]` | `false` | `NSwitch.ts` (own prop) | The v-model value. Confirmed in source exactly as concepts.md states. Compared to `onValue`/`offValue` with strict `===`. |
| `onType` | `String` | `null` | `NSwitch.ts` (own prop) | Open string (same built-in set as `type`: `primary/secondary/info/warning/danger/success`). When set and the switch is "on", adds an `n-type-{onType}` class instead of the default on-color. |
| `offType` | `String` | `'default'` | `NSwitch.ts` (own prop) | Same open-string set. Adds `n-type-{offType}` class when the switch is "off". Note the default is the literal string `'default'`, not `null`. |
| `onValue` | `[Number, Boolean, String, Object]` | `true` | `NSwitch.ts` (own prop) | The value `modelValue` is set to when toggled on. |
| `offValue` | `[Number, Boolean, String, Object]` | `false` | `NSwitch.ts` (own prop) | The value `modelValue` is set to when toggled off. |
| `inline` | `Boolean` | `true` | `NSwitch.ts` (own prop) | <!-- UNVERIFIED: declared as a prop but not read anywhere in NSwitchController/NSwitchData/NSwitchView, and no `n-inline`-style class or CSS rule references it in src/switch/css/switch.scss. Appears to currently have no effect; do not assume it toggles inline/block layout. --> |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | the new `onValue` or `offValue` | The root element is clicked, calling `NSwitchController.toggle()`, which flips `modelValue` between `onValue`/`offValue` via `this.update('modelValue', value)`. |

`toggle()` logic (`NSwitchController.ts`): if current model strictly equals `onValue`, next value is `offValue`; if it strictly equals `offValue`, next value is `onValue`; if it matches neither, it snaps to `onValue`. On `setup()`, `resetValue()` runs once and forces `modelValue` to `offValue` if the initial value matches neither `onValue` nor `offValue`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none (no scope object passed) | Rendered inside the `.n-switch__label` element next to the toggle control — the switch's label text (e.g. `<n-switch v-model="x">Enabled</n-switch>`). |

## Exposed methods

None. `NSwitchController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-switch v-model="enabled" />
</template>

<script setup>
import { ref } from 'vue';
const enabled = ref(false);
</script>
```

## Realistic example

Adapted from `demos/switch/index.html` and `demos/overview.html`, inside an `NForm`/`NFormItem`, with `size` and `on-type` variants:

```vue
<template>
  <n-form :form="form">
    <n-form-item label="Test">
      <n-switch v-model="form.test" />
    </n-form-item>

    <n-form-item label="Test">
      <n-switch v-model="form.test" size="sm" on-type="success" />
    </n-form-item>

    <n-form-item label="Test">
      <n-switch v-model="form.test" size="lg" on-type="warning" />
    </n-form-item>

    <n-form-item label="Test">
      <n-switch v-model="form.test" on-type="danger" />
    </n-form-item>

    <n-form-item label="Test">
      <n-switch v-model="form.test" on-type="info" />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ test: false });
</script>
```

## Required composition

None — standalone. Works inside `NForm`/`NFormItem` (as shown above) purely for form layout/`superDisabled` purposes, not as a requirement.

## Common mistakes

- Assuming `modelValue` must be boolean: it accepts `Number`/`Boolean`/`String`/`Object` and is matched against `onValue`/`offValue` with strict equality, so custom on/off values (e.g. `onValue="'active'"`, `offValue="'inactive'"`) work and are a supported pattern, not a hack.
- Passing an `onValue`/`offValue` pair by reference-typed object and expecting reactivity-friendly equality: comparisons are `===`, so two structurally-equal-but-different object references never match — `modelValue` would be reset to `offValue` by `resetValue()` on mount.
- Expecting `offType` to default to `null` like `onType`: it defaults to the literal string `'default'`.

## Gotchas

- `inline` prop exists but is not wired to any class or style in the current source — see the UNVERIFIED note in the props table.
- If the initial `modelValue` doesn't strictly match either `onValue` or `offValue`, `resetValue()` silently overwrites it to `offValue` on setup (no event emitted for this internal correction — only user toggles emit `update:modelValue`).
- The whole root `<div class="n-switch">` is the click target (`onClick` is bound at the root), not just the visual toggle knob — clicking the label text also toggles.

## Related components

None — NSwitch has no composition relationship with other components (see task scope: documented independently from NSlider).
