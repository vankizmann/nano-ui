# NFormItem

A single labeled field wrapper: renders a label, the default-slot input, an optional per-field validation error message, and (optionally) a toggle for making the field conditional/skippable.

## Import / Registration

Registered globally by `src/form/index.ts`:

```ts
App.component('NFormItem', NFormItem);
```

Source: `src/form/js/form-item/NFormItem.ts` (+ `NFormItemController.ts`, `NFormItemData.ts`, `NFormItemView.ts`). `NFormItemController extends ProtoController` directly (not `GroupController` — it has no `childs` of its own). See `ai-docs/concepts.md` for the shared Controller/Data/View pattern.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `modelValue` | `Boolean` | `true` | `NFormItem.ts` (own) | The field's enabled/visible state, only meaningful when `conditional: true` (see below). Local copy via `cloneProp('modelValue')`. **No explicit `emits` array is declared** on `NFormItem.ts` (unlike `NForm`/`NFormGroup`) — `update:modelValue` is still fired (via `ProtoController.update()`), just not statically declared, so `v-model` still works. |
| `rules` | `Array` | `() => []` | `NFormItem.ts` (own) | The field's validation rules — see "Validation rules" below for the exact shape and every available rule. |
| `conditional` | `Boolean` | `false` | `NFormItem.ts` (own) | When `false` (the default), `NFormItemController.setup()` force-sets `modelValue` to `true` on creation, and the label-row toggle control is never rendered. When `true`, the field renders an "Enable field"/"Disable field" toggle row (`NFormItemView.cond()`) that flips `modelValue` via `superToggle()`. |
| `label` | `String` | `null` | `NFormItem.ts` (own) | Rendered inside `{bem}__label`. |
| `prop` | `String` | `null` | `NFormItem.ts` (own) | The key path into the ancestor `NForm`'s `form` object this field validates/displays errors for (`Obj.get(form, prop)`). Required for `rules`/`errors` to do anything — see `ai-docs/components/form.md`. |
| `tooltip` | `String` | `null` | `NFormItem.ts` (own) | <!-- UNVERIFIED / dead prop: declared but never read by `NFormItemController`, `NFormItemData`, or `NFormItemView` in this commit — no tooltip is actually rendered for the label. `demos/form/index.html` (a legacy demo) passes `tooltip="Im a label tooltip"`, but against the current component that's a no-op falling through as a plain DOM attribute. --> |
| `conditionOn` | `String` | `null` | `NFormItem.ts` (own) | <!-- UNVERIFIED / dead prop: declared but never read anywhere in `src/form/`. --> |
| `conditionOff` | `String` | `null` | `NFormItem.ts` (own) | <!-- UNVERIFIED / dead prop: declared but never read anywhere in `src/form/`. --> |

`NFormItem` does **not** spread any `Props.*` mixins from `ai-docs/concepts.md`'s shared `Props` object — every prop above is its own declaration.

### Validation rules (`rules` prop)

Shape: `Array<string>`, each entry formatted as `"ruleKey"` or `"ruleKey:arg"` (a single colon-delimited argument — no rule currently takes more than one). Parsed in `NFormRuleHandler.test()` (`src/form/js/form-rules/NFormRuleHandler.ts`):

```ts
let [name, ...args] = rule.split(':');
// this.rules[name].validate(scope /* NFormController */, field /* NFormItemController */, value, ...args)
```

`value` is always `Obj.get(scope.data.form, field.data.prop)` — the field's current value read from the ancestor `NForm`'s `form` object. A rule "fails" when `validate(...)` returns falsy, and its `message(...)` return value is pushed into `NForm`'s `data.checks[prop]`. Re-evaluated automatically on every `form` mutation (see `ai-docs/components/form.md`) — no manual trigger needed.

New rules can be registered at runtime via `NFormRuleHandler.register(key, ruleModule)`.

Every rule module lives in `src/form/js/form-rules/module/`:

