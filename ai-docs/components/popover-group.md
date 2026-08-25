# NPopoverGroup

A styled section label/divider rendered inside an `NPopover`'s option list (e.g. `"Group 02"` between blocks of `NPopoverOption`s).

## Import / Registration

Registered globally by `src/popover/index.ts` as `NPopoverGroup` (`<n-popover-group>`), alongside `NPopover` and `NPopoverOption`. All three are installed together — there is no way to register one without the others.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Only affects `NPopoverGroup`'s own root class (`n-disabled` via `ProtoData.classRoot()`/`superDisabled`) — see Gotchas for what it does *not* do. |

`NPopoverGroupProps` spreads **only** `Props.Disabled` — no `Size`, `Type`, `Color`, `Icon`, etc.

## Events

| Event | Payload | Fired when |
|---|---|---|

None — `NPopoverGroup.ts` declares no `emits` array at all.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The group's label/content, rendered inside a `<span>` (`NPopoverGroupView.default()`: `h('span', null, [this.slot()])`). |

## Exposed methods

None. (No `pass(...)`/`ctx` exposure calls in `NPopoverGroupController`.)

## Minimal example

```vue
<template>
  <n-button>Menu</n-button>
  <n-popover v-model="open">
    <n-popover-group>
      Section label
    </n-popover-group>
    <n-popover-option>Item</n-popover-option>
  </n-popover>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

## Realistic example

Adapted from `demos/overview.html`, used to separate blocks of menu options inside a dropdown:

```vue
<template>
  <n-button icon="fa fa-paragraph">
    Paragraph
  </n-button>

  <n-popover trigger="click" position="bottom-start">
    <n-popover-option icon="fa fa-paragraph">Demotext</n-popover-option>
    <n-popover-option icon="fa fa-paragraph">Paragraph</n-popover-option>

    <n-popover-group>
      Headings
    </n-popover-group>

    <n-popover-option icon="fa fa-heading">Headline H3</n-popover-option>
    <n-popover-option icon="fa fa-heading">Headline H4</n-popover-option>

    <n-popover-group disabled>
      Coming soon
    </n-popover-group>
  </n-popover>
</template>
```

## Required composition

Per this doc's ground truth: **`NPopoverGroup` requires `NPopover` as its parent — it cannot be used standalone.** Render it only inside an `<n-popover>`'s `default` slot, alongside `NPopoverOption`s. See Gotchas, however, for what the source actually enforces (nothing, at runtime).

## Common mistakes

- Using `<n-popover-group>` outside of `<n-popover>` — it is intended purely as a section divider *within* a popover's option list, not a standalone component (see Required composition and Gotchas).
- Assuming `disabled` on `NPopoverGroup` disables/grays out the `NPopoverOption`s that follow it — it does not; there is no parent/child relationship or prop propagation between them at all (see Gotchas). `disabled` here only toggles `NPopoverGroup`'s own `n-disabled` class.
- Assuming `NPopoverGroup` behaves like a real "group" container (e.g. `NRadioGroup`/`NCheckboxGroup`, which track child instances via `GroupController`) — it doesn't track, count, or relate to any children at all; it renders its slot content and nothing else.

## Gotchas

- **The "requires `NPopover`" rule is a usage convention, not an enforced runtime dependency.** `NPopoverGroupController.setup()` does call `this.injectRef(['popover', 'NPopover'])`, but `injectRef` falls back to `null` (not a throw) when no ancestor `NPopover` provided the `'NPopover'` injection key — and, unlike e.g. `NTabsItem` (which unconditionally dereferences its injected parent and throws if it's `null`), `NPopoverGroupController`/`NPopoverGroupData`/`NPopoverGroupView` **never read the injected value anywhere else**. Rendering `<n-popover-group>` outside an `<n-popover>` will not throw and will render identically (just as an unstyled-context `<div class="n-popover-group"><span>...</span></div>`). Follow the stated composition rule anyway — it's the component's only intended usage — but don't expect a crash as a safety net if it's violated.
- **Despite the name, `NPopoverGroupController` extends plain `ProtoController`, not `GroupController`** (`src/root/js/controller/GroupController.ts`, described in concepts.md) — it has no `append()`/`remove()`/`childs` tracking of the `NPopoverOption`s that happen to follow it. It is a pure visual label/divider, not a functional grouping container.
- `disabled` only ever affects `NPopoverGroup`'s own root class list via `classRoot()`/`superDisabled` (see concepts.md `ProtoData`/`ProtoController`) — there's no mechanism by which it reaches sibling or nested `NPopoverOption`s.

## Related components

- `NPopover` — the required parent; see `ai-docs/components/popover.md`.
- `NPopoverOption` — the clickable-item counterpart typically used alongside `NPopoverGroup` inside the same popover. See `ai-docs/components/popover-option.md`.
