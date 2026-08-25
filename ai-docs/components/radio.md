# NRadio

A single option within an `NRadioGroup` — mutually exclusive selection. Unlike `NCheckbox`, it cannot be used standalone.

## Import / Registration

Registered globally by `src/radio/index.ts` (`App.component(NRadio.name, NRadio)`), alongside `NRadioGroup` from the same group index. Source: `src/radio/js/radio/{NRadio,NRadioController,NRadioData,NRadioView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | See concepts.md "Type and Size are open strings". |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Same open-string rule. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Adds the `n-disabled` class — see Gotchas, it does **not** block clicks by itself. |
| `value` | `[String, Number, Boolean]` | `'undefined'` (the literal string, **not** JS `undefined` — see Gotchas) | local (`NRadio.ts`) | The value this radio represents; compared against the group's `modelValue` with strict `===` to determine `n-checked`. |
| `view` | `String` (known: `'checkbox'`, `'button'` — confirmed via `n-radio--button` in `themes/default/radio/src/radio/radio.scss`) | `'checkbox'` | local (`NRadio.ts`) | Declared but effectively dead when used correctly — see Gotchas (`NRadio` always has a group, so the group's `view` always wins). |

**Note:** `NRadio` does **not** declare its own `modelValue` prop at all — see Events below.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | declared in `emits: ['update:modelValue']`, but **`NRadio` never actually calls `this.update('modelValue', ...)` on itself.** | Selection is driven by `NRadioController.superApply()`, which calls `this.ncx('group').superApply(this)` — the **group** (`NRadioGroupController.superApply(child)`) is what calls `this.update('modelValue', child.data.value)` and emits `update:modelValue`. Bind `v-model` to `NRadioGroup`, not to individual `NRadio`s. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | Rendered inside `.n-radio__label`, next to the radio dot — the visible label text. |

## Exposed methods

`ncx.pass({ apply: 'superApply' })` — a template ref exposes `.apply()` (no arguments), which selects this radio exactly as a click would (tells the group to set its `modelValue` to this radio's `value`).

## Minimal example

```vue
<template>
  <n-radio-group v-model="selected">
    <n-radio value="foo">Foo</n-radio>
    <n-radio value="bar">Bar</n-radio>
  </n-radio-group>
</template>

<script setup>
import { ref } from 'vue';
const selected = ref('');
</script>
```

*(`NRadio` cannot be rendered outside an `NRadioGroup` — see Required composition.)*

## Realistic example

Modeled on `demos/radio/index.html` and the `NRadio` section of `demos/overview.html`:

```vue
<template>
  <n-radio-group v-model="form.option" size="md" type="primary" align="vertical">
    <n-radio value="test1">Foobar 1</n-radio>
    <n-radio value="test2">Foobar 2</n-radio>
    <n-radio value="test3">Foobar 3</n-radio>
    <n-radio value="test4">Foobar 4</n-radio>
  </n-radio-group>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ option: 'test1' });
</script>
```

## Required composition

**`NRadio` cannot stand alone.** `NRadioController.setup()` calls `injectRef(['group', 'NRadioGroup'])` and throws `Error('NRadioGroup is required in radio!')` if no ancestor `NRadioGroup` provides that inject key. It must always be a child of `NRadioGroup`.

## Common mistakes

- Rendering a bare `<n-radio value="x">Foo</n-radio>` outside of `<n-radio-group>`, expecting it to behave like a standalone toggle (as `NCheckbox` can) — it throws at setup instead.
- Putting `v-model` on individual `<n-radio>` elements: `NRadio` has no `modelValue` prop of its own; the v-model belongs on the parent `NRadioGroup`.
- Omitting `value` on an `<n-radio>` and expecting it to be selectable by binding the group's model to `undefined`: the prop's actual default is the *string* `'undefined'`, not the JS value `undefined` — a group `modelValue` of real `undefined` will never strictly-equal it.

## Gotchas

- **`disabled` is styling-only in the shipped theme**, same as `NCheckbox`: `NRadioView.default()` binds `onClick` unconditionally; `themes/default/radio/src/radio/radio.scss` has no `pointer-events` rule, so a "disabled" radio is still clickable in JS unless the app's own CSS enforces it.
- **The `view` prop on `NRadio` is effectively dead code in normal usage.** `NRadioData.view` getter: `this.scope.ncx('group')?.data.view || this.scope.get('view')`. Since `NRadio` always requires a group (throws otherwise), `ncx('group')` is always present, so the group's `view` always wins — an individual radio's own `view` prop can never take effect.
- `value`'s default is the literal string `'undefined'` (`type: [String,Number,Boolean], default: 'undefined'`), not the JS `undefined` value — worth being explicit about this in generated code since it reads like a typo but is the real declared default.
- Checked-state comparison (`this.model === this.value` in `NRadioData.classList`) is strict `===`, so a group `modelValue` of `'1'` (string) will not mark a radio with `:value="1"` (number) as checked.

## Related components

- `NRadioGroup` — required parent; owns the actual `modelValue`/`update:modelValue`. See `radio-group.md`.
- `NCheckbox`/`NCheckboxGroup` — non-exclusive counterpart that, unlike `NRadio`, can stand alone. See `checkbox.md`/`checkbox-group.md`.
