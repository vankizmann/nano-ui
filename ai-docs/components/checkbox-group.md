# NCheckboxGroup

A container that tracks which of its child `NCheckbox` items are checked as a single array `v-model`, and provides aggregate "all checked"/"some checked" state for a "check all" checkbox.

## Import / Registration

Registered globally by `src/checkbox/index.ts` (`App.component(NCheckboxGroup.name, NCheckboxGroup)`). Source: `src/checkbox/js/checkbox-group/{NCheckboxGroup,NCheckboxGroupController,NCheckboxGroupData,NCheckboxGroupView}.ts`. `NCheckboxGroupController extends GroupController` (see concepts.md) for `childs`/`append`/`remove`, and `provide('NCheckboxGroup', this.instance)` so children can `inject` it.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | Not read directly by `NCheckboxGroupData`, but flows through `classRoot()` as `n-size-{size}` on the group root — children read their own `size` prop independently. |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Same as above — styles the group root only. |
| `align` | `String`, validated in `['horizontal','vertical']` | `'horizontal'` | `Props.AlignHorizontal` (`AlignProps.ts`) | Layout direction of the children; adds a `{bem}--{align}` class. |
| `modelValue` | `Array` | `() => []` | local (`NCheckboxGroup.ts`) | The array of checked children's `value`s. This **is** the group-level v-model — array type, not boolean. |
| `view` | `String` (known: `'checkbox'`, `'button'`) | `'checkbox'` | local (`NCheckboxGroup.ts`) | Visual style, applied to every child (children's own `view` prop is overridden — see `checkbox.md` Gotchas). |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `any[]` | `NCheckboxGroupController.superToggle(child)` (a non-global child checkbox was clicked — value added/removed via `Arr.toggle`), or `superGlobal()` (the `global` checkbox was clicked — either all children's values are added, or the array is cleared to `[]`). |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The child `NCheckbox` items. |

## Exposed methods

`ncx.pass({ global: 'superGlobal', toggle: 'superToggle' })`:

- `.global()` — no arguments; runs the same check-all/uncheck-all logic as clicking a `global` child checkbox. Practically callable from a template ref.
- `.toggle(child)` — expects an actual child `NCheckboxController` instance (as produced internally via `ncx('...')`); not practically callable from outside the library's own render tree. Prefer a child `NCheckbox`'s own exposed `.toggle()` (see `checkbox.md`) to toggle one item programmatically.

Additionally, via `exposeData('checked')` / `exposeData('intermediate')`, a template ref on the group exposes two **reactive values** (not methods):

- `checked: boolean` — `Arr.lengths(model, childs)` <!-- UNVERIFIED: exact boolean semantics of pico-js's `Arr.lengths` helper not confirmed from this repo's source; behaviorally it is used as "are all registered children checked" (compared against the checked/unchecked icon and `n-checked` class on the `global` checkbox). --> — true once every registered child is checked.
- `intermediate: boolean` — `!Mix.isEmpty(model)`, i.e. true whenever the array is non-empty (at least one child checked, including the all-checked case).

## Minimal example

```vue
<template>
  <n-checkbox-group v-model="selected">
    <n-checkbox value="foo">Foo</n-checkbox>
    <n-checkbox value="bar">Bar</n-checkbox>
  </n-checkbox-group>
</template>

<script setup>
import { ref } from 'vue';
const selected = ref([]);
</script>
```

## Realistic example

Modeled on `demos/checkbox/index.html` (vertical group with a "check all" checkbox) and `demos/overview.html`'s button-view variant:

```vue
<template>
  <n-checkbox-group align="vertical" v-model="form.options">
    <n-checkbox :global="true">Check all</n-checkbox>
    <n-checkbox value="foo">Foo</n-checkbox>
    <n-checkbox value="bar">Bar</n-checkbox>
    <n-checkbox value="james">James</n-checkbox>
    <n-checkbox value="bond">Bond</n-checkbox>
  </n-checkbox-group>

  <n-checkbox-group align="horizontal" view="button" v-model="form.options">
    <n-checkbox :global="true">Check all</n-checkbox>
    <n-checkbox value="foo">Foo</n-checkbox>
    <n-checkbox value="bar">Bar</n-checkbox>
  </n-checkbox-group>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ options: [] });
</script>
```

## Required composition

Must contain `NCheckbox` children to be useful (an empty group just renders an empty wrapper `div`). Per the confirmed composition rule: `NCheckboxGroup` may only contain `NCheckbox` — nesting any other component as a direct child is not a supported pattern (no other component reads/provides the `NCheckboxGroup` inject key).

## Common mistakes

- Binding `v-model` to a boolean, matching the mental model of a single checkbox: `NCheckboxGroup`'s `modelValue` is always an **array** of the checked children's `value`s, default `[]`.
- Expecting the group's `size`/`type` props to cascade into each child's own styling automatically: they only style the group's own root element (`classRoot()` on `NCheckboxGroupData`) — each `NCheckbox` child still needs its own `size`/`type` if per-item styling is desired (only `view` is actually forced from parent to child, per `NCheckboxData.view`).
- Calling the group's exposed `.toggle()` directly expecting to pass a checkbox's `value`: it expects a live child controller instance, not a value — use the child checkbox's own `.toggle()` instead, or `.global()` for check-all/none.

## Gotchas

- The group's `view` prop is inherited by every child regardless of what `view` the child itself declares (see `checkbox.md` Gotchas: `NCheckboxData.view` prefers `ncx('group')?.data.view`).
- `checked`/`intermediate` (exposed via `exposeData`) are the same aggregate values a `global` child checkbox links to (`linkProp`) — if you don't want a visible "check all" checkbox but want the aggregate state (e.g. for a custom header), read these off a template ref instead of adding a `global` `NCheckbox`.

## Related components

- `NCheckbox` — the required child; see `checkbox.md` for the two Controller variants (`global` vs. default).
- `NRadioGroup` — mutually-exclusive counterpart; see `radio-group.md`.
