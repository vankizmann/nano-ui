# NCheckbox

A single boolean (or grouped/"select-all") checkbox — usable standalone with its own `v-model`, or nested inside `NCheckboxGroup` to toggle membership in a shared array.

## Import / Registration

Registered globally by `src/checkbox/index.ts` (`App.component(NCheckbox.name, NCheckbox)`), alongside `NCheckboxGroup` from the same group index. Source: `src/checkbox/js/checkbox/{NCheckbox,NCheckboxController,NCheckboxControllerGlobal,NCheckboxControllerSingle,NCheckboxData,NCheckboxView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | See concepts.md "Type and Size are open strings". |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Same open-string rule. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Adds the `n-disabled` class (via `classRoot`/`superDisabled`) — see Gotchas, it does **not** block clicks by itself. |
| `modelValue` | `[Number, Boolean]` | `false` | local (`NCheckbox.ts`) | The checked state when the checkbox is used standalone (or with `global`, is read-only — see Controller fork below). |
| `value` | `[Number, Boolean, String]` | `null` | local (`NCheckbox.ts`) | The value this checkbox represents inside an `NCheckboxGroup`'s array. Ignored when the checkbox is standalone. |
| `allowUncheck` | `Boolean` | `false` | local (`NCheckbox.ts`) | When the checkbox is both checked and `disabled`, this removes the `n-disabled` class (see `NCheckboxData.classList`) so it still reads as interactive — see Gotchas for what this does and doesn't actually gate. |
| `global` | `Boolean` | `false` | local (`NCheckbox.ts`) | Selects which Controller class is instantiated — see Controller fork below. This is the "check all / uncheck all" checkbox for a group. |
| `view` | `String` (known: `'checkbox'`, `'button'` — confirmed via `n-checkbox--button` in `themes/default/checkbox/src/checkbox/checkbox.scss`) | `'checkbox'` | local (`NCheckbox.ts`) | Visual style. **Ignored when nested inside an `NCheckboxGroup`** — the group's own `view` prop always wins (see Gotchas). |

## Controller fork (important)

`NCheckbox.ts`'s `setup()` picks the Controller class at instantiation time based on the `global` prop:

```ts
let name : any = NCheckboxControllerSingle;
if ( props.global ) { name = NCheckboxControllerGlobal; }
let ncx = new name(props, context);
```

- **`global: false` (default) → `NCheckboxControllerSingle`.** `modelValue` is a local reactive clone (`cloneProp('modelValue')`) — the checkbox owns its own state and works with no ancestor group at all. If an ancestor `NCheckboxGroup` *is* found (via `injectRef(['group','NCheckboxGroup'])`), it additionally: registers itself with the group (`onMounted` → `group.append(this)`), derives its own `modelValue` from whether the group's array contains this checkbox's `value` (`watchModel`/`updateModel`, using `Arr.has`), and on click (`superToggle`) both tells the group to add/remove its value (`group.superToggle(this)`, which updates the group's array and emits the **group's** `update:modelValue`) *and* flips its own local `modelValue` (emitting its **own** `update:modelValue` too).
- **`global: true` → `NCheckboxControllerGlobal`.** Requires an ancestor `NCheckboxGroup` — `setup()` throws `Error('NCheckboxGroup is required on global!')` if `injectRef` finds none. Its `modelValue` and `intermediate` are **read-only computed aliases** (`linkProp`) to the group's own `checked`/`intermediate` state (see `checkbox-group.md`) — clicking it never calls `this.update('modelValue', ...)` on itself; it only calls `this.ncx('group').superGlobal()`, which recomputes the group's array (checking all children, or clearing it) and emits `update:modelValue` **on the group**. A `global` checkbox therefore never fires its own `update:modelValue` — don't wire a `v-model` to it.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `boolean` | **Single controller only.** `NCheckboxControllerSingle.superToggle()` runs on click, flipping the local boolean via `this.update('modelValue', !this.data.model)`. Declared in `emits` for both controller variants, but the Global variant never actually calls `update()` on itself (see Controller fork above) — only the parent `NCheckboxGroup` emits in that case. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | Rendered inside `.n-checkbox__label`, next to the checkbox box — the visible label text. |

## Exposed methods

`ncx.pass({ toggle: 'superToggle' })` — a template ref exposes `.toggle()`, which runs the exact same logic as a click (flips state and, if grouped, notifies the group). Works with no arguments for both controller variants.

## Minimal example

```vue
<template>
  <n-checkbox v-model="checked">Accept terms</n-checkbox>