| Rule key | Module | Argument | Checks |
|---|---|---|---|
| `required` | `NFormRuleRequired.ts` | none | Passes if the value is boolean `true`, or (for non-booleans) not empty (`!Mix.isEmpty(value)`). |
| `required_if` | `NFormRuleRequiredIf.ts` | `key` — another field's `prop` | Looks up `target = form[key]`. If `target` is empty, or not "true-ish" (`!Mix.isTrue(target)`), the rule passes unconditionally (field not required). Otherwise falls through to the same check as `required` (boolean `true`, or non-empty). |
| `required_unless` | `NFormRuleRequiredUnless.ts` | `key` — another field's `prop` | Looks up `target = form[key]`. If `target` is **not** empty, or is "true-ish" (`Mix.isTrue(target)`), the rule passes unconditionally (field not required). Otherwise falls through to the `required` check. |
| `same` | `NFormRuleSame.ts` | `key` — another field's `prop` | Passes if `value === form[key]` (strict equality). Typical use: "confirm password" fields. |
| `diffrent` | `NFormRuleDiffrent.ts` | `key` — another field's `prop` | Passes if `value !== form[key]`. **Note the key is spelled `diffrent`, not `different`** — this is the exact registered rule name; using `different:` silently no-ops (unknown rule names are skipped: `if (!this.rules[name]) return;`). |
| `value` | `NFormRuleValue.ts` | `val` — a literal string | Passes if `Mix.str(value) === val` (string-coerced strict equality against a literal). |
| `email` | `NFormRuleEmail.ts` | none | Passes if the value is empty, or matches `/^.*?@.*?\.[a-z]{2,}$/`. |
| `min` | `NFormRuleMin.ts` | `min` — a number | Passes if the value is empty, or (for numeric values) `value >= min`. Non-numeric non-empty values fail. |
| `max` | `NFormRuleMax.ts` | `max` — a number | Passes if the value is empty, or (for numeric values) `value <= max`. Non-numeric non-empty values fail. |
| `minlength` | `NFormRuleMinlength.ts` | `min` — a number | Passes if the value is empty, or (for strings/arrays) `length > min` — **strictly greater than**, not `>=`. |
| `maxlength` | `NFormRuleMaxlength.ts` | `max` — a number | Passes if the value is empty, or (for strings/arrays) `length < max` — **strictly less than**, not `<=`. |

All 11 modules are pre-registered in `NFormRuleHandler.rules` (`src/form/js/form-rules/NFormRuleHandler.ts`) — this is the complete built-in set as of this commit.

Real usage (`demos/form.html`):

```html
<n-form-item prop="testselect" label="Testselect" :rules="['required_unless:teststring', 'value:primary']">
  <n-select v-model="n_testform.testselect" :options="types" :clearable="true"></n-select>
</n-form-item>

<n-form-item prop="teststring" label="Teststring" :rules="['required', 'minlength:3', 'diffrent:testselect']">
  <n-input v-model="n_testform.teststring"></n-input>
</n-form-item>
```

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `boolean` | Standard v-model write path, fired from `NFormItemController.superToggle()` when the "Enable field"/"Disable field" toggle row is clicked (only rendered/active when `conditional: true`). |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The field's input control(s), rendered inside `{bem}__input` (`NFormItemView.input()`). |

## Exposed methods

