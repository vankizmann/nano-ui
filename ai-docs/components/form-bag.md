# NFormBag

A flat, click-to-jump list of every current validation message across all `NFormItem`s registered on the nearest ancestor `NForm` — typically dropped inside an `NPopover` as an "errors summary" panel.

## Import / Registration

Registered globally by `src/form/index.ts`:

```ts
App.component('NFormBag', NFormBag);
```

Source: `src/form/js/form-bag/NFormBag.ts` (+ `NFormBagController.ts`, `NFormBagData.ts`, `NFormBagView.ts`). `NFormBagController extends ProtoController` directly. See `ai-docs/concepts.md` for the shared Controller/Data/View pattern.

## Props

None. `NFormBagProps = {}` in `src/form/js/form-bag/NFormBag.ts` — the component takes no props at all.

## Events

None. `emits: []` in `NFormBag.ts`, and no `this.emit(...)` call anywhere in `NFormBagController`.

## Slots

None. `NFormBagView.default()` builds its entire tree programmatically from the injected `NForm`'s registered fields — there is no `this.slot(...)` call anywhere in `NFormBagView.ts`.

## Exposed methods

None. `NFormBag.ts` never calls `ncx.pass(...)`, and `NFormBagController` defines no additional methods beyond what it inherits.

## Minimal example

```vue
<template>
  <n-form :form="form">
    <n-form-item prop="email" label="Email" :rules="['required', 'email']">
      <n-input v-model="form.email" />
    </n-form-item>

    <n-form-bag />
  </n-form>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ email: '' });
</script>
```

## Realistic example

`demos/form.html` places it directly as the first child inside an `NFormFrame`'s body (`<n-form-frame ...><n-form-bag></n-form-bag> ... </n-form-frame>`) — no `NPopover` wrapper in that demo. `NFormBagController` also does `injectRef(['popover', 'NPopover'])` purely so it can auto-close an ancestor popover on click if one happens to be present (see Required composition); wrapping it in one is optional, e.g.:

```vue
<template>
  <n-form :form="form">
    <n-form-frame>
      <n-form-bag />

      <n-form-item prop="teststring" label="Teststring" :rules="['required', 'minlength:3']">
        <n-input v-model="form.teststring" />
      </n-form-item>
    </n-form-frame>
  </n-form>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ teststring: '' });
</script>
```

Clicking an entry in the list calls `field.superView()` (scrolls the field into view, opening any ancestor `NTabsItem`/`NCollapseItem`/`NFormGroup`) and, if an ancestor `NPopover` was injected, closes it (`scope.ncx('popover')?.superClose()`).

## Required composition

Requires an `NForm` ancestor somewhere in the tree (not necessarily a direct parent — resolved via `injectRef(['form', 'NForm'])`, i.e. Vue's `provide`/`inject`). Confirmed directly from source: `NFormBagView.default()` reads `scope.ncx('form')?.data.messages` and, if that is empty (including when there is no `NForm` ancestor at all, since the optional-chain then reads `undefined`), returns `null` and renders nothing. It also optionally injects `NPopover` (`injectRef(['popover', 'NPopover'])`) purely to auto-close that popover on item click — an `NPopover` ancestor is not required for `NFormBag` to render or function, just for that one convenience.

## Common mistakes

- **Expecting `NFormBag` to render anything without an `NForm` ancestor.** It silently renders `null` — no warning, no error, no placeholder.
- **Expecting it to render when there are zero validation messages.** Same code path (`Mix.isEmpty(errors)` check) — an all-valid form means `NFormBag` renders nothing, which is by design for an "errors summary" widget but easy to mistake for a bug while testing with valid data.
- **Passing props or slot content to `<n-form-bag>`.** Both are silently ignored/discarded — it takes no props and renders no slots.

## Gotchas

- `NFormBag` itself is not disable-aware in the `ProtoData.superDisabled`/`injectRef(['form-item', ...])` sense described in `ai-docs/concepts.md` — it has no `disabled` prop and doesn't render inputs, only a read-only list of message text and click targets.
- The list is built fresh on every render from `scope.ncx('form').childs` (every currently-mounted `NFormItem`), filtered to those whose `prop` key has entries in `data.messages` — a field with no `prop` set (see `ai-docs/components/form-item.md`) never appears here, since it can never have a keyed message.

## Related components

- `NForm` (`ai-docs/components/form.md`) — required ancestor; source of `childs` and `data.messages`.
- `NFormItem` (`ai-docs/components/form-item.md`) — each rendered row corresponds to one field's `prop`/`label`/messages, and clicking it calls the field's `superView()`.
- `NPopover` — optional ancestor; `NFormBag` auto-closes it on item click if present. Typically the actual host of `NFormBag`'s content, per `demos/form.html`'s usage pattern.
