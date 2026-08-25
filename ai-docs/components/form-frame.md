# NFormFrame

A scrollable layout shell for long forms: splits into a sidebar (built from every registered `NFormGroup` child, as click-to-jump links) and a scrollable body for the actual form content.

## Import / Registration

Registered globally by `src/form/index.ts`:

```ts
App.component('NFormFrame', NFormFrame);
```

Source: `src/form/js/form-frame/NFormFrame.ts` (+ `NFormFrameController.ts`, `NFormFrameData.ts`, `NFormFrameView.ts`). `NFormFrameController extends GroupController` — tracks a `childs` list of registered `NFormGroup`s (populated by `NFormGroupController.onMounted`: `this.ncx('form-frame')?.append(this)`). See `ai-docs/concepts.md` for the shared pattern.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `showSearch` | `Boolean` | `false` | `NFormFrame.ts` (own) | <!-- UNVERIFIED / dead prop: declared but never read by `NFormFrameController`, `NFormFrameData`, or `NFormFrameView` in this commit. `NFormFrameView.side()` calls `this.search()` unconditionally — the search input renders regardless of this prop's value. See Gotchas. --> |
| `placeholder` | `String` | `'Search ...'` | `NFormFrame.ts` (own) | Placeholder text passed to the always-rendered search `n-input` (`NFormFrameView.search()`). |

## Events

None. `emits: []` in `NFormFrame.ts`, and no `this.emit(...)` call anywhere in `NFormFrameController`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The scrollable body content — typically `NFormGroup`/`NFormItem`/`NTabs`/`NCollapse` trees (`NFormFrameView.body()`: wrapped in an `n-scrollbar`). |

## Exposed methods

None (`NFormFrame.ts` never calls `ncx.pass(...)`). Internally, `NFormFrameController` defines `superView(group)` (smooth-scrolls the frame's body to the given `NFormGroupController`'s DOM node via `[data-ncx="${group.uid}"]`, then calls `group.superView()` to expand it if collapsed) — called from the sidebar link's click handler, not reachable from a template ref.

## Minimal example

```vue
<template>
  <n-form-frame style="height: 60vh;">
    <n-form-group label="Section 1" icon="fa fa-star">
      <n-form-item label="Name">
        <n-input />
      </n-form-item>
    </n-form-group>
  </n-form-frame>
</template>
```

## Realistic example

Adapted from `demos/form.html` — nested under `NForm`, containing an `NFormBag` and multiple `NFormGroup`s reachable via the sidebar:

```vue
<template>
  <n-form kind="fieldset" :form="form">
    <n-form-frame style="height: 80vh; border: 1px solid #eee;" :show-search="true">
      <n-form-bag />

      <n-form-group label="General" icon="fa fa-star">
        <n-form-item prop="teststring" label="Teststring" :rules="['required', 'minlength:3']">
          <n-input v-model="form.teststring" />
        </n-form-item>
      </n-form-group>

      <n-form-group label="Advanced" icon="fa fa-ghost" :collapse="true">
        <n-form-item prop="testbool" label="Testbool">
          <n-switch v-model="form.testbool">Testbool</n-switch>
        </n-form-item>
      </n-form-group>
    </n-form-frame>
  </n-form>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ teststring: '', testbool: false });
</script>
```

Clicking "General" or "Advanced" in the auto-generated sidebar smooth-scrolls the body to that group (expanding it first if collapsed).

## Required composition

Per this library's composition rules, `NFormFrame` expects an `NForm` ancestor somewhere in the tree (not necessarily a direct parent). Note the source-level nuance for Gotchas: `NFormFrameController.setup()` does **not** itself call `injectRef(['form', 'NForm'])` or read anything from an `NForm` instance — it only does `provide('NFormFrame', this.instance)` for its own `NFormGroup` children to inject. There is no direct code-level dependency from `NFormFrame` on `NForm` found in this commit; the requirement is a structural/usage convention (it is meant to be the layout shell for content living inside an `NForm`, and its `NFormGroup` children do separately read `NForm.kind` — see `ai-docs/components/form-group.md`) rather than an enforced runtime check.

## Common mistakes

- **Relying on `show-search` to hide the search box.** It renders unconditionally regardless of this prop's value — see Props/Gotchas.
- **Typing in the search box and expecting the sidebar links or body content to filter.** Nothing in `NFormFrameController`/`NFormFrameView` filters `childs`/`links()` by the typed text — see Gotchas.
- **Expecting `NFormGroup`s outside of `NFormFrame` to still show up in a sidebar.** There is no global registry — only `NFormGroup`s that are actual descendants of a given `NFormFrame` (and thus successfully `injectRef`/`append` into it) appear in that frame's `links()` list.

## Gotchas

- **The search box is non-functional as of this commit.** `NFormFrameView.search()` renders an `n-input` bound to `data.search` and wires `onInput` to `scope.set('search', e.target.value)` — but `NFormFrameController.setup()` never calls `makeData('search', ...)`, and `NFormFrameData` has no `search` getter at all. `scope.set('search', value)` still succeeds silently (`ProtoController.set()` just assigns into the internal `vals` plain object even without a prior `makeData` call), but `data.search` used as the input's bound `modelValue` always reads `undefined` (no getter), so the field visually never reflects what you typed past the DOM's own uncontrolled state, and — more importantly — nothing filters `links()`'s output using it. `showSearch` and `placeholder` exist, suggesting a filter-the-sidebar feature was intended, but it is not wired up in this commit.
- The sidebar (`side()`) is always rendered (search box included) — there is no prop to hide the sidebar entirely, only content is driven by however many `NFormGroup` children happen to register.
- `NFormFrameController.superView(group)` resolves the group's DOM node by a `data-ncx` attribute (`NFormGroupView.default()` sets `props['data-ncx'] = scope.uid`) via its own `body` ref's `.scrollTo(selector, options)` — this relies on `n-scrollbar`'s own API (`this.ncx('body')?.scrollTo(...)`), not a plain DOM `scrollIntoView` (contrast with `NFormItemController.superView()`/`NFormGroupController.superView()`, which do use `el.scrollIntoView(...)` directly).

## Related components

- `NForm` (`ai-docs/components/form.md`) — conventional ancestor (no direct code dependency found — see Required composition).
- `NFormGroup` (`ai-docs/components/form-group.md`) — registers itself into this component's `childs`, producing one sidebar link per group.
- `NFormBag` (`ai-docs/components/form-bag.md`) — commonly placed as a direct child inside the frame body, per `demos/form.html`.