None (`NFormItem.ts` never calls `ncx.pass(...)`). Internally `NFormItemController` defines `superToggle()` (flips `modelValue` when `conditional`) and `superView()` (opens any ancestor `NTabsItem`/`NCollapseItem`/`NFormGroup` and smooth-scrolls the field into view — used by `NForm.gotoFirstError()`/`NFormBag`'s click-to-jump list), but neither is reachable from a template ref.

## Minimal example

```vue
<template>
  <n-form-item label="Name">
    <n-input v-model="form.name" />
  </n-form-item>
</template>
```

## Realistic example

Standalone, with no `NForm` ancestor at all (fully valid per Required composition below) — just a labeled wrapper:

```vue
<template>
  <n-form-item label="Search" tooltip="Ignored, see Gotchas">
    <n-input v-model="query" clearable />
  </n-form-item>
</template>

<script setup>
import { ref } from 'vue';
const query = ref('');
</script>
```

Nested under `NForm` with validation (adapted from `demos/form.html`):

```vue
<template>
  <n-form :form="form">
    <n-form-item prop="teststring" label="Teststring" :rules="['required', 'minlength:3', 'diffrent:testselect']">
      <n-input v-model="form.teststring" />
    </n-form-item>

    <n-form-item prop="testbool" label="Testbool" conditional :rules="['required_if:teststring']">
      <n-switch v-model="form.testbool">Testbool</n-switch>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ teststring: '', testselect: '', testbool: false });
</script>
```

## Required composition

None in either direction. `NFormItem` works **fully standalone** with no `NForm` ancestor (`injectRef(['form', 'NForm'])` resolves to `null`; `onMounted`/`onUnmounted` guard the `append`/`remove` calls with `?.`, and `NFormItemView.error()` defaults `errors` to `{}` when there's no `NForm` to read messages from) — in that case it's just a label+input wrapper with no validation. It also works with an `NForm` ancestor and **no** `NFormGroup`/`NTabsItem`/`NCollapseItem` ancestor (those are all optional `injectRef` lookups used only for `superView()`'s auto-expand-and-scroll behavior).

## Common mistakes

- **Setting `rules` without `prop`.** Rules are evaluated against `Obj.get(form, field.data.prop)` — with no `prop`, the value is always read from an undefined path and errors never attach to this field (nor merge from the `errors` prop).
- **Expecting the `tooltip`/`conditionOn`/`conditionOff` props to do anything.** They don't in this commit — see the prop table above.
- **Using `different:` instead of `diffrent:`** in a `rules` entry. The registered key is `diffrent` (misspelled in source) — an unrecognized rule name is silently skipped, no error, no console warning.
- **Assuming `conditional` fields start disabled.** The default `modelValue` is `true` — a conditional field starts *enabled* and must be explicitly toggled off, or mounted with `:model-value="false"`.

## Gotchas

- `NFormItemController.setup()` calls `provide('NFormItem', this.instance)` — this is exactly the injection point every other component's `ProtoController.setup()` reads via the automatic `injectRef(['form-item', 'NFormItem'])` call described in `ai-docs/concepts.md`. Concretely: put any input component (e.g. `NInput`, `NSelect`, `NSwitch`) inside an `NFormItem`'s default slot, and that input's `ProtoData.superDisabled` getter becomes `this.scope.get('disabled') || !(!ncx || ncx?.data.model)` — i.e. it treats itself as disabled whenever the enclosing `NFormItem`'s `modelValue` (`data.model`) is falsy, on top of its own `disabled` prop. This is how `conditional` `NFormItem`s disable their contents when toggled off, and it's automatic — nothing in the child input needs to opt in.
- The per-field error shown by `NFormItemView.error()` only reads from the **nearest injected `NForm`** (`scope.ncx('form')?.data.messages`) — if there's no `NForm` ancestor, `errors` defaults to `{}` and no error node is ever rendered, silently.
- `is-disabled` is added to the root class list whenever `!data.model` (i.e., a toggled-off conditional field), independent of/in addition to `superDisabled`-driven `n-disabled` classes on child inputs.

## Related components

- `NForm` (`ai-docs/components/form.md`) — optional ancestor; owns `form`/`errors` and computes `messages`.
- `NFormGroup` (`ai-docs/components/form-group.md`) — optional ancestor; `superView()` will open a collapsed group to reveal this field.
- `NFormBag` (`ai-docs/components/form-bag.md`) — lists this field's messages and can trigger `superView()` on click.
