# NRadioGroup

The container and single source of truth for a mutually-exclusive set of `NRadio` options.

## Import / Registration

Registered globally by `src/radio/index.ts` (`App.component(NRadioGroup.name, NRadioGroup)`). Source: `src/radio/js/radio-group/{NRadioGroup,NRadioGroupController,NRadioGroupData,NRadioGroupView}.ts`. `NRadioGroupController extends GroupController` (see concepts.md), and `provide('NRadioGroup', this.instance)` so children can `inject` it — required, since every `NRadio` throws without it.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | Styles the group root only (`classRoot()`); not read directly by `NRadioGroupData`. Children read their own `size` prop independently. |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Same as above — group root only. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Styles the group root via `superDisabled`/`classRoot()`; each child `NRadio` still has its own separate `disabled` prop (not cascaded). |
| `align` | `String`, validated in `['horizontal','vertical']` | `'horizontal'` | `Props.AlignHorizontal` (`AlignProps.ts`) | Layout direction of the children; adds a `{bem}--{align}` class. |
| `modelValue` | `[String, Number, Boolean]` | `''` | local (`NRadioGroup.ts`) | The selected value — this is the actual v-model; individual `NRadio`s only read it via a linked alias (see `radio.md`). |
| `view` | `String` (known: `'checkbox'`, `'button'`) | `'checkbox'` | local (`NRadioGroup.ts`) | Visual style, applied to every child (a child's own `view` prop is always overridden — see `radio.md` Gotchas). |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `string \| number \| boolean` (whatever the selected child's `value` is) | `NRadioGroupController.superApply(child)` runs — triggered when any child `NRadio` is clicked (`NRadioController.superApply()` → `ncx('group').superApply(this)`) or its exposed `.apply()` is called directly. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The child `NRadio` items. |

## Exposed methods

`ncx.pass({ apply: 'superApply' })` — a template ref exposes `.apply(child)`, but it expects an actual child `NRadioController` instance (as obtained internally via `ncx('...')`), not a plain value — not practically callable from outside the library's own render tree. To select an option programmatically, prefer a specific `NRadio`'s own exposed `.apply()` (see `radio.md`, which takes no arguments), or simply set the group's `v-model` value directly.

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

## Realistic example

Modeled on `demos/radio/index.html` and `demos/overview.html`'s button/vertical variants:

```vue
<template>
  <n-radio-group v-model="form.option" size="md" type="primary" align="vertical">
    <n-radio value="test1">Foobar 1</n-radio>
    <n-radio value="test2">Foobar 2</n-radio>
    <n-radio value="test3">Foobar 3</n-radio>
    <n-radio value="test4">Foobar 4</n-radio>
  </n-radio-group>

  <n-radio-group v-model="form.option" view="button" align="horizontal">
    <n-radio value="test1">Foobar 1</n-radio>
    <n-radio value="test2">Foobar 2</n-radio>
  </n-radio-group>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ option: 'test1' });
</script>
```

## Required composition

Must contain `NRadio` children — an `NRadio` cannot exist outside of it (throws at setup), and per the confirmed composition rule, `NRadioGroup` may only contain `NRadio` (no other component reads/provides the `NRadioGroup` inject key). An empty `NRadioGroup` renders but has nothing selectable.

## Common mistakes

- Expecting the group's `disabled` prop to cascade and disable every child `NRadio`: it only styles the group's own root — each `NRadio` needs its own `disabled` prop set individually.
- Trying to call the group's exposed `.apply(child)` with a plain value (e.g. `groupRef.apply('foo')`) to select an option: it expects a live child controller instance. Set `form.option = 'foo'` directly, or call the specific child radio's own `.apply()` instead.
- Initializing `modelValue` to `null`/`undefined` and expecting the first radio to show as selected: the declared default is an empty string `''`, and selection is strict-`===` against each child's `value` — no radio is selected until the model matches a real child value.

## Gotchas

- The group's `view` prop is inherited by every child regardless of what `view` each child declares — see `radio.md` Gotchas (`NRadioData.view` prefers `ncx('group')?.data.view`, and since a group is mandatory, the child's own `view` prop is unreachable in practice).
- Because `NRadio` requires a group to even mount, all of the actual `update:modelValue` traffic for this pair originates from `NRadioGroupController`, not from any `NRadio` instance — despite `NRadio.ts` also declaring `emits: ['update:modelValue']` (dead declaration, see `radio.md`).

## Related components

- `NRadio` — the required child; see `radio.md`.
- `NCheckboxGroup`/`NCheckbox` — non-exclusive counterpart, and unlike this pair, `NCheckbox` can stand alone outside `NCheckboxGroup`. See `checkbox-group.md`/`checkbox.md`.
