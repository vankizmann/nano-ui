# NForm

The root form container: tracks a bound `form` data object, auto-computes validation `checks`/`messages` for every registered `NFormItem`, and merges in server-side `errors`.

## Import / Registration

Registered globally by `src/form/index.ts`:

```ts
App.component('NForm', NForm);
```

Source: `src/form/js/form/NForm.ts` (+ `NFormController.ts`, `NFormData.ts`, `NFormView.ts`). `NFormController extends GroupController` (not plain `ProtoController`) — it tracks a reactive `childs` list of every mounted `NFormItem` via `append(child)`/`remove(child)` (called from `NFormItemController.onMounted`/`onUnmounted`). See `ai-docs/concepts.md` for the shared Controller/Data/View pattern and `GroupController`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Adds `n-load` via `ProtoData.classRoot()`. |
| `size` | `String` | `null` | `Props.Size` (`BaseProps.ts`) | Open string. Known styled values: `xs`, `sm`, `md`, `lg`, `xl`. |
| `type` | `String` | `null` | `Props.Type` (`BaseProps.ts`) | Open string. Known styled values: `primary`, `secondary`, `info`, `warning`, `danger`, `success`. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Adds `n-disabled` via `superDisabled`/`classRoot()`. Not otherwise read by `NFormController`/`NFormData` — it does not itself force-disable descendant inputs (each input reads its own `superDisabled`, which only checks a *direct* `NFormItem` ancestor's `modelValue`, not `NForm.disabled` — see `ai-docs/concepts.md`'s `ProtoData.superDisabled`). |
| `align` | `String`, validated in `['horizontal','vertical']` | `'vertical'` | `Props.AlignVertical` (`AlignProps.ts`) | Pushes a `{bem}--{align}` class (`NFormData.classList`). `src/form/css/form-item.scss` styles `.n-form--vertical .n-form-item` / `.n-form--horizontal .n-form-item` (label-above vs. label-beside layout). |
| `form` | `Object` | `null` | `NForm.ts` (own) | The bound form-data object. Deep-watched (`watchProp('form', ...)`) — every nested mutation re-runs `compareChange()` (dirty tracking) and `extractChecks()` (re-validates every registered `NFormItem` against its `rules`). This is what rule modules read via `Obj.get(scope.data.form, field.data.prop)`. |
| `dirty` | `Boolean` | `false` | `NForm.ts` (own) | Local copy via `cloneProp('dirty')`. Auto-flips to `true` the first time the `form` object's content hash changes from its initial value (`NFormController.compareChange()`, hashed with `Hash.object`). Emits `update:dirty` — see Events. |
| `errors` | `Object` | `null` | `NForm.ts` (own) | Server/manual errors, merged into the auto-computed `checks`. Shape: `{ [prop: string]: string \| string[] }` — see "The `messages`/`checks`/`errors` merge" below. |
| `nativeType` | `String` | `'div'` | `NForm.ts` (own) | The native element tag rendered as root (`h(data.native, ...)`, `NFormView.default()`). Set to `'form'` to get a real `<form>` element; nothing in `NFormController`/`NFormView` currently attaches a `submit` DOM listener to it regardless of tag — see Gotchas. |
| `kind` | `String` | `'classic'` | `NForm.ts` (own) | Pushes a `{bem}--{kind}` class. Confirmed styled values from `src/form/css/form-group.scss`: `classic`, `fieldset`. `NFormGroup.kind` falls back to this value when its own `kind` prop is unset (`NFormGroupData.superKind`). |
| `square` | `Boolean` | `false` | `NForm.ts` (own) | <!-- UNVERIFIED / dead prop: declared here but never read by NFormController, NFormData, or NFormView, and not part of any inherited BaseData/IconData getter. No visible effect as of this commit. --> |