</template>

<script setup>
import { ref } from 'vue';
const checked = ref(false);
</script>
```

## Realistic example

Modeled on `demos/checkbox/index.html` and the `NCheckbox` section of `demos/overview.html` (standalone usage plus a group with a `global` "check all" checkbox):

```vue
<template>
  <n-checkbox v-model="form.option" size="md" type="primary" :allow-uncheck="true">
    Enable notifications
  </n-checkbox>

  <n-checkbox-group v-model="form.options" align="vertical">
    <n-checkbox :global="true">Check all</n-checkbox>
    <n-checkbox value="foo">Foo</n-checkbox>
    <n-checkbox value="bar">Bar</n-checkbox>
    <n-checkbox value="james">James</n-checkbox>
    <n-checkbox value="bond">Bond</n-checkbox>
  </n-checkbox-group>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ option: false, options: [] });
</script>
```

## Required composition

None — `NCheckbox` works standalone with its own `v-model`. Optionally nested inside `NCheckboxGroup` for group-array behavior. **Exception:** an `NCheckbox` with `global="true"` requires an ancestor `NCheckboxGroup` and throws at setup otherwise (see Controller fork).

## Common mistakes

- Assuming every `NCheckbox` inside a group needs its own `v-model`: inside `NCheckboxGroup`, checked state is derived from whether the group's array contains this checkbox's `value` prop — a separate `v-model` on the child is redundant (though harmless for the Single controller, since it mirrors the derived state).
- Using `global="true"` on a checkbox with no surrounding `NCheckboxGroup`, expecting it to just act as a normal checkbox — it throws `NCheckboxGroup is required on global!` at setup instead.
- Wiring `v-model="x"` onto a `global` checkbox expecting it to reflect/control that variable directly — its `modelValue` is a read-only alias to the group's aggregate `checked` state; it never emits its own `update:modelValue`.
- Setting `view="button"` on an individual `NCheckbox` that lives inside an `NCheckboxGroup` and expecting it to render as a button: the group's `view` prop always wins for grouped children (see Gotchas).

## Gotchas

- **`disabled` is styling-only in the shipped theme.** `NCheckboxView.default()` binds `onClick` unconditionally (no guard for `data.disabled`/`superDisabled`); disabling only adds the `n-disabled` class via `classRoot()`. `themes/default/checkbox/src/checkbox/checkbox.scss` has no `pointer-events` rule, so a disabled checkbox is still clickable/toggleable in JS unless the consuming app's own CSS blocks pointer events.
- `allowUncheck` interacts with the point above: it only removes the `n-disabled` class when the checkbox is checked (`NCheckboxData.classList`) — it doesn't change click behavior (which was never blocked to begin with). Its practical effect is purely visual: an already-checked, disabled checkbox no longer *looks* disabled.
- **`view` is decided by the parent when grouped.** `NCheckboxData.view` getter: `this.scope.ncx('group')?.data.view || this.scope.get('view')` — if an ancestor `NCheckboxGroup` exists, its `view` prop is used regardless of what this checkbox's own `view` prop says.
- Global checkbox's own icon reflects the group's "all checked" boolean (`data.model`, aliased to the group's `checked`), and its `n-intermediate` class reflects the group's `intermediate` state (true whenever the group's array is non-empty) — both classes can be present simultaneously (e.g. when all items are checked, `checked` and non-empty are both true).

## Related components

- `NCheckboxGroup` — the container that gives `value`/`global` meaning; see `checkbox-group.md`.
- `NRadio`/`NRadioGroup` — mutually-exclusive counterpart; see `radio.md`/`radio-group.md`.