There is no `rules` prop on `NForm` itself — validation rules are declared per-field on `NFormItem` (see `ai-docs/components/form-item.md`'s "Validation rules" section for the full `rules` shape and every `NFormRule*` module).

### The `messages`/`checks`/`errors` merge

- `data.checks` — auto-computed by `NFormController.extractChecks()` (runs whenever `form` changes): for every registered child `NFormItem`, runs `NFormRuleHandler.test(this, child)` against that field's `rules` prop and the current value at `Obj.get(form, child.data.prop)`, collecting failing rules' messages into `checks[prop] = string[]`. Entries with zero messages are filtered out (`Obj.filter(checks, v => v.length > 0)`).
- `data.messages` — `NFormController.getMessages()`: clones `data.checks`, then for every key in the `errors` prop, merges (`Arr.merge`) the errors prop's value (coerced to an array via `Arr.all`) onto any existing rule-check messages for that same key. This is what `NFormItemView.error()` and `NFormBagView` read to display per-field error text.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:dirty` | `boolean` | Standard v-model write path (`ProtoController.update('dirty', ...)`), fired from `NFormController.compareChange()` the first time the `form` prop's content hash diverges from its initial value (only while `data.dirty` is still `false` and `data.form` is truthy). |
| `submit` | — | <!-- UNVERIFIED / dead emit: declared in `emits: ['update:dirty', 'submit']` on `NForm.ts`, but no call site anywhere in `NFormController`/`NFormView` (or elsewhere in `src/`) actually does `this.emit('submit')`, and no native `submit` DOM listener is attached to the rendered root element regardless of `nativeType`. Treat as currently non-functional/reserved rather than a working submit hook. --> |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The form body — `NFormItem`/`NFormGroup`/`NFormFrame`/`NFormBag`/arbitrary content (`NFormView.default()`: `this.slot('default')`). |

## Exposed methods

None. `NForm.ts`'s `setup()` never calls `ncx.pass(...)` (contrast with e.g. `NModal.ts`'s `ncx.pass({ open: 'superOpen', close: 'superClose' })`), so a template ref on `<n-form ref="formRef">` does **not** get a `validate()`/`submit()`-style method. `NFormController` does define `gotoFirstError()` (scrolls/opens the first field with a validation message, via `child.superView()`) and `getMessages()`, but neither is called from anywhere else in `src/` and neither is exposed to a template ref — they are effectively internal/dead from a public-API standpoint as of this commit. Validation itself needs no manual trigger: it recomputes automatically and reactively (see the `form` prop's deep-watch above) as the bound `form` object's fields change.

## Minimal example

```vue
<template>
  <n-form :form="form">
    <n-form-item label="Name">
      <n-input v-model="form.name" />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ name: '' });
</script>
```

## Realistic example

Adapted from `demos/form.html` (real prop usage: `kind`, `errors`, `rules` array strings):

```vue
<template>
  <n-form kind="fieldset" :form="form" :errors="{ email: 'Already taken' }">
    <n-form-item prop="email" label="Email" :rules="['required', 'email']">
      <n-input v-model="form.email" />
    </n-form-item>

    <n-form-item prop="password" label="Password" :rules="['required', 'minlength:8']">
      <n-input v-model="form.password" type="password" />
    </n-form-item>

    <n-form-item prop="confirm" label="Confirm password" :rules="['same:password']">
      <n-input v-model="form.confirm" type="password" />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  email: '', password: '', confirm: '',
});
</script>
```

Any failing rule (or the `errors.email` entry) surfaces automatically under the corresponding `NFormItem` — no manual validate call is needed.

## Required composition

None — `NForm` is the root/ancestor component. `NFormItem` works both nested inside it and standalone (see `ai-docs/components/form-item.md`); `NFormBag`, `NFormGroup`, and `NFormFrame` each expect `NForm` somewhere above them in the tree (not necessarily as a direct parent — resolved via Vue `provide`/`inject`, `provide('NForm', this.instance)` here).

## Common mistakes

- **Expecting a `validate()`/`submit()` method on a template ref.** There isn't one — see Exposed methods. Read `form.checks`/`form.messages`-equivalent state reactively (there is no direct prop exposing `data.messages` outward either; it is only consumed internally by `NFormItem`/`NFormBag`) or gate your own submit handler on whatever validity signal your app tracks.
- **Listening for `@submit`.** The declared `submit` emit is never fired by the component — see Events.
- **Passing a non-reactive plain object as `form`.** `watchProp('form', ...)` deep-watches it; if it's not reactive (not created with `reactive()`/`ref()`), mutations won't be observed and `checks`/`dirty` won't update.
- **Forgetting `prop` on `NFormItem`.** Rules and error-message lookups are keyed by `NFormItem`'s `prop`, which must match a real key path on `form` (`Obj.get(scope.data.form, field.data.prop)`); an `NFormItem` with no `prop` never participates in validation or `errors` display.

## Gotchas

- Every `ProtoController` (every component in the tree, not just form components) runs `injectRef(['form-item', 'NFormItem'])` in its own `setup()` — this is unrelated to `NForm`'s own `provide('NForm', ...)`/`injectRef(['form', 'NForm'])` pair, but it's the mechanism that makes any input's `superDisabled` getter check its nearest `NFormItem` ancestor's `modelValue` (see `ai-docs/concepts.md`). `NForm` itself does not participate in that specific chain — only `NFormItem` provides `'form-item'`.
- `dirty` is a one-way ratchet in this version: `compareChange()` only ever flips it from `false` to `true` (`if (data.dirty || !data.form) return;` short-circuits once dirty is already true), and only compares against the hash captured the first time `compareChange()` ran. There is no built-in way to reset `dirty` back to `false` other than writing to it yourself via `v-model:dirty`.
- `nativeType: 'form'` gives you a real `<form>` element, but combined with the dead `submit` emit (see Events) you'll still need your own native `@submit.prevent` handling strategy — nothing in `NForm` calls `preventDefault()` or emits on a native submit event.

## Related components

- `NFormItem` (`ai-docs/components/form-item.md`) — the field wrapper `NForm` tracks in `childs`; owns the `rules` prop and per-field error display.
- `NFormGroup` (`ai-docs/components/form-group.md`) — collapsible/legend-style section grouping, reads `NForm.kind` as a style fallback.
- `NFormFrame` (`ai-docs/components/form-frame.md`) — scrollable layout shell with a jump-to-section sidebar built from `NFormGroup` children.
- `NFormBag` (`ai-docs/components/form-bag.md`) — renders a flat list of every current validation message across all registered `NFormItem`s, typically inside an `NPopover`.
